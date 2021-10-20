import React from "react";
import Router from "next/router";
import { withRouter } from "next/router";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ListView from "shared/ListView";
import ListNameModal from "components/ListComponents/ListNameModal";
import ConfirmModal from "shared/ConfirmModal";
import { ListLoading, ListEmpty } from "components/ListComponents";

import {
  addLinkInfoToResults,
  deepCopyObject,
  getCurrentUrl,
  getItemThumbnail
} from "lib";

import { setLocalForageItem, removeLocalForageItem } from "lib/localForage";

import { API_ENDPOINT } from "constants/items";
import { LISTS_TITLE } from "constants/lists";

import utils from "stylesheets/utils.module.scss";
import css from "components/ListComponents/ListComponents.module.scss";

class List extends React.Component {
  state = {
    uuid: "",
    list: null,
    items: [],
    initialized: false
  };

  componentDidMount() {
    const { router } = this.props;
    const uuid = router.query.list;
    this.setState({
      uuid: uuid
    });
    this.getList(uuid);
  }

  getList = async uuid => {
    localforage
      .getItem(uuid)
      .then(list => {
        if (list) {
          this.getItems(uuid, list);
        } else {
          this.setState({ initialized: true });
        }
      })
      .catch(function(err) {
        console.log("getList", err);
      });
  };

  getItems = async (uuid, list) => {
    const currentUrl = getCurrentUrl(this.props.router.query.req);
    const itemIds = Object.keys(list.selectedHash);
    const ids = itemIds.join(",");
    if (ids.length === 0) {
      this.setState({
        initialized: true,
        list: list,
        uuid: uuid,
        items: []
      });
      return;
    }
    try {
      const url = `${currentUrl}${API_ENDPOINT}/${ids}`;
      const res = await fetch(url);
      const json = await res.json();
      const items = json.docs
        .filter(result => result.error === undefined)
        .map(result => {
          const thumbnailUrl = getItemThumbnail(result);
          return Object.assign({}, result.sourceResource, {
            thumbnailUrl,
            id: result.id ? result.id : result.sourceResource["@id"],
            sourceUrl: result.isShownAt,
            provider: result.provider && result.provider.name,
            dataProvider: result.dataProvider,
            useDefaultImage: !result.object
          });
        });
      this.setState({
        initialized: true,
        list: list,
        uuid: uuid,
        items: items
      });
    } catch (error) {
      this.setState({ initialized: true, list: list, uuid: uuid, items: [] });
    }
  };

  onNameChange = value => {
    let uuid = this.state.uuid;
    let list = deepCopyObject(this.state.list);
    list.name = value;
    this.setState({ list: list });
    setLocalForageItem(uuid, list);
  };

  handleConfirm = e => {
    e.preventDefault();
    this.removeList();
  };

  removeList = async () => {
    const { uuid } = this.state;
    await removeLocalForageItem(uuid);
    Router.push({
      pathname: "/lists",
      query: ""
    });
  };

  render() {
    const { uuid, list, items, initialized } = this.state;
    const { router } = this.props
    if (initialized && (!list || list.length === 0)) {
      return <Error statusCode={404} />;
    }
    return (
      <MainLayout pageTitle={list ? list.name : LISTS_TITLE}>
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "My Lists",
              url: "/lists",
              as: "/lists"
            },
            { title: list ? list.name : LISTS_TITLE }
          ]}
        />
        <div
          id="main"
          role="main"
          className={`${utils.container} ${css.listDetailWrapper}`}
        >
          {!initialized && <ListLoading />}
          {list &&
            <div>
              {list.name &&
                <h1 className={css.listDetailName}>
                  {list.name}
                  <ListNameModal
                    name="Rename"
                    type="rename"
                    className={css.listRenameButton}
                    value={list.name}
                    onChange={this.onNameChange}
                  />
                </h1>}
              {list.createdAt &&
                <p className={css.listDate}>
                  Created {dayjs(list.createdAt, "x").fromNow()}
                </p>}
              <p>
                <strong>
                  Note:
                </strong>
                {" "}
                The link to this list won't work for someone else or in another
                browser.
              </p>
              {items &&
                uuid &&
                <ListView
                  name={list.name}
                  exportable={true}
                  items={addLinkInfoToResults(items, router.query)}
                  defaultUUID={uuid}
                />}
              {items.length === 0 && <ListEmpty />}
              {list.name &&
                <ConfirmModal
                  className={css.listDeleteConfirm}
                  buttonText="Delete list"
                  confirmText="Delete list?"
                  confirmButtonText="Delete"
                  onConfirm={this.handleConfirm}
                />}

            </div>}
        </div>
      </MainLayout>
    );
  }
}

// strangely, this makes the list uuid available in router.query.
// there's probably a better way...
List.getInitialProps = async context => { return({}); }

export default withRouter(List);

import React from "react";
import moment from "moment";
import Router from "next/router";

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

import { API_ENDPOINT, THUMBNAIL_ENDPOINT } from "constants/items";
import { LISTS_TITLE } from "constants/lists";

import utils from "stylesheets/utils.scss";
import css from "components/ListComponents/ListComponents.module.scss";

class List extends React.Component {
  state = {
    uuid: "",
    list: null,
    items: [],
    initialized: false
  };

  componentDidMount() {
    const { url } = this.props;
    const uuid = url.query.list;
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
        console.log(err);
      });
  };

  getItems = async (uuid, list) => {
    const currentUrl = getCurrentUrl(this.props.url.query.req);
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
    const { url, req } = this.props;
    const { uuid, list, items, initialized } = this.state;
    if (initialized && (!list || list.length === 0)) {
      return <Error statusCode={404} />;
    }
    return (
      <MainLayout route={url} pageTitle={list ? list.name : LISTS_TITLE}>
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "My Lists",
              url: "/lists",
              as: "/lists"
            },
            { title: list ? list.name : LISTS_TITLE }
          ]}
          route={url}
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
                  Created {moment(list.createdAt, "x").fromNow()}
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
                  route={url}
                  items={addLinkInfoToResults(items, url.query)}
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

List.getInitialProps = async ({ req }) => {
  return {};
};

export default List;

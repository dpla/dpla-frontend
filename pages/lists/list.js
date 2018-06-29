import React from "react";
import moment from "moment";
import AriaModal from "react-aria-modal";
import Router from "next/router";

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ListView from "shared/ListView";
import ListNameModal from "shared/ListNameModal";
import Button from "shared/Button";

import { getCurrentUrl, getDefaultThumbnail, addLinkInfoToResults } from "lib";
import {
  getLocalForageItem,
  setLocalForageItem,
  removeLocalForageItem
} from "lib/localForage";

import { API_ENDPOINT, THUMBNAIL_ENDPOINT } from "constants/items";

import utils from "stylesheets/utils.scss";

const TITLE = "List";

class List extends React.Component {
  state = {
    uuid: "",
    list: null,
    items: [],
    initialized: false,
    deleteModalActive: false
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
    const list = await getLocalForageItem(uuid);
    if (list) this.getItems(uuid, list);
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
      const items = json.docs.map(result => {
        const thumbnailUrl = result.object
          ? `${currentUrl}${THUMBNAIL_ENDPOINT}/${result.id}`
          : getDefaultThumbnail(result.sourceResource.type);
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
      if (res) {
        res.statusCode = 404;
      }
      return { error: { statusCode: 404 } };
    }
  };

  onNameChange = value => {
    let uuid = this.state.uuid;
    let list = JSON.parse(JSON.stringify(this.state.list));
    list.name = value;
    this.setState({ list: list });
    setLocalForageItem(uuid, list);
  };

  onDeleteConfirm = e => {
    e.preventDefault();
    this.setState({
      deleteModalActive: true
    });
  };

  closeConfirm = e => {
    this.setState({
      deleteModalActive: false
    });
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
    const { uuid, list, items, initialized, deleteModalActive } = this.state;
    if (initialized && !list) {
      return <Error statusCode={404} />;
    }
    const modal = deleteModalActive
      ? <AriaModal
          titleText="Delete this list?"
          onExit={this.closeConfirm}
          initialFocus="#confirm-cancel_button"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            action=""
            className={utils.modalForm}
            onSubmit={this.handleConfirm}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <h2 className={utils.modalTitle}>
              Delete this list?
            </h2>
            <div className={utils.modalContinueCancelButtons}>
              <Button
                className={utils.modalCancelButton}
                type="ghost"
                id="confirm-cancel_button"
                onClick={this.closeConfirm}
                name="confirm-cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                mustSubmit={true}
                className={utils.modalCopntinueButton}
              >
                Delete
              </Button>
            </div>
          </form>
        </AriaModal>
      : null;
    return (
      <MainLayout route={url} pageTitle={list ? list.name : TITLE}>
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "Lists",
              url: "/lists",
              as: "/lists"
            },
            { title: list ? list.name : TITLE }
          ]}
          route={url}
        />
        {list &&
          <div id="main" role="main" className={`${utils.container}`}>
            {list.name &&
              <h1>
                {list.name}
                <ListNameModal
                  name="Edit"
                  type="rename"
                  value={list.name}
                  onChange={this.onNameChange}
                />
              </h1>}
            {list.createdAt &&
              <p className="date">
                Created {moment(list.createdAt, "x").fromNow()}
              </p>}
            {items &&
              uuid &&
              <ListView
                exportable={true}
                route={url}
                items={addLinkInfoToResults(items, url.query)}
                defaultUUID={uuid}
              />}
            {list.name &&
              <Button
                type="primary"
                id="list-delete_button"
                onClick={this.onDeleteConfirm}
                name="list-delete_button"
              >
                Delete List
              </Button>}
            <div role="dialog">
              {modal}
            </div>
          </div>}
      </MainLayout>
    );
  }
}

List.getInitialProps = async ({ req }) => {
  return {};
};

export default List;

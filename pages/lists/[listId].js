import React from "react";
import Router, { withRouter } from "next/router";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localforage from "localforage";

dayjs.extend(relativeTime);

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ListView from "shared/ListView";
import ListNameModal from "components/ListComponents/ListNameModal";
import ConfirmModal from "shared/ConfirmModal";
import { ListLoading, ListEmpty } from "components/ListComponents";

import { addLinkInfoToResults, getItemThumbnail } from "lib";

import { setLocalForageItem, removeLocalForageItem } from "lib/localForage";

import { LISTS_TITLE } from "constants/lists";

import utils from "stylesheets/utils.module.scss";
import css from "components/ListComponents/ListComponents.module.scss";
import { UNTITLED_TEXT } from "constants/site";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.listId = this.props.router.query.listId;
    console.log("IN CONSTRUCTOR", this.listId);
    this.state = {
      list: null,
      items: [],
      initialized: false,
    };
  }

  async componentDidMount() {
    console.log("IN componentDidMount", this.listId);
    const list = await localforage.getItem(this.listId);

    // no such list exists
    if (!list) {
      this.setState({ initialized: true, items: [] });
      return;
    }

    const itemIds = Object.keys(list.selectedHash);

    // empty list
    if (itemIds.length === 0) {
      this.setState({
        initialized: true,
        items: [],
        list: list,
      });
      return;
    }

    const ids = itemIds.join(",");

    try {
      const url = `/api/items/${ids}`;
      const res = await fetch(url);
      const json = await res.json();
      const items = json.docs
        .filter((result) => result.error === undefined)
        .map((result) => {
          const thumbnailUrl = getItemThumbnail(result);
          const dataProviderFromObj =
            result.dataProvider && result.dataProvider.name;
          const dataProvider = dataProviderFromObj || result.dataProvider;

          return {
            ...result.sourceResource,
            thumbnailUrl,
            id: result.id ? result.id : result.sourceResource["@id"],
            sourceUrl: result.isShownAt,
            provider: result.provider && result.provider.name,
            dataProvider: dataProvider,
            useDefaultImage: !result.object,
          };
        });
      this.setState({
        initialized: true,
        list: list,
        items: items,
      });
    } catch (error) {
      // unable to load items
      this.setState({
        initialized: true,
        list: list,
        items: [],
      });
    }
  }

  onNameChange = async (value) => {
    console.log("NEW NAME", value);
    await this.setState(async (prevState) => {
      const list = prevState.list;
      list.name = value;
      await setLocalForageItem(this.listId, list);
      return {
        list: list,
      };
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("NEW STATE", nextState);
  //   return true;
  // }

  handleConfirmDelete = async (e) => {
    e.preventDefault();
    const uuid = this.listId;
    await removeLocalForageItem(uuid);
    await this.props.router.push({
      pathname: "/lists",
      query: "",
    });
  };

  render() {
    const { list, items, initialized } = this.state;
    const { router } = this.props;
    console.log(initialized, list, items, router.query.listId);
    if (initialized && !list) {
      return <Error statusCode={404} />;
    }
    return (
      <MainLayout pageTitle={list ? list.name : LISTS_TITLE}>
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "My Lists",
              url: "/lists",
              as: "/lists",
            },
            { title: list ? list.name : UNTITLED_TEXT },
          ]}
        />
        <div
          id="main"
          role="main"
          className={`${utils.container} ${css.listDetailWrapper}`}
        >
          {!initialized && <ListLoading />}
          {list && (
            <div>
              {list.name && (
                <h1 className={css.listDetailName}>
                  {list.name}
                  <ListNameModal
                    name="Rename"
                    type="rename"
                    className={css.listRenameButton}
                    value={list.name}
                    onChange={this.onNameChange}
                  />
                </h1>
              )}
              {list.createdAt && (
                <p className={css.listDate}>
                  Created {dayjs(list.createdAt, "x").fromNow()}
                </p>
              )}
              <p>
                <strong>Note:</strong> The link to this list won&apos;t work for
                someone else or in another browser.
              </p>
              {items && this.props.router.query.listId && (
                <ListView
                  name={list.name}
                  exportable={true}
                  items={addLinkInfoToResults(items, router.query)}
                  defaultUUID={this.props.router.query.listId}
                />
              )}
              {items.length === 0 && <ListEmpty />}
              {list.name && (
                <ConfirmModal
                  className={css.listDeleteConfirm}
                  buttonText="Delete list"
                  confirmText="Delete list?"
                  confirmButtonText="Delete"
                  onConfirm={this.handleConfirmDelete}
                />
              )}
            </div>
          )}
        </div>
      </MainLayout>
    );
  }
}

export default withRouter(List);

import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import ListImage from "./ListImage";
import ListNameModal from "components/ListComponents/ListNameModal";
import Alert from "shared/Alert";

import {
  bindLinkEvent,
  createUUID,
  deepCopyObject,
  joinIfArray,
  truncateString,
} from "lib";

import {
  getLocalForageItem,
  getLocalForageLists,
  setLocalForageItem,
} from "lib/localForage";

import { MAX_LIST_ITEMS, MESSAGE_DELAY, UNTITLED_TEXT } from "constants/site";

import css from "./ListView.module.scss";
import utils from "stylesheets/utils.module.scss";

function joinTruncate(str) {
  return truncateString(joinIfArray(str));
}

/**
 * @param props description item description object
 * @return HTML with truncated item description
 */
function ItemDescription(props) {
  const { description } = props;
  const str = joinTruncate(description);
  return (
    <div className={css.itemDescription}>
      <p>{str}</p>
    </div>
  );
}

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      listsInitialized: false,
      listName: "",
      listUUID: "",
      selectedHash: {},
      lists: [],
      checkboxShown: false,
      hasList: false,
      listCreatedAt: 0,
      showMessage: "",
    };
  }

  async componentDidMount() {
    await this.getLists();
    this.bindClickThroughEvent();
    this.bindBrowseEvent();
  }

  bindClickThroughEvent() {
    const links = document.getElementsByClassName("clickThrough");
    const items = this.props.items;

    // Iterate through links.
    Array.from(links).forEach(function (link) {
      // Find item with sourceUrl that matches link href.
      const item = items.filter(function (i) {
        return i.sourceUrl === link.href;
      })[0];

      // Sanity check
      if (item) {
        const gaEvent = {
          type: "Click Through",
          itemId: item.id,
          title: joinIfArray(item.title),
          partner: joinIfArray(item.provider),
          contributor: joinIfArray(item.dataProvider),
        };

        bindLinkEvent(gaEvent, [link]);
      }
    });
  }

  bindBrowseEvent() {
    const path = window.location.pathname;
    // Check if path starts with "/browse-by-topic" (backward compatible in IE).
    // Need to check b/c component is shared between search and browse pages.
    if (path.startsWith("/browse-by-topic")) {
      const links = document.getElementsByClassName("internalItemLink");
      const items = this.props.items;

      // Iterate through links.
      Array.from(links).forEach(function (link) {
        // Find item with linkAs property that matches end of link href.
        // item.linkAs is relative URL; link.href is full URL.
        const str = link.href;
        const item = items.filter(function (i) {
          const suffix = i.linkAs;
          return str.indexOf(suffix, str.length - suffix.length) !== -1;
        })[0];

        // Sanity check
        if (item) {
          const gaEvent = {
            type: "Browse Item",
            itemId: item.id,
            title: joinIfArray(item.title),
            partner: joinIfArray(item.provider),
            contributor: joinIfArray(item.dataProvider),
          };
          bindLinkEvent(gaEvent, [link], "_self");
        }
      });
    }
  }

  getLists = async () => {
    let readOnly = false;
    const lists = await getLocalForageLists();
    lists.sort((a, b) => b.createdAt - a.createdAt);
    if (this.props.defaultUUID) {
      readOnly = true;
      await this.loadList(this.props.defaultUUID);
    }
    this.setState({
      readOnly: readOnly,
      lists: lists,
      listsInitialized: true,
    });
  };

  onNameChange = async (value) => {
    await this.createList(value);
  };

  createList = async (listName) => {
    this.setState(async (prevState) => {
      // add the new list to local storage
      const uuid = createUUID();
      const createdAt = Date.now();
      const newLists = deepCopyObject(prevState.lists);
      newLists.push({
        uuid: uuid,
        name: listName,
        count: 0,
        createdAt: createdAt,
      });
      newLists.sort((a, b) => b.createdAt - a.createdAt);
      const savedList = {
        name: listName,
        selectedHash: {},
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      await setLocalForageItem(uuid, savedList);
      return {
        listName: listName,
        listCreatedAt: createdAt,
        listUUID: uuid,
        selectedHash: {},
        lists: newLists,
        checkboxShown: true,
        hasList: true,
      };
    });
  };

  loadList = async (uuid) => {
    const value = await getLocalForageItem(uuid);
    const listName = value.name;
    const selectedHash = value.selectedHash;
    const listCreatedAt = value.createdAt;

    this.setState({
      listName: listName,
      listCreatedAt: listCreatedAt,
      listUUID: uuid,
      selectedHash: selectedHash,
      checkboxShown: true,
      hasList: true,
    });
  };

  listSelectChange = async (e) => {
    const listUUID = e.target.value;
    if (listUUID === "") {
      this.setState({
        listName: "",
        listUUID: "",
        listCreatedAt: 0,
        selectedHash: {},
        checkboxShown: false,
        hasList: false,
      });
    } else {
      await this.loadList(listUUID);
    }
  };

  onCheckItem = async (e) => {
    console.log("onCheckItem");
    const element = e.target;
    const id = element.getAttribute("data-id");
    const selected = element.checked;
    if (selected) {
      await this.addCell(id);
    } else {
      await this.removeCell(id);
    }
  };

  onRemoveItem = async (e) => {
    const element = e.target;
    const id = element.getAttribute("data-id");
    const selected = element.checked;
    if (!selected) {
      await this.addCell(id);
    } else {
      await this.removeCell(id);
    }
  };

  addCell = async (id) => {
    const hash = deepCopyObject(this.state.selectedHash);
    if (hash[id]) return; // check if item already selected
    hash[id] = id;
    await this.updateList(hash, "Item added");
  };

  removeCell = async (id) => {
    const hash = deepCopyObject(this.state.selectedHash);
    delete hash[id];
    const message = this.state.readOnly
      ? "Item removed. Uncheck to undo."
      : "Item removed";
    await this.updateList(hash, message);
  };

  updateList = async (hash, message) => {
    this.setState(async (prevState) => {
      const updatedAt = Date.now();
      let savedList = {
        name: this.state.listName,
        selectedHash: hash,
        createdAt: this.state.listCreatedAt,
        updatedAt: updatedAt,
      };
      await setLocalForageItem(prevState.listUUID, savedList);
      let lists = deepCopyObject(prevState.lists);
      lists.sort((a, b) => b.createdAt - a.createdAt);
      lists.forEach((l) => {
        if (l.uuid === prevState.listUUID) {
          l.count = Object.keys(hash).length;
        }
      });
      return {
        selectedHash: hash,
        lists: lists,
        showMessage: message,
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showMessage !== prevState.showMessage)
      setTimeout(() => this.setState({ showMessage: "" }), MESSAGE_DELAY);
    if (this.props.name !== prevProps.name)
      this.setState({ listName: this.props.name });
  }

  downloadCSV = () => {
    const rows = this.props.items
      .filter((item) => {
        const realId = item.itemDplaId || item.id;
        return this.state.selectedHash[realId] !== undefined;
      })
      .map((item) => {
        const realId = item.itemDplaId || item.id;
        const thumbnailUrl =
          item.thumbnailUrl.indexOf("placeholderImages") === -1
            ? item.thumbnailUrl
            : "";
        const title = item.title
          ? `"${truncateString(item.title, 150).replace(/"/g, "”")}"`
          : UNTITLED_TEXT;
        const date = item?.date?.displayDate
          ? `"${item.date.displayDate.replace(/"/g, "”")}"`
          : "";
        const creator = item.creator
          ? `"${joinIfArray(item.creator, ", ").replace(/"/g, "”")}"`
          : "";
        const description = item.description
          ? `"${joinTruncate(item.description).replace(/"/g, "”")}"`
          : "";
        const provider = item.dataProvider
          ? `"${joinIfArray(item.dataProvider).replace(/"/g, "”")}"`
          : "";
        const url = item.sourceUrl;
        return `${realId},${title},${date},${creator},${description},${provider},${thumbnailUrl},${url}`;
      });
    const csvData = `id,Title,Date,Creator,Description,Provider,Thumbnail,URL\r\n${rows.join(
      "\r\n",
    )}`;

    const filename = `${this.state.listName}.csv`;
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          window.location.href = reader.result;
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  render() {
    const { items, router, exportable, viewMode } = this.props;
    const {
      readOnly,
      listsInitialized,
      checkboxShown,
      hasList,
      lists,
      listUUID,
      showMessage,
      selectedHash,
    } = this.state;
    const listCount = Object.keys(selectedHash).length;

    return (
      <div>
        {listsInitialized && !readOnly && (
          <div className={css.listTools}>
            <ListNameModal
              type="create"
              value=""
              onChange={this.onNameChange}
              name={
                lists.length > 0
                  ? "Create new list"
                  : "Create a list from these items"
              }
              className={css.createList}
            />
            {lists.length > 0 && (
              <label htmlFor="list-select" className={css.listSelectLabel}>
                {hasList ? "Adding" : "Add"} to:
              </label>
            )}
            {lists.length > 0 && (
              <select
                value={listUUID}
                aria-label={hasList ? "Adding to" : "Add to"}
                id="list-select"
                className={css.listSelect}
                onChange={this.listSelectChange}
              >
                <option value="">No list</option>
                {lists.map((list) => {
                  return (
                    <option key={list.uuid} value={list.uuid}>
                      {list.name} ({list.count}
                      {list.count !== 1 ? " items" : " item"})
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        )}
        <Alert showMessage={showMessage} />
        {exportable && items.length > 0 && (
          <div className={css.downloadLink}>
            <a onClick={this.downloadCSV}>Download list</a>
          </div>
        )}
        <ul
          className={`${css.listView} ${viewMode === "grid" ? css.grid : ""}`}
        >
          {items.map((item) => {
            const realId = item.itemDplaId || item.id;
            const checked = selectedHash[realId] !== undefined;
            const shouldDisable =
              (!checked && listCount > MAX_LIST_ITEMS) ||
              realId === "http://dp.la/api/items/#sourceResource";
            const disabledMessage = `Maximum ${MAX_LIST_ITEMS} items per list.`;
            let itemLinkText = "View Full Item";
            if (item.type === "image") itemLinkText = "View Full Image";
            else if (item.type === "text") {
              itemLinkText = "View Full Text";
            }

            return (
              <li
                key={item.id}
                className={`${css.listItem} ${
                  readOnly && selectedHash[realId] === undefined
                    ? css.deleted
                    : ""
                }`}
              >
                <ListImage
                  item={item}
                  title={item.title}
                  type={item.type}
                  url={item.thumbnailUrl}
                  useDefaultImage={item.useDefaultImage}
                />
                <div className={css.itemInfo}>
                  <h2 className={`${utils.hoverUnderline} ${css.itemTitle}`}>
                    {/* see issue #869 for details on this hack */}
                    {realId !== "http://dp.la/api/items/#sourceResource" && (
                      <Link
                        href={item.linkHref}
                        as={item.linkAs}
                        className={"internalItemLink"}
                      >
                        {item.title
                          ? truncateString(joinIfArray(item.title, ", "), 150)
                          : UNTITLED_TEXT}
                      </Link>
                    )}
                    {/* see issue #869 for details on this hack */}
                    {realId === "http://dp.la/api/items/#sourceResource" && (
                      <span>
                        {item.title
                          ? truncateString(item.title, 150)
                          : UNTITLED_TEXT}
                      </span>
                    )}
                  </h2>
                  {(item.date || item.creator) && (
                    <span className={css.itemAuthorAndDate}>
                      {router.pathname.startsWith("/search") && item.date && (
                        <span>{item.date.displayDate}</span>
                      )}
                      {router.pathname.startsWith("/search") &&
                        item?.date?.displayDate &&
                        item.creator && <span> · </span>}
                      <span>
                        {truncateString(joinIfArray(item.creator, ", "))}
                      </span>
                    </span>
                  )}
                  <ItemDescription description={item.description} />
                  <a
                    href={item.sourceUrl}
                    rel="noopener"
                    className={`clickThrough external ${css.itemSource}`}
                  >
                    {itemLinkText}
                  </a>
                  {item.dataProvider && (
                    <span className={`${css.itemProvider}`}>
                      &nbsp; in {item.dataProvider}
                    </span>
                  )}
                </div>
                {!readOnly && (
                  <label
                    className={`${css.checkboxLabel} ${
                      checkboxShown ? "" : css.collapsed
                    } ${shouldDisable ? css.disabled : ""}`}
                    htmlFor={`checkbox-${realId}`}
                    title={shouldDisable ? disabledMessage : ""}
                  >
                    <input
                      className={`${css.checkboxInput} ${
                        !checked && listCount >= MAX_LIST_ITEMS
                          ? css.disabled
                          : ""
                      }`}
                      type="checkbox"
                      title={shouldDisable ? disabledMessage : ""}
                      data-id={realId}
                      onChange={this.onCheckItem}
                      checked={selectedHash[realId] !== undefined}
                      disabled={shouldDisable}
                      key={`checkbox-${realId}`}
                      id={`checkbox-${realId}`}
                    />
                    {!checked && listCount >= MAX_LIST_ITEMS
                      ? "Can’t add more"
                      : "Add to list"}
                  </label>
                )}
                {readOnly && (
                  <label
                    className={`${css.checkboxLabel} ${css.remove} ${
                      checkboxShown ? "" : css.collapsed
                    } ${shouldDisable ? css.disabled : ""}`}
                    htmlFor={`checkbox-remove-${realId}`}
                    title={shouldDisable ? disabledMessage : ""}
                  >
                    <input
                      className={`${css.checkboxInput} ${css.remove}`}
                      type="checkbox"
                      data-id={realId}
                      onChange={this.onRemoveItem}
                      checked={selectedHash[realId] === undefined}
                      key={`checkbox-remove-${realId}`}
                      id={`checkbox-remove-${realId}`}
                    />{" "}
                    Remove from list
                  </label>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(ListView);

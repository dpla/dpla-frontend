import React from "react";
import Link from "next/link";

import ListImage from "./ListImage";
import ListNameModal from "components/ListComponents/ListNameModal";
import Alert from "shared/Alert";

import {
  createUUID,
  deepCopyObject,
  joinIfArray,
  truncateString,
  bindLinkEvent
} from "lib";
import {
  getLocalForageLists,
  setLocalForageItem,
  getLocalForageItem
} from "lib/localForage";
import { UNTITLED_TEXT, MESSAGE_DELAY, MAX_LIST_ITEMS } from "constants/site";

import css from "./ListView.scss";

const joinTruncate = str => truncateString(joinIfArray(str));

/**
 * @param description, item description object
 * @return HTML with truncated item description
 */
const ItemDescription = ({ description }) => {
  let str = joinTruncate(description);
  return (
    <div className={css.itemDescription}>
      <p>{str}</p>
    </div>
  );
};

class ListView extends React.Component {
  state = {
    readOnly: false,
    listsInitialized: false,
    listName: "",
    listUUID: "",
    selectedHash: {},
    lists: [],
    checkboxShown: false,
    hasList: false,
    listCreatedAt: 0,
    showMessage: ""
  };

  componentDidMount() {
    this.getLists();
    this.bindClickThroughEvent();
    this.bindBrowseEvent();
  }

  bindClickThroughEvent() {
    const links = document.getElementsByClassName("clickThrough");
    const items = this.props.items;

    // Iterate through links.
    Array.from(links).forEach(function(link) {
      // Find item with sourceUrl that matches link href.
      const item = items.filter(function(i) {
        return i.sourceUrl == link.href;
      })[0];

      // Sanity check
      if (item) {
        const gaEvent = {
          type: "Click Through",
          itemId: item.id,
          title: joinIfArray(item.title),
          partner: joinIfArray(item.provider),
          contributor: joinIfArray(item.dataProvider)
        };

        bindLinkEvent(gaEvent, [link]);
      }
    });
  }

  bindBrowseEvent() {
    const path = window.location.pathname;
    // Check if path starts with "/browse-by-topic" (backward compatible in IE).
    // Need to check b/c component is shared between search and browse pages.
    if (path.indexOf("/browse-by-topic") === 0) {
      const links = document.getElementsByClassName("internalItemLink");
      const items = this.props.items;

      // Iterate through links.
      Array.from(links).forEach(function(link) {
        // Find item with linkAs property that matches end of link href.
        // item.linkAs is relative URL; link.href is full URL.
        const item = items.filter(function(i) {
          const suffix = i.linkAs;
          const str = link.href;
          return str.indexOf(suffix, str.length - suffix.length) !== -1;
        })[0];

        // Sanity check
        if (item) {
          const gaEvent = {
            type: "Browse Item",
            itemId: item.id,
            title: joinIfArray(item.title),
            partner: joinIfArray(item.provider),
            contributor: joinIfArray(item.dataProvider)
          };

          bindLinkEvent(gaEvent, [link], "_self");
        }
      });
    }
  }

  getLists = async () => {
    let readOnly = false;
    this.setState({
      listsInitialized: true
    });
    let lists = await getLocalForageLists();
    // TODO: sometimes this doesnt arrive here because promises
    lists.sort((a, b) => b.createdAt - a.createdAt);
    if (this.props.defaultUUID) {
      readOnly = true;
      this.loadList(this.props.defaultUUID);
    }
    this.setState({
      readOnly: readOnly,
      lists: lists
    });
  };

  onNameChange = value => {
    this.createList(value);
  };

  createList = async listName => {
    // add the new list to local storage
    const uuid = createUUID();
    const createdAt = Date.now();
    let newLists = deepCopyObject(this.state.lists);
    newLists.push({
      uuid: uuid,
      name: listName,
      count: 0,
      createdAt: createdAt
    });
    newLists.sort((a, b) => b.createdAt - a.createdAt);
    let savedList = {
      name: listName,
      selectedHash: {},
      createdAt: createdAt,
      updatedAt: createdAt
    };
    this.setState({
      listName: listName,
      listCreatedAt: createdAt,
      listUUID: uuid,
      selectedHash: {},
      lists: newLists,
      checkboxShown: true,
      hasList: true
    });
    await setLocalForageItem(uuid, savedList);
  };

  loadList = async uuid => {
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
      hasList: true
    });
  };

  listSelectChange = e => {
    const listUUID = e.target.value;
    if (listUUID === "") {
      this.setState({
        listName: "",
        listUUID: "",
        listCreatedAt: 0,
        selectedHash: {},
        checkboxShown: false,
        hasList: false
      });
    } else {
      this.loadList(listUUID);
    }
  };

  onCheckItem = e => {
    const element = e.target;
    let id = element.getAttribute("data-id");
    let selected = element.checked;
    if (selected) {
      this.addCell(id);
    } else {
      this.removeCell(id);
    }
  };

  onRemoveItem = e => {
    const element = e.target;
    let id = element.getAttribute("data-id");
    let selected = element.checked;
    if (!selected) {
      this.addCell(id);
    } else {
      this.removeCell(id);
    }
  };

  addCell = id => {
    let hash = deepCopyObject(this.state.selectedHash);
    if (hash[id]) return; // check if item already selected
    hash[id] = id;
    this.updateList(hash, "Item added");
  };

  removeCell = id => {
    let hash = deepCopyObject(this.state.selectedHash);
    delete hash[id];
    const message = this.state.readOnly
      ? "Item removed. Uncheck to undo."
      : "Item removed";
    this.updateList(hash, message);
  };

  updateList = async (hash, message) => {
    const updatedAt = Date.now();
    let savedList = {
      name: this.state.listName,
      selectedHash: hash,
      createdAt: this.state.listCreatedAt,
      updatedAt: updatedAt
    };
    await setLocalForageItem(this.state.listUUID, savedList);
    let lists = deepCopyObject(this.state.lists);
    lists.sort((a, b) => b.createdAt - a.createdAt);
    lists.forEach(l => {
      if (l.uuid === this.state.listUUID) {
        l.count = Object.keys(hash).length;
      }
    });
    this.setState({ selectedHash: hash, lists: lists, showMessage: message });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showMessage !== prevState.showMessage)
      setTimeout(() => this.setState({ showMessage: "" }), MESSAGE_DELAY);
    if (this.props.name !== prevProps.name)
      this.setState({ listName: this.props.name });
  }

  downloadCSV = () => {
    const rows = this.props.items
      .filter(item => {
        const realId = item.itemDplaId || item.id;
        return this.state.selectedHash[realId] !== undefined;
      })
      .map((item, index) => {
        const realId = item.itemDplaId || item.id;
        const thumbnailUrl = item.thumbnailUrl.indexOf("placeholderImages") ===
          -1
          ? item.thumbnailUrl
          : "";
        const title = item.title
          ? `"${truncateString(item.title, 150).replace(/"/g, "”")}"`
          : item.title ? `"${item.title.replace(/"/g, "”")}"` : UNTITLED_TEXT;
        const date = item.date && item.date.displayDate
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
      "\r\n"
    )}`;

    const filename = `${this.state.listName}.csv`;

    let blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        let reader = new FileReader();
        reader.onload = function(e) {
          window.location.href = reader.result;
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  render() {
    const { items, route, exportable, viewMode } = this.props;
    const {
      readOnly,
      listsInitialized,
      checkboxShown,
      hasList,
      lists,
      listUUID,
      showMessage,
      selectedHash
    } = this.state;
    const listCount = Object.keys(selectedHash).length;

    return (
      <div>
        {listsInitialized &&
          !readOnly &&
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
            {lists.length > 0 &&
              <label htmlFor="list-select" className={css.listSelectLabel}>
                {hasList ? "Adding" : "Add"} to:
              </label>}
            {lists.length > 0 &&
              <select
                value={listUUID}
                aria-label={hasList ? "Adding to" : "Add to"}
                id="list-select"
                className={css.listSelect}
                onChange={this.listSelectChange}
              >
                <option value="">No list</option>
                {lists.map((list, index) => {
                  return (
                    <option key={index} value={list.uuid}>
                      {list.name} ({list.count}
                      {list.count !== 1 ? " items" : " item"})
                    </option>
                  );
                })}
              </select>}
          </div>}
        <Alert showMessage={showMessage} />
        {exportable &&
          items.length > 0 &&
          <div className={css.downloadLink}>
            <a onClick={this.downloadCSV}>Download list</a>
          </div>}
        <ul
          className={`${css.listView} ${viewMode === "grid" ? css.grid : ""}`}
        >
          {items.map((item, index) => {
            const realId = item.itemDplaId || item.id;
            const checked = selectedHash[realId] !== undefined;
            const shouldDisable =
              (!checked && listCount >= MAX_LIST_ITEMS) ||
              realId === "http://dp.la/api/items/#sourceResource";
            const disabledMessage = `Maximum ${MAX_LIST_ITEMS} items per list.`;
            return (
              <li
                key={index}
                className={`${css.listItem} ${readOnly &&
                  selectedHash[realId] === undefined
                  ? css.deleted
                  : ""}`}
              >
                <ListImage
                  item={item}
                  title={item.title}
                  type={item.type}
                  url={item.thumbnailUrl}
                  useDefaultImage={item.useDefaultImage}
                />
                <div className={css.itemInfo}>
                  <h2 className={`hover-underline ${css.itemTitle}`}>
                    {/* see issue #869 for details on this hack */}
                    {realId !== "http://dp.la/api/items/#sourceResource" &&
                      <Link href={item.linkHref} as={item.linkAs}>
                        <a className={`internalItemLink`}>
                          {route.pathname.indexOf("/search") === 0 && item.title
                            ? truncateString(item.title, 150)
                            : item.title ? item.title : UNTITLED_TEXT}
                        </a>
                      </Link>}
                    {/* see issue #869 for details on this hack */}
                    {realId === "http://dp.la/api/items/#sourceResource" &&
                      <span>
                        {route.pathname.indexOf("/search") === 0 && item.title
                          ? truncateString(item.title, 150)
                          : item.title ? item.title : UNTITLED_TEXT}
                      </span>}
                  </h2>
                  {(item.date || item.creator) &&
                    <span className={css.itemAuthorAndDate}>
                      {route.pathname.indexOf("/search") === 0 &&
                        item.date &&
                        <span>{item.date.displayDate}</span>}
                      {route.pathname.indexOf("/search") === 0 &&
                        item.date &&
                        item.date.displayDate &&
                        item.creator &&
                        <span> · </span>}
                      <span>
                        {truncateString(joinIfArray(item.creator, ", "))}
                      </span>
                    </span>}
                  <ItemDescription description={item.description} />
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover-underline clickThrough external ${css.itemSource}`}
                  >
                    {item.type === "image"
                      ? "View Full Image"
                      : item.type === "text"
                        ? "View Full Text"
                        : "View Full Item"}
                  </a>
                  {item.dataProvider &&
                    <span className={`${css.itemProvider}`}>
                      &nbsp; in {item.dataProvider}
                    </span>}
                </div>
                {!readOnly &&
                  <label
                    className={`${css.checkboxLabel} ${checkboxShown
                      ? ""
                      : css.collapsed} ${shouldDisable ? css.disabled : ""}`}
                    htmlFor={`checkbox-${realId}`}
                    title={shouldDisable ? disabledMessage : ""}
                  >
                    <input
                      className={`${css.checkboxInput} ${!checked &&
                        listCount >= MAX_LIST_ITEMS
                        ? css.disabled
                        : ""}`}
                      type="checkbox"
                      title={shouldDisable ? disabledMessage : ""}
                      data-id={realId}
                      onChange={this.onCheckItem}
                      checked={selectedHash[realId] !== undefined}
                      disabled={shouldDisable ? true : false}
                      key={`checkbox-${realId}`}
                      id={`checkbox-${realId}`}
                    />
                    {!checked && listCount >= MAX_LIST_ITEMS
                      ? "Can’t add more"
                      : "Add to list"}
                  </label>}
                {readOnly &&
                  <label
                    className={`${css.checkboxLabel} ${css.remove} ${checkboxShown
                      ? ""
                      : css.collapsed} ${shouldDisable ? css.disabled : ""}`}
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
                    />
                    Remove from list
                  </label>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListView;

import React from "react";
import Link from "next/link";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";
import ListImage from "./ListImage";
import GaListViewWrapper from "./GaListViewWrapper";

import { createUUID, joinIfArray, truncateString } from "lib";
import { UNTITLED_TEXT } from "constants/site";

import css from "./ListView.scss";

const DEFAULT_NAME = "Untitled list";
const MESSAGE_DELAY = 2000;

/**
 * @param description, item description object
 * @return HTML with truncated item description
 */
const ItemDescription = ({ description }) => {
  let str = joinIfArray(description);
  str = truncateString(str);
  return (
    <div className={css.itemDescription}>
      <p>{str}</p>
    </div>
  );
};

class ListView extends React.Component {
  state = {
    listsInitialized: false,
    listName: "",
    listUUID: "",
    selectedHash: {},
    lists: [],
    checkboxShown: false,
    hasList: false,
    modalActive: false,
    showMessage: ""
  };

  componentDidMount() {
    this.getLists();
  }

  getLists = async () => {
    let lists = [];
    await localforage.iterate((value, key) => {
      if (!value.name) return;
      lists.push({
        uuid: key,
        name: value.name,
        count: Object.keys(value.selectedHash).length
      });
    });
    this.setState({
      lists: lists,
      listsInitialized: true
    });
  };

  closeNameForm = e => {
    this.setState({
      listName: "",
      lists: this.state.lists,
      checkboxShown: this.state.checkboxShown,
      hasList: this.state.hasList,
      modalActive: false
    });
  };

  onNameChange = e => {
    this.setState({
      listName: e.target.value
    });
  };

  openNameForm = e => {
    e.preventDefault();
    this.setState({
      modalActive: true
    });
  };

  createList = async listName => {
    // add the new list to local storage
    const uuid = createUUID();
    let newLists = JSON.parse(JSON.stringify(this.state.lists));
    newLists.push({ uuid: uuid, name: listName, count: 0 });
    let savedList = { name: listName, selectedHash: {} };
    this.setState({
      listName: listName,
      listUUID: uuid,
      selectedHash: {},
      lists: newLists,
      checkboxShown: true,
      hasList: true,
      modalActive: false
    });
    await localforage.setItem(uuid, savedList);
  };

  loadList = async uuid => {
    let listName = "",
      selectedHash = {};
    await localforage.getItem(uuid).then(value => {
      listName = value.name;
      selectedHash = value.selectedHash;
    });
    this.setState({
      listName: listName,
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

  addCell = id => {
    let hash = JSON.parse(JSON.stringify(this.state.selectedHash));
    let list = this.state.lists.filter(l => l.uuid === this.state.listUUID)[0];
    if (hash[id]) return; // check if item already selected
    hash[id] = id;
    list.count++;
    this.saveList(hash, list, "Item added");
  };

  removeCell = id => {
    let hash = JSON.parse(JSON.stringify(this.state.selectedHash));
    let list = this.state.lists.filter(l => l.uuid === this.state.listUUID)[0];
    if (list && list.count > 0) list.count--;
    delete hash[id];
    this.saveList(hash, list, "Item removed");
  };

  saveList = async (hash, list, message) => {
    let savedList = { name: this.state.listName, selectedHash: hash };
    await localforage.setItem(this.state.listUUID, savedList);
    let lists = JSON.parse(JSON.stringify(this.state.lists));
    lists.forEach(l => {
      if (l.uuid === list.uuid) {
        l.count = list.count;
      }
    });
    this.setState({ selectedHash: hash, lists: lists, showMessage: message });
  };

  handleNameSubmit = e => {
    e.preventDefault();
    let tempName = this.state.listName.trim();
    if (tempName === "") {
      tempName = DEFAULT_NAME;
    }
    this.createList(tempName);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showMessage !== prevState.showMessage)
      setTimeout(() => this.setState({ showMessage: "" }), MESSAGE_DELAY);
  }

  render() {
    const nameCharLimit = 64;
    const { items, route } = this.props;
    const {
      listsInitialized,
      checkboxShown,
      modalActive,
      hasList,
      lists,
      listUUID,
      showMessage
    } = this.state;

    const newListModal = modalActive
      ? <AriaModal
          titleText="Name your list"
          onExit={this.closeNameForm}
          initialFocus="#cancel-name"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            action=""
            className={css.nameForm}
            onSubmit={this.handleNameSubmit}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <label htmlFor="list-name">Name your list</label>
            <input
              id="list-name"
              name="list-name"
              placeholder="Untitled list"
              maxLength={nameCharLimit}
              onChange={this.onNameChange}
              aria-label="Name your list"
            />
            <Button type="primary" mustSubmit={true} className={css.sendButton}>
              Create
            </Button>
            <Button
              className={css.cancelButton}
              type="ghost"
              id="cancel-name"
              onClick={this.closeNameForm}
              name="close_button"
            >
              Cancel
            </Button>
          </form>
        </AriaModal>
      : false;

    return (
      <section>
        {listsInitialized &&
          <div className={css.listTools}>
            <Button
              className={css.listCreate}
              type="ghost"
              onClick={this.openNameForm}
            >
              {lists.length === 0
                ? "Create a list from these items"
                : "Create new list"}
            </Button>
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
                      {list.name} ({list.count}{" "}
                      {list.count !== 1 ? "items" : "item"})
                    </option>
                  );
                })}
              </select>}
            <div
              role="dialog"
              className={`${css.listNameModal} ${!modalActive ? "" : css.open}`}
            >
              {newListModal}
            </div>
            <div
              role="alert"
              // aria-live="assertive"
              className={`${css.alert} ${showMessage === "" ? "" : css.open}`}
            >
              {showMessage}
            </div>
          </div>}
        <ul className={css.listView}>
          {items.map(item =>
            <li key={item["@id"] || item.id} className={css.listItem}>
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
                  {item.id !== "http://dp.la/api/items/#sourceResource" &&
                    <Link href={item.linkHref} as={item.linkAs}>
                      <a className={`internalItemLink`}>
                        {route.pathname.indexOf("/search") === 0 && item.title
                          ? truncateString(item.title, 150)
                          : item.title ? item.title : UNTITLED_TEXT}
                      </a>
                    </Link>}
                  {/* see issue #869 for details on this hack */}
                  {item.id === "http://dp.la/api/items/#sourceResource" &&
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
                    <span>{joinIfArray(item.creator, ", ")}</span>
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
              <label
                className={`${css.checkboxLabel} ${checkboxShown
                  ? ""
                  : css.collapsed}`}
                htmlFor={`checkbox-${item.id}`}
              >
                <input
                  className={css.checkboxInput}
                  type="checkbox"
                  data-id={item.id}
                  onChange={this.onCheckItem}
                  checked={this.state.selectedHash[item.id] !== undefined}
                  key={`checkbox-${item.id}`}
                  id={`checkbox-${item.id}`}
                />{" "}
                Add to list
              </label>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default GaListViewWrapper(ListView);

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
    listName: "",
    listUUID: "",
    selectedHash: {},
    lists: [],
    checkboxShown: false,
    hasList: false,
    modalActive: false
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
    if (lists.length > 0) {
      this.setState({ lists: lists });
    }
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

  loadList = uuid => {
    localforage.getItem(uuid).then(value => {
      const listName = value.name;
      const selectedHash = value.selectedHash;
      this.setState({
        listName: listName,
        listUUID: uuid,
        selectedHash: selectedHash,
        checkboxShown: true,
        hasList: true
      });
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

  handleNameSubmit = e => {
    e.preventDefault();
    let tempName = this.state.listName.trim();
    if (tempName === "") {
      tempName = DEFAULT_NAME;
    }
    this.createList(tempName);
  };

  render() {
    const nameCharLimit = 64;
    const { items, route } = this.props;
    const { checkboxShown, modalActive, hasList, lists, listUUID } = this.state;

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
              onClick={e => this.closeNameForm(e)}
              name="close_button"
            >
              Cancel
            </Button>
          </form>
        </AriaModal>
      : false;

    return (
      <section>
        <div className={css.listTools}>
          {lists.length === 0 &&
            <Button
              className={css.listCreate}
              type="ghost"
              onClick={e => this.openNameForm(e)}
            >
              Create a list from these results
            </Button>}
          {lists.length !== 0 &&
            <Button
              className={css.listCreate}
              type="ghost"
              onClick={e => this.openNameForm(e)}
            >
              Create new list
            </Button>}
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
              onChange={e => this.listSelectChange(e)}
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
            className={`${css.listNameModal} ${modalActive ? css.open : ""}`}
          >
            {newListModal}
          </div>
        </div>
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

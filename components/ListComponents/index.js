import React from "react";
import Link from "next/link";
import moment from "moment";

import Alert from "shared/Alert";
import ListNameModal from "shared/ListNameModal";

import { addCommasToNumber, createUUID, deepCopyObject } from "lib";
import { getLocalForageLists, setLocalForageItem } from "lib/localForage";

import { MESSAGE_DELAY, MAX_LIST_ITEMS } from "constants/site";

import utils from "stylesheets/utils.scss";
import css from "./ListComponents.scss";

export const List = ({ uuid, name, itemCount, createdAt }) =>
  <Link href={`/lists/${uuid}`}>
    <a className={css.listItem}>
      <h2 className={css.listName}>{name}</h2>
      <span className={css.listCount}>
        {addCommasToNumber(itemCount)} {itemCount !== 1 ? "items " : "item "}
      </span>
      {createdAt &&
        <span className={css.listDate}>
          Created {moment(createdAt, "x").fromNow()}
        </span>}
    </a>
  </Link>;

export const Lists = ({ lists }) =>
  <ul className={`${css.lists} col-xs-12`}>
    {lists.map((l, index) =>
      <li key={`l_${index}`}>
        <List
          uuid={l.uuid}
          name={l.name}
          createdAt={l.createdAt}
          itemCount={l.count}
        />
      </li>
    )}
  </ul>;

export const ListsEmpty = () =>
  <div className={`${css.empty} `}>
    <h2 className={css.contentTitle}>You have no lists</h2>
    <p>
      Create lists from our{" "}
      <Link prefetch href="/browse-by-topic">
        <a>topics</a>
      </Link>{" "}or{" "}
      <Link prefetch href="/search">
        <a>search results</a>
      </Link>{" "}
      (up to 50 items in each list).
    </p>
    <p>
      <strong>Note:</strong> You won't see lists created in
      another browser here. To view those lists, open the browser
      you used when creating them.
    </p>
  </div>;

export const ListLoading = () =>
  <div className={`${css.loading} `}>
    <h2 className={css.contentTitle}>Loading</h2><p>Please wait…</p>
  </div>;

export const ListsContent = ({ initialized, lists }) =>
  <div className={`${utils.container}`}>
    <div className={`row ${css.wrapper}`}>
      {!initialized && <ListLoading />}
      {lists.length > 0 && <Lists lists={lists} />}
      {initialized && lists.length === 0 && <ListsEmpty />}
    </div>
  </div>;

export class CheckableLists extends React.Component {
  state = { showMessage: "", checkedLists: [], lists: [], initialized: false };

  componentDidMount() {
    this.getLists();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showMessage !== prevState.showMessage)
      setTimeout(() => this.setState({ showMessage: "" }), MESSAGE_DELAY);
  }

  getLists = async () => {
    const { itemId } = this.props;
    let lists = await getLocalForageLists();
    lists.sort((a, b) => b.createdAt - a.createdAt);
    let checkedLists = [];
    lists.forEach(l => {
      if (l.selectedHash[itemId]) checkedLists.push(l.uuid);
    });
    this.setState({
      lists: lists,
      checkedLists: checkedLists,
      initialized: true
    });
  };

  onCheckList = e => {
    const element = e.target;
    let id = element.value;
    let selected = element.checked;
    if (selected) {
      this.addItemToList(id);
    } else {
      this.removeItemFromList(id);
    }
  };

  addItemToList(id) {
    const { itemId } = this.props;
    let theList = deepCopyObject(
      this.state.lists.filter(l => l.uuid === id)[0]
    );
    let checkedLists = deepCopyObject(this.state.checkedLists);
    if (checkedLists.indexOf(id) !== -1 && theList.selectedHash[itemId]) return; // check if item already selected
    checkedLists.push(id);
    theList.selectedHash[itemId] = itemId;
    this.updateList(id, theList, checkedLists, "Item added");
  }

  removeItemFromList(id) {
    const { itemId } = this.props;
    let theList = deepCopyObject(
      this.state.lists.filter(l => l.uuid === id)[0]
    );
    let checkedLists = deepCopyObject(this.state.checkedLists);
    if (checkedLists.indexOf(id) === -1 && !theList.selectedHash[itemId])
      return; // check if item not selected
    checkedLists.splice(checkedLists.indexOf(id), 1);
    delete theList.selectedHash[itemId];
    this.updateList(id, theList, checkedLists, "Item removed");
  }

  updateList = async (uuid, list, checkedLists, message) => {
    const updatedAt = Date.now();
    list.updatedAt = updatedAt;
    list.count = Object.keys(list.selectedHash).length;
    let lists = deepCopyObject(this.state.lists.filter(l => l.uuid !== uuid));
    lists.push(list);
    lists.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      checkedLists: checkedLists,
      lists: lists,
      showMessage: message
    });
    await setLocalForageItem(uuid, list);
  };

  onNameChange = value => {
    this.createList(value);
  };

  createList = async listName => {
    // add the new list to local storage
    const { itemId } = this.props;
    const uuid = createUUID();
    const createdAt = Date.now();
    let checkedLists = deepCopyObject(this.state.checkedLists);
    checkedLists.push(uuid);
    let newLists = deepCopyObject(this.state.lists);
    let savedList = {
      name: listName,
      selectedHash: { [itemId]: itemId },
      createdAt: createdAt,
      updatedAt: createdAt
    };
    newLists.push(
      Object.assign({}, savedList, {
        uuid: uuid,
        count: 1
      })
    );
    newLists.sort((a, b) => b.createdAt - a.createdAt);
    await setLocalForageItem(uuid, savedList);
    this.setState({
      showMessage: "List created and item added",
      checkedLists: checkedLists,
      lists: newLists
    });
  };

  render() {
    const { lists, showMessage, checkedLists } = this.state;
    const listOfLists = lists.length > 0
      ? <ul className={css.listOfLists}>
          {lists.map((l, index) => {
            const isChecked = checkedLists.indexOf(l.uuid) !== -1;
            const shouldDisable = l.count >= 50 && !isChecked;
            return (
              <li key={`l_${index}`}>
                <label
                  htmlFor={`ch_${l.uuid}`}
                  className={`${css.checkboxLabel} ${shouldDisable
                    ? css.disabled
                    : ""}`}
                >
                  <input
                    type="checkbox"
                    id={`ch_${l.uuid}`}
                    value={l.uuid}
                    checked={isChecked}
                    onChange={this.onCheckList}
                    disabled={shouldDisable ? true : false}
                    className={`${css.checkbox} ${shouldDisable
                      ? css.disabled
                      : ""}`}
                  />
                  {l.name}
                  <span className={css.listCount}>
                    {l.count < MAX_LIST_ITEMS ? l.count : "Max"}
                    {l.count !== 1 ? " items" : " item"}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      : null;
    return (
      <div className="itemLists">
        <Alert showMessage={showMessage} />
        <ListNameModal
          className={css.newListModal}
          type="create"
          value=""
          onChange={this.onNameChange}
          name="Add to a new list"
        />
        {listOfLists}
      </div>
    );
  }
}

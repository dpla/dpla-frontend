import React from "react";
import Link from "next/link";
import moment from "moment";

import Alert from "shared/Alert";

import { addCommasToNumber } from "lib";
import { getLocalForageLists } from "lib/localForage";

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

  getLists = async () => {
    const { itemId } = this.props;
    let lists = await getLocalForageLists();
    lists.sort((a, b) => a.createdAt < b.createdAt);
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
    console.log(id);
    if (selected) {
      this.addItemToList();
    } else {
      this.removeItemFromList();
    }
  };

  addItemToList() {}

  removeItemFromList() {}

  render() {
    const { itemId } = this.props;
    const { lists, showMessage, checkedLists } = this.state;
    const listOfLists = lists.length > 0
      ? <ul className="">
          {lists.map((l, index) => {
            const shouldDisable = l.count >= 50;
            const isChecked = checkedLists.indexOf(l.uuid) !== -1;
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
                  {l.name} ({l.count}{" "}
                  item{l.count !== 1 ? "s" : ""})
                </label>
              </li>
            );
          })}
        </ul>
      : null;
    return (
      <div className="itemLists">
        {listOfLists}
        <Alert showMessage={showMessage} />
        <button>Add item to a new list</button>
      </div>
    );
  }
}

import React from "react";
import Link from "next/link";
import moment from "moment";

import ListNameModal from "components/ListComponents/ListNameModal";

import { addCommasToNumber } from "lib";

import { MAX_LIST_ITEMS } from "constants/site";

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

export const ListEmpty = () =>
  <div className={`${css.empty}`}>
    <p>This list is empty.</p>
    <p>
      Add up to 50 items from our{" "}
      <Link prefetch href="/browse-by-topic">
        <a>topics</a>
      </Link>{" "}or{" "}
      <Link prefetch href="/search">
        <a>search results</a>
      </Link>.
    </p>
  </div>;

export const ListNote = () =>
  <div className={`${css.note} col-xs-12`}>
    <p>
      <strong>Note:</strong> You won't see lists created in
      another browser here. To view those lists, open the browser
      you used when creating them.
    </p>
  </div>;

export const ListsEmpty = () =>
  <div className={`${css.empty}  col-xs-12`}>
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
  </div>;

export const ListLoading = () =>
  <div className={`${css.loading}`}>
    <h2 className={css.contentTitle}>Loading</h2><p>Please wait…</p>
  </div>;

export const ListsContent = ({ initialized, lists, onCreateList }) =>
  <div className={`${utils.container}`}>
    <div className={`row ${css.wrapper}`}>
      {!initialized && <ListLoading />}
      <ListNote />
      {initialized && lists.length === 0 && <ListsEmpty />}
      {initialized &&
        <ListNameModal
          className={css.createList}
          type="create"
          value=""
          onChange={onCreateList}
          name="Create new list"
        />}
      {lists.length > 0 && <Lists lists={lists} />}
    </div>
  </div>;

export const ListCheckbox = ({
  index,
  list,
  shouldDisable,
  isChecked,
  onCheckList
}) =>
  <li>
    <label
      htmlFor={`ch_${list.uuid}`}
      className={`${css.checkboxLabel} ${shouldDisable ? css.disabled : ""}`}
    >
      <input
        type="checkbox"
        id={`ch_${list.uuid}`}
        value={list.uuid}
        checked={isChecked}
        onChange={onCheckList}
        disabled={shouldDisable ? true : false}
        className={`${css.checkbox} ${shouldDisable ? css.disabled : ""}`}
      />
      <span>{list.name}</span>
      <span className={css.listCount}>
        {list.count < MAX_LIST_ITEMS ? list.count : "Max"}
        {list.count !== 1 ? " items" : " item"}
      </span>
    </label>
  </li>;

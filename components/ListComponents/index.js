import React from "react";
import Link from "next/link";
import moment from "moment";

import ListNameModal from "components/ListComponents/ListNameModal";

import { addCommasToNumber } from "lib";

import { MAX_LIST_ITEMS } from "constants/site";

import css from "./ListComponents.module.scss";
import utils from "stylesheets/utils.module.scss"

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
  <ul className={`${css.lists} ${utils.colXs12}`}>
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
      <Link href="/browse-by-topic">
        <a>topics</a>
      </Link>{" "}or{" "}
      <Link href="/search">
        <a>search results</a>
      </Link>:
    </p>
    <video
        className={css.listVideo}
      poster="/static/video/list-add_poster.png"
      title="video with no audio showing how to add items to a list"
      controls
    >
      <source src="/static/video/list-add.mp4" type="video/mp4" />
      <source src="/static/video/list-add.ogv" type="video/ogg" />
      <p>
        Your browser doesn't support HTML5 video. Here is
        a <a href="/static/video/list-add.mp4">link to the video</a> instead.
      </p>
    </video>
  </div>;

export const ListNote = () =>
  <div className={`${css.note} ${utils.colXs12}`}>
    <p>
      <strong>Note:</strong> You won't see lists created in
      another browser here. To view those lists, open the browser
      you used when creating them.
    </p>
  </div>;

export const ListsEmpty = () =>
  <div className={`${css.empty} ${utils.colXs12}`}>
    <h2 className={css.contentTitle}>Create your lists</h2>
    <p>
      Create lists from our{" "}
      <Link href="/browse-by-topic">
        <a>topics</a>
      </Link>{" "}or{" "}
      <Link href="/search">
        <a>search results</a>
      </Link>{" "}
      (up to 50 items in each list):
    </p>
    <video
        className={css.listVideo}
        poster="/static/video/list-new_poster.png"
      title="video with no audio showing how to create a list and add items"
      controls
    >
      <source src="/static/video/list-new.mp4" type="video/mp4" />
      <source src="/static/video/list-new.ogv" type="video/ogg" />
      <p>
        Your browser doesn't support HTML5 video. Here is
        a <a href="/static/video/list-new.mp4">link to the video</a> instead.
      </p>
    </video>
    <h2>Download your lists</h2>
    <p>
      Once you have created a list, you can visit{" "}
      <code>
        <Link href="/lists">
          <a>dp.la/lists</a>
        </Link>
      </code>{" "}
      to
      manage them. You can also download lists to use in your preferred
      spreadsheet program:
    </p>
    <video
        className={css.listVideo}
        poster="/static/video/list-download_poster.png"
      title="video with no audio showing how to download a list"
      controls
    >
      <source src="/static/video/list-download.mp4" type="video/mp4" />
      <source src="/static/video/list-download.mp4" type="video/ogg" />
      <p>
        Your browser doesn't support HTML5 video. Here is
        a <a href="/static/video/list-download.mp4">link to the video</a>{" "}
        instead.
      </p>
    </video>
    <h2>Lists are private!</h2>
    <p>
      Lists you create <strong>exist only in the browser</strong> you use to
      create them. If you
      want to share a list, you can download it and share the file.
    </p>
  </div>;

export const ListLoading = () =>
  <div className={css.loading}>
    <h2 className={css.contentTitle}>Loading</h2><p>Please wait…</p>
  </div>;

export const ListsContent = ({ initialized, lists, onCreateList }) =>
  <div className={utils.container}>
    <div className={`${utils.row} ${css.wrapper}`}>
      {!initialized && <ListLoading />}
      {initialized && lists.length > 0 && <ListNote />}
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
        disabled={!!shouldDisable}
        className={`${css.checkbox} ${shouldDisable ? css.disabled : ""}`}
      />
      <span>{list.name}</span>
      <span className={css.listCount}>
        {list.count < MAX_LIST_ITEMS ? list.count : "Max"}
        {list.count !== 1 ? " items" : " item"}
      </span>
    </label>
  </li>;

import React from "react";
import Link from "next/link";
import moment from "moment";

import { addCommasToNumber } from "lib";

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
  <div>
    <h2>You have no lists</h2>
    <p>
      Create some lists from our{" "}
      <Link prefetch href="/browse-by-topic">
        <a>topics</a>
      </Link>{" "}or{" "}
      <Link prefetch href="/search">
        <a>search results</a>
      </Link>.
    </p>
    <p>
      <strong>Note:</strong> You won't see lists created in
      another browser here. To view those lists, open the browser
      you used when creating them.
    </p>
  </div>;

export const ListLoading = () =>
  <div className={`${css.loading} col-xs-12`}>
    <h2>Loading</h2><p>Please wait…</p>
  </div>;

export const ListsContent = ({ initialized, lists }) =>
  <div className={`${utils.container}`}>
    <div className={`row`}>
      {!initialized && <ListLoading />}
      {lists.length > 0 && <Lists lists={lists} />}
      {initialized && lists.length === 0 && <ListsEmpty />}
    </div>
  </div>;

import React from "react";

import ListView from "shared/ListView";

import css from "./ItemList.module.css";

function ItemList({ items }) {
  return (
    <div className={css.itemList} data-cy={"subtopic-item-list"}>
      <ListView items={items} behavior={"browse"}/>
    </div>
  );
}

export default ItemList;

import React from "react";

import ListView from "shared/ListView";

import css from "./ItemList.module.css";

function ItemList({ items, gaContext }) {
  return (
    <div className={css.itemList} data-cy={"subtopic-item-list"}>
      <ListView items={items} behavior={"browse"} gaContext={gaContext} />
    </div>
  );
}

export default ItemList;

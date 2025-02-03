import React from "react";

import ListView from "shared/ListView";

import css from "./ItemList.module.scss";

function ItemList(props) {
  return (
    <div className={css.itemList} data-cy={"subtopic-item-list"}>
      <ListView items={props.items} />
    </div>
  );
}

export default ItemList;

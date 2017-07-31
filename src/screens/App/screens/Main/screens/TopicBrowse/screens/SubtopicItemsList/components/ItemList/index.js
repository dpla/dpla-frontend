import React from "react";

import styles from "./ItemList.css";

const ItemList = ({ items }) =>
  <div className={styles.itemList}>
    <div className={styles.itemListHeader}>
      <p className={styles.itemCount}>{items.length} Items</p>
      <div className={styles.viewButtons}>
        <button classname={styles.viewButton}>
          <img className={styles.viewButtonIcon} src="" alt="Grid View" />
        </button>
        <button classname={styles.viewButton}>
          <img className={styles.viewButtonIcon} src="" alt="Grid View" />
        </button>
      </div>
    </div>
  </div>;

export default ItemList;

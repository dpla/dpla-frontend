import React from "react";

import styles from "./ItemList.css";

import ListView from "../ListView";

import gridViewIcon from "../../../../../../../../../../images/grid-view-icon.svg";
import listViewIcon from "../../../../../../../../../../images/list-view-icon.svg";

class ItemList extends React.Component {
  componentWillMount() {
    this.setState({ view: "list" });
  }

  updateView = view => this.setState({ view });

  render() {
    const { items } = this.props;
    const { view } = this.state;

    return (
      <div className={styles.itemList}>
        <div className={styles.itemListHeader}>
          <p className={styles.itemCount}>{items.length} Items</p>
          <div className={styles.viewButtons}>
            <button
              className={[
                styles.listViewButton,
                view === "list"
                  ? styles.viewButtonActive
                  : styles.viewButtonInactive
              ].join(" ")}
              onClick={() => this.updateView("list")}
            >
              <img
                className={styles.viewButtonIcon}
                src={listViewIcon}
                alt="List View"
              />
            </button>
            <button
              className={[
                styles.gridViewButton,
                view === "grid"
                  ? styles.viewButtonActive
                  : styles.viewButtonInactive
              ].join(" ")}
              onClick={() => this.updateView("grid")}
            >
              <img
                className={styles.viewButtonIcon}
                src={gridViewIcon}
                alt="Grid View"
              />
            </button>
          </div>
        </div>
        {view === "grid" ? "" : <ListView items={items} />}
      </div>
    );
  }
}

export default ItemList;

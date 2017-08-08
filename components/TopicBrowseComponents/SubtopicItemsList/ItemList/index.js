import React from "react";

import { classNames, stylesheet } from "./ItemList.css";

import ListView from "../ListView";
import GridView from "../GridView";

const gridViewIcon = "/static/images/grid-view-icon.svg";
const listViewIcon = "/static/images/list-view-icon.svg";

class ItemList extends React.Component {
  componentWillMount() {
    this.setState({ view: "list" });
  }

  updateView = view => this.setState({ view });

  render() {
    const { items } = this.props;
    const { view } = this.state;

    return (
      <div className={classNames.itemList}>
        <div className={classNames.itemListHeader}>
          <p className={classNames.itemCount}>
            {items.length} Items
          </p>
          <div className={classNames.viewButtons}>
            <button
              className={[
                classNames.listViewButton,
                view === "list"
                  ? classNames.viewButtonActive
                  : classNames.viewButtonInactive
              ].join(" ")}
              onClick={() => {
                if (view !== "list") {
                  this.updateView("list");
                }
              }}
            >
              <img
                className={classNames.viewButtonIcon}
                src={listViewIcon}
                alt="List View"
              />
            </button>
            <button
              className={[
                classNames.gridViewButton,
                view === "grid"
                  ? classNames.viewButtonActive
                  : classNames.viewButtonInactive
              ].join(" ")}
              onClick={() => {
                if (view !== "grid") {
                  this.updateView("grid");
                }
              }}
            >
              <img
                className={classNames.viewButtonIcon}
                src={gridViewIcon}
                alt="Grid View"
              />
            </button>
          </div>
        </div>
        {view === "grid"
          ? <GridView items={items} />
          : <ListView items={items} />}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ItemList;

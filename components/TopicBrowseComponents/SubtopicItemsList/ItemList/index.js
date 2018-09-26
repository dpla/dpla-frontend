import React from "react";

import ListView from "shared/ListView";

import css from "./ItemList.scss";

// const gridViewIcon = "/static/images/grid-view-icon.svg";
// const listViewIcon = "/static/images/list-view-icon.svg";

class ItemList extends React.Component {
  componentWillMount() {
    this.setState({ view: "list" });
  }

  updateView = view => this.setState({ view });

  render() {
    const { items } = this.props;
    const { view } = this.state;

    return (
      <div className={css.itemList}>
        {/* <div className={css.itemListHeader}>
          <div className={css.viewButtons}>
            <button
              className={[
                css.listViewButton,
                view === "list"
                  ? css.viewButtonActive
                  : css.viewButtonInactive
              ].join(" ")}
              onClick={() => {
                if (view !== "list") {
                  this.updateView("list");
                }
              }}
            >
              <img
                className={css.viewButtonIcon}
                src={listViewIcon}
                alt="List View"
              />
            </button>
            <button
              className={[
                css.gridViewButton,
                view === "grid"
                  ? css.viewButtonActive
                  : css.viewButtonInactive
              ].join(" ")}
              onClick={() => {
                if (view !== "grid") {
                  this.updateView("grid");
                }
              }}
            >
              <img
                className={css.viewButtonIcon}
                src={gridViewIcon}
                alt="Grid View"
              />
            </button>
          </div>
        </div> */}
        <ListView route={this.props.route} items={items} />
      </div>
    );
  }
}

export default ItemList;

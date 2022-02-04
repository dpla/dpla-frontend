import React from "react";

import ListView from "shared/ListView";

import css from "./ItemList.module.scss";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: "list" };
  }

  updateView = view => this.setState({ view });

  render() {
    const { items } = this.props;
    const { view } = this.state;

    return (
      <div className={css.itemList} data-cy={"subtopic-item-list"}>
        <ListView route={this.props.route} items={items} />
      </div>
    );
  }
}

export default ItemList;

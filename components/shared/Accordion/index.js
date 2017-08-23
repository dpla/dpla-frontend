import React from "react";

import { stylesheet, classNames } from "./Accordion.css";

class Accordion extends React.Component {
  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  onClickItem = index => {
    const { items } = this.state;
    const newItemsArray = items.map((item, i) => {
      if (i === index) {
        return Object.assign({}, item, { active: !item.active });
      } else {
        return item;
      }
    });
    this.setState({ items: newItemsArray });
  };

  render() {
    return (
      <div>
        {this.state.items.map((item, i) =>
          <div
            className={
              item.active
                ? [classNames.active, this.props.activeItemClass].join(" ")
                : [classNames.inactive, this.props.inactiveItemClass].join(" ")
            }
          >
            <button
              className={this.props.itemHeaderClass}
              onClick={() => this.onClickItem(i)}
            >
              {item.name}
            </button>
            <ul
              className={[
                this.props.subitemsWrapperClass,
                classNames.subitems
              ].join(" ")}
            >
              {item.subitems.map(subitem =>
                <li className={this.props.subitemClass}>{subitem.content}</li>
              )}
            </ul>
          </div>
        )}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Accordion;

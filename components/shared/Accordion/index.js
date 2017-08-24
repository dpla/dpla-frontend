import React from "react";

import { stylesheet, classNames } from "./Accordion.css";

const addIcon = "/static/images/add.svg";
const subtractIcon = "/static/images/subtract.svg";

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
            className={item.active ? classNames.active : classNames.inactive}
          >
            <button
              className={classNames.itemHeader}
              onClick={() => this.onClickItem(i)}
            >
              <span>{item.name}</span>
              {item.active &&
                <img
                  src={subtractIcon}
                  alt={item.name}
                  className={classNames.subtractIcon}
                />}
              {!item.active &&
                <img
                  src={addIcon}
                  alt={item.name}
                  className={classNames.addIcon}
                />}
            </button>
            <ul className={classNames.subitems}>
              {item.subitems.map(subitem => <li>{subitem.content}</li>)}
            </ul>
          </div>
        )}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Accordion;

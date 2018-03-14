import React from "react";

import { stylesheet, classNames } from "./Accordion.css";

const addIcon = "/static/images/add.svg";
const subtractIcon = "/static/images/subtract.svg";

class Accordion extends React.Component {
  componentWillMount() {
    // first save the original items
    const originalItems = this.props.items.map(item => {
      return { ...item, active: true };
    });
    // activate all of them
    this.setState({ items: originalItems });
  }

  componentDidMount() {
    // now collapse accordions for realz
    this.setState({ items: this.props.items });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items.map((item, i) =>
        Object.assign({}, item, { active: this.state.items[i].active })
      )
    });
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
      <ul>
        {this.state.items.map((item, i) => {
          if (
            (item.type === "term" && item.subitems.length) ||
            item.type === "date"
          ) {
            return (
              <li
                key={i}
                className={
                  item.active ? classNames.active : classNames.inactive
                }
              >
                <button
                  className={classNames.itemHeader}
                  aria-controls={`facets_${i}`}
                  aria-expanded={item.active}
                  onClick={() => this.onClickItem(i)}
                >
                  <h3>{item.name}</h3>
                  {item.active &&
                    <img
                      src={subtractIcon}
                      alt=""
                      className={classNames.subtractIcon}
                    />}
                  {!item.active &&
                    <img src={addIcon} alt="" className={classNames.addIcon} />}
                </button>
                {item.type === "term" &&
                  <ul id={`facets_${i}`} className={classNames.subitems}>
                    {item.subitems.map((subitem, j) =>
                      <li key={j}>{subitem.content}</li>
                    )}
                  </ul>}
                {item.type === "date" &&
                  <div
                    id={`facets_${i}`}
                    className={`${classNames.subitems} ${classNames.date}`}
                  >
                    {item.subitems}
                  </div>}
              </li>
            );
          }
        })}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </ul>
    );
  }
}

export default Accordion;

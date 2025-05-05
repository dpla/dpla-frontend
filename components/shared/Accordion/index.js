import React from "react";

import css from "./Accordion.module.scss";

import AddIcon from "components/svg/Add";
import SubtractIcon from "components/svg/Subtract";
import InformationIcon from "components/svg/Information";

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    // first save the original items
    const originalItems = props.items.map((item) => {
      return { ...item, active: true };
    });
    // activate all of them
    this.state = { items: originalItems };
  }

  componentDidMount() {
    // now collapse accordions for realz
    this.setState({ items: this.props.items });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.items !== this.props.items) {
      this.setState({
        items: this.props.items.map((item, i) => ({
          ...item,
          active: prevState.items[i].active,
        })),
      });
    }
  }

  onClickItem = (index) => {
    this.setState((prevState) => {
      const { items } = prevState;
      const newItemsArray = items.map((item, i) => {
        if (i === index) {
          return { ...item, active: !item.active };
        } else {
          return item;
        }
      });
      return { items: newItemsArray };
    });
  };

  render() {
    const facetLabel =
      "This facet is used to filter by copyright status. Click to learn more.";
    return (
      <ul>
        {this.state.items.map((item, i) => {
          if (
            (item.type === "term" && item.subitems.length) ||
            item.type === "date"
          ) {
            return (
              <li
                key={item.name}
                className={item.active ? css.active : css.inactive}
              >
                <button
                  className={css.itemHeader}
                  aria-controls={`facets_${i}`}
                  aria-expanded={item.active}
                  onClick={() => this.onClickItem(i)}
                >
                  <h3>
                    {item.name}
                    {item.name === "How Can I Use It?" && (
                      <a
                        href={"https://dp.la/about/rights-categories"}
                        title={facetLabel}
                        aria-label={facetLabel}
                      >
                        <InformationIcon className={css.informationIcon} />
                      </a>
                    )}
                  </h3>
                  {item.active && <SubtractIcon className={css.subtractIcon} />}
                  {!item.active && <AddIcon className={css.addIcon} />}
                </button>
                {item.type === "term" && (
                  <ul id={`facets_${i}`} className={css.subitems}>
                    {item.subitems.map((subitem, index) => (
                      <li key={index}>{subitem.content}</li>
                    ))}
                  </ul>
                )}
                {item.type === "date" && (
                  <div
                    id={`facets_${i}`}
                    className={`${css.subitems} ${css.date}`}
                  >
                    {item.subitems}
                  </div>
                )}
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

export default Accordion;

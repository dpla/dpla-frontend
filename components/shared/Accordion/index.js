import React from "react";
import Link from "next/link"

import css from "./Accordion.module.scss";

const addIcon = "/static/images/add.svg";
const subtractIcon = "/static/images/subtract.svg";
const informationIcon = "/static/images/information.svg";

class Accordion extends React.Component {

    constructor(props) {
        super(props);
        // first save the original items
        const originalItems = props.items.map(item => {
            return Object.assign({}, item, {active: true});
        });
        // activate all of them
        this.state = {items: originalItems};
    }


    componentDidMount() {
        // now collapse accordions for realz
        this.setState({items: this.props.items});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.items !== this.props.items) {
            this.setState({
                items: this.props.items.map((item, i) =>
                    Object.assign({}, item, {active: this.state.items[i].active})
                )
            });
        }
    }

    onClickItem = index => {
        const {items} = this.state;
        const newItemsArray = items.map((item, i) => {
            if (i === index) {
                return Object.assign({}, item, {active: !item.active});
            } else {
                return item;
            }
        });
        this.setState({items: newItemsArray});
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
                            <li key={i} className={item.active ? css.active : css.inactive}>

                                <button
                                    className={css.itemHeader}
                                    aria-controls={`facets_${i}`}
                                    aria-expanded={item.active}
                                    onClick={() => this.onClickItem(i)}
                                >
                                    <h3 className={css.accordionTitle}>{item.name}{item.name === 'How Can I Use It?' &&
                                        <a href={"https://dp.la/about/rights-categories"}
                                           title={"This facet is used to filter by copyright status. Click to learn more."}
                                           aria-label={"This facet is used to filter by copyright status. Click to learn more."}
                                        ><img
                                            id={"how-can-i-use-it-info"}
                                            src={informationIcon}
                                            alt={""}
                                            className={css.informationIcon}
                                        /></a>
                                    }</h3>
                                    {item.active &&
                                        <img
                                            src={subtractIcon}
                                            alt=""
                                            className={css.subtractIcon}
                                        />}
                                    {!item.active &&
                                        <img src={addIcon} alt="" className={css.addIcon}/>}
                                </button>
                                {item.type === "term" &&
                                    <ul id={`facets_${i}`} className={css.subitems}>
                                        {item.subitems.map((subitem, j) =>
                                            <li key={j}>{subitem.content}</li>
                                        )}
                                    </ul>}
                                {item.type === "date" &&
                                    <div
                                        id={`facets_${i}`}
                                        className={`${css.subitems} ${css.date}`}
                                    >
                                        {item.subitems}
                                    </div>}
                            </li>
                        );
                    }
                })}
            </ul>
        );
    }
}

export default Accordion;

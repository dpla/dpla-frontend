import React from "react";
import Link from "next/link";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";
import ListImage from "./ListImage";
import GaListViewWrapper from "./GaListViewWrapper";

import { joinIfArray, truncateString } from "lib";
import { UNTITLED_TEXT } from "constants/site";

import css from "./ListView.scss";

const DEFAULT_NAME = "Untitled list";

/**
 * @param description, item description object
 * @return HTML with truncated item description
 */
const ItemDescription = ({ description }) => {
  let str = joinIfArray(description);
  str = truncateString(str);
  return (
    <div className={css.itemDescription}>
      <p>{str}</p>
    </div>
  );
};

class ListView extends React.Component {
  state = {
    listName: "",
    checkboxShown: false,
    hasList: false,
    modalActive: false
  };

  closeNameForm = e => {
    this.setState({
      listName: "",
      checkboxShown: false,
      hasList: false,
      modalActive: false
    });
  };

  onNameChange = e => {
    this.setState({
      listName: e.target.value
    });
  };

  openNameForm = e => {
    e.preventDefault();
    this.setState({
      modalActive: true
    });
  };

  handleNameSubmit = e => {
    e.preventDefault();
    let tempName = this.state.listName.trim();
    if (tempName === "") {
      tempName = DEFAULT_NAME;
    }
    this.setState({
      listName: tempName,
      checkboxShown: true,
      hasList: true,
      modalActive: false
    });
  };

  render() {
    const nameCharLimit = 64;
    const { items, route } = this.props;
    const { checkboxShown, modalActive, listName, hasList } = this.state;

    const newListModal = modalActive
      ? <AriaModal
          titleText="Name your list"
          onExit={this.closeNameForm}
          initialFocus="#cancel-name"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            action=""
            className={css.nameForm}
            onSubmit={this.handleNameSubmit}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <input
              id="list-name"
              name="list-name"
              placeholder="Untitled list"
              maxLength={nameCharLimit}
              onChange={this.onNameChange}
              aria-label="Name your list"
            />
            <Button type="primary" mustSubmit={true} className={css.sendButton}>
              Send
            </Button>
            <Button
              className={css.cancelButton}
              type="ghost"
              id="cancel-name"
              onClick={e => this.closeNameForm(e)}
              name="close_button"
            >
              Cancel
            </Button>
          </form>
        </AriaModal>
      : false;

    return [
      <div className={css.listTools}>
        {hasList && <p className={css.listName}>{listName}</p>}
        <Button
          className={css.listCreate}
          type="secondary"
          onClick={e => this.openNameForm(e)}
        >
          Create list
        </Button>
        <div
          role="dialog"
          className={`${css.nameModal} ${modalActive ? css.open : ""}`}
        >
          {newListModal}
        </div>
      </div>,
      <ul className={css.listView}>
        {items.map(item =>
          <li key={item["@id"] || item.id} className={css.listItem}>
            <label
              className={`${css.checkbox} ${checkboxShown
                ? ""
                : css.collapsed}`}
              htmlFor={`checkbox-${item.id}`}
            >
              <input
                type="checkbox"
                key={`checkbox-${item.id}`}
                id={`checkbox-${item.id}`}
              />{" "}
              Add to list
            </label>
            <ListImage
              item={item}
              title={item.title}
              type={item.type}
              url={item.thumbnailUrl}
              useDefaultImage={item.useDefaultImage}
            />
            <div className={css.itemInfo}>
              <h2 className={`hover-underline ${css.itemTitle}`}>
                {/* see issue #869 for details on this hack */}
                {item.id !== "http://dp.la/api/items/#sourceResource" &&
                  <Link href={item.linkHref} as={item.linkAs}>
                    <a className={`internalItemLink`}>
                      {route.pathname.indexOf("/search") === 0 && item.title
                        ? truncateString(item.title, 150)
                        : item.title ? item.title : UNTITLED_TEXT}
                    </a>
                  </Link>}
                {/* see issue #869 for details on this hack */}
                {item.id === "http://dp.la/api/items/#sourceResource" &&
                  <span>
                    {route.pathname.indexOf("/search") === 0 && item.title
                      ? truncateString(item.title, 150)
                      : item.title ? item.title : UNTITLED_TEXT}
                  </span>}
              </h2>

              {(item.date || item.creator) &&
                <span className={css.itemAuthorAndDate}>
                  {route.pathname.indexOf("/search") === 0 &&
                    item.date &&
                    <span>{item.date.displayDate}</span>}
                  {route.pathname.indexOf("/search") === 0 &&
                    item.date &&
                    item.date.displayDate &&
                    item.creator &&
                    <span> · </span>}
                  <span>{joinIfArray(item.creator, ", ")}</span>
                </span>}
              <ItemDescription description={item.description} />
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover-underline clickThrough external ${css.itemSource}`}
              >
                {item.type === "image"
                  ? "View Full Image"
                  : item.type === "text" ? "View Full Text" : "View Full Item"}
              </a>
              {item.dataProvider &&
                <span className={`${css.itemProvider}`}>
                  &nbsp; in {item.dataProvider}
                </span>}
            </div>
          </li>
        )}
      </ul>
    ];
  }
}

export default GaListViewWrapper(ListView);

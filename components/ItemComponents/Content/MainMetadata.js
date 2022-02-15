import React from "react";

import ItemImage from "./ItemImage";
import ItemTermValuePair from "./ItemTermValuePair";

import { joinIfArray, readMyRights } from "lib";

import css from "./Content.module.scss";

/**
  * @param url, url to check for rights info
  * @return HTML with rights badge or null
  */
const RightsBadge = ({ url }) => {
  const myRights = readMyRights(url);
  return myRights
    ? <div className={css.rightsStatement}>
      <a
        href={myRights.url}
        title="Learn more about the copyright status of this item"
      >
        <img src={myRights.image} alt={myRights.description} />
      </a>
    </div>
    : null;
};

class MainMetadata extends React.Component {
  state = { isOpen: true }; // show it if js is disabled

  componentDidMount() {
    // now collapse it
    this.setState({ isOpen: false });
  }

  showMoreDescription() {
    this.setState({ isOpen: true });
  }

  renderRightsBadge = (item) => {
    /* 
    for situations where the rights are in sourceResource
    see: https://dp.la/item/7f2973c3c4429087b4874725f3bc67ad
    items should not have multiple rights but showing them in case a proper uri is present
    */

    if (item.edmRights) {
      return <RightsBadge url={item.edmRights} />
    } else if (item.rights && Array.isArray(item.rights)) {
      return <RightsBadge url={item.rights[0]} />;
    } else if (item.rights) {
      return <RightsBadge url={item.rights} />
    }
  }

  render() {
    const { isOpen } = this.state;
    const { item } = this.props;
    const maxDescriptionLength = 600; //characters
    const descriptionIsLong = item.description
      ? joinIfArray(item.description).length > maxDescriptionLength
      : false;

    return (
      <div className={css.mainMetadata}>
        <dl className={css.contentDL}>
          <div className={css.termValuePair}>
            <dt className={`${css.term} ${css.imageLabel}`}>Image</dt>
            <dd className={css.value}>
              <ItemImage
                title=""
                type={item.type}
                url={item.thumbnailUrl}
                defaultImageClass={css.defaultItemImage}
                useDefaultImage={item.useDefaultImage}
              />
              {item.sourceUrl &&
                  <a
                    rel="noopener"
                    target="_blank"
                    className={`${css.sourceLink} clickThrough external white`}
                    href={item.sourceUrl}
                  >
                    <span className={css.sourceLinkText}>
                      {item.type === "image"
                        ? "View Full Image"
                        : item.type === "text"
                          ? "View Full Text"
                          : "View Full Item"}
                    </span>
                  </a>
                }
              {this.renderRightsBadge(item)}
            </dd>
          </div>
          {item.date &&
            <div className={css.termValuePair}>
              <dt className={css.term}>
                Created Date
              </dt>
              <dd className={`${css.value} ${css.mainMetadataText}`}>
                {item.date.displayDate}
              </dd>
            </div>}
          {item.description &&
            <div className={css.termValuePair}>
              <dt className={css.term}>
                Description
              </dt>
              <dd className={`${css.value} ${css.mainMetadataText}`}>
                <div
                  id="dpla-description"
                  className={`${descriptionIsLong
                    ? css.longDescription
                    : ""} ${isOpen ? css.open : ""}`}
                >
                  {Array.isArray(item.description)
                    ? item.description.map((element, index) => {
                      return <p key={index}>{element}</p>;
                    })
                    : item.description}
                </div>
                {descriptionIsLong &&
                  <div
                    id="dpla-showmore"
                    aria-hidden="true"
                    className={`${css.showMore} ${isOpen ? css.open : ""}`}
                  >
                    <span
                      className={`link`}
                      onClick={() => this.showMoreDescription()}
                    >
                      Show full description
                    </span>
                  </div>}
              </dd>
            </div>}
          <ItemTermValuePair heading="Creator">
            {joinIfArray(item.creator, ", ")}
          </ItemTermValuePair>
        </dl>
      </div>
    );
  }
}

export default MainMetadata;

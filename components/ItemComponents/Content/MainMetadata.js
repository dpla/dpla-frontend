import React from "react";
import Link from "next/link";

import ItemImage from "./ItemImage";
import Row from "./Row";

import { joinIfArray, readMyRights } from "lib";
import { rightsURLs } from "constants/site.js";

import css from "./Content.scss";

const externalLinkIcon = "/static/images/external-link-white.svg";

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

  render() {
    const { isOpen } = this.state;
    const { item } = this.props;
    const maxDescriptionLength = 600; //characters
    const descriptionIsLong = item.description
      ? joinIfArray(item.description).length > maxDescriptionLength
      : false;

    return (
      <div className={css.mainMetadata}>
        <table className={css.contentTable}>
          <tbody>
            <tr className={css.tableRow}>
              <td className={css.tableHeadingWrapper} />
              <td className={css.tableItem}>
                <ItemImage
                  title=""
                  type={item.type}
                  url={item.thumbnailUrl}
                  defaultImageClass={css.defaultItemImage}
                  useDefaultImage={item.useDefaultImage}
                />
                {item.sourceUrl &&
                  <Link prefetch href={item.sourceUrl}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      className={`${css.sourceLink} clickThrough`}
                    >
                      <span className={css.sourceLinkText}>
                        {item.type === "image"
                          ? "View Full Image"
                          : item.type === "text"
                            ? "View Full Text"
                            : "View Full Item"}
                      </span>
                      <img
                        src={externalLinkIcon}
                        alt=""
                        className={css.externalLinkIcon}
                      />
                    </a>
                  </Link>}
                {item.edmRights && <RightsBadge url={item.edmRights} />}
                {/* 
        for situations where the rights are in sourceResource
        see: https://dp.la/item/7f2973c3c4429087b4874725f3bc67ad
        items should not have multiple rights but showing them in case a proper uri is present
         */}
                {item.rights && Array.isArray(item.rights)
                  ? item.rights.map((theRight, index) => {
                      return <RightsBadge url={theRight} key={index} />;
                    })
                  : item.rights ? <RightsBadge url={item.rights} /> : null}
              </td>
            </tr>
            {item.date &&
              <tr className={css.tableRow}>
                <td className={css.tableHeadingWrapper}>
                  <h2 className={css.tableHeading}>Created Date</h2>
                </td>
                <td className={[css.tableItem, css.mainMetadataText].join(" ")}>
                  {item.date.displayDate}
                </td>
              </tr>}
            {item.description &&
              <tr className={css.tableRow}>
                <td className={css.tableHeadingWrapper}>
                  <h2 className={css.tableHeading}>Description</h2>
                </td>
                <td className={[css.tableItem, css.mainMetadataText].join(" ")}>
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
                </td>
              </tr>}
            <Row heading="Creator">{joinIfArray(item.creator, ", ")}</Row>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MainMetadata;

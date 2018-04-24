import React from "react";
import Link from "next/link";
import Row from "./Row";

import { joinIfArray, readMyRights } from "lib";

import css from "./Content.scss";

const getItemSpatial = item =>
  Array.isArray(item.spatial) ? item.spatial[0].name : item.spatial.name;

const FacetLink = ({ facet, value, facetLabel }) =>
  <span>
    <Link
      prefetch
      href={{ pathname: "/search", query: { [facet]: `"${value}"` } }}
    >
      <a
        className="link"
        title={`Find more items with ${facetLabel || facet} "${value}"`}
      >
        {value}
      </a>
    </Link>
  </span>;

const OtherMetadata = ({ item }) =>
  <div className={css.otherMetadata}>
    <table className={css.contentTable}>
      <tbody>
        <Row heading="Partner">
          <FacetLink facet="partner" value={item.partner} />
        </Row>
        <Row heading="Contributing Institution">
          <FacetLink
            facet="provider"
            value={item.contributor}
            facetLabel="contributing institution"
          />
        </Row>
        {item.intermediateProvider &&
          <Row heading="Supporting Institution">
            <FacetLink facet="provider" value={item.intermediateProvider} />
          </Row>}
        {item.publisher &&
          <Row heading="Publisher">{joinIfArray(item.publisher)}</Row>}
        {item.subject &&
          <Row className={css.subjects} heading="Subjects">
            {item.subject.map((subj, i, subjects) =>
              <span key={i}>
                <FacetLink facet="subject" value={subj.name} />
                {i < subjects.length - 1 && <br />}
              </span>
            )}
          </Row>}
        {item.spatial &&
          <Row heading="Location">
            <FacetLink facet="location" value={getItemSpatial(item)} />
          </Row>}
        {item.type &&
          <Row heading="Type">
            <FacetLink facet="type" value={item.type} />
          </Row>}
        {item.format &&
          <Row heading="Format">
            {!Array.isArray(item.format)
              ? <div>{item.format}</div>
              : item.format.map((format, i, formats) =>
                  <div key={i}>{format}</div>
                )}
          </Row>}
        {item.language &&
          <Row heading="Language">
            <FacetLink
              facet="language"
              value={joinIfArray(item.language, ", ")}
            />
          </Row>}
        {item.sourceUrl &&
          <Row heading="URL">
            <a
              className="link clickThrough external"
              href={item.sourceUrl}
              target="_blank"
            >
              {item.sourceUrl}
            </a>
          </Row>}
        {item.edmRights &&
          readMyRights(item.edmRights) &&
          <Row heading="Standardized Rights Statement">
            {readMyRights(item.edmRights).description}
            {readMyRights(item.edmRights).description !== "" && <br />}
            <a
              href={item.edmRights}
              className="link external"
              rel="noopener noreferrer"
            >
              {item.edmRights}
            </a>
          </Row>}
        {item.rights &&
          <Row heading="Rights">
            <div
              dangerouslySetInnerHTML={{
                __html: joinIfArray(item.rights, "<br />")
              }}
            />
          </Row>}
      </tbody>
    </table>
  </div>;

export default OtherMetadata;

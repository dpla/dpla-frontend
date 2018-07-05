import React from "react";

import Row from "./Row";
import FacetLink from "./FacetLink";

import { joinIfArray, readMyRights } from "lib";

import css from "./Content.scss";

const OtherMetadata = ({ item }) =>
  <div className={css.otherMetadata}>
    <dl className={css.contentDL}>
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
              <br />
            </span>
          )}
        </Row>}
      {item.spatial &&
        <Row heading="Location">
          {Array.isArray(item.spatial)
            ? item.spatial.map((spatial, i, spatials) =>
                <span key={i}>
                  <FacetLink facet="location" value={spatial.name} /><br />
                </span>
              )
            : <FacetLink facet="location" value={item.spatial.name} />}
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
    </dl>
  </div>;

export default OtherMetadata;

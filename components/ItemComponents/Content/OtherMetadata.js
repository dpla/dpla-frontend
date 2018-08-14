import React from "react";

import ItemTermValuePair from "./ItemTermValuePair";
import FacetLink from "./FacetLink";

import { joinIfArray, readMyRights } from "lib";

import css from "./Content.scss";

const OtherMetadata = ({ item }) =>
  <div className={css.otherMetadata}>
    <dl className={css.contentDL}>
      <ItemTermValuePair heading="Partner">
        <FacetLink facet="partner" value={item.partner} />
      </ItemTermValuePair>
      <ItemTermValuePair heading="Contributing Institution">
        <FacetLink
          facet="provider"
          value={item.contributor}
          facetLabel="contributing institution"
        />
      </ItemTermValuePair>
      {item.intermediateProvider &&
        <ItemTermValuePair heading="Supporting Institution">
          <FacetLink facet="provider" value={item.intermediateProvider} />
        </ItemTermValuePair>}
      {item.publisher &&
        <ItemTermValuePair heading="Publisher">
          {joinIfArray(item.publisher)}
        </ItemTermValuePair>}
      {item.subject &&
        <ItemTermValuePair className={css.subjects} heading="Subjects">
          {item.subject.map((subj, i, subjects) =>
            <span key={i}>
              <FacetLink facet="subject" value={subj.name} />
              <br />
            </span>
          )}
        </ItemTermValuePair>}
      {item.spatial &&
        <ItemTermValuePair heading="Location">
          {Array.isArray(item.spatial)
            ? item.spatial.map((spatial, i, spatials) =>
                <span key={i}>
                  <FacetLink facet="location" value={spatial.name} /><br />
                </span>
              )
            : <FacetLink facet="location" value={item.spatial.name} />}
        </ItemTermValuePair>}
      {item.type &&
        <ItemTermValuePair heading="Type">
          <FacetLink facet="type" value={item.type} />
        </ItemTermValuePair>}
      {item.format &&
        <ItemTermValuePair heading="Format">
          {!Array.isArray(item.format)
            ? <div>{item.format}</div>
            : item.format.map((format, i, formats) =>
                <div key={i}>{format}</div>
              )}
        </ItemTermValuePair>}
      {item.language &&
        <ItemTermValuePair heading="Language">
          <FacetLink
            facet="language"
            value={joinIfArray(item.language, ", ")}
          />
        </ItemTermValuePair>}
      {item.sourceUrl &&
        <ItemTermValuePair heading="URL">
          <a
            className="link clickThrough external"
            href={item.sourceUrl}
            target="_blank"
          >
            {item.sourceUrl}
          </a>
        </ItemTermValuePair>}
      {item.edmRights &&
        readMyRights(item.edmRights) &&
        <ItemTermValuePair heading="Standardized Rights Statement">
          {readMyRights(item.edmRights).description}
          {readMyRights(item.edmRights).description !== "" && <br />}
          <a
            href={item.edmRights}
            className="link external"
            rel="noopener noreferrer"
          >
            {item.edmRights}
          </a>
        </ItemTermValuePair>}
      {item.rights &&
        <ItemTermValuePair heading="Rights">
          <div
            dangerouslySetInnerHTML={{
              __html: joinIfArray(item.rights, "<br />")
            }}
          />
        </ItemTermValuePair>}
    </dl>
  </div>;

export default OtherMetadata;

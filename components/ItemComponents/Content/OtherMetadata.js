import React from "react";

import ItemTermValuePair from "./ItemTermValuePair";
import FacetLink from "./FacetLink";

import { joinIfArray, readMyRights } from "lib";

import css from "./Content.module.scss";
import utils from "stylesheets/utils.module.scss"

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
      {item.collection &&
        <ItemTermValuePair heading="Collection">
          {Array.isArray(item.collection)
            ? item.collection.map((collection, i) =>
              <span key={i}>
                <FacetLink facet="collection" value={collection.title} /><br />
              </span>
            )
            : <FacetLink facet="collection" value={item.collection.title} />}
        </ItemTermValuePair>}
      {item.publisher &&
        <ItemTermValuePair heading="Publisher">
          {joinIfArray(item.publisher)}
        </ItemTermValuePair>}
      {item.subject &&
        <ItemTermValuePair className={css.subjects} heading="Subjects">
          {item.subject.map((subj, i) =>
            <span key={i}>
              <FacetLink facet="subject" value={subj.name} />
              <br />
            </span>
          )}
        </ItemTermValuePair>}
      {item.spatial &&
        <ItemTermValuePair heading="Location">
          {Array.isArray(item.spatial)
            ? item.spatial.map((spatial, i) =>
              <span key={i}>
                <FacetLink facet="location" value={spatial.name} /><br />
              </span>
            )
            : <FacetLink facet="location" value={item.spatial.name} />}
        </ItemTermValuePair>}
      {item.type &&
        <ItemTermValuePair heading="Type">
          {Array.isArray(item.type)
            ? item.type.map((type, i) =>
              <span key={i}>
                <FacetLink facet="type" value={type} /><br />
              </span>
            )
            : <FacetLink facet="type" value={item.type} />}
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
          >
            {item.sourceUrl}
          </a>
        </ItemTermValuePair>}
      {item.edmRights &&
        readMyRights(item.edmRights) &&
        <ItemTermValuePair heading="Standardized Rights Statement">
          {readMyRights(item.edmRights).label &&
            <a
              href={item.edmRights}
              rel="noopener noreferrer"
              className={`${css.label} ${utils.link} external`}
              target="_blank"
            >
              {readMyRights(item.edmRights).label}:
            </a>
          }
          {readMyRights(item.edmRights).description}
          {readMyRights(item.edmRights).description !== "" && <br />}
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

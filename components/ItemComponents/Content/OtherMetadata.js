import React from "react";

import ItemTermValuePair from "./ItemTermValuePair";
import FacetLink from "./FacetLink";

import { joinIfArray, readMyRights } from "lib";

import css from "./Content.module.scss";
import utils from "stylesheets/utils.module.scss";

function OtherMetadata({ item }) {
  const rights = item.edmRights ? readMyRights(item.edmRights) : null;
  return (
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
            extraQuery={{ partner: `"${item.partner}"` }}
          />
        </ItemTermValuePair>
        {item.intermediateProvider && (
          <ItemTermValuePair heading="Supporting Institution">
            <FacetLink
              facet="provider"
              value={item.intermediateProvider}
              extraQuery={{ partner: `"${item.partner}"` }}
            />
          </ItemTermValuePair>
        )}
        {item.collection && (
          <ItemTermValuePair heading="Collection">
            {Array.isArray(item.collection) ? (
              item.collection.map((collection) => (
                <span key={collection.title}>
                  <FacetLink
                    facet="collection"
                    value={collection.title}
                    extraQuery={{
                      provider: `"${item.contributor}"`,
                      partner: `"${item.partner}"`,
                    }}
                  />
                  <br />
                </span>
              ))
            ) : (
              <FacetLink
                facet="collection"
                value={item.collection.title}
                extraQuery={{
                  provider: `"${item.contributor}"`,
                  partner: `"${item.partner}"`,
                }}
              />
            )}
          </ItemTermValuePair>
        )}
        {item.publisher && (
          <ItemTermValuePair heading="Publisher">
            {joinIfArray(item.publisher)}
          </ItemTermValuePair>
        )}
        {Array.isArray(item.subject) && (
          <ItemTermValuePair className={css.subjects} heading="Subjects">
            {item.subject
              .map((subj) => subj?.name)
              .filter((name) => name)
              .map((name, i) => (
                <span key={name ?? i}>
                  <FacetLink facet="subject" value={name} />
                  <br />
                </span>
              ))}
          </ItemTermValuePair>
        )}
        {item.spatial && (
          <ItemTermValuePair heading="Location">
            {Array.isArray(item.spatial) ? (
              item.spatial
                .map((spatial) => spatial?.name)
                .filter((name) => name)
                .map((name, i) => (
                  <span key={name ?? i}>
                    <FacetLink facet="location" value={name} />
                    <br />
                  </span>
                ))
            ) : (
              item.spatial?.name && (
                <FacetLink facet="location" value={item.spatial.name} />
              )
            )}
          </ItemTermValuePair>
        )}
        {item.type && (
          <ItemTermValuePair heading="Type">
            {Array.isArray(item.type) ? (
              item.type.map((type) => (
                <span key={type}>
                  <FacetLink facet="type" value={type} />
                  <br />
                </span>
              ))
            ) : (
              <FacetLink facet="type" value={item.type} />
            )}
          </ItemTermValuePair>
        )}
        {item.format && (
          <ItemTermValuePair heading="Format">
            {!Array.isArray(item.format) ? (
              <div>{item.format}</div>
            ) : (
              item.format.map((format) => <div key={format}>{format}</div>)
            )}
          </ItemTermValuePair>
        )}
        {item.language && (
          <ItemTermValuePair heading="Language">
            <FacetLink
              facet="language"
              value={joinIfArray(item.language, ", ")}
            />
          </ItemTermValuePair>
        )}
        {item.sourceUrl && (
          <ItemTermValuePair heading="URL">
            <a className="link clickThrough external" href={item.sourceUrl}>
              {item.sourceUrl}
            </a>
          </ItemTermValuePair>
        )}
        {rights && (
          <ItemTermValuePair heading="Standardized Rights Statement">
            {rights.label && (
              <a
                href={item.edmRights}
                rel="noopener noreferrer"
                className={`${css.label} ${utils.link} external`}
                target="_blank"
              >
                {rights.label}:
              </a>
            )}
            {rights.description}
            {rights.description !== "" && <br />}
          </ItemTermValuePair>
        )}
        {item.rights && (
          <ItemTermValuePair heading="Rights">
            <div
              dangerouslySetInnerHTML={{
                __html: joinIfArray(item.rights, "<br />"),
              }}
            />
          </ItemTermValuePair>
        )}
      </dl>
    </div>
  );
}

export default OtherMetadata;

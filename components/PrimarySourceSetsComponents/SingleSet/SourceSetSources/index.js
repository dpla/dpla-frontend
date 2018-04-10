import React from "react";

import Link from "next/link";

import { removeQueryParams, extractSourceId } from "utilFunctions";

import utils from "stylesheets/utils.scss";

import { stylesheet, classNames } from "./SourceSetSources.css";

const markdownit = require("markdown-it")({ html: true });

const SourceSetSources = ({ route, sources }) =>
  <div
    role="tabpanel"
    aria-labelledby="tab-sourceset"
    className={classNames.wrapper}
  >
    <ul className={[classNames.sourceSetSources, utils.container].join(" ")}>
      {sources.map(({ name, thumbnailUrl, useDefaultImage }, i) => {
        const sourceId = extractSourceId(sources[i]["@id"]);
        return (
          <li className={classNames.set} key={i}>
            <Link
              key={name}
              prefetch
              as={{
                pathname: `/primary-source-sets/${route.query
                  .set}/sources/${sourceId}`,
                query: removeQueryParams(route.query, ["source", "set"])
              }}
              href={{
                pathname: `/primary-source-sets/set/sources`,
                query: Object.assign({}, route.query, {
                  source: sourceId,
                  set: route.query.set
                })
              }}
            >
              <a>
                <div
                  className={`${classNames.imageWrapper} ${useDefaultImage
                    ? classNames.defaultImageWrapper
                    : ""}`}
                >
                  <img alt="" src={thumbnailUrl} className={classNames.image} />
                </div>
                <div
                  className={classNames.title}
                  dangerouslySetInnerHTML={{
                    __html: markdownit.renderInline(name)
                  }}
                />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceSetSources;

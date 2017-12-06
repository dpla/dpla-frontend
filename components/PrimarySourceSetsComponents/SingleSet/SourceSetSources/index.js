import React from "react";
const markdownit = require("markdown-it")({ html: true });

import Link from "next/link";

import { stylesheet, classNames } from "./SourceSetSources.css";
import { classNames as utilClassNames } from "css/utils.css";
import removeQueryParams from "/utilFunctions/removeQueryParams";
import extractSourceId from "/utilFunctions/extractSourceId";

const { container } = utilClassNames;

const SourceSetSources = ({ route, sources }) =>
  <div className={classNames.wrapper}>
    <h2 className="invisible">Source Set</h2>
    <div className={[classNames.sourceSetSources, container].join(" ")}>
      {sources.map(({ name, thumbnailUrl, useDefaultImage }, i) => {
        const sourceId = extractSourceId(sources[i]["@id"]);
        return (
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
            <a className={classNames.set}>
              <div
                className={`${classNames.imageWrapper} ${useDefaultImage
                  ? classNames.defaultImageWrapper
                  : ""}`}
              >
                <img
                  alt={name}
                  src={thumbnailUrl}
                  className={classNames.image}
                />
              </div>
              <div
                className={classNames.title}
                dangerouslySetInnerHTML={{
                  __html: markdownit.renderInline(name)
                }}
              />
            </a>
          </Link>
        );
      })}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceSetSources;

import React from "react";
import { markdown } from "markdown";

import Link from "next/link";

import { stylesheet, classNames } from "./SourceSetSources.css";
import { classNames as utilClassNames } from "css/utils.css";
import removeQueryParams from "/utilFunctions/removeQueryParams";

const { module } = utilClassNames;

const SourceSetSources = ({ route, sources }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceSetSources, module].join(" ")}>
      {sources.map(({ name, thumbnailUrl }, i) => {
        const sourceId = /https:\/\/dp\.la\/primary-source-sets\/sources\/(\d+)/.exec(
          sources[i]["@id"]
        )[1];
        return (
          <Link
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
              <div className={classNames.imageWrapper}>
                <img
                  alt={name}
                  src={thumbnailUrl}
                  className={classNames.image}
                />
              </div>
              <div
                className={classNames.title}
                dangerouslySetInnerHTML={{ __html: markdown.toHTML(name) }}
              />
            </a>
          </Link>
        );
      })}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceSetSources;

import React from "react";
import ReactMarkdown from "react-markdown";

import Link from "next/link";

import { removeQueryParams, extractSourceId } from "utilFunctions";

import utils from "stylesheets/utils.scss";
import css from "./SourceSetSources.scss";

const SourceSetSources = ({ route, sources }) =>
  <div role="tabpanel" aria-labelledby="tab-sourceset" className={css.wrapper}>
    <ul className={[css.sourceSetSources, utils.container].join(" ")}>
      {sources.map(({ name, thumbnailUrl, useDefaultImage }, i) => {
        const sourceId = extractSourceId(sources[i]["@id"]);
        return (
          <li className={css.set} key={i}>
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
                  className={`${css.imageWrapper} ${useDefaultImage
                    ? css.defaultImageWrapper
                    : ""}`}
                >
                  <img alt="" src={thumbnailUrl} className={css.image} />
                </div>
                <ReactMarkdown
                  className={css.title}
                  source={name}
                  allowedTypes={["emphasis"]}
                  unwrapDisallowed
                />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>;

export default SourceSetSources;

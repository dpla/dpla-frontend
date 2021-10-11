import React from "react";
import { withRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import Link from "next/link";

import { removeQueryParams, extractSourceId } from "lib";

import css from "./SourceSetSources.module.scss";
import utils from "stylesheets/utils.module.scss"

const SourceSetSources = ({ router, sources }) =>
  <div role="tabpanel" aria-labelledby="tab-sourceset" className={css.wrapper}>
    <ul className={[css.sourceSetSources, utils.container].join(" ")}>
      {sources.map(({ name, thumbnailUrl, useDefaultImage }, i) => {
        const sourceId = extractSourceId(sources[i]["@id"]);
        return (
          <li className={css.set} key={i}>
            <Link
              key={name}
              as={{
                pathname: `/primary-source-sets/${router.query
                  .set}/sources/${sourceId}`,
                query: removeQueryParams(router.query, ["source", "set"])
              }}
              href={{
                pathname: `/primary-source-sets/set/sources`,
                query: Object.assign({}, router.query, {
                  source: sourceId,
                  set: router.query.set
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
                  allowedTypes={["emphasis", "text"]}
                  unwrapDisallowed
                />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>;

export default withRouter(SourceSetSources);

import React from "react";
import {useRouter} from "next/router";
import Markdown from "react-markdown";

import Link from "next/link";

import {removeQueryParams, extractSourceId} from "lib";

import css from "./SourceSetSources.module.scss";
import utils from "stylesheets/utils.module.scss"

function SourceSetSources({sources}) {
  const router = useRouter();
  const sourcesChildren = sources.map(({name, thumbnailUrl, useDefaultImage}, i) => {
    const sourceId = extractSourceId(sources[i]["@id"]);
    return (
      <li className={css.set} key={name}>
        <Link
          as={{
            pathname: `/primary-source-sets/${router.query.set}/sources/${sourceId}`,
            query: removeQueryParams(router.query, ["source", "set"])
          }}
          href={{
            pathname: `/primary-source-sets/set/sources`, query: {
              ...router.query,
              source: sourceId,
              set: router.query.set
            }
          }}
        >
          <div
            className={`${css.imageWrapper} ${useDefaultImage ? css.defaultImageWrapper : ""}`}
          >
            <img alt="" src={thumbnailUrl} className={css.image}/>
          </div>
          <Markdown
            className={css.title}
            allowedElements={["emphasis", "text"]}
            unwrapDisallowed
          >{name}</Markdown>
        </Link>
      </li>);
  });

  return (
    <div role="tabpanel" aria-labelledby="tab-sourceset" className={css.wrapper}>
      <ul className={`${css.sourceSetSources} ${utils.container}`}>
        {sourcesChildren}
      </ul>
    </div>
  );
}

export default SourceSetSources;

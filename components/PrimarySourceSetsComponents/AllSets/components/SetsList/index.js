import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { extractSourceSetSlug, removeQueryParams } from "lib/";
import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";

import css from "./SetsList.scss";

const SetsList = ({ sets, route }) =>
  <div className={`${css.setsWrapper} site-max-width`}>
    <ul className="row">
      {sets.itemListElement.map(set =>
        <li className={`${css.itemWrapper} col-xs-6 col-md-4`} key={set.name}>
          <div className={css.item}>
            <Link
              prefetch
              href={{
                pathname: "/primary-source-sets/set",
                query: Object.assign(
                  {},
                  removeQueryParams(route.query, ["subject", "timePeriod"]),
                  {
                    set: extractSourceSetSlug(set["@id"])
                  }
                )
              }}
              as={{
                pathname: `/primary-source-sets/${extractSourceSetSlug(
                  set["@id"]
                )}`,
                query: removeQueryParams(route.query)
              }}
            >
              <a aria-hidden>
                <img
                  alt=""
                  src={set.repImageUrl || set.thumbnailUrl}
                  className={css.image}
                />
              </a>
            </Link>
            <div className={css.itemContent}>
              <Link
                prefetch
                href={`/primary-source-sets/set?set=${extractSourceSetSlug(
                  set["@id"]
                )}`}
                as={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
              >
                <a className={`${css.title} hover-underline`} title={set.name}>
                  <ReactMarkdown
                    source={set.name}
                    allowedTypes={["emphasis", "text"]}
                    unwrapDisallowed
                  />
                </a>
              </Link>
              <ul className={css.timePeriod}>
                {set.about
                  .filter(
                    ({ disambiguatingDescription }) =>
                      disambiguatingDescription === "Time Period"
                  )
                  .map((tag, i, tags) =>
                    <li className={css.tag} key={`${tag}—${i}`}>
                      <Link
                        prefetch
                        href={{
                          pathname: "/primary-source-sets",
                          query: Object.assign({}, route.query, {
                            timePeriod: mapTimePeriodNameToSlug(tag.name)
                          })
                        }}
                      >
                        <a className="hover-underline" title={tag.name}>
                          {tag.name}
                        </a>
                      </Link>
                      {i < tags.length - 1 && <span>, </span>}
                    </li>
                  )}
              </ul>
              <ul className={css.tags}>
                {set.about
                  .filter(
                    ({ disambiguatingDescription }) =>
                      disambiguatingDescription === "Subject"
                  )
                  .map((tag, i, tags) =>
                    <li key={tag.name} className={css.tag}>
                      <Link
                        prefetch
                        href={{
                          pathname: "/primary-source-sets",
                          query: Object.assign({}, route.query, {
                            subject: mapSubjectNameToSlug(tag.name)
                          })
                        }}
                      >
                        <a className="hover-underline" title={tag.name}>
                          {tag.name.replace("&amp;", "&")}
                        </a>
                      </Link>
                      {i < tags.length - 1 && <span>, </span>}
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </li>
      )}
    </ul>
  </div>;

export default SetsList;

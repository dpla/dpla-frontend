import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { extractSourceSetSlug, removeQueryParams } from "utilFunctions/";
import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";

import { classNames, stylesheet } from "./SetsList.css";

const SetsList = ({ sets, route }) =>
  <div className={`${classNames.setsWrapper} site-max-width`}>
    <ul className="row">
      {sets.itemListElement.map(set =>
        <li
          className={`${classNames.itemWrapper} col-xs-6 col-md-4`}
          key={set.name}
        >
          <div className={classNames.item}>
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
                  className={classNames.image}
                />
              </a>
            </Link>
            <div className={classNames.itemContent}>
              <Link
                prefetch
                href={`/primary-source-sets/set?set=${extractSourceSetSlug(
                  set["@id"]
                )}`}
                as={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
              >
                <a
                  className={`${classNames.title} hover-underline`}
                  title={set.name}
                >
                  <ReactMarkdown
                    source={set.name}
                    allowedTypes={["emphasis"]}
                    unwrapDisallowed
                  />
                </a>
              </Link>
              <ul className={classNames.timePeriod}>
                {set.about
                  .filter(
                    ({ disambiguatingDescription }) =>
                      disambiguatingDescription === "Time Period"
                  )
                  .map((tag, i, tags) =>
                    <li className={classNames.tag} key={`${tag}—${i}`}>
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
              <ul className={classNames.tags}>
                {set.about
                  .filter(
                    ({ disambiguatingDescription }) =>
                      disambiguatingDescription === "Subject"
                  )
                  .map((tag, i, tags) =>
                    <li key={tag.name} className={classNames.tag}>
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
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SetsList;

import React from "react";
import { markdown } from "markdown";
import Link from "next/link";

import { classNames, stylesheet } from "./Sets.css";
import { classNames as utilClassNames } from "css/utils.css";
import extractSourceSetSlug from "utilFunctions/extractSourceSetSlug";
import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "../Filters/options";

const { module } = utilClassNames;

const Sets = ({ sets, route }) =>
  <div className={[module, classNames.setsWrapper].join(" ")}>
    <ul className={classNames.sets}>
      {sets.itemListElement.map(set =>
        <li className={classNames.set}>
          <Link
            href={{
              pathname: "/primary-source-sets/set",
              query: Object.assign({}, route.query, {
                set: extractSourceSetSlug(set["@id"])
              })
            }}
            as={{
              pathname: `/primary-source-sets/${extractSourceSetSlug(
                set["@id"]
              )}`,
              query: route.query
            }}
          >
            <a>
              <img
                alt={set.name}
                src={set.thumbnailUrl}
                className={classNames.image}
              />
            </a>
          </Link>
          <p className={classNames.itemCount}>
            {`${set.numberOfItems} Items`}
          </p>
          <Link
            href={`/primary-source-sets/set?set=${extractSourceSetSlug(
              set["@id"]
            )}`}
            as={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
          >
            <a className={classNames.title}>
              <div
                dangerouslySetInnerHTML={{ __html: markdown.toHTML(set.name) }}
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
                <li className={classNames.tag}>
                  <Link
                    href={{
                      pathname: "/primary-source-sets",
                      query: { timePeriod: mapTimePeriodNameToSlug[tag.name] }
                    }}
                  >
                    <a>
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
                <li className={classNames.tag}>
                  <Link
                    href={{
                      pathname: "/primary-source-sets",
                      query: { subject: mapSubjectNameToSlug[tag.name] }
                    }}
                  >
                    <a>
                      {tag.name.replace("&amp;", "&")}
                    </a>
                  </Link>
                  {i < tags.length - 1 && <span>, </span>}
                </li>
              )}
          </ul>
        </li>
      )}
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sets;

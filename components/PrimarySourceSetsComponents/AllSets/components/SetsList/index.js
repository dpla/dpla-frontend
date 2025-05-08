import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Markdown from "react-markdown";

import { extractSourceSetSlug, removeQueryParams } from "lib";

import css from "./SetsList.module.scss";
import utils from "stylesheets/utils.module.scss";
import {
  mapSubjectNameToSlug,
  mapTimePeriodNameToSlug,
} from "constants/primarySourceSets";

function SetsList({ sets }) {
  const router = useRouter();
  return (
    <div className={`${css.setsWrapper} ${utils.siteMaxWidth}`}>
      <ul className={utils.row}>
        {sets.itemListElement.map((set) => (
          <li
            className={`${css.itemWrapper} ${utils.colXs6} ${utils.colMd4}`}
            key={set.name}
          >
            <div className={css.item}>
              <Link
                href={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
              >
                <img
                  alt=""
                  src={set.repImageUrl || set.thumbnailUrl}
                  className={css.image}
                />
              </Link>
              <div className={css.itemContent}>
                <Link
                  href={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
                  className={`${css.title} ${utils.hoverUnderline}`}
                  title={set.name}
                >
                  <Markdown
                    allowedElements={["emphasis", "text"]}
                    unwrapDisallowed
                  >
                    {set.name}
                  </Markdown>
                </Link>
                <ul className={css.timePeriod}>
                  {set.about
                    .filter(
                      ({ disambiguatingDescription }) =>
                        disambiguatingDescription === "Time Period",
                    )
                    .map((tag, i, tags) => (
                      <li className={css.tag} key={`${tag}—${i}`}>
                        <Link
                          href={{
                            pathname: "/primary-source-sets",
                            query: Object.assign({}, router.query, {
                              timePeriod: mapTimePeriodNameToSlug(tag.name),
                            }),
                          }}
                          className="hover-underline"
                          title={tag.name}
                        >
                          {tag.name}
                        </Link>
                        {i < tags.length - 1 && <span>, </span>}
                      </li>
                    ))}
                </ul>
                <ul className={css.tags}>
                  {set.about
                    .filter(
                      ({ disambiguatingDescription }) =>
                        disambiguatingDescription === "Subject",
                    )
                    .map((tag, i, tags) => (
                      <li key={tag.name} className={css.tag}>
                        <Link
                          href={{
                            pathname: "/primary-source-sets",
                            query: {
                              ...router.query,
                              subject: mapSubjectNameToSlug(tag.name),
                            },
                          }}
                          className="hover-underline"
                          title={tag.name}
                        >
                          {tag.name.replace("&amp;", "&")}
                        </Link>
                        {i < tags.length - 1 && <span>, </span>}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SetsList;

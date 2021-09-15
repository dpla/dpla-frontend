import React from "react";
import Link from "next/link";
import { withRouter } from 'next/router'

import css from "./ExhibitionsList.module.scss";

const Exhibition = withRouter(({ exhibition, router }) => {
  return exhibition
    ? <li>
        <Link
          href={{
            pathname: "/exhibitions/exhibition",
            query: Object.assign({}, router.query, {
              exhibition: exhibition.slug
            })
          }}
          as={{
            pathname: `/exhibitions/${exhibition.slug}`,
            query: router.query
          }}
        >
          <a className={` ${css.exhibition}`}>
            {exhibition.new &&
              !featured &&
              <div className={css.newBanner}>
                New
              </div>}
            <img
              alt=""
              className={css.exhibitionImage}
              src={exhibition.thumbnailUrl}
            />

            <div className={css.exhibitionText}>
              <h2 id={exhibition.slug} className={css.title}>
                {exhibition.title}
              </h2>
            </div>
          </a>
        </Link>
      </li>
    : null;
});

const ExhibitionsList = ({ exhibitions, router }) =>
  <div className={`${css.wrapper} ${utils.siteMaxWidth}`}>
    <div className={css.row}>
      <ul className={css.exhibitionList}>
        {exhibitions.map((exhibition, index) =>
          <Exhibition

            exhibition={exhibition}
            key={exhibition.slug}
          />
        )}
      </ul>
    </div>
  </div>;

export default withRouter(ExhibitionsList);

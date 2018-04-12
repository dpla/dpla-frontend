import React from "react";
import Link from "next/link";

import css from "./ExhibitionsList.scss";

const Exhibition = ({ exhibition, route }) => {
  return exhibition
    ? <li>
        <Link
          prefetch
          href={{
            pathname: "/exhibitions/exhibition",
            query: Object.assign({}, route.query, {
              exhibition: exhibition.slug
            })
          }}
          as={{
            pathname: `/exhibitions/${exhibition.slug}`,
            query: route.query
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
};

const ExhibitionsList = ({ exhibitions, route }) =>
  <div className={`${css.wrapper} site-max-width`}>
    <div className={css.row}>
      <ul className={css.exhibitionList}>
        {exhibitions.map((exhibition, index) =>
          <Exhibition
            route={route}
            exhibition={exhibition}
            key={exhibition.slug}
          />
        )}
      </ul>
    </div>
  </div>;

export default ExhibitionsList;

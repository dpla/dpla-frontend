import React from "react";
import Link from "next/link";

import css from "./ExhibitionsList.module.scss";
import utils from "stylesheets/utils.module.scss"

const Exhibition = ({exhibition: exhibition }) => {
  return exhibition
    ? <li>
        <Link
          href={`/exhibitions/${exhibition.slug}`}
          className={` ${css.exhibition}`}
        >
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
        </Link>
      </li>
    : <></>;
};

const ExhibitionsList = ({ exhibitions }) =>
  <div className={`${css.wrapper} ${utils.siteMaxWidth}`}>
    <div className={css.row}>
      <ul className={css.exhibitionList}>
        {exhibitions.map((exhibition) =>
          <Exhibition
            exhibition={exhibition}
            key={exhibition.slug}
          />
        )}
      </ul>
    </div>
  </div>;

export default ExhibitionsList;

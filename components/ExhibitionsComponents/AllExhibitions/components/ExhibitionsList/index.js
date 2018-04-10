import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ExhibitionsList.css";

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
          <a className={` ${classNames.exhibition}`}>
            {exhibition.new &&
              !featured &&
              <div className={classNames.newBanner}>
                New
              </div>}
            <img
              alt=""
              className={classNames.exhibitionImage}
              src={exhibition.thumbnailUrl}
            />

            <div className={classNames.exhibitionText}>
              <h2 id={exhibition.slug} className={classNames.title}>
                {exhibition.title}
              </h2>
            </div>
          </a>
        </Link>
      </li>
    : null;
};

const ExhibitionsList = ({ exhibitions, route }) =>
  <div className={`${classNames.wrapper} site-max-width`}>
    <div className={classNames.row}>
      <ul className={classNames.exhibitionList}>
        {exhibitions.map((exhibition, index) =>
          <Exhibition
            route={route}
            exhibition={exhibition}
            key={exhibition.slug}
          />
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ExhibitionsList;

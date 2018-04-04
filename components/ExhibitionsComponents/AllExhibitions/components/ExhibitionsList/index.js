import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ExhibitionsList.css";

const Exhibition = ({ exhibition, route, featured }) => {
  return exhibition
    ? <Link
        prefetch
        href={{
          pathname: "/exhibitions/exhibition",
          query: Object.assign({}, route.query, { exhibition: exhibition.slug })
        }}
        as={{ pathname: `/exhibitions/${exhibition.slug}`, query: route.query }}
      >
        <a>
          {featured &&
            <div className={classNames.featuredBanner}>
              Featured
            </div>}
          {exhibition.new &&
            !featured &&
            <div className={classNames.newBanner}>
              New
            </div>}
          <div
            className={classNames.exhibitionContent}
            aria-labelledby={exhibition.slug}
          >
            <img
              alt=""
              className={classNames.exhibitionImage}
              src={exhibition.thumbnailUrl}
            />
            <div className={classNames.exhibitionText}>
              <span id={exhibition.slug} className={classNames.title}>
                {exhibition.title}
              </span>
            </div>
          </div>
        </a>
      </Link>
    : null;
};

const ExhibitionsList = ({ exhibitions, route }) =>
  <div className={`${classNames.wrapper} site-max-width`}>
    <div className={classNames.row}>
      <ul className={classNames.exhibitionList}>
        {exhibitions.map((exhibition, index) =>
          <li key={exhibition.slug} className={classNames.exhibition}>
            <Exhibition
              route={route}
              exhibition={exhibition}
              featured={index > 0 ? false : true}
            />
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ExhibitionsList;

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
        as={{
          pathname: `/exhibitions/${exhibition.slug}`,
          query: route.query
        }}
      >
        <a className={classNames.exhibition}>
          {featured &&
            <div className={classNames.featuredBanner}>
              Featured
            </div>}
          {exhibition.new &&
            !featured &&
            <div className={classNames.newBanner}>New</div>}
          <div
            className={classNames.exhibitionContent}
            aria-labelledby={exhibition.slug}
          >
            <img
              alt=""
              className={classNames.exhibitionImage}
              src={exhibition.thumbnailUrl}
            />
            <div className={classNames.overlay}>
              <span id={exhibition.slug} className={classNames.title}>
                {exhibition.title}
              </span>
            </div>
          </div>
        </a>
      </Link>
    : null;
};

const ThreeUp = ({ exhibitions, route }) =>
  <div className={classNames.threeUp}>
    <div className={classNames.firstExhibition}>
      <Exhibition route={route} exhibition={exhibitions[0]} featured={true} />
    </div>
    <div className={classNames.twoVertical}>
      <Exhibition route={route} exhibition={exhibitions[1]} />
      <Exhibition route={route} exhibition={exhibitions[2]} />
    </div>
  </div>;

const ExhibitionsList = ({ exhibitions, route }) =>
  <div className={`${classNames.wrapper} site-max-width`}>
    <div className={classNames.row}>
      <div className={classNames.exhibitionList}>
        {exhibitions.map((exhibition, index) =>
          <Exhibition
            route={route}
            exhibition={exhibition}
            key={exhibition.slug}
            featured={index > 0 ? false : true}
          />
        )}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ExhibitionsList;

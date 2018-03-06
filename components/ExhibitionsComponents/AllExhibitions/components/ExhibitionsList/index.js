import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ExhibitionsList.css";

const Exhibition = ({ exhibition, route, featured }) => {
  return exhibition
    ? <Link
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
            <div className={classNames.overlay}>
              <span id={exhibition.slug} className={classNames.title}>
                {exhibition.title}
              </span>
            </div>
            <div
              aria-hidden="true"
              className={classNames.exhibitionImage}
              style={{
                backgroundImage: `url("${exhibition.thumbnailUrl}")`,
                backgroundPosition: `50% 50%`
              }}
            />
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
      <ThreeUp route={route} exhibitions={exhibitions.slice(0, 3)} />
      <div className={classNames.remainingExhibitions}>
        {exhibitions
          .slice(3)
          .map(exhibition =>
            <Exhibition
              route={route}
              exhibition={exhibition}
              key={exhibition.slug}
            />
          )}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ExhibitionsList;

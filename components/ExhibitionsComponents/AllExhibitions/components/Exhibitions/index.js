import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Exhibitions.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Exhibition = ({ className, exhibition, route }) =>
  <Link
    href={{
      pathname: "/exhibitions/exhibition",
      query: Object.assign({}, route.query, { exhibition: exhibition.slug })
    }}
    as={{
      pathname: `/exhibitions/${exhibition.slug}`,
      query: route.query
    }}
  >
    <a className={[classNames.exhibition, classNames[className]].join(" ")}>
      <img
        className={classNames.image}
        alt={exhibition.title}
        src={exhibition.image}
      />
      <div className={classNames.overlay}>
        <p className={classNames.exhibitionTitle}>{exhibition.title}</p>
      </div>
    </a>
  </Link>;

const ThreeUp = ({ exhibitions, route }) =>
  <div className={classNames.threeUp}>
    <Exhibition
      route={route}
      className="featured"
      exhibition={exhibitions[0]}
    />
    <div className={classNames.twoVertical}>
      <Exhibition route={route} exhibition={exhibitions[1]} />
      <Exhibition route={route} exhibition={exhibitions[2]} />
    </div>
  </div>;

const Exhibitions = ({ exhibitions, route }) =>
  <div className={[module, classNames.exhibitionsWrapper].join(" ")}>
    <ThreeUp route={route} exhibitions={exhibitions.slice(0, 3)} />
    <div className={classNames.remainingExhibitions}>
      {exhibitions
        .slice(3)
        .map(exhibition =>
          <Exhibition route={route} exhibition={exhibition} />
        )}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Exhibitions;

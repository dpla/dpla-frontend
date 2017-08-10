import React from "react";
// import Link from "next/divnk";

import { classNames, stylesheet } from "./Exhibitions.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Exhibition = ({ className, exhibition }) =>
  <div className={[classNames.exhibition, classNames[className]].join(" ")}>
    <img
      className={classNames.image}
      alt={exhibition.title}
      src={exhibition.image}
    />
    <div className={classNames.overlay}>
      <p className={classNames.exhibitionTitle}>{exhibition.title}</p>
    </div>
  </div>;

const ThreeUp = ({ exhibitions }) =>
  <div className={classNames.threeUp}>
    <Exhibition className="featured" exhibition={exhibitions[0]} />
    <div className={classNames.twoVertical}>
      <Exhibition exhibition={exhibitions[1]} />
      <Exhibition exhibition={exhibitions[2]} />
    </div>
  </div>;

const Exhibitions = ({ exhibitions, route }) =>
  <div className={[module, classNames.exhibitionsWrapper].join(" ")}>
    <ThreeUp exhibitions={exhibitions.slice(0, 3)} />
    <div className={classNames.remainingExhibitions}>
      {exhibitions
        .slice(3)
        .map(exhibition => <Exhibition exhibition={exhibition} />)}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Exhibitions;

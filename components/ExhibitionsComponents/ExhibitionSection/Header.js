import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

const closeIcon = "/static/images/close-white.svg";

const Header = ({ title, route }) =>
  <div className={[classNames.header, container].join(" ")}>
    <div className={classNames.exhibitionsLinkAndTitle}>
      <Link prefetch href="/exhibitions">
        <a className={classNames.exhibitionsLink}>Exhibitions</a>
      </Link>
      <h1 className={classNames.exhibitionTitle}>
        {title}
      </h1>
    </div>
    <Link
      prefetch
      href={`/exhibitions/exhibition?exhibition=${route.query.exhibition}`}
      as={`/exhibitions/${route.query.exhibition}`}
    >
      <a className={classNames.closeExhibition}>
        <img src={closeIcon} alt="" className={classNames.closeIcon} />
        <span>Close Exhibition</span>
      </a>
    </Link>
  </div>;

export default Header;

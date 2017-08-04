import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./NavArrows.css";

const chevron = "/static/images/chevron-thick-orange.svg";

const NavArrows = ({ prevUrl, nextUrl }) =>
  <div className={classNames.navLinks}>
    <Link to={prevUrl} className={classNames.prevLink}>
      <img src={chevron} alt="" className={classNames.prevArrow} />
      <span>Previous Section</span>
    </Link>
    <Link to={nextUrl}>
      <span>Next Section</span>
      <img src={chevron} alt="" className={classNames.nextArrow} />
    </Link>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default NavArrows;

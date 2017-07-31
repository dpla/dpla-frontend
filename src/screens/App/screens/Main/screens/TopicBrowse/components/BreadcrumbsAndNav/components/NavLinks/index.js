import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavArrows.css";

import chevron from "../../../../../../../../../../images/chevron-thick-orange.svg";

const NavArrows = ({ prevUrl, nextUrl }) =>
  <div className={styles.navLinks}>
    <Link to={prevUrl} className={styles.prevLink}>
      <img src={chevron} alt="" className={styles.prevArrow} />
      <span>Previous Section</span>
    </Link>
    <Link to={nextUrl}>
      <span>Next Section</span>
      <img src={chevron} alt="" className={styles.nextArrow} />
    </Link>
  </div>;

export default NavArrows;

import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.css";

const Header = () =>
  <div className={styles.header}>
    <div className={styles.linksContainer}>
      <div className={styles.mainLinks}>
        <Link to="/">Home</Link>
        <Link to="">Exhibitions</Link>
        <Link to="/primary-source-sets">Primary Source Sets</Link>
        <Link to="/browse-by-topic">Browse</Link>
      </div>
      <span className={styles.divider} />
      <div className={styles.secondaryLinks}>
        <Link to="">About Us</Link>
        <Link to="">News</Link>
        <Link to="">Pro Community</Link>
      </div>
      <button className={styles.login}>Log In</button>
    </div>
  </div>;

export default Header;

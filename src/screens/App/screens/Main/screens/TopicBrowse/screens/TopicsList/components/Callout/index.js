import React from "react";
import { Link } from "react-router-dom";

import styles from "./Callout.css";

const Callout = ({ topics }) =>
  <div className={styles.calloutWrapper}>
    <div className={styles.callout}>
      <div>
        <h2 className={styles.header}>Enjoying these topics?</h2>
        <p className={styles.text}>
          You might also like our Online Exhibitions.
        </p>
      </div>
      <Link to="/online-exhibitions" className={styles.link}>
        Visit Online Exhibitions
      </Link>
    </div>
  </div>;

export default Callout;

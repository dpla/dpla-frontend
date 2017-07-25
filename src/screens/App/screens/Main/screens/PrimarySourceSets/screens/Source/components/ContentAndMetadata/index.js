import React from "react";
import { Link } from "react-router-dom";

import styles from "./ContentAndMetadata.css";
import { module } from "../../../../../../../../css/utils.css";

import link from "../../../../../../../../../../images/link.svg";
import external from "../../../../../../../../../../images/external-link-black.svg";

const ContentAndMetadata = ({ source }) =>
  <div className={styles.wrapper}>
    <div className={[styles.contentAndMetadata, module].join(" ")}>
      <div className={styles.content}>
        <h2 className={styles.contentHeader}>
          {source.title}
        </h2>
        <div className={styles.imageWrapper}>
          <img src={source.img} alt={source.title} className={styles.image} />
        </div>
        <p className={styles.description}>
          {source.description}
        </p>
      </div>
      <div className={styles.metadata}>
        <div className={styles.sourceInfo}>
          <button className={styles.button}>Cite this item</button>
          <button className={styles.button}>Download</button>
          <p className={styles.courtesyOf}>{source.courtesyOf}</p>
          <div className={styles.copyrightInfo}>
            <img src="" alt="" className={styles.copyrightIcon} />
            <p className={styles.copyrightText}>{source.copyright}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.linkWrapper}>
            <Link to={source.itemSource} className={styles.sourceLink}>
              <img alt="" src={link} className={styles.linkIcon} />
              <span className={styles.linkText}>Item source</span>
            </Link>
          </div>
          <div className={styles.linkWrapper}>
            <Link to={source.dplaRecord} className={styles.sourceLink}>
              <img alt="" src={external} className={styles.externalIcon} />
              <span className={styles.linkText}>DPLA record</span>
            </Link>
          </div>
        </div>
        <div className={styles.tipsForStudents}>
          <h3 className={styles.tipsForStudentsHeader}>Tips for Students</h3>
          <p className={styles.tipDirections}>For this source, consider:</p>
          <ul className={styles.tips}>
            <li className={styles.tip}>the author's point of view</li>
            <li className={styles.tip}>the author's purpose</li>
            <li className={styles.tip}>historical context</li>
            <li className={styles.tip}>audience</li>
          </ul>
        </div>
      </div>
    </div>
  </div>;

export default ContentAndMetadata;

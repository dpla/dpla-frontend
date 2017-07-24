import React from "react";
import { Link } from "react-router-dom";

import styles from "./FromTheBlog.css";

import smallChevron from "../../../../../../images/chevron-thick-orange.svg";

const mockPosts = [
  {
    headline: "Historypin wins Knight News Challenge award for…",
    date: "June 12, 2017",
    bodyText:
      "Historypin wins Knight News Challenge award to gather, preserve, and measure the…",
    id: 0
  },
  {
    headline: "DPLA and the International Image Interoperability Framew…",
    date: "June 6, 2017",
    bodyText:
      "DPLA, along with representatives of a number of institutions, is presenting at Access to the…",
    id: 1
  },
  {
    headline: "Announcing the launch of RightsStatements.org",
    date: "June 3, 2017",
    bodyText:
      "The Digital Public Library of America and Europeana are proud to announce the launch of…",
    id: 2
  }
];

const FromTheBlog = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.fromTheBlog}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>
          From the Blog
        </h1>
        <Link to="" className={styles.headerLink}>
          <span>Browse all News</span>
          <img
            alt="browse all news"
            src={smallChevron}
            className={styles.chevron}
          />
        </Link>
      </div>
      <ul className={styles.blogPosts}>
        {mockPosts.map(post =>
          <li key={post.id} className={styles.blogPost}>
            <Link to="" className={styles.headline}>
              {post.headline}
            </Link>
            <div className={styles.date}>
              {post.date}
            </div>
            <p className={styles.bodyText}>
              {post.bodyText}
            </p>
          </li>
        )}
      </ul>
    </div>
  </div>;

export default FromTheBlog;

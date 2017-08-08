import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./FromTheBlog.css";

const smallChevron = "static/images/chevron-thick-orange.svg";

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
  <div className={classNames.wrapper}>
    <div className={classNames.fromTheBlog}>
      <div className={classNames.header}>
        <h1 className={classNames.headerText}>From the Blog</h1>
        <Link to="">
          <a className={classNames.headerLink}>
            <span>Browse the blog</span>
            <img
              alt="browse the blog"
              src={smallChevron}
              className={classNames.chevron}
            />
          </a>
        </Link>
      </div>
      <ul className={classNames.blogPosts}>
        {mockPosts.map(post =>
          <li key={post.id} className={classNames.blogPost}>
            <Link to="" className={classNames.headline}>
              <a>
                {post.headline}
              </a>
            </Link>
            <div className={classNames.date}>
              {post.date}
            </div>
            <p className={classNames.bodyText}>
              {post.bodyText}
            </p>
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FromTheBlog;

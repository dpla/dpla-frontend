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
    <div className={`${classNames.content} site-max-width`}>
      <ul className="row">
        <div className="col-xs-12 col-md-3">
          <div className={classNames.header}>
            <h1 className={classNames.headerText}>From the Blog</h1>
            <Link prefetch href="">
              <a className={`hover-underline ${classNames.headerLink}`}>
                <span>Browse the blog</span>
                <img
                  alt="browse the blog"
                  src={smallChevron}
                  className={classNames.chevron}
                />
              </a>
            </Link>
          </div>
        </div>
        {mockPosts.map((post, index) =>
          <li key={post.id} className="col-xs-12 col-md-3">
            <div className={index === 0 && classNames.firstPost}>
              <Link prefetch href="">
                <a className={classNames.postLink}>
                  <span className={classNames.headline}>{post.headline}</span>
                  <div className={classNames.date}>
                    {post.date}
                  </div>
                  <p className={classNames.bodyText}>
                    {post.bodyText}
                  </p>
                </a>
              </Link>
            </div>
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FromTheBlog;

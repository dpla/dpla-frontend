import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./FromTheBlog.css";

const smallChevron = "static/images/chevron-thick-orange.svg";

const mockPosts = [
  {
    headline: "Title of a blog post",
    date: "June 12, 2017",
    bodyText:
      "This is not really a working link so don't bother clicking on it…",
    id: 0
  },
  {
    headline: "This one is longer but truncated…",
    date: "June 6, 2017",
    bodyText: "This one doesn't work either. We will fix this shortly…",
    id: 1
  },
  {
    headline: "Announcing the launch of a new project in two lines",
    date: "June 3, 2017",
    bodyText:
      "A slightly longer version of the fake text in the other two “blog posts” so that…",
    id: 2
  }
];

const FromTheBlog = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.content} site-max-width`}>
      <ul className="row">
        <div className="col-xs-12 col-md-3">
          <div className={classNames.header}>
            <h2 className={classNames.headerText}>From the Blog</h2>
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
              <div className={classNames.postLink}>
                <Link prefetch href="">
                  <a>
                    {post.headline}
                  </a>
                </Link>
              </div>
              <div className={classNames.date}>
                {post.date}
              </div>
              <p className={classNames.bodyText}>
                {post.bodyText}
              </p>
            </div>
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FromTheBlog;

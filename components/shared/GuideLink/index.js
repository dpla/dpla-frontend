import React from "react";
import Link from "next/link";

import css from "./GuideLink.module.scss";

const GuideLink = ({ guide }) =>
  <div className={css.item}>
    <Link
      href={`/guides/guide?guide=${guide.slug}`}
      as={`/guides/${guide.slug}`}
    >
      <a className={css.itemLink}>
        <img
          alt={guide.illustration.alt || guide.title}
          className={css.itemImg}
          src={guide.illustration.url}
        />
        <div className={css.itemHeader}>
          {guide.displayTitle || guide.title}
        </div>
        <p className={css.text}>{guide.summary}</p>
      </a>
    </Link>
  </div>;

export default GuideLink;

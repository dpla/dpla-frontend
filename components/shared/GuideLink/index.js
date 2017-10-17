import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./GuideLink.css";

const GuideLink = ({ guide }) =>
  <div className={classNames.item} style={{ backgroundColor: guide.color }}>
    <Link
      href={`/guides/guide?guide=${guide.slug}`}
      as={`/guides/${guide.slug}`}
    >
      <a className={classNames.itemLink}>
        <img
          alt={guide.illustration.alt || guide.title}
          className={classNames.itemImg}
          src={guide.illustration.url}
        />
        <h1 className={classNames.itemHeader}>
          {guide.displayTitle || guide.title}
        </h1>
        <p className={classNames.text}>{guide.summary}</p>
      </a>
    </Link>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GuideLink;

import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./GuideLink.css";

const GuideLink = ({ guide }) =>
  <div className={classNames.item} style={{ backgroundColor: guide.color }}>
    <Link>
      <a>
        <img
          alt={guide.title}
          className={classNames.itemImg}
          src={guide.thumbnailUrl}
        />
        <h1 className={classNames.itemHeader}>{guide.title}</h1>
        <p className={classNames.text}>{guide.summary}</p>
      </a>
    </Link>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GuideLink;

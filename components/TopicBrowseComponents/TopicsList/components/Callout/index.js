import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Callout.css";

const Callout = ({ topics }) =>
  <div className={classNames.calloutWrapper}>
    <div className={classNames.callout}>
      <div className={classNames.content}>
        <h2 className={classNames.header}>Enjoying these topics?</h2>
        <p className={classNames.text}>
          You might also like our Online Exhibitions.
        </p>
      </div>
      <Link href="/exhibitions">
        <a className={classNames.link}>Visit Online Exhibitions</a>
      </Link>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Callout;

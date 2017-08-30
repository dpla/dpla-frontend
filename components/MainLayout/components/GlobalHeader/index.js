import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./GlobalHeader.css";

const GlobalHeader = () =>
  <div className={classNames.header}>
    <div className={`${classNames.linksContainer} site-max-width`}>
      <div className={classNames.links}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/browse-by-topic">
          <a>Browse</a>
        </Link>
        <Link href="/exhibitions">
          <a>Exhibitions</a>
        </Link>
        <Link href="/primary-source-sets">
          <a>Primary Source Sets</a>
        </Link>
      </div>
      <span className={classNames.divider} />
      <div className={`${classNames.links} ${classNames.secondaryLinks}`}>
        <Link href="">
          <a>About Us</a>
        </Link>
        <Link href="">
          <a>News</a>
        </Link>
        <Link href="">
          <a>Pro Community</a>
        </Link>
      </div>
      {/* <button className={classNames.login}>Log In</button> */}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GlobalHeader;

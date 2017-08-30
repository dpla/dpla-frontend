import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./GlobalHeader.css";

const GlobalHeader = () =>
  <div className={classNames.header}>
    <div className={`${classNames.linksContainer} site-max-width`}>
      <div className={classNames.links}>
        <Link href="/">
          Home
        </Link>
        <Link href="/browse-by-topic">
          Browse
        </Link>
        <Link href="/exhibitions">
          Exhibitions
        </Link>
        <Link href="/primary-source-sets">
          Primary Source Sets
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

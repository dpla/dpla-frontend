import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./GlobalHeader.css";

const GlobalHeader = () =>
  <div className={classNames.header}>
    <div className={`${classNames.linksContainer} site-max-width`}>
      <ul className={classNames.links}>
        <li>
          <Link prefetch href="/">
            <a>
              Home
            </a>
          </Link>
        </li>
        <li className={classNames.browse}>
          <button className={classNames.browseButton}>Browse</button>
          <ul className={classNames.browseLinks}>
            <li>
              <Link prefetch href="/browse-by-topic">
                <a className={classNames.browseLink}>Browse by Topic</a>
              </Link>
            </li>
            <li>
              <Link prefetch href="/browse-by-partner">
                <a className={classNames.browseLink}>Browse by Partner</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link prefetch href="/exhibitions">
            <a>
              Exhibitions
            </a>
          </Link>
        </li>
        <li>
          <Link prefetch href="/primary-source-sets">
            <a>
              Primary Source Sets
            </a>
          </Link>
        </li>
      </ul>
      <span className={classNames.divider} />
      <ul className={`${classNames.links} ${classNames.secondaryLinks}`}>
        <li>
          <Link prefetch href="">
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="">
            <a>News</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="">
            <a>Pro Community</a>
          </Link>
        </li>
      </ul>
      {/* <button className={classNames.login}>Log In</button> */}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GlobalHeader;

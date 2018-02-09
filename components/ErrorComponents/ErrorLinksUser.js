import React from "react";
import Link from "next/link";

const ErrorLinksUser = () =>
  <ul>
    <li>
      <Link prefetch href="/search">
        <a>search</a>
      </Link>{" "}
      our collections
    </li>
    <li>
      browse {" "}
      <Link prefetch href="/browse-by-topic">
        <a>items by topic</a>
      </Link>
    </li>
    <li>
      discover items from specific{" "}
      <Link prefetch href="/browse-by-partner">
        <a>partners</a>
      </Link>
    </li>
    <li>
      view our {" "}
      <Link prefetch href="/exhibitions">
        <a>exhibitions</a>
      </Link>
    </li>
    <li>
      explore our{" "}
      <Link prefetch href="/primary-source-sets">
        <a>primary source sets</a>
      </Link>
    </li>
  </ul>;

export default ErrorLinksUser;

import React from "react";
import Link from "next/link";

const ErrorLinksUser = () =>
  <ul>
    <li>
      <Link href="/search">
        search
      </Link>{" "}
      our collections
    </li>
    <li>
      browse {" "}
      <Link href="/browse-by-topic">
        items by topic
      </Link>
    </li>
    <li>
      discover items from specific{" "}
      <Link href="/browse-by-partner">
        partners
      </Link>
    </li>
    <li>
      view our {" "}
      <Link href="/exhibitions">
        exhibitions
      </Link>
    </li>
    <li>
      explore our{" "}
      <Link href="/primary-source-sets">
        primary source sets
      </Link>
    </li>
  </ul>;

export default ErrorLinksUser;

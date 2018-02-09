import React from "react";
import Link from "next/link";

const ErrorLinksPro = () =>
  <ul>
    <li>
      learn{" "}
      <Link prefetch href="/about">
        <a>about DPLA</a>
      </Link>{" "}as an organization
    </li>
    <li>
      explore our{" "}
      <Link prefetch href="/projects">
        <a>projects</a>
      </Link>
    </li>
    <li>
      get information about our{" "}
      <Link prefetch href="/events">
        <a>events</a>
      </Link>
    </li>
    <li>
      engage with our{" "}
      <Link prefetch href="/hubs">
        <a>Hubs Network</a>
      </Link>
    </li>
    <li>
      discover our{" "}
      <Link prefetch href="/developers">
        <a>resources for developers</a>
      </Link>
    </li>
    <li>
      read about our work in{" "}
      <Link prefetch href="/education">
        <a>education</a>
      </Link>
    </li>
    <li>
      meet our Community Reps and learn about the {" "}
      <Link prefetch href="/community-reps">
        <a>reps program</a>
      </Link>
    </li>
    <li>
      find out more about our work with {" "}
      <Link prefetch href="/ebooks">
        <a>ebooks</a>
      </Link>
    </li>
  </ul>;

export default ErrorLinksPro;

import React from "react";
import Link from "next/link";

function ErrorLinksPro() {
  return (
    <ul>
      <li>
        learn <Link href="/about">about DPLA</Link> as an organization
      </li>
      <li>
        explore our <Link href="/projects">projects</Link>
      </li>
      <li>
        get information about our <Link href="/events">events</Link>
      </li>
      <li>
        engage with our <Link href="/hubs">Hub Network</Link>
      </li>
      <li>
        discover our <Link href="/developers">resources for developers</Link>
      </li>
      <li>
        read about our work in <Link href="/education">education</Link>
      </li>
      <li>
        meet our Community Reps and learn about the{" "}
        <Link href="/community-reps">reps program</Link>
      </li>
      <li>
        find out more about our work with <Link href="/ebooks">ebooks</Link>
      </li>
    </ul>
  );
}

export default ErrorLinksPro;

import React from "react";
import Link from "next/link";

function ErrorLinksLocal() {
  return (
    <ul>
      <li>
        <Link href="/">return to the home page</Link>
      </li>
      <li>
        <Link href="/search">search</Link> the collection
      </li>
      <li>
        browse items by <Link href="/browse-by-partner">contributing partner</Link>
      </li>
    </ul>
  );
}

export default ErrorLinksLocal;

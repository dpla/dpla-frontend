import React from "react";
import Link from "next/link";
import Button from "components/shared/Button";
import css from "./SearchError.module.scss";
import utils from "stylesheets/utils.module.scss";

function SearchError() {
  return (
    <div className={`${utils.container} ${css.searchError}`}>
      <h1>Search is temporarily unavailable.</h1>
      <p>
        We&rsquo;re having trouble connecting to our search service &mdash; this
        is on our end, not yours.
      </p>
      <Button type="primary" onClick={() => window.location.reload()}>
        Try again
      </Button>
      <p className={css.statusLink}>
        Check our{" "}
        <a href="https://status.dp.la" target="_blank" rel="noreferrer">
          status page
        </a>{" "}
        to see if there&rsquo;s a known issue.
      </p>
      <p>While search is down, you can still:</p>
      <ul className={css.alternativeLinks}>
        <li>
          View our <Link href="/exhibitions">exhibitions</Link>
        </li>
        <li>
          Explore our{" "}
          <Link href="/primary-source-sets">primary source sets</Link>
        </li>
      </ul>
    </div>
  );
}

export default SearchError;

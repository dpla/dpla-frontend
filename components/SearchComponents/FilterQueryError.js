import React from "react";

import css from "./FilterQueryError.module.scss";
import utils from "stylesheets/utils.module.scss"
import Link from "next/link";

const FilterQueryError = () =>
    <div className={`${utils.container} ${css.filterQueryError}`}>
        <h1>Query Too Broad</h1>
        <p>Please use the search bar above to submit a search query, or try<br/>browsing items{" "}<Link href="/browse-by-topic">by topic</Link>{" "}or items from specific{" "}<Link href="/browse-by-partner">partners</Link>.</p>
    </div>;

export default FilterQueryError;

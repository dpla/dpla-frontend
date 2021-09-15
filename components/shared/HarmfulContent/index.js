import React from "react";
import Link from "next/link";
import Router from "next/router";

import { addCommasToNumber } from "lib/index";
import {
  sortOptions,
  pageSizeOptions,
  mapSortOptionsToParams,
  getSortOptionFromParams,
  DEFAULT_PAGE_SIZE
} from "constants/search";

import css from "./HarmfulContent.module.scss";


class HarmfulContent extends React.Component {

  render() {
    return (
      <div className={css.wrapper}>
        <div className={'.container'}>
          <p className={css.harmfulContent}>
            Please read <a href="https://dp.la/about/harmful-language-statement">DPLA’s Statement on Potentially Harmful Content</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default HarmfulContent;

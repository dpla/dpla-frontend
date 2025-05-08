import React from "react";
import Link from "next/link";

import css from "./NavArrows.module.scss";

import Chevron from "components/svg/ChevronThickOrange";

function NavArrows({ previousSubtopic, nextSubtopic, topic, route }) {
  return nextSubtopic || previousSubtopic ? (
    <div className={css.navLinks}>
      {previousSubtopic && (
        <Link
          href={`/browse-by-topic/${topic.slug}/${previousSubtopic.slug}`}
          className={css.prevLink}
        >
          <Chevron className={css.prevArrow} />
          <span>Previous Section</span>
        </Link>
      )}
      {nextSubtopic && (
        <Link href={`/browse-by-topic/${topic.slug}/${nextSubtopic.slug}`}>
          <span>Next Section</span>
          <Chevron className={css.nextArrow} />
        </Link>
      )}
    </div>
  ) : (
    <></>
  );
}

export default NavArrows;

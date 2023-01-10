import React from "react";
import Link from "next/link";

import css from "./NavArrows.module.scss";

import Chevron from "components/svg/ChevronThickOrange";

const NavArrows = ({ previousSubtopic, nextSubtopic, topic, route }) =>
  nextSubtopic || previousSubtopic
    ? <div className={css.navLinks}>
        {previousSubtopic &&
          <Link
            as={`/browse-by-topic/${topic.slug}/${previousSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${previousSubtopic.slug}`}
          >
            <a className={css.prevLink}>
              <Chevron alt="" className={css.prevArrow} />
              <span>Previous Section</span>
            </a>
          </Link>}
        {nextSubtopic &&
          <Link
            as={`/browse-by-topic/${topic.slug}/${nextSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${nextSubtopic.slug}`}
          >
            <a>
              <span>Next Section</span>
              <Chevron alt="" className={css.nextArrow} />
            </a>
          </Link>}
      </div>
    : null;

export default NavArrows;

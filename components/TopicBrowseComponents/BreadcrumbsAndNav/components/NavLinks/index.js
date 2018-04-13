import React from "react";
import Link from "next/link";

import css from "./NavArrows.scss";

const chevron = "/static/images/chevron-thick-orange.svg";

const NavArrows = ({ previousSubtopic, nextSubtopic, topic, route }) =>
  nextSubtopic || previousSubtopic
    ? <div className={css.navLinks}>
        {previousSubtopic &&
          <Link
            prefetch
            as={`/browse-by-topic/${topic.slug}/${previousSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${previousSubtopic.slug}`}
          >
            <a className={css.prevLink}>
              <img src={chevron} alt="" className={css.prevArrow} />
              <span>Previous Section</span>
            </a>
          </Link>}
        {nextSubtopic &&
          <Link
            prefetch
            as={`/browse-by-topic/${topic.slug}/${nextSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${nextSubtopic.slug}`}
          >
            <a>
              <span>Next Section</span>
              <img src={chevron} alt="" className={css.nextArrow} />
            </a>
          </Link>}
      </div>
    : null;

export default NavArrows;

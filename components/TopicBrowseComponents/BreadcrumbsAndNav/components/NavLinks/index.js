import React from "react";
import Link from "next/link";

import css from "./NavArrows.module.scss";

const chevron = "/static/images/chevron-thick-orange.svg";

const NavArrows = ({ previousSubtopic, nextSubtopic, topic, route }) =>
  nextSubtopic || previousSubtopic
    ? <div className={css.navLinks}>
        {previousSubtopic &&
          <Link
            as={`/browse-by-topic/${topic.slug}/${previousSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${previousSubtopic.slug}`}
            className={css.prevLink}
          >
              <img src={chevron} alt="" className={css.prevArrow} />
              <span>Previous Section</span>
          </Link>}
        {nextSubtopic &&
          <Link
            as={`/browse-by-topic/${topic.slug}/${nextSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${nextSubtopic.slug}`}
          >

              <span>Next Section</span>
              <img src={chevron} alt="" className={css.nextArrow} />
            
          </Link>}
      </div>
    : null;

export default NavArrows;

import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./NavArrows.css";

const chevron = "/static/images/chevron-thick-orange.svg";

const NavArrows = ({ previousSubtopic, nextSubtopic, topic, route }) =>
  nextSubtopic || previousSubtopic
    ? <div className={classNames.navLinks}>
        {previousSubtopic &&
          <Link
            prefetch
            as={`/browse-by-topic/${topic.slug}/${previousSubtopic.slug}`}
            href={`/${route.pathname}?topic=${topic.slug}&subtopic=${previousSubtopic.slug}`}
          >
            <a className={classNames.prevLink}>
              <img src={chevron} alt="" className={classNames.prevArrow} />
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
              <img src={chevron} alt="" className={classNames.nextArrow} />
            </a>
          </Link>}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    : null;

export default NavArrows;

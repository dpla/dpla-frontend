import React from "react";
import Link from "next/link";

import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";
import WebsiteFeature from "shared/WebsiteFeature";
import StayInformed from "shared/StayInformed";

import css from "./HomePro.module.scss";
import utils from "stylesheets/utils.module.scss";

function HomePro({ news, content }) {
  return (
    <div>
      <div
        className={`${css.heroWrapper} ${content.acf.feature ? css.withFeature : ""}`}
      >
        <div className={`${css.heroText} ${utils.siteMaxWidth}`}>
          <h1>Welcome to the DPLA Professional Community</h1>
          <p>
            DPLA Pro is where DPLA, our Hub Network, and our broader community
            connect and share resources.
          </p>
        </div>
      </div>
      {content.acf.feature && content.acf.feature.title !== "" && (
        <WebsiteFeature
          title={content.acf.feature.title}
          text={content.acf.feature.text}
          buttonText={content.acf.feature.button_text}
          buttonUrl={content.acf.feature.button_url}
          imageSrc={content.acf.feature.image}
        />
      )}
      <div className={css.sectionList}>
        <ul className={utils.siteMaxWidth}>
          <li>
            <Link as="/hubs" href="/pro/wp/hubs?section=hubs">
              <IconComponent className={css.icon} name="network" />
              Hub Network
            </Link>
          </li>
          <li>
            <Link
              as="/prospective-hubs"
              href="/pro/wp?section=prospective-hubs"
            >
              <IconComponent className={css.icon} name="prospective" />
              Prospective Hubs
            </Link>
          </li>
          <li>
            <Link as="/developers" href="/pro/wp?section=developers">
              <IconComponent className={css.icon} name="developers" />
              Developers
            </Link>
          </li>
          <li>
            <Link as="/education" href="/pro/wp?section=education">
              <IconComponent className={css.icon} name="education" />
              Education
            </Link>
          </li>
          <li>
            <Link as="/events" href="/pro/wp?section=events">
              <IconComponent className={css.icon} name="community" />
              Events
            </Link>
          </li>
          <li>
            <a href={"https://ebooks.dp.la"}>
              <IconComponent className={css.icon} name="ebooks" />
              Ebooks
            </a>
          </li>
        </ul>
      </div>
      <NewsLane title="DPLA News" items={news} />
      <StayInformed />
    </div>
  );
}

export default HomePro;

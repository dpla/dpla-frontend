import React from "react";
import Link from "next/link";

import IconComponent from "./ProComponents/IconComponent";

import { stylesheet, classNames } from "./ProHome.css";

const ProHome = ({ sourceSets, exhibitions, guides, headerDescription }) =>
  <div>
    <div className={classNames.heroWrapper}>
      <div className={`${classNames.heroText} site-max-width`}>
        <h1>
          Welcome to the DPLA
          Professional Community
        </h1>
        <p>
          DPLA Pro is where DPLA, our hub network, and our broader community
          connect and share resources.
        </p>
      </div>
    </div>
    <div className={`${classNames.sectionList}`}>
      <ul className={`site-max-width`}>
        <li>
          <Link as="/hubs/hub-network" href="/pro/wp?section=hub-network">
            <a>
              <IconComponent className={classNames.icon} name="network" />
              Hub Network
            </a>
          </Link>
        </li>
        <li>
          <Link
            as="/hubs/prospective-hubs"
            href="/pro/wp?section=prospective-hubs"
          >
            <a>
              <IconComponent className={classNames.icon} name="prospective" />
              Prospective Hubs
            </a>
          </Link>
        </li>
        <li>
          <Link as="/developers" href="/pro/wp?section=developers">
            <a>
              <IconComponent className={classNames.icon} name="developers" />
              Developers
            </a>
          </Link>
        </li>
        <li>
          <Link as="/education" href="/pro/wp?section=education">
            <a>
              <IconComponent className={classNames.icon} name="education" />
              Education
            </a>
          </Link>
        </li>
        <li>
          <Link as="/community-reps" href="/pro/wp?section=community-reps">
            <a>
              <IconComponent className={classNames.icon} name="community" />
              Community Reps
            </a>
          </Link>
        </li>
        <li>
          <Link as="/ebooks" href="/pro/wp?section=ebooks">
            <a>
              <IconComponent className={classNames.icon} name="ebooks" />
              DPLA and Ebooks
            </a>
          </Link>
        </li>
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ProHome;
import React from "react";

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
          The DPLA Pro community connects libraries, developers, and engaged
          DPLA users to resources for contributing to our organization.
        </p>
      </div>
    </div>
    <div className={`${classNames.sectionList}`}>
      <ul className={`site-max-width`}>
        <li>
          <a href="">
            <IconComponent className={classNames.icon} name="network" />
            Hub Network
          </a>
        </li>
        <li>
          <a href="">
            <IconComponent className={classNames.icon} name="prospective" />
            Prospective Hubs
          </a>
        </li>
        <li>
          <a href="">
            <IconComponent className={classNames.icon} name="developers" />
            Developers
          </a>
        </li>
        <li>
          <a href="">
            <IconComponent className={classNames.icon} name="educators" />
            Educators
          </a>
        </li>
        <li>
          <a href="">
            <IconComponent className={classNames.icon} name="community" />
            Community Reps
          </a>
        </li>
        <li>
          <a href="">
            <IconComponent className={classNames.icon} name="ebooks" />
            DPLA and Ebooks
          </a>
        </li>
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ProHome;

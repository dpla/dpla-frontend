import React from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";
import NavLinks from "./components/NavLinks";

import { classNames, stylesheet } from "./BreadcrumbsAndNav.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const BreadcrumbsAndNav = ({
  breadcrumbs,
  previousSubtopic,
  nextSubtopic,
  topic,
  route
}) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.breadcrumbsAndNav, module].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <NavLinks
        route={route}
        previousSubtopic={previousSubtopic}
        nextSubtopic={nextSubtopic}
        topic={topic}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsAndNav;

import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import css from "./BreadcrumbsAndNav.module.scss";
import utils from "stylesheets/utils.module.scss";
import * as PropTypes from "prop-types";

function BreadcrumbsAndNav(props) {
  const { breadcrumbs } = props;
  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${css.breadcrumbsAndNav} ${utils.container}`}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </div>
  );
}

BreadcrumbsAndNav.propTypes = { breadcrumbs: PropTypes.any };

export default BreadcrumbsAndNav;

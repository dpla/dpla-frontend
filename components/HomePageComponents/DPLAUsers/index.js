import React from "react";

import GuideLink from "components/shared/GuideLink";
import { stylesheet, classNames } from "./DPLAUsers.css";

const DPLAUsers = ({ guides }) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.DPLAUsers} site-max-width`}>
      <h1 className={classNames.header}>How can I use DPLA?</h1>
      <div className={classNames.divider} />
      <div className="row">
        {guides.map(guide =>
          <div
            className={`${classNames.itemColumn} col-xs-12 col-sm-6 col-lg-3`}
            key={guide.title}
          >
            <GuideLink guide={guide} />
          </div>
        )}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default DPLAUsers;

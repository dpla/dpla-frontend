import React from "react";

import GuideLink from "components/shared/GuideLink";
import HeadingRule from "components/shared/HeadingRule";
import Button from "components/shared/Button";

import css from "./DPLAUsers.module.scss";
import utils from "stylesheets/utils.module.scss";

function DPLAUsers({ guides }) {
  return (
    <div className={css.wrapper} data-testid="guides">
      <div className={`${css.DPLAUsers} ${utils.siteMaxWidth}`}>
        <h2 className={css.header}>How can I use DPLA?</h2>
        <HeadingRule />
        <div className={utils.row}>
          {guides.map((guide) => (
            <div
              className={`${css.itemColumn} ${utils.colXs12} ${utils.colSm6} ${utils.colLg3}`}
              key={guide.slug}
            >
              <GuideLink guide={guide} />
            </div>
          ))}
        </div>
        <div className={css.caption}>
          <p>
            If you’re new to DPLA, these research guides will give you a head
            start using our site. The guides reflect a few key activities that
            attract visitors to DPLA, but you can explore many other interests
            here too.
          </p>
          <Button
            type="secondary"
            size="large"
            className={css.captionButton}
            url={"/guides"}
          >
            View all user guides
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DPLAUsers;

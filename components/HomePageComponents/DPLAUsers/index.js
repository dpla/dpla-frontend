import React from "react";

import GuideLink from "../../../components/shared/GuideLink";
import HeadingRule from "../../../components/shared/HeadingRule";
import Button from "../../../components/shared/Button";
import { stylesheet, classNames } from "./DPLAUsers.css";

const DPLAUsers = ({ guides }) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.DPLAUsers} site-max-width`}>
      <h1 className={classNames.header}>How can I use DPLA?</h1>
      <HeadingRule />
      <div className="row">
        {guides.map(guide =>
          <div
            className={`${classNames.itemColumn} col-xs-12 col-sm-6 col-lg-3`}
            key={guide.slug}
          >
            <GuideLink guide={guide} />
          </div>
        )}
      </div>
      <div className={classNames.caption}>
        <p>
          If you’re new to DPLA, these research guides will give you a head
          start using our site. The guides reflect a few key activities that
          attract visitors to DPLA, but you can explore many other interests
          here too.
        </p>
        <Button
          type="secondary"
          size="large"
          prefetch
          className={classNames.captionButton}
          url={"/guides"}
        >
          View all user guides
        </Button>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default DPLAUsers;

import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";
import { classNames, stylesheet } from "./Callout.css";

const Callout = ({ topics }) =>
  <div className={classNames.calloutWrapper}>
    <div className={classNames.callout}>
      <div className={classNames.content}>
        <h2 className={classNames.header}>Enjoying these topics?</h2>
        <p className={classNames.text}>
          You might also like our Online Exhibitions.
        </p>
      </div>
      <Button
        type="primary"
        url="/exhibitions"
        prefetch
        className={classNames.link}
      >
        Visit Online Exhibitions
      </Button>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Callout;

import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";
import css from "./Callout.module.scss";

const Callout = ({ topics }) =>
  <div className={css.calloutWrapper}>
    <div className={css.callout}>
      <div className={css.content}>
        <h2 className={css.header}>Enjoying these topics?</h2>
        <p className={css.text}>
          You might also like our Online Exhibitions.
        </p>
      </div>
      <Button type="primary" url="/exhibitions" prefetch className={css.link}>
        Visit Online Exhibitions
      </Button>
    </div>
  </div>;

export default Callout;

import React from "react";
import Link from "next/link";

import FooterPro from "./FooterPro";
import FooterUser from "./FooterUser";
import SmallFooterLocal from "./SmallFooterLocal";
import SmallFooter from "./SmallFooter";

import { SITE_ENV } from "constants/env";

import css from "./Footer.scss";

const Footer = ({ route }) =>
  <footer className={css.wrapper}>
    {SITE_ENV === "user" && <FooterUser route={route} />}
    {SITE_ENV === "pro" && <FooterPro route={route} />}
    {(SITE_ENV === "user" || SITE_ENV === "pro") &&
      <SmallFooter route={route} />}
    {SITE_ENV === "local" && <SmallFooterLocal route={route} />}
  </footer>;
export default Footer;

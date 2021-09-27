import React from "react";

import FooterPro from "./FooterPro";
import FooterUser from "./FooterUser";
import SmallFooterLocal from "./SmallFooterLocal";
import SmallFooter from "./SmallFooter";

import { SITE_ENV } from "constants/env";

import css from "./Footer.module.scss";

const Footer = () =>
  <footer className={css.wrapper}>
    {SITE_ENV === "user" && <FooterUser />}
    {SITE_ENV === "pro" && <FooterPro />}
    {(SITE_ENV === "user" || SITE_ENV === "pro") &&
      <SmallFooter />}
    {SITE_ENV === "local" && <SmallFooterLocal />}
  </footer>;
export default Footer;

import React from "react";

import FooterPro from "./FooterPro";
import FooterUser from "./FooterUser";
import SmallFooterLocal from "./SmallFooterLocal";
import SmallFooter from "./SmallFooter";

import css from "./Footer.module.scss";

function Footer() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  return (
    <footer className={css.wrapper}>
      {siteEnv === "user" && <FooterUser />}
      {siteEnv === "pro" && <FooterPro />}
      {(siteEnv === "user" || siteEnv === "pro") && <SmallFooter />}
      {siteEnv === "local" && <SmallFooterLocal />}
    </footer>
  );
}

export default Footer;

import React from "react";

const FooterStyles = () =>
  <style jsx>{`
    .footer {
      color: white;
      background-color: blue;
      padding: 55px 0 0 0;
    }
    .dplaLogo {
      width: 300px;
    }
    .linksAndDonate {
      display: flex;
      margin: auto;
      align-items: baseline;
      padding: 0 70px 57px;
    }
    @media screen and (min-width: 1100px) {
      .linksAndDonate {
        padding: 0 0 57px;
        max-width: 1024px;
      }
    }
    .links {
      display: flex;
      font-size: 1.125rem;
      line-height: 1.5625rem;
      color: gray75;
      width: 550px;
      justify-content: space-between;
    }
    .linkHeader {
      font-weight: 600;
      font-size: 1.25rem;
      line-height: 2rem;
      margin-bottom: 12px;
      color: white;

    .logoAndSocialWrapper {
      background-color: midnightBlue;

    .logoAndSocial {
      margin: auto;
      display: flex;
      justify-content: space-between;
      padding: 33px 57px;

    @media screen and (min-width: 1100px) {
      .logoAndSocial {
        padding: 33px 0;
        max-width: 1024px;
      }
    }
    .social {
      margin-left: auto;
    }
    .donateButton {
      margin-left: auto;
      font-weight: 600;
      color: white;
      padding: 12px 49px;
      background-color: bambooOrange;
      border-radius: 2px;
      font-size: 1.125rem;
      line-height: 1.4375rem;
    }
    .socialButton {
      width: 24px;
      height: 24px;
      padding-right: 17px;
    }
    .socialButton:-last-child {
      padding: none;
    }
  `}</style>;

export default FooterStyles;

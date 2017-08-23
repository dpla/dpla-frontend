import React from "react";
import Head from "next/head";

import { stylesheet as utilStylesheet } from "css/utils.css";

export default ({ additionalLinks }) =>
  <div>
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      button, input {
        font-family: "Source Sans Pro";
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      button {
        background: none;
        border: none;
        cursor: pointer;
      }
      ul {
        list-style: none;
      }
      p, ul, h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
      }
      :global(.slick-disabled) {
        display: none;
      }
      :global(.Select-value) {
        padding-right: 25px;
      }
    `}</style>
    <Head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Lora:400,700"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-select/dist/react-select.css"
      />
      {additionalLinks}
      <title>Digital Public Library of America</title>
    </Head>
    <style dangerouslySetInnerHTML={{ __html: utilStylesheet }} />
  </div>;

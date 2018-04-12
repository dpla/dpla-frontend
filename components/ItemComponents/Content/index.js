import React from "react";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import JsonLdMarkup from "./JsonLdMarkup";
import GaItemWrapper from "./GaItemWrapper";

import { UNTITLED_TEXT } from "constants/site";

import css from "./Content.scss";

const Content = ({ item, url }) =>
  <div className={css.content}>
    <h1 className={css.title}>
      {item.title && item.title !== "" ? item.title : UNTITLED_TEXT}
    </h1>
    <MainMetadata item={item} />
    <OtherMetadata item={item} />
    <JsonLdMarkup item={item} url={url} />
  </div>;

export default GaItemWrapper(Content);

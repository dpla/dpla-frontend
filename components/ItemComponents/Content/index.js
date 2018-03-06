import React from "react";
import { classNames, stylesheet } from "./Content.css";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import JsonLdMarkup from "./JsonLdMarkup";
import GaItemWrapper from "./GaItemWrapper";

import { UNTITLED_TEXT } from "constants/site";

const Content = ({ item, url }) =>
  <div className={classNames.content}>
    <h1 className={classNames.title}>
      {item.title && item.title !== "" ? item.title : UNTITLED_TEXT}
    </h1>
    <MainMetadata item={item} />
    <OtherMetadata item={item} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <JsonLdMarkup item={item} url={url} />
  </div>;

export default GaItemWrapper(Content);

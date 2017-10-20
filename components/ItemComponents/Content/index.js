import React from "react";
import { classNames, stylesheet } from "./Content.css";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import RightsMetadata from "./RightsMetadata";
import JsonLdMarkup from "./JsonLdMarkup";

const Content = ({ item, url }) =>
  <div className={classNames.content}>
    <MainMetadata item={item} />
    <OtherMetadata item={item} />
    <RightsMetadata item={item} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <JsonLdMarkup item={item} url={url} />
  </div>;

export default Content;

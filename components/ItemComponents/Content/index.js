import React from "react";
import { classNames, stylesheet } from "./Content.css";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import RightsMetadata from "./RightsMetadata";

const Content = ({ item }) =>
  <div className={classNames.content}>
    <MainMetadata item={item} />
    <OtherMetadata item={item} />
    <RightsMetadata item={item} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Content;

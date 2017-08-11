import React from "react";

import { classNames, stylesheet } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";

const { module } = utilClassNames;
const Content = ({ exhibition, route }) =>
  <div className={classNames.content}>
    <Header exhibition={exhibition} />
    <Body exhibition={exhibition} />
    <FooterNav exhibition={exhibition} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Content;

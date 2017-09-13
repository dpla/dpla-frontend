import React from "react";

import { classNames, stylesheet } from "./ExhibitionSection.css";
import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";

const ExhibitionView = ({ exhibition, section, subsection, route }) =>
  <div className={classNames.exhibitionView}>
    <Header title={exhibition.title} route={route} />
    <Body
      route={route}
      exhibition={exhibition}
      section={section}
      subsection={subsection}
    />
    <FooterNav exhibition={exhibition} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ExhibitionView;

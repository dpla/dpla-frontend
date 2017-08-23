import React from "react";
import { classNames, stylesheet } from "./Sidebar.css";

import Accordion from "components/shared/Accordion";

const Sidebar = () =>
  <div className={classNames.sidebar}>
    <Accordion
      subitemsWrapperClass={classNames.accordionSubitems}
      itemHeaderClass={classNames.accordionItemHeader}
      subitemClass={classNames.accordionSubitem}
      activeItemClass={classNames.active}
      inactiveItemClass={classNames.inactive}
      items={[
        {
          name: "Subject",
          subitems: [{ content: "hey" }, { content: "hey man" }]
        },
        {
          active: true,
          name: "Subject",
          subitems: [{ content: "hey" }, { content: "hey man" }]
        },
        {
          name: "Subject",
          active: true,
          subitems: [{ content: "hey" }, { content: "hey man" }]
        }
      ]}
    />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;

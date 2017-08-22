import React from "react";

import { classNames, stylesheet } from "./Sidebar.css";

const Sidebar = () =>
  <div>
    <ul className={classNames.links}>
      <li className={classNames.link}>About Us</li>
      <li className={classNames.link}>FAQ</li>
      <li className={classNames.link}>Who Uses DPLA?</li>
      <li className={classNames.link}>Terms & Conditions</li>
      <li className={classNames.link}>Donate</li>
      <div className={classNames.divider} />
      <li className={[classNames.link, classNames.selected].join(" ")}>
        Contact Us
      </li>
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;

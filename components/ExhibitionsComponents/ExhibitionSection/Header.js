import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const Header = ({ title, route }) =>
  <div className={[classNames.header, module].join(" ")}>
    <div>
      <Link href="/exhibitions">
        <a className={classNames.exhibitionsLink}>Exhibitions</a>
      </Link>
      <h1 className={classNames.exhibitionTitle}>
        {title}
      </h1>
    </div>
  </div>;

export default Header;

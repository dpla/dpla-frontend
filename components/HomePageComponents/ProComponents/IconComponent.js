import React from "react";

import Developers from "../../../static/images/pro/developers.svg";
import Community from "../../../static/images/pro/community.svg";
import Ebooks from "../../../static/images/pro/ebooks.svg";
import Educators from "../../../static/images/pro/educators.svg";
import Network from "../../../static/images/pro/network.svg";
import Prospective from "../../../static/images/pro/prospective.svg";

export default ({ className, name }) =>
  <span aria-hidden className={className}>
    {name === "developers" && <Developers />}
    {name === "community" && <Community />}
    {name === "ebooks" && <Ebooks />}
    {name === "educators" && <Educators />}
    {name === "network" && <Network />}
    {name === "prospective" && <Prospective />}
  </span>;

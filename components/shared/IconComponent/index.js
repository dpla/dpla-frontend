import React from "react";

import Developers from "../../../public/static/images/pro/developers.svg";
import Community from "../../../public/static/images/pro/community.svg";
import Ebooks from "../../../public/static/images/pro/ebooks.svg";
import Education from "../../../public/static/images/pro/education.svg";
import Network from "../../../public/static/images/pro/network.svg";
import Prospective from "../../../public/static/images/pro/prospective.svg";

export default ({ className, name }) =>
  <span aria-hidden className={className ? className : ""}>
    {name === "developers" && <Developers />}
    {name === "community" && <Community />}
    {name === "ebooks" && <Ebooks />}
    {name === "education" && <Education />}
    {name === "network" && <Network />}
    {name === "prospective" && <Prospective />}
  </span>;

import React from "react";

import Developers from "components/svg/pro/Developers";
import Community from "components/svg/pro/Community";
import Ebooks from "components/svg/pro/Ebooks";
import Education from "components/svg/pro/Education";
import Network from "components/svg/pro/Network";
import Prospective from "components/svg/pro/Prospective";

function IconComponent({ className, name }) {
  return (
    <span aria-hidden className={className || ""}>
      {name === "developers" && <Developers />}
      {name === "community" && <Community />}
      {name === "ebooks" && <Ebooks />}
      {name === "education" && <Education />}
      {name === "network" && <Network />}
      {name === "prospective" && <Prospective />}
    </span>
  );
}

export default IconComponent;

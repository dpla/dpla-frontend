import React from "react";

import Developers from "components/svg/pro/Developers";
import Community from "components/svg/pro/Community";
import Wikipedia from "components/svg/pro/Wikipedia";
import Education from "components/svg/pro/Education";
import Network from "components/svg/pro/Network";
import Prospective from "components/svg/pro/Prospective";

function IconComponent({ className, name }) {
  return (
    <span aria-hidden className={className || ""}>
      {name === "developers" && <Developers />}
      {name === "community" && <Community />}
      {name === "wikipedia" && <Wikipedia />}
      {name === "education" && <Education />}
      {name === "network" && <Network />}
      {name === "prospective" && <Prospective />}
    </span>
  );
}

export default IconComponent;

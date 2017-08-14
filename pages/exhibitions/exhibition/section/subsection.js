import React from "react";
import fetch from "isomorphic-fetch";

import Head from "../../../../components/Head";
import mockExhibition from "../../../../components/ExhibitionsComponents/Exhibition/mockExhibition";
import Content from "../../../../components/ExhibitionsComponents/ExhibitionSection";

const Subsection = ({ url }) =>
  <div>
    <Head />
    <Content exhibition={mockExhibition} />
  </div>;

export default Subsection;

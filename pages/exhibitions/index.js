import React from "react";

import MainLayout from "../../components/MainLayout";
import AllExhibitions from "../../components/ExhibitionsComponents/AllExhibitions";
import Footer from "../../components/ExhibitionsComponents/Footer";

const Exhibitions = ({ url }) =>
  <MainLayout route={url}>
    <AllExhibitions route={url} />
    <Footer />
  </MainLayout>;

export default Exhibitions;

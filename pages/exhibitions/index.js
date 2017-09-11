import React from "react";

import MainLayout from "../../components/MainLayout";
import AllExhibitions from "../../components/ExhibitionsComponents/AllExhibitions";
import Footer from "../../components/ExhibitionsComponents/Footer";
import { EXHIBITS_ENDPOINT } from "constants/exhibitions";

const Exhibitions = ({ url, exhibitions }) =>
  <MainLayout route={url}>
    <AllExhibitions route={url} exhibitions={exhibitions} />
    <Footer />
  </MainLayout>;

Exhibitions.getInitialProps = async () => {
  const res = await fetch(EXHIBITS_ENDPOINT);

  const json = await res.json();

  return { exhibitions: json };
};

export default Exhibitions;

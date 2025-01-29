import React from "react";

import MainLayout from "components/MainLayout";
import AllExhibitions from "components/ExhibitionsComponents/AllExhibitions";
import Footer from "components/ExhibitionsComponents/Footer";
import { TITLE } from "constants/exhibitions";
import { loadExhibitionList } from "lib/exhibitionsStatic";
import * as PropTypes from "prop-types";

function Exhibitions(props) {
  let { exhibitions } = props;
  return (
    <MainLayout pageTitle={TITLE}>
      <div id="main" role="main">
        <AllExhibitions exhibitions={exhibitions} />
      </div>
      <Footer />
    </MainLayout>
  );
}

Exhibitions.propTypes = { exhibitions: PropTypes.any };

export async function getStaticProps() {
  const exhibitions = await loadExhibitionList();
  return {
    props: exhibitions,
  };
}

export default Exhibitions;

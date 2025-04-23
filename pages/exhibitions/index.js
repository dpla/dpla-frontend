import React from "react";
import { loadExhibitionList } from "lib/exhibitionsStatic";
import MainLayout from "components/MainLayout";
import AllExhibitions from "components/ExhibitionsComponents/AllExhibitions";
import Footer from "components/ExhibitionsComponents/Footer";
import { TITLE } from "constants/exhibitions";

function Exhibitions({ exhibitions }) {
  return (
    <MainLayout pageTitle={TITLE}>
      <div id="main" role="main">
        <AllExhibitions exhibitions={exhibitions} />
      </div>
      <Footer />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const exhibitions = await loadExhibitionList();
  return {
    props: exhibitions,
  };
}

export default Exhibitions;

import React from "react";

import MainLayout from "components/MainLayout";
import AllExhibitions from "components/ExhibitionsComponents/AllExhibitions";
import Footer from "components/ExhibitionsComponents/Footer";
import {TITLE} from "constants/exhibitions";
import {loadExhibitionList} from "lib/exhibitions/exhibitionsStatic";

const Exhibitions = ({exhibitions}) =>
    <MainLayout pageTitle={TITLE}>
        <div id="main" role="main">
            <AllExhibitions exhibitions={exhibitions}/>
        </div>
        <Footer/>
    </MainLayout>;

export const getStaticProps = async () => {
    const exhibitions = await loadExhibitionList();
    return {
        props: exhibitions
    };
};

export default Exhibitions;

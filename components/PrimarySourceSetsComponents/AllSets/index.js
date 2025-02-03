import React from "react";

import FiltersBar from "./components/FiltersBar";
import FeatureHeader from "shared/FeatureHeader";
import SetsList from "./components/SetsList";

import {TITLE, DESCRIPTION} from "constants/primarySourceSets.js";

function AllSets({sets}) {
    return (
        <div>
            <FeatureHeader title={TITLE} description={DESCRIPTION}/>
            <FiltersBar/>
            <SetsList sets={sets}/>
        </div>
    );
}

export default AllSets;

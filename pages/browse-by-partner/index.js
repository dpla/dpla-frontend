import React from "react";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";

import {TITLE, DESCRIPTION} from "constants/browse-by-partner";
import {LOCALS} from "constants/local";
import {SITE_ENV, LOCAL_ID} from "constants/env";

import css from "components/PartnerBrowseComponents/PartnerBrowseContent.module.scss";
import {washObject} from "lib/washObject";
import axios from "axios";

const PartnerBrowse = ({partners}) =>
    <div>
        <MainLayout pageTitle={TITLE}>
            <div id="main" role="main">
                <FeatureHeader
                    titleClassName={css.featureTitle}
                    title={TITLE}
                    description={DESCRIPTION}
                />
                <PartnerBrowseContent partners={partners}/>
            </div>
        </MainLayout>
    </div>;


export const getServerSideProps = async () => {
    let apiQuery;
    let facetName;
    let linkParam = "";

    const apiUrlBase = `${process.env.API_URL}/items?api_key=${process.env.API_KEY}&facet_size=1000`;

    if (SITE_ENV === "local") {
        const filtersParam = LOCALS[LOCAL_ID]
            .filters.map(x => `&filter=${x}`)
            .join("");

        apiQuery = `${apiUrlBase}&facets=dataProvider${filtersParam}`;
        facetName = "dataProvider";
        linkParam = "provider";

    } else {
        apiQuery = `${apiUrlBase}&facets=provider.name`;
        facetName = "provider.name";
        linkParam = "partner";
    }

    const res = await axios.get(apiQuery);
    const json = res.data;

    const partners = washObject(
        json
            .facets[facetName]
            .terms.map(partner => (
                {
                    name: partner.term,
                    facet: linkParam,
                    itemCount: partner.count
                }
            )
        )
    );

    return {
        props: {
            partners
        }
    };
};

export default PartnerBrowse;

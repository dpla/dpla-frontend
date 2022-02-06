import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";

import {API_ENDPOINT} from "constants/items";
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

    /*
    server.get(
    [
      "/api/dpla/items",
      "/api/dpla/items*",
      "/api/dpla/items",
      "/api/dpla/items/*"
    ],
    proxy(process.env.API_URL, {
      proxyReqPathResolver: function(req) {
        var separator = req.url.indexOf("?") === -1 ? "?" : "&";
        var newPath = req.url.replace(
          /^\/api\/dpla(.*)$/,
          "/" +
          (process.env.API_VERSION || "v2") + // to support absent v2 env variable
            "$1" +
            separator +
            "api_key=" +
            process.env.API_KEY
        );

        return newPath;
      }
    })
  );
     */

export const getServerSideProps = async ({req}) => {
    let apiQuery = "";
    let facetName = "";
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

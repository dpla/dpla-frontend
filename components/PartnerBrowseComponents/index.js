import React from "react";
import Link from "next/link";

import {addCommasToNumber} from "lib";

import css from "./PartnerBrowseContent.module.scss";
import utils from "stylesheets/utils.module.scss"

function Partner({name, itemCount, facetName}) {
    return (<Link href={`/search?${facetName}="${encodeURIComponent(name)}"`} className={css.partnerLink}>
        <span className={css.name}>{name}</span>
        <span className={css.itemCount}>
        {addCommasToNumber(itemCount)}
      </span>
    </Link>);
}

function mapPartnersToComponents(partners) {
    return partners.map((partner) =>
        <li key={`p_${partner.name}`}>
            <Partner
                name={partner.name}
                itemCount={partner.itemCount}
                facetName={partner.facet}
            />
        </li>
    );
}

function PartnerBrowseContent({partners}) {
    return (<div className={`${utils.container} ${css.partnerBrowse}`}>
        <div className={utils.row}>
            <ul className={`${css.partners} ${utils.colXs12}`}>
                {mapPartnersToComponents(partners)}
            </ul>
        </div>
    </div>);
}

export default PartnerBrowseContent;

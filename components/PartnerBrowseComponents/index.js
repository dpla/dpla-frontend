import React from "react";
import Link from "next/link";

import { addCommasToNumber } from "lib";

import css from "./PartnerBrowseContent.module.scss";
import utils from "stylesheets/utils.module.scss"

const Partner = ({ name, itemCount, facetName, index }) =>
  <Link href={`/search?${facetName}="${encodeURIComponent(name)}"`} className={css.partnerLink}>
      <span className={css.name}>{name}</span>
      <span className={css.itemCount}>
        {addCommasToNumber(itemCount)}
      </span>
  </Link>;

const mapPartnersToComponents = partners =>
  partners.map((partner, index) =>
    <li key={`p_${index}`}>
      <Partner
        name={partner.name}
        itemCount={partner.itemCount}
        facetName={partner.facet}
        index={index}
      />
    </li>
  );

const PartnerBrowseContent = ({ partners }) =>
  <div className={`${utils.container} ${css.partnerBrowse}`}>
    <div className={utils.row}>
      <ul className={`${css.partners} ${utils.colXs12}`}>
        {mapPartnersToComponents(partners)}
      </ul>
    </div>
  </div>;

export default PartnerBrowseContent;

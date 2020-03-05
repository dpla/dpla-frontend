import React from "react";
import Link from "next/link";

import { addCommasToNumber } from "lib";

import utils from "stylesheets/utils.scss";
import css from "./PartnerBrowseContent.scss";

const Partner = ({ name, itemCount, facetName, index }) =>
  <Link href={`/search?${facetName}="${encodeURIComponent(name)}"`}>
    <a className={css.partnerLink}>
      <span className={css.name}>{name}</span>
      <span className={css.itemCount}>
        {addCommasToNumber(itemCount)}
      </span>
    </a>
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

const PartnerBrowseContent = ({ route, partners }) =>
  <div className={`${utils.container} ${css.partnerBrowse}`}>
    <div className={`row`}>
      <ul className={`${css.partners} col-xs-12`}>
        {mapPartnersToComponents(partners)}
      </ul>
    </div>
  </div>;

export default PartnerBrowseContent;

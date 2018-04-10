import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./PartnerBrowseContent.css";

import { addCommasToNumber } from "utilFunctions";

import utils from "stylesheets/utils.scss";

const Partner = ({ name, itemCount, index }) =>
  <Link href={`/search?partner="${name}"`}>
    <a className={classNames.partnerLink}>
      <span className={classNames.name}>{name}</span>
      <span className={classNames.itemCount}>
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
        index={index}
      />
    </li>
  );

const PartnerBrowseContent = ({ route, partners }) =>
  <div className={classNames.wrapper}>
    <div className={`${utils.container} ${classNames.partnerBrowse}`}>
      <div className={`row`}>
        <ul className={`${classNames.partners} col-xs-12`}>
          {mapPartnersToComponents(partners)}
        </ul>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default PartnerBrowseContent;

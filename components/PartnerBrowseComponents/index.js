import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./PartnerBrowseContent.css";

import { addCommasToNumber } from "utilFunctions";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const Partner = ({ name, itemCount }) =>
  <li className={classNames.partner}>
    <Link href={`/search?partner="${name}"`}>
      <a className={classNames.partnerLink}>
        <span className={classNames.name}>
          {name}
        </span>
        <span className={classNames.itemCount}>
          {addCommasToNumber(itemCount)}
        </span>
      </a>
    </Link>
  </li>;

const mapPartnersToComponents = partners =>
  partners.map(partner =>
    <Partner name={partner.name} itemCount={partner.itemCount} />
  );

const PartnerBrowseContent = ({ route, partners }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.partnerBrowse].join(" ")}>
      <div className={[classNames.partnersWrapper, "row"].join(" ")}>
        {/* first half of partners */}
        <ul
          className={[classNames.partners, "col-md-6", "col-xs-12"].join(" ")}
        >
          {mapPartnersToComponents(partners.slice(0, partners.length / 2 - 1))}
        </ul>
        {/* second half of partners */}
        <ul
          className={[classNames.partners, "col-md-6", "col-xs-12"].join(" ")}
        >
          {mapPartnersToComponents(partners.slice(partners.length / 2))}
        </ul>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default PartnerBrowseContent;

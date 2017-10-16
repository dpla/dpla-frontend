import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./RelatedSets.css";
import { classNames as utilClassNames } from "css/utils.css";
import { extractSourceSetSlug } from "utilFunctions/";

const { container } = utilClassNames;

const RelatedSets = ({ sets }) => {
  return (
    <div className={classNames.wrapper}>
      <div className={[container, classNames.relatedSets].join(" ")}>
        <h3 className={classNames.header}>Related Primary Source Sets</h3>
        <div className="row">
          {sets.map((set, index) => (
            <div
              key={`${set.name}-${index}`}
              className="col-12 col-xs-6 col-md-3"
            >
              <Link
                prefetch
                href={`/primary-source-sets/set?set=${extractSourceSetSlug(
                  set["@id"]
                )}`}
                as={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
              >
                <a className={classNames.setLink}>
                  <img
                    alt={set.name}
                    src={set.repImageUrl || set.thumbnailUrl}
                    className={classNames.setImage}
                  />
                  <p className={classNames.title}>{set.name}</p>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default RelatedSets;

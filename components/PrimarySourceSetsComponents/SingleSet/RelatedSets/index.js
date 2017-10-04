import React from "react";

import { stylesheet, classNames } from "./RelatedSets.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const RelatedSets = ({ sets }) =>
  <div className={classNames.wrapper}>
    <div className={[container, classNames.relatedSets].join(" ")}>
      <h3 className={classNames.header}>Related Primary Source Sets</h3>
      <div className={classNames.sets}>
        {sets.map(({ img, name, thumbnailUrl }) =>
          <div className={classNames.set}>
            <img
              alt={name}
              src={thumbnailUrl}
              className={classNames.setImage}
            />
            <p className={classNames.title}>
              {name}
            </p>
          </div>
        )}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default RelatedSets;

import React from "react";

import { stylesheet, classNames } from "./RelatedSets.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const mockSets = [
  {
    img: "http://lorempixel.com/400/200/food",
    title: "New York City"
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "Early Chinese Immigration to the US"
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "Mexican Labor and World War II: The Bracero..."
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "The Impact of Television on News Media"
  }
];

const RelatedSets = () =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.relatedSets].join(" ")}>
      <h3 className={classNames.header}>Related Primary Source Sets</h3>
      <div className={classNames.sets}>
        {mockSets.map(({ img, title }) =>
          <div className={classNames.set}>
            <img alt={title} src={img} className={classNames.setImage} />
            <p className={classNames.title}>
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default RelatedSets;

import React from "react";

import { classNames, stylesheet } from "./Sidebar.css";

// const RelatedResource = ({ type, title, image }) =>
//   <div className={classNames.relatedResource}>
//     <img alt={title} src={image} className={classNames.relatedResourceImage} />
//     <p className={classNames.relatedResourceTitle}>
//       {title}
//     </p>
//     <p className={classNames.relatedResourceType}>
//       {type}
//     </p>
//   </div>;

const Sidebar = ({ image, title, description }) =>
  <div className={classNames.sidebar}>
    <div className={classNames.subtopicInfo}>
      <img src={image} alt={title} className={classNames.image} />
      <div className={classNames.subtopicInfoText}>
        <h2 className={classNames.title}>
          {title}
        </h2>
        <p className={classNames.description}>
          {description}
        </p>
      </div>
    </div>
    {/* <h3 className={classNames.relatedHeader}>You might also enjoy</h3>
    <div className={classNames.relatedResources}>
      <RelatedResource
        type="Exhibition"
        title="Race to the Moon"
        image="http://lorempixel.com/140/100/food"
      />
      <RelatedResource
        type="Exhibition"
        title="Race to the Moon"
        image="http://lorempixel.com/140/100/food"
      />
    </div> */}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;

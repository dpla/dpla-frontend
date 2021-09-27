import React from "react";

import css from "./Sidebar.scss";

// const RelatedResource = ({ type, title, image }) =>
//   <div className={css.relatedResource}>
//     <img alt={title} src={image} className={css.relatedResourceImage} />
//     <p className={css.relatedResourceTitle}>
//       {title}
//     </p>
//     <p className={css.relatedResourceType}>
//       {type}
//     </p>
//   </div>;

const Sidebar = ({ image, title, description }) =>
  <div className={css.sidebar} data-cy={'subtopic-sidebar'}>
    <div className={css.subtopicInfo}>
      <img src={image} alt={title} className={css.image} />
      <div className={css.subtopicInfoText}>
        <h1 className={css.title}>
          {title}
        </h1>
        <p className={css.description}>
          {description}
        </p>
      </div>
    </div>
    {/* <h3 className={css.relatedHeader}>You might also enjoy</h3>
    <div className={css.relatedResources}>
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
  </div>;

export default Sidebar;

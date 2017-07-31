import React from "react";

import styles from "./Sidebar.css";

const RelatedResource = ({ type, title, image }) =>
  <div className={styles.relatedResource}>
    <img alt={title} src={image} className={styles.relatedResourceImage} />
    <p className={styles.relatedResourceTitle}>{title}</p>
    <p className={styles.relatedResourceType}>{type}</p>
  </div>;

const Sidebar = ({ image, title, description }) =>
  <div className={styles.sidebar}>
    <div className={styles.subtopicInfo}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.subtopicInfoText}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
    <h3 className={styles.relatedHeader}>You might also enjoy</h3>
    <div className={styles.relatedResources}>
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
    </div>
  </div>;

export default Sidebar;

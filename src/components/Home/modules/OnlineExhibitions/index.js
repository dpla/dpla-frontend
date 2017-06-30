import React from "react";

import styles from "./OnlineExhibitions.css";

const mockExhibitionsData = [
  {
    text: "Building the First Transcontinental Railroad",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 0,
    isFeatured: true
  },
  {
    text: "Race to the Moon",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 1,
    isFeatured: false
  },
  {
    text: "In Focus: The Evolution of the Personal Camera",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 2,
    isFeatured: false
  }
];

const ExhibitionItem = ({ text, imageUrl, id, isFeatured }) =>
  <li className={styles.item}>
    <img alt={text} className={styles.itemImg} src={imageUrl} />
    <p className={styles.itemText}>{text}</p>
  </li>;

const OnlineExhibitions = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.onlineExhibitions}>
      <h1 className={styles.header}>Online Exhibitions</h1>
      <ul className={styles.items}>
        {mockExhibitionsData.map(({ text, imageUrl, id, isFeatured }) =>
          <ExhibitionItem
            key={id}
            text={text}
            imageUrl={imageUrl}
            id={id}
            isFeatured={isFeatured}
          />
        )}
      </ul>
    </div>
  </div>;

export default OnlineExhibitions;

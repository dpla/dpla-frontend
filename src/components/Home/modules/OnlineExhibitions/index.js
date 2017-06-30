import React from "react";
import Carousel from "nuka-carousel";

import styles from "./OnlineExhibitions.css";

const mockExhibitionsData = [
  {
    text: "In Focus: The Evolution of the Personal Camera",
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
  },
  {
    text: "Design Tenets",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 2,
    isFeatured: false
  }
];

const ExhibitionItem = ({ text, imageUrl, id, isFeatured }) =>
  <div className={styles.item}>
    <img alt={text} className={styles.itemImg} src={imageUrl} />
    <p className={styles.itemText}>{text}</p>
  </div>;

// decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}
const OnlineExhibitions = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.onlineExhibitions}>
      <h1 className={styles.header}>Online Exhibitions</h1>
      <div className={styles.items}>
        <Carousel slidesToShow={3} slidesToScroll="auto" cellSpacing={12}>
          {mockExhibitionsData.map(({ text, imageUrl, id, isFeatured }) =>
            <ExhibitionItem
              key={id}
              text={text}
              imageUrl={imageUrl}
              id={id}
              isFeatured={isFeatured}
            />
          )}
        </Carousel>
      </div>
    </div>
  </div>;

export default OnlineExhibitions;

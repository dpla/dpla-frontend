import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import { stylesheet, classNames } from "./OnlineExhibitions.css";
import { classNames as breakpoints } from "css/breakpoints.css";

const smallChevron = "static/images/chevron-thick-orange.svg";
const largeChevron = "static/images/chevron-thin.svg";
const sampleImage = "static/images/sample-image.jpeg";

const mockExhibitionsData = [
  {
    text: "Building the First Transcontinental Railroad",
    imageUrl: sampleImage,
    id: 0,
    isFeatured: true
  },
  {
    text: "Race to the Moon",
    imageUrl: sampleImage,
    id: 1,
    isFeatured: false
  },
  {
    text: "In Focus: The Evolution of the Personal Camera",
    imageUrl: sampleImage,
    id: 2,
    isFeatured: false
  },
  {
    text: "Design Tenets",
    imageUrl: sampleImage,
    id: 2,
    isFeatured: false
  }
];

const NextArrow = ({ onClick, className }) =>
  <button
    className={`${classNames.arrow} ${classNames.nextArrow} ${className}`}
    onClick={onClick}
  >
    <img alt="Right-pointing arrow" src={largeChevron} />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button
    className={`${classNames.arrow} ${classNames.prevArrow} ${className}`}
    onClick={onClick}
  >
    <img alt="Left-pointing arrow" src={largeChevron} />
  </button>;

const OnlineExhibitions = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.content} site-max-width`}>
      <div className={classNames.heading}>
        <h1 className={classNames.title}>Online Exhibitions</h1>
        <Link href="/exhibitions">
          <a className={classNames.moreLink}>
            <span>
              Browse all{" "}
              <span className={classNames.moreLinkNoun}>Exhibitions</span>
            </span>
            <img
              alt="Browse exhibitions"
              className={classNames.smallChevron}
              src={smallChevron}
            />
          </a>
        </Link>
      </div>
      <Slider
        slidesToShow={3}
        infinite={false}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        draggable={false}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: ~~breakpoints.smallPx,
            settings: {
              slidesToShow: 1.125,
              arrows: false,
              draggable: true
            }
          }
        ]}
      >
        {mockExhibitionsData.map(({ text, imageUrl, id, isFeatured }) =>
          <div className={classNames.item}>
            <img alt={text} className={classNames.itemImg} src={imageUrl} />
            {isFeatured &&
              <div className={classNames.featuredTag}>Featured</div>}
            <p className={classNames.itemText}>
              {text}
            </p>
          </div>
        )}
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OnlineExhibitions;

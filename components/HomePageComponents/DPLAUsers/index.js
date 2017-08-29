import React from "react";

import { stylesheet, classNames } from "./DPLAUsers.css";
const educationImage = "static/placholderImages/education.png";
const familyImage = "static/placholderImages/family.png";
const learningImage = "static/placholderImages/learning.png";
const researchImage = "static/placholderImages/research.png";

const data = [
  {
    title: "Education",
    content: `The DPLA content team creates curated Primary Source Sets, complete
      with teacher’s notes for use in the classroom.`,
    image: educationImage,
    color: "#F7F6F0"
  },
  {
    title: "Family Research",
    content: `Genealogists and historians use search tools and filter controls
      for finding artifacts related to their family or research topic.`,
    image: familyImage,
    color: "#F0F4F6"
  },
  {
    title: "Lifelong Learning",
    content: `Lifelong learners will enjoy browsing Exhibitions or using our
      Topic Browse index to find library artifacts related to their interests.`,
    image: learningImage,
    color: "#F4F0F0"
  },
  {
    title: "Scholarly Research",
    content: `Researchers enjoy using our search tools and filter controls
      for finding artifacts related to their research topic.`,
    image: researchImage,
    color: "#ECF4F0"
  }
];

const DPLAUsers = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.DPLAUsers} site-max-width`}>
      <h1 className={classNames.header}>How can I use DPLA?</h1>
      <div className={classNames.divider} />
      <div className="row">
        {data.map(({ title, content, image, color }, index) => {
          return (
            <div
              className={`${classNames.itemColumn} col-xs-12 col-sm-6 col-lg-3`}
              key={index}
            >
              <div
                className={classNames.item}
                style={{ backgroundColor: color }}
              >
                <img alt={title} className={classNames.itemImg} src={image} />
                <h1 className={classNames.itemHeader}>{title}</h1>
                <p className={classNames.text}>{content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default DPLAUsers;

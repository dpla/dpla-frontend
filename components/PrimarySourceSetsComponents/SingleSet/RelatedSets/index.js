import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import Markdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import { extractSourceSetSlug } from "lib";

import css from "./RelatedSets.module.scss";
import utils from "stylesheets/utils.module.scss";

function RelatedSets({ sets }) {
  const setChildren = sets.map((set, index) => (
    <div key={`${set.name}-${index}`} className={css.item}>
      <Link
        href={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
        className={css.setLink}
      >
        <img
          alt=""
          src={set.repImageUrl || set.thumbnailUrl}
          className={css.setImage}
        />
        <Markdown
          className={css.title}
          allowedElements={["emphasis", "text"]}
          unwrapDisallowed
        >
          {set.name}
        </Markdown>
      </Link>
    </div>
  ));

  return (
    <div className={css.wrapper} data-cy={"pss-relateds"}>
      <div className={`${utils.container} ${css.relatedSets}`}>
        <h2 className={css.header}>Related Primary Source Sets</h2>
        <Slider
          slidesToShow={4.5}
          infinite={false}
          nextArrow={<NextArrow className={css.navArrow} />}
          prevArrow={<PrevArrow className={css.navArrow} />}
          draggable={false}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1.5,
                arrows: false,
                draggable: true,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {setChildren}
        </Slider>
      </div>
    </div>
  );
}

export default RelatedSets;

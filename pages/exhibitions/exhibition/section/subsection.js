import React from "react";
import fetch from "isomorphic-fetch";

import DPLAHead from "../../../../components/DPLAHead";
import SkipToContent from "../../../../components/shared/SkipToContent";
import Content from "../../../../components/ExhibitionsComponents/ExhibitionSection";
import {
  getPreviousQueryParams,
  getNextQueryParams
} from "utilFunctions/exhibitions/getInitialProps";
import { getCurrentUrl } from "utilFunctions";

import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT,
  ITEMS_ENDPOINT
} from "constants/exhibitions";

import { SEO_TYPE } from "constants/exhibition";

const Subsection = ({
  url,
  exhibition,
  section,
  subsection,
  nextQueryParams,
  nextSubsectionTitle,
  previousQueryParams
}) =>
  <div>
    <DPLAHead pageTitle={section.title} seoType={SEO_TYPE} />
    <SkipToContent />
    <Content
      route={url}
      previousQueryParams={previousQueryParams}
      nextQueryParams={nextQueryParams}
      nextSubsectionTitle={nextSubsectionTitle}
      exhibition={exhibition}
      section={section}
      subsection={subsection}
    />
  </div>;

// TODO: refactor this so it isn't so long
Subsection.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);

  const exhibitsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);
  const exhibitsJson = await exhibitsRes.json();
  const exhibition = exhibitsJson.find(
    exhibit => exhibit.slug === query.exhibition
  );
  const exhibitPageRes = await fetch(
    `${currentUrl}${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibition.id}`
  );
  const exhibitPageJson = await exhibitPageRes.json();

  const section = exhibitPageJson.find(page => page.slug === query.section);

  const subsection = !query.subsection
    ? Object.assign({}, section, {
        title: "Introduction",
        order: -1,
        parent: {
          id: section.id,
          resource: "exhibit_pages",
          url: section.url
        }
      })
    : exhibitPageJson.find(page => page.slug === query.subsection);

  const sections = exhibitPageJson
    //filter out subsections and homepage
    .filter(page => !page.parent && page.order > 0)
    .sort((a, b) => a.order - b.order)
    .map(section =>
      Object.assign({}, section, {
        subsections: [
          // each section is basically also an "Introduction" subsection
          // so including it as such makes some of the logic easier
          Object.assign({}, section, {
            title: "Introduction",
            parent: {
              id: section.id,
              resource: "exhibit_pages",
              url: section.url
            },
            order: -1,
            slug: ""
          }),
          ...exhibitPageJson
            .filter(page => page.parent && page.parent.id === section.id)
            .sort((a, b) => a.order - b.order)
        ]
      })
    );

  const previousQueryParams = getPreviousQueryParams(
    sections,
    subsection,
    section,
    query
  );
  const nextQueryParamsAndTitle = getNextQueryParams(
    sections,
    subsection,
    section,
    query
  );

  const page_blocks = await Promise.all(
    subsection.page_blocks
      .sort((a, b) => a.order - b.order)
      // for some reason there is sometimes an extra first page_block
      // that isn't supposed to be first...this seems to fix it
      .filter(
        block =>
          subsection.page_blocks.length === 1 ||
          block.order > 1 ||
          (block.order === 1 && block.text)
      )
      .map(async (block, i) => {
        const itemId = block.attachments[0].item.id;
        const filesRes = await fetch(
          `${currentUrl}${FILES_ENDPOINT}?item=${itemId}`
        );
        const filesJson = await filesRes.json();
        const thumbnailUrl = filesJson[0].file_urls.square_thumbnail;
        const fullsizeImgUrl = filesJson[0].file_urls.fullsize;
        const originalUrl = filesJson[0].file_urls.original;
        const itemRes = await fetch(`${currentUrl}${ITEMS_ENDPOINT}/${itemId}`);
        const itemJson = await itemRes.json();
        const fileType = itemJson.item_type && itemJson.item_type.name;

        return Object.assign({}, block, {
          fullsizeImgUrl,
          thumbnailUrl,
          originalUrl,
          fileType,
          itemJson,
          isActive:
            block.id === parseInt(query.item, 10) || (!query.item && i === 0)
        });
      })
  );

  return {
    exhibition: Object.assign({}, exhibition, { sections }),
    section,
    nextQueryParams: nextQueryParamsAndTitle.queryParams,
    nextSubsectionTitle: nextQueryParamsAndTitle.title,
    previousQueryParams: previousQueryParams.queryParams,
    subsection: Object.assign({}, subsection, { page_blocks })
  };
};

export default Subsection;

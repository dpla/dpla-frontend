import React from "react";
import fetch from "isomorphic-fetch";

import Error from "pages/_error";
import DPLAHead from "components/DPLAHead";
import SkipToContent from "components/shared/SkipToContent";
import Content from "components/ExhibitionsComponents/ExhibitionSection";

import {
  getPreviousQueryParams,
  getNextQueryParams
} from "lib/exhibitions/getInitialProps";
import {
  getCurrentUrl,
  getCurrentFullUrl,
  getDplaItemIdFromExhibit
} from "lib";
import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT,
  ITEMS_ENDPOINT
} from "constants/exhibitions";
import { SEO_TYPE } from "constants/exhibition";
import { API_ENDPOINT } from "constants/items";

const Subsection = ({
  error,
  url,
  exhibition,
  section,
  subsection,
  nextQueryParams,
  nextSubsectionTitle,
  previousQueryParams
}) => {
  if (error) {
    return <Error statusCode={error.statusCode} />;
  }
  return (
    <div>
      <DPLAHead
        pageTitle={section.title}
        seoType={SEO_TYPE}
        pageImage={exhibition.thumbnailUrl}
      />
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
    </div>
  );
};

// TODO: refactor this so it isn't so long
Subsection.getInitialProps = async ({ query, req, res }) => {
  const currentFullUrl = getCurrentFullUrl(req);
  const currentUrl = getCurrentUrl(req);
  ////////
  // check if exhibit is found
  try {
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
          const itemRes = await fetch(
            `${currentUrl}${ITEMS_ENDPOINT}/${itemId}`
          );
          const itemJson = await itemRes.json();
          const fileType = itemJson.item_type && itemJson.item_type.name;

          // Get DPLA item ID
          const dplaItemId = getDplaItemIdFromExhibit(itemJson);

          // Call DPLA API
          const dplaApiRes = await fetch(
            `${currentUrl}${API_ENDPOINT}/${dplaItemId}`
          );
          const dplaItemJson = await dplaApiRes.json();

          return Object.assign({}, block, {
            fullsizeImgUrl,
            thumbnailUrl,
            originalUrl,
            fileType,
            itemJson,
            dplaItemId,
            dplaItemJson,
            isActive:
              block.id === parseInt(query.item, 10) || (!query.item && i === 0)
          });
        })
    );
    // Get homepage item file
    const sortedExhibitPages = exhibitPageJson
      .filter(exhibition => !exhibition.parent)
      .sort((a, b) => a.order - b.order);

    // just in case order isn't consistent, try checking the slug first
    const homePage =
      sortedExhibitPages.find(
        exhibit => exhibit.slug === "home-page" || exhibit.slug === "homepage"
      ) || sortedExhibitPages[0];

    const { item } = homePage.page_blocks[0].attachments[0];
    const filesRes = await fetch(
      `${currentUrl}${FILES_ENDPOINT}?item=${item.id}`
    );
    const filesJson = await filesRes.json();
    const thumbnailUrl = filesJson[0].file_urls.fullsize;
    return {
      exhibition: Object.assign({}, exhibition, {
        sections,
        thumbnailUrl
      }),
      section,
      nextQueryParams: nextQueryParamsAndTitle.queryParams,
      nextSubsectionTitle: nextQueryParamsAndTitle.title,
      previousQueryParams: previousQueryParams.queryParams,
      subsection: Object.assign({}, subsection, { page_blocks })
    };
  } catch (error) {
    if (res) {
      res.statusCode = 404;
    }
    return { error: { statusCode: 404 } };
  }
};

export default Subsection;

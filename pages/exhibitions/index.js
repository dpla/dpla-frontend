import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import AllExhibitions from "components/ExhibitionsComponents/AllExhibitions";
import Footer from "components/ExhibitionsComponents/Footer";
import { getCurrentUrl } from "utilFunctions";
import {
  TITLE,
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";

const Exhibitions = ({ url, exhibitions }) =>
  <MainLayout route={url} pageTitle={TITLE}>
    <div id="main" role="main">
      <AllExhibitions route={url} exhibitions={exhibitions} />
    </div>
    <Footer />
  </MainLayout>;

Exhibitions.getInitialProps = async ({ req }) => {
  const currentUrl = getCurrentUrl(req);
  const exhibitsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);
  const exhibitsJson = await exhibitsRes.json();
  let exhibitions = [];
  if (exhibitsJson.length > 0) {
    exhibitions = await Promise.all(
      exhibitsJson
        .map(async exhibit => {
          const exhibitPageRes = await fetch(
            `${currentUrl}${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibit.id}`
          );
          const exhibitJson = await exhibitPageRes.json();

          // get TOC for featured
          const sectionInfo = exhibitJson
            .filter(exhibition => !exhibition.parent)
            .sort((a, b) => a.order - b.order);

          const sections = sectionInfo.slice(1).map(section => section.title);

          const abstract = `In this exhibition: ${sections.join(", ")}.`;

          const pageBlock = exhibitJson.find(
            exhibit =>
              exhibit.slug === "home-page" ||
              exhibit.slug === "homepage" ||
              exhibit.order === 0
          ).page_blocks[0];

          const itemId = pageBlock.attachments[0].item.id;
          const filesRes = await fetch(
            `${currentUrl}${FILES_ENDPOINT}?item=${itemId}`
          );
          const filesJson = await filesRes.json();

          const thumbnailUrl = filesJson[0].file_urls.square_thumbnail;
          return Object.assign({}, exhibit, {
            thumbnailUrl,
            abstract
          });
        })
        .reverse()
    );
  }

  return { exhibitions };
};

export default Exhibitions;

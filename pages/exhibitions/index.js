import React from "react";

import MainLayout from "../../components/MainLayout";
import AllExhibitions from "../../components/ExhibitionsComponents/AllExhibitions";
import Footer from "../../components/ExhibitionsComponents/Footer";
import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";

const Exhibitions = ({ url, exhibitions }) =>
  <MainLayout route={url}>
    <AllExhibitions route={url} exhibitions={exhibitions} />
    <Footer />
  </MainLayout>;

Exhibitions.getInitialProps = async () => {
  const exhibitsRes = await fetch(EXHIBITS_ENDPOINT);

  const exhibitsJson = await exhibitsRes.json();
  const exhibitions = await Promise.all(
    exhibitsJson.map(async exhibit => {
      const exhibitPageRes = await fetch(
        `${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibit.id}`
      );
      const exhibitJson = await exhibitPageRes.json();

      const itemId = exhibitJson[0].page_blocks[0].attachments[0].item.id;
      const filesRes = await fetch(`${FILES_ENDPOINT}?item=${itemId}`);
      const filesJson = await filesRes.json();

      const thumbnailUrl = filesJson[0].file_urls.fullsize;
      return Object.assign({}, exhibit, { thumbnailUrl });
    })
  );

  return { exhibitions };
};

export default Exhibitions;

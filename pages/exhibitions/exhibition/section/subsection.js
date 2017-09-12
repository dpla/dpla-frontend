import React from "react";
import fetch from "isomorphic-fetch";

import Head from "../../../../components/Head";
import Content from "../../../../components/ExhibitionsComponents/ExhibitionSection";

import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";

const Subsection = ({ url, exhibition, section, subsection }) =>
  <div>
    <Head />
    <Content
      exhibition={exhibition}
      section={section}
      subsection={subsection}
    />
  </div>;

Subsection.getInitialProps = async ({ query }) => {
  const exhibitsRes = await fetch(EXHIBITS_ENDPOINT);
  const exhibitsJson = await exhibitsRes.json();
  const exhibition = exhibitsJson.find(
    exhibit => exhibit.slug === query.exhibition
  );

  const exhibitPageRes = await fetch(
    `${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibition.id}`
  );
  const exhibitPageJson = await exhibitPageRes.json();
  const section = exhibitPageJson.find(page => page.slug === query.section);
  const subsection = !query.subsection
    ? Object.assign({}, section, { title: "Introduction" })
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
          Object.assign({}, section, { title: "Introduction" }),
          ...exhibitPageJson.filter(
            page => page.parent && page.parent.id === section.id
          )
        ]
      })
    );

  // const subsection = subsections.find(
  //   subsection => subsection.slug === query.subsection
  // );

  // const filesRes = await fetch(`${FILES_ENDPOINT}?item=${itemId}`);
  // const filesJson = await filesRes.json();
  // const thumbnailUrl = filesJson[0].file_urls.fullsize;
  // console.dir({
  //   exhibition: Object.assign({}, exhibition, { sections: sections })
  // });
  return {
    exhibition: Object.assign({}, exhibition, { sections }),
    section,
    subsection
  };
};

export default Subsection;

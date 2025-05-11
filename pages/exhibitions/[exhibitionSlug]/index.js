import React from "react";
import {
  exhibitParentPages,
  exhibitHomePage,
  loadDplaItem,
  loadExhibitionList,
  loadExhibition,
} from "lib/exhibitionsStatic";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ImageAndCaption from "components/ExhibitionsComponents/Exhibition/ImageAndCaption";
import Details from "components/ExhibitionsComponents/Exhibition/Details";

import { SEO_TYPE } from "constants/exhibition";

import { getDplaItemIdFromExhibit } from "lib";

import { washObject } from "lib/washObject";

class Exhibition extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.focus();
  }

  render() {
    const {
      thumbnailUrl,
      title,
      sections,
      slug,
      caption,
      dplaItemJson,
      dplaItemId,
      description,
      text,
      credits,
    } = this.props;
    return (
      <MainLayout
        pageImage={thumbnailUrl}
        pageTitle={title.replace(/\*/g, "")}
        seoType={SEO_TYPE}
      >
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "Exhibitions",
              url: "/exhibitions",
            },
            { title, search: "" },
          ]}
        />
        <div id="main" role="main" data-testid="exhibition-home">
          <ImageAndCaption
            title={title}
            thumbnailUrl={thumbnailUrl}
            sectionSlug={sections[0].slug}
            slug={slug}
            caption={caption}
          />
          <Details
            slug={slug}
            sections={sections}
            description={description}
            title={title}
            text={text}
            credits={credits}
            dplaItemId={dplaItemId}
            dplaItemJson={dplaItemJson}
          />
        </div>
      </MainLayout>
    );
  }
}

export async function getStaticPaths() {
  const exhibitions = await loadExhibitionList();
  const exhibitionSlugs = exhibitions.exhibitions.map((exhibition) => {
    return exhibition.slug;
  });
  const paths = exhibitionSlugs.map((exhibitionSlug) => {
    return { params: { exhibitionSlug } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const exhibition = await loadExhibition(context.params.exhibitionSlug);
  const sortedExhibitPages = exhibitParentPages(exhibition);
  const homePage = exhibitHomePage(exhibition);
  const sectionList = sortedExhibitPages.map((page) => ({
    title: page.title,
    slug: page.slug,
  }));
  const { text } = homePage.page_blocks[0];
  const { caption, item } = homePage.page_blocks[0].attachments[0];
  const homeFile = homePage.page_blocks[0].attachments[0].files[0];
  const thumbnailUrl = homeFile.file_urls.fullsize;
  const dplaItemId = getDplaItemIdFromExhibit(item);
  const dplaItemJson = loadDplaItem(dplaItemId);

  const props = washObject({
    thumbnailUrl,
    title: exhibition.title,
    sections: sectionList,
    slug: exhibition.slug,
    caption,
    dplaItemJson,
    dplaItemId,
    description: exhibition.description,
    text,
    credits: exhibition.credits,
  });

  return { props };
}

export default Exhibition;

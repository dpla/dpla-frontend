import {
  exhibitPageSubpages,
  exhibitParentPages,
  findPage,
  loadExhibition,
  processPageBlocks,
} from "lib/exhibitionsStatic";
import { washObject } from "lib/washObject";
import ExhibitionPage from "components/ExhibitionsComponents/ExhibitionSection/ExhibitionPage";

export async function getServerSideProps(context) {
  if (!context?.query?.item) {
    Object.assign(context, { query: { item: "-1" } });
  }
  let exhibit;
  try {
    exhibit = await loadExhibition(context.params.exhibitionSlug);
  } catch (e) {
    return { notFound: true };
  }
  const section = findPage(exhibit, context.params.sectionSlug);
  if (section == null || section.parent) return { notFound: true };
  const sections = exhibitParentPages(exhibit);
  section.page_blocks = await processPageBlocks(section, context.query.item);
  if (!section.page_blocks.find((block) => block.isActive))
    return { notFound: true };
  const subsections = exhibitPageSubpages(exhibit, section);
  const isFirstSection = section.slug === sections[0].slug;
  const isLastPage =
    sections[sections.length - 1].slug === section.slug &&
    (!subsections || subsections.length === 0);
  let previousQueryParams = {};
  const nextQueryParamsAndTitle = {};

  if (!isFirstSection) {
    const previousSection = sections.find((s) => s.order === section.order - 1);
    const previousSectionSubsections = exhibitPageSubpages(
      exhibit,
      previousSection,
    );
    if (previousSectionSubsections && previousSectionSubsections.length > 0) {
      const previousSectionFinalSubsection =
        previousSectionSubsections[previousSectionSubsections.length - 1];
      Object.assign(previousQueryParams, {
        exhibitionSlug: exhibit.slug,
        sectionSlug: previousSection.slug,
        subsectionSlug: previousSectionFinalSubsection.slug,
      });
    } else {
      // some sections don't have subsections
      Object.assign(previousQueryParams, {
        exhibitionSlug: exhibit.slug,
        sectionSlug: previousSection.slug,
      });
    }
  } else {
    previousQueryParams = null;
  }

  if (!isLastPage && subsections && subsections.length > 0) {
    Object.assign(
      nextQueryParamsAndTitle,
      { title: subsections[0].title },
      {
        queryParams: {
          exhibitionSlug: exhibit.slug,
          sectionSlug: section.slug,
          subsectionSlug: subsections[0].slug,
        },
      },
    );
  } else {
    // some sections don't have subsections
    const nextSection = sections.find((s) => s.order === section.order + 1);
    if (nextSection) {
      Object.assign(
        nextQueryParamsAndTitle,
        { title: nextSection.title },
        {
          queryParams: {
            exhibitionSlug: exhibit.slug,
            sectionSlug: nextSection.slug,
          },
        },
      );
    }
  }

  const pageMap = (page) => ({
    id: page.id,
    title: page.title,
    slug: page.slug,
  });
  const sectionMap = sections.map(pageMap);
  const subsectionMap = [
    {
      id: section.id,
      title: "Introduction",
      slug: "",
    },
  ].concat(subsections.map(pageMap));
  const props = washObject({
    exhibitionTitle: exhibit.title,
    section,
    subsection: section,
    sectionMap,
    subsectionMap,
    exhibitionSlug: exhibit.slug,
    nextQueryParams: nextQueryParamsAndTitle?.queryParams,
    nextSubsectionTitle: nextQueryParamsAndTitle?.title,
    previousQueryParams: previousQueryParams,
  });

  return { props };
}

export default ExhibitionPage;

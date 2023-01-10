import {
    exhibitPageSubpages,
    exhibitParentPages,
    findPage,
    loadExhibition,
    processPageBlocks
} from "lib/exhibitions/exhibitionsStatic";
import { washObject } from "lib/washObject";
import ExhibitionPage from "components/ExhibitionsComponents/ExhibitionSection/ExhibitionPage";


export const getServerSideProps = async (context) => {
    if (!context?.query?.item) {
        Object.assign(context, { query: { item: "-1" } });
    }
    let exhibit = {};
    try {
        exhibit = await loadExhibition(context.params.exhibitionSlug);
    } catch (e) {
        return { notFound: true }
    }
    const section = findPage(exhibit, context.params.sectionSlug);
    if (section == null || section.parent) {
        return { notFound: true }
    }
    const subsection = exhibitPageSubpages(exhibit, section)
        .find(subsection => subsection.slug === context.params.subsectionSlug)

    if (
        subsection == null
        || !subsection.parent
        || subsection.parent.id !== section.id
    ) {
        return { notFound: true }
    }
    subsection.page_blocks = await processPageBlocks(subsection, context.query.item);
    if (!subsection.page_blocks.find(block => block.isActive)) return { notFound: true }

    const sections = exhibitParentPages(exhibit);
    const subsections = exhibitPageSubpages(exhibit, section);
    const previousSubpage = subsection.order !== subsections[0].order
        ? subsections.find(s => s.order === subsection.order - 1)
        : null;

    const previousQueryParams = {}

    if (!previousSubpage) {
        Object.assign(previousQueryParams, {
            exhibitionSlug: exhibit.slug,
            sectionSlug: section.slug,
        });
    } else {
        Object.assign(previousQueryParams, {
            exhibitionSlug: exhibit.slug,
            sectionSlug: section.slug,
            subsectionSlug: previousSubpage.slug
        });
    }

    const nextQueryParamsAndTitle = {};

    const isLastPage =
        sections[sections.length - 1].slug === section.slug
        && (
            !subsections
            || subsections.length === 0
            || subsections[subsections.length - 1].slug === subsection.slug
        );

    if (!isLastPage) {
        if (subsections[subsections.length - 1].slug === subsection.slug) {
            //last page in section, move to next section
            const nextSection = sections.find(s => s.order === section.order + 1);
            Object.assign(nextQueryParamsAndTitle, {
                queryParams: {
                    exhibitionSlug: exhibit.slug,
                    sectionSlug: nextSection.slug
                },
                title: nextSection.title
            });
        } else {
            const nextSubsection = subsections.find(s => s.order === subsection.order + 1);
            Object.assign(nextQueryParamsAndTitle, {
                queryParams: {
                    exhibitionSlug: exhibit.slug,
                    sectionSlug: section.slug,
                    subsectionSlug: nextSubsection.slug
                },
                title: nextSubsection.title
            });
        }
    }

    const pageMap = page => ({ id: page.id, title: page.title, slug: page.slug })
    const sectionMap = sections.map(pageMap);
    const subsectionMap = [{
        id: section.id, title: "Introduction", slug: ""
    }].concat(subsections.map(pageMap));

    const props = washObject({
        section,
        subsection,
        sectionMap,
        subsectionMap,
        exhibitionSlug: exhibit.slug,
        exhibitionTitle: exhibit.title,
        nextQueryParams: nextQueryParamsAndTitle?.queryParams,
        nextSubsectionTitle: nextQueryParamsAndTitle?.title,
        previousQueryParams: previousQueryParams,
    });

    return { props };
};

export default ExhibitionPage;
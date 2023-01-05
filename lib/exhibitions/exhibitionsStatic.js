import {promises as fs} from "fs";
import path from "path";
import fetch from "isomorphic-fetch";
import {getDplaItemIdFromExhibit} from "../index";
import DPLAHead from "../../components/DPLAHead";
import {SEO_TYPE} from "../../constants/exhibition";
import SkipToContent from "../../components/shared/SkipToContent";
import Content from "../../components/ExhibitionsComponents/ExhibitionSection";

export const loadExhibitionList = async () => {
    return await loadExhibitFile("exhibitions.json")
}

// this function assumes the exhibit exists. proceed with caution!
export const loadExhibition = async (slug) => {
    return (slug === "exhibitions")
        ? null
        : await loadExhibitFile(`${slug}.json`);
}

const sortFun = (a, b) => a.order - b.order;

export const exhibitHomePage = exhibition => {
    const sortedExhibitPages = exhibition.pages
        .filter(exhibition => !exhibition.parent)
        .sort(sortFun);
    return sortedExhibitPages.find(
        exhibit =>
            exhibit.slug === "home-page"
            || exhibit.slug === "homepage"
    ) || sortedExhibitPages[0];
}

export const findPage = (exhibit, pageSlug) =>
    exhibit.pages.find(page => page.slug === pageSlug);

export const loadDplaItem = async dplaItemId => {
    const dplaApiRes = await fetch(`https://api.dp.la/v2/items/${dplaItemId}?api_key=${process.env.API_KEY}`);
    return dplaApiRes.status === 200 ? await dplaApiRes.json() : null;
}

export const exhibitParentPages = exhibit => {
    const home = exhibitHomePage(exhibit);
    return exhibit.pages
        .filter(p => p.parent === null)
        .filter(p => p.slug !== home.slug)
        .sort(sortFun);
}

const loadExhibitFile = async (filename) => {
    const root = process.cwd();
    const filePath = path.join(root, "exhibitions-data", filename);
    const exhibitionsText = await fs.readFile(filePath, "utf-8");
    return await JSON.parse(exhibitionsText);
}

export const exhibitPageSubpages = (exhibit, page) => {
    return exhibit.pages.filter(p => {
        return p.parent !== null && p.parent.id === page.id
    }).sort((a, b) => a.order - b.order);
}

export const processPageBlocks = async (page, activeBlockId) => {
    return await Promise.all(page.page_blocks
        .sort((a, b) => a.order - b.order)
        // for some reason there is sometimes an extra first page_block
        // that isn't supposed to be first...this seems to fix it
        .filter(block =>
            page.page_blocks.length === 1
            || block.order > 1
            || (block.order === 1 && block.text)
        )
        .map(async (block, i) => {
            const filesJson = block.attachments[0].files
            const thumbnailUrl = filesJson[0].file_urls.square_thumbnail;
            const fullsizeImgUrl = filesJson[0].file_urls.fullsize;
            const originalUrl = filesJson[0].file_urls.original;
            const itemJson = block.attachments[0].item
            const fileType = itemJson.item_type && itemJson.item_type.name;

            // Get DPLA item ID
            const dplaItemId = getDplaItemIdFromExhibit(itemJson);
            const dplaItemJson = await loadDplaItem(dplaItemId);

            return Object.assign({}, block, {
                fullsizeImgUrl,
                thumbnailUrl,
                originalUrl,
                fileType,
                dplaItemId,
                dplaItemJson,
                isActive:
                    activeBlockId === "-1"
                        ? i === 0
                        : parseInt(activeBlockId) === block.id

            });
        })
    );
}

export const drawExhibitionPage = ({
                                       section,
                                       subsection,
                                       sectionMap,
                                       subsectionMap,
                                       exhibitionTitle,
                                       exhibitionSlug,
                                       previousQueryParams,
                                       nextQueryParams,
                                       nextSubsectionTitle
                                   }) => (
    <div>
        <DPLAHead
            pageTitle={section.title}
            seoType={SEO_TYPE}
        />
        <SkipToContent/>
        <Content
            previousQueryParams={previousQueryParams}
            nextQueryParams={nextQueryParams}
            nextSubsectionTitle={nextSubsectionTitle}
            section={section}
            exhibitionSlug={exhibitionSlug}
            exhibitionTitle={exhibitionTitle}
            subsection={subsection}
            sectionMap={sectionMap}
            subsectionMap={subsectionMap}
        />
    </div>
);

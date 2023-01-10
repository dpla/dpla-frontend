import DPLAHead from "components/DPLAHead";
import {SEO_TYPE} from "constants/exhibition";
import SkipToContent from "shared/SkipToContent";
import Content from "components/ExhibitionsComponents/ExhibitionSection/index";

const ExhibitionPage = ({
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

export default ExhibitionPage;
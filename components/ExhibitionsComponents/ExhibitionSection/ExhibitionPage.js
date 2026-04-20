import DPLAHead from "components/DPLAHead";
import { SEO_TYPE } from "constants/exhibition";
import SkipToContent from "shared/SkipToContent";
import Content from "components/ExhibitionsComponents/ExhibitionSection/index";

function ExhibitionPage({
  section,
  subsection,
  sectionMap,
  subsectionMap,
  exhibitionTitle,
  exhibitionSlug,
  previousQueryParams,
  nextQueryParams,
  nextSubsectionTitle,
  prevUrl,
  nextUrl,
}) {
  const headLinks = [
    prevUrl && <link key="prev" rel="prev" href={prevUrl} />,
    nextUrl && <link key="next" rel="next" href={nextUrl} />,
  ].filter(Boolean);

  return (
    <div>
      <DPLAHead
        pageTitle={section.title}
        seoType={SEO_TYPE}
        additionalLinks={headLinks.length ? headLinks : undefined}
      />
      <SkipToContent />
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
}

export default ExhibitionPage;

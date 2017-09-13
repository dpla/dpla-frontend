const getNextOrPreviousQueryParams = (
  sections,
  subsection,
  section,
  query,
  nextOrPrevious = "next"
) => {
  const incrementer = nextOrPrevious === "previous" ? -1 : 1;
  const currentSection = sections.find(s => s.id === section.id);
  const nextOrPreviousSect = sections.find(
    s => s.order === section.order + incrementer
  );
  const subsectInCurrentSect =
    currentSection &&
    currentSection.subsections.find(
      sub => sub.order === subsection.order + incrementer
    );

  let subsectInNextOrPrevSect;
  if (!subsectInCurrentSect) {
    subsectInNextOrPrevSect =
      nextOrPreviousSect &&
      nextOrPreviousSect.subsections.sort(
        (a, b) => nextOrPrevious === a.order - b.order
      )[
        nextOrPrevious === "previous"
          ? nextOrPreviousSect.subsections.length - 1
          : 0
      ];
  }

  let queryParamsAndTitle;
  if (subsectInCurrentSect || subsectInNextOrPrevSect) {
    queryParamsAndTitle = {
      queryParams: {
        exhibition: query.exhibition,
        section: subsectInCurrentSect
          ? currentSection.slug
          : nextOrPreviousSect.slug,
        subsection: subsectInCurrentSect
          ? subsectInCurrentSect.slug
          : subsectInNextOrPrevSect.slug
      },
      title: subsectInCurrentSect
        ? subsectInCurrentSect.title
        : subsectInNextOrPrevSect.title === "Introduction"
          ? nextOrPreviousSect.title
          : subsectInNextOrPrevSect.title
    };
  } else {
    queryParamsAndTitle = {};
  }

  return queryParamsAndTitle;
};

const getPreviousQueryParams = (sections, subsection, section, query) =>
  getNextOrPreviousQueryParams(
    sections,
    subsection,
    section,
    query,
    "previous"
  );
const getNextQueryParams = (sections, subsection, section, query) =>
  getNextOrPreviousQueryParams(sections, subsection, section, query, "next");

export { getPreviousQueryParams, getNextQueryParams };

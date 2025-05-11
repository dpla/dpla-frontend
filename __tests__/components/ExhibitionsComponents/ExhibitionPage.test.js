import React from "react";
import { render, screen } from "@testing-library/react";
import ExhibitionPage from "components/ExhibitionsComponents/ExhibitionSection/ExhibitionPage";

jest.mock("components/DPLAHead", () => {
  return function MockDPLAHead({ pageTitle }) {
    return <div data-testid="dpla-head">{pageTitle}</div>;
  };
});

jest.mock("shared/SkipToContent", () => {
  return function MockSkipToContent() {
    return <div data-testid="skip-to-content">Skip to Content</div>;
  };
});

jest.mock("components/ExhibitionsComponents/ExhibitionSection/index", () => {
  return function MockContent(props) {
    return (
      <div data-testid="exhibition-content">
        <div data-testid="section-title">{props.section.title}</div>
        <div data-testid="exhibition-title">{props.exhibitionTitle}</div>
      </div>
    );
  };
});

describe("ExhibitionPage", () => {
  const mockProps = {
    section: {
      title: "Test Section",
    },
    subsection: {
      title: "Test Subsection",
    },
    sectionMap: {
      "test-section": { title: "Test Section" },
    },
    subsectionMap: {
      "test-subsection": { title: "Test Subsection" },
    },
    exhibitionTitle: "Test Exhibition",
    exhibitionSlug: "test-exhibition",
    previousQueryParams: { page: "prev" },
    nextQueryParams: { page: "next" },
    nextSubsectionTitle: "Next Subsection",
  };

  it("renders the main structure correctly", () => {
    render(<ExhibitionPage {...mockProps} />);

    expect(screen.getByTestId("dpla-head")).toBeInTheDocument();
    expect(screen.getByTestId("skip-to-content")).toBeInTheDocument();
    expect(screen.getByTestId("exhibition-content")).toBeInTheDocument();
  });

  it("passes correct title to DPLAHead", () => {
    render(<ExhibitionPage {...mockProps} />);

    const head = screen.getByTestId("dpla-head");
    expect(head).toHaveTextContent("Test Section");
  });

  it("passes all required props to Content component", () => {
    render(<ExhibitionPage {...mockProps} />);

    const content = screen.getByTestId("exhibition-content");
    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Test Section",
    );
    expect(screen.getByTestId("exhibition-title")).toHaveTextContent(
      "Test Exhibition",
    );
    expect(content).toBeInTheDocument();
  });
});

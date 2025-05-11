import React from "react";
import { render, screen } from "@testing-library/react";
import FooterNav from "../../../components/ExhibitionsComponents/ExhibitionSection/FooterNav";

jest.mock("next/link", () => {
  return ({ children, href }) => {
    return (
      <a href={href} onClick={(e) => e.preventDefault()}>
        {children}
      </a>
    );
  };
});

describe("FooterNav", () => {
  const mockProps = {
    nextQueryParams: {
      exhibitionSlug: "test-exhibition",
      sectionSlug: "next-section",
      subsectionSlug: "next-subsection",
    },
    previousQueryParams: {
      exhibitionSlug: "test-exhibition",
      sectionSlug: "previous-section",
      subsectionSlug: "previous-subsection",
    },
    nextSubsectionTitle: "Next Section Title",
  };

  it("renders navigation buttons with correct links", () => {
    render(<FooterNav {...mockProps} />);

    // Check previous button
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeInTheDocument();
    expect(previousButton.closest("a")).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition/previous-section/previous-subsection"
    );

    // Check next button
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.closest("a")).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition/next-section/next-subsection"
    );
  });

  it("renders the DPLA logo with correct link", () => {
    render(<FooterNav {...mockProps} />);
    const logo = screen.getByTitle("Digital Public Library of America");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders the next subsection title when provided", () => {
    render(<FooterNav {...mockProps} />);
    expect(screen.getByText("Next Section Title")).toBeInTheDocument();
  });

  it("renders disabled buttons when query params are not provided", () => {
    render(<FooterNav nextQueryParams={null} previousQueryParams={null} />);

    const previousButton = screen.getByText("Previous").closest(".prevButton");
    const nextButton = screen.getByText("Next").closest(".nextButton");

    // Verify that buttons are rendered as spans (disabled) instead of links
    expect(previousButton.tagName).toBe("SPAN");
    expect(nextButton.tagName).toBe("SPAN");
    // Verify the disabled class is applied
    expect(previousButton).toHaveClass("disabledButton");
    expect(nextButton).toHaveClass("disabledButton");
  });

  it("handles missing subsectionSlug correctly", () => {
    const propsWithoutSubsection = {
      ...mockProps,
      nextQueryParams: {
        exhibitionSlug: "test-exhibition",
        sectionSlug: "next-section",
      },
    };

    render(<FooterNav {...propsWithoutSubsection} />);

    const nextButton = screen.getByText("Next");
    expect(nextButton.closest("a")).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition/next-section/"
    );
  });
});

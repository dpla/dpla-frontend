import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "../../../components/ExhibitionsComponents/ExhibitionSection/Sidebar";

describe("Sidebar", () => {
  const mockProps = {
    currentSection: {
      id: "section1",
      title: "Section 1",
      slug: "section-1",
    },
    currentSubsection: {
      id: "subsection1",
      title: "Subsection 1",
      slug: "subsection-1",
    },
    isShowing: false,
    sectionMap: [
      {
        id: "section1",
        title: "Section 1",
        slug: "section-1",
      },
      {
        id: "section2",
        title: "Section 2",
        slug: "section-2",
      },
    ],
    subsectionMap: [
      {
        id: "subsection1",
        title: "Subsection 1",
        slug: "subsection-1",
      },
      {
        id: "subsection2",
        title: "Subsection 2",
        slug: "subsection-2",
      },
    ],
    exhibitionSlug: "test-exhibition",
  };

  it("renders all sections", () => {
    render(<Sidebar {...mockProps} />);

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("renders subsections only for active section", () => {
    const { unmount } = render(<Sidebar {...mockProps} />);

    // Should show subsections for the active section
    expect(screen.getByText("Subsection 1")).toBeInTheDocument();
    expect(screen.getByText("Subsection 2")).toBeInTheDocument();

    // Cleanup previous render
    unmount();

    // Render with a different active section
    render(
      <Sidebar
        {...mockProps}
        currentSection={{
          id: "section2",
          title: "Section 2",
          slug: "section-2",
        }}
        currentSubsection={{
          id: "subsection1",
          title: "Subsection 1",
          slug: "subsection-1",
        }}
      />
    );

    // Subsections for previous section should not be visible
    const section1Subsections = screen.queryByRole("list", {
      name: "Section 1 subsections",
    });
    expect(section1Subsections).not.toBeInTheDocument();
  });

  it("applies active class to current section and subsection", () => {
    const { container } = render(<Sidebar {...mockProps} />);

    const activeSection = container.querySelector(".active");
    expect(activeSection).toHaveTextContent("Section 1");

    const activeSubsection = container.querySelectorAll(".active")[1];
    expect(activeSubsection).toHaveTextContent("Subsection 1");
  });

  it("toggles sidebar visibility based on isShowing prop", () => {
    const { container, rerender } = render(<Sidebar {...mockProps} />);

    // Initially sidebar should not have overlayActive class
    expect(container.firstChild).not.toHaveClass("overlayActive");

    // Rerender with isShowing true
    rerender(<Sidebar {...mockProps} isShowing={true} />);

    // Sidebar should now have overlayActive class
    expect(container.firstChild).toHaveClass("overlayActive");
  });

  it("generates correct links for sections and subsections", () => {
    const { container } = render(<Sidebar {...mockProps} />);

    const sectionLinks = container.querySelectorAll("a");

    // Check section link
    expect(sectionLinks[0]).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition/section-1"
    );

    // Check subsection link
    expect(sectionLinks[1]).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition/section-1/subsection-1"
    );
  });
});

import React from "react";
import { render, screen } from "../../utils/test-utils";
import DPLAUsers from "components/HomePageComponents/DPLAUsers";

describe("DPLAUsers", () => {
  const mockGuides = [
    {
      slug: "genealogy",
      title: "Genealogy Research",
      displayTitle: "Genealogy Research",
      summary: "Learn how to search for family history records",
      illustration: {
        url: "/static/images/genealogy.svg",
        alt: "Genealogy Research Icon",
      },
    },
    {
      slug: "education",
      title: "Education",
      displayTitle: "Education Resources",
      summary: "Find primary sources for teaching",
      illustration: {
        url: "/static/images/education.svg",
        alt: "Education Icon",
      },
    },
  ];

  it("renders guides section with title", () => {
    render(<DPLAUsers guides={mockGuides} />);
    expect(screen.getByText("How can I use DPLA?")).toBeInTheDocument();
  });

  it("renders all guides", () => {
    render(<DPLAUsers guides={mockGuides} />);
    mockGuides.forEach((guide) => {
      expect(screen.getByText(guide.displayTitle)).toBeInTheDocument();
      expect(screen.getByText(guide.summary)).toBeInTheDocument();
    });
  });

  it("renders the caption text", () => {
    const { container } = render(<DPLAUsers guides={mockGuides} />);
    const paragraph = container.querySelector(".caption p");
    expect(paragraph).toBeInTheDocument();

    // Convert both strings to plain text without any special characters
    const actualText = paragraph.textContent
      .trim()
      .replace(/[\u2018\u2019]/g, "'") // Convert smart quotes to regular quotes
      .replace(/\s+/g, " "); // Normalize whitespace
    const expectedText =
      "If you're new to DPLA, these research guides will give you a head start using our site. The guides reflect a few key activities that attract visitors to DPLA, but you can explore many other interests here too."
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/\s+/g, " ");

    expect(actualText).toBe(expectedText);
  });

  it("renders view all guides button", () => {
    render(<DPLAUsers guides={mockGuides} />);
    const button = screen.getByText("View all user guides");
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/guides");
  });

  it("applies correct data-testid attribute", () => {
    const { container } = render(<DPLAUsers guides={mockGuides} />);
    expect(
      container.querySelector('[data-testid="guides"]'),
    ).toBeInTheDocument();
  });
});

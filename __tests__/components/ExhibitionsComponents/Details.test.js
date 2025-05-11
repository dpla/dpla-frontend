import React from "react";
import { render, screen } from "@testing-library/react";
import Details from "../../../components/ExhibitionsComponents/Exhibition/Details";

describe("Details", () => {
  const mockProps = {
    slug: "test-exhibition",
    sections: [
      {
        title: "Test Section 1",
        slug: "test-section-1",
      },
      {
        title: "Test Section 2",
        slug: "test-section-2",
      },
    ],
    description: "Test exhibition description",
    title: "Test Exhibition",
    text: "<p>Test exhibition text</p>",
    credits: "Test credits",
    dplaItemJson: {
      docs: [
        {
          sourceResource: {
            title: "Test Item",
          },
          dataProvider: {
            name: "Test Provider",
          },
          provider: {
            name: "Test Partner",
          },
        },
      ],
    },
    dplaItemId: "test-item-id",
  };

  beforeEach(() => {
    // Reset mock event tracking between tests
    window.gtag = jest.fn();
  });

  it("renders the table of contents with correct sections", () => {
    render(<Details {...mockProps} />);

    // Check if table of contents header is present
    expect(screen.getByText("In This Exhibition")).toBeInTheDocument();

    // Check if all sections are listed
    expect(screen.getByText("Test Section 1")).toBeInTheDocument();
    expect(screen.getByText("Test Section 2")).toBeInTheDocument();
  });

  it("renders the main content with text and credits", () => {
    render(<Details {...mockProps} />);

    // Check if exhibition text is rendered
    const bodyText = screen.getByText("Test exhibition text");
    expect(bodyText).toBeInTheDocument();

    // Check if credits are rendered
    expect(screen.getByText("Credit:")).toBeInTheDocument();
    expect(screen.getByText("Test credits")).toBeInTheDocument();
  });

  it("renders the explore exhibition button with correct link", () => {
    render(<Details {...mockProps} />);

    const exploreButton = screen.getByText("Explore Exhibition");
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton.closest("a")).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition/test-section-1",
    );
  });

  it("renders the cite buttons", () => {
    render(<Details {...mockProps} />);
    const citeButtons = screen.getAllByRole("button");
    expect(citeButtons).toHaveLength(2);
    citeButtons.forEach((button) => {
      expect(button).toHaveTextContent("Cite this exhibition");
    });
  });

  it("tracks exhibition view on mount", () => {
    render(<Details {...mockProps} />);

    expect(window.gtag).toHaveBeenCalledWith("event", "Test Provider", {
      event_category: "View Exhibition Item : Test Partner",
      event_label: "test-item-id : Test Item",
    });
  });
});

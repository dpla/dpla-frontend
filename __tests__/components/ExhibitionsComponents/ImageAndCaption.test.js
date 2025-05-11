import React from "react";
import { render, screen } from "@testing-library/react";
import ImageAndCaption from "../../../components/ExhibitionsComponents/Exhibition/ImageAndCaption";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {},
  }),
}));

describe("ImageAndCaption", () => {
  const mockProps = {
    title: "Test Exhibition Title",
    thumbnailUrl: "https://example.com/image.jpg",
    sectionSlug: "test-section",
    slug: "test-exhibition",
    caption: "Test image caption",
  };

  it("renders the exhibition title", () => {
    render(<ImageAndCaption {...mockProps} />);
    // Title appears twice - once above image and once in overlay
    const titleElements = screen.getAllByText("Test Exhibition Title");
    expect(titleElements).toHaveLength(2);
  });

  it("renders the image with correct background URL", () => {
    const { container } = render(<ImageAndCaption {...mockProps} />);
    const imageDiv = container.querySelector(".image");
    expect(imageDiv).toHaveStyle({
      backgroundImage: `url(${mockProps.thumbnailUrl})`,
    });
  });

  it("renders the explore exhibition button with correct link", () => {
    render(<ImageAndCaption {...mockProps} />);
    const exploreButton = screen.getByText("Explore Exhibition");
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton.closest("a")).toHaveAttribute(
      "href",
      `/exhibitions/${mockProps.slug}/${mockProps.sectionSlug}`
    );
  });

  it("renders the caption with correct formatting", () => {
    render(<ImageAndCaption {...mockProps} />);
    expect(screen.getByText("Image:")).toBeInTheDocument();
    expect(screen.getByText(mockProps.caption)).toBeInTheDocument();
  });

  it("renders the image overlay content", () => {
    render(<ImageAndCaption {...mockProps} />);
    const overlay = screen.getByRole("heading", {
      name: mockProps.title,
    });
    expect(overlay).toBeInTheDocument();
  });
});

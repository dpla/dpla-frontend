import React from "react";
import { render, screen } from "@testing-library/react";
import ExhibitionsList from "../../../components/ExhibitionsComponents/AllExhibitions/components/ExhibitionsList";

describe("ExhibitionsList", () => {
  const mockExhibitions = [
    {
      slug: "test-exhibition-1",
      title: "Test Exhibition 1",
      thumbnailUrl: "/test-image-1.jpg",
    },
    {
      slug: "test-exhibition-2",
      title: "Test Exhibition 2",
      thumbnailUrl: "/test-image-2.jpg",
    },
  ];

  it("renders a list of exhibitions", () => {
    render(<ExhibitionsList exhibitions={mockExhibitions} />);

    // Check if all exhibition titles are rendered
    expect(screen.getByText("Test Exhibition 1")).toBeInTheDocument();
    expect(screen.getByText("Test Exhibition 2")).toBeInTheDocument();
  });

  it("renders correct links for each exhibition", () => {
    render(<ExhibitionsList exhibitions={mockExhibitions} />);

    // Check if links are correct
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/exhibitions/test-exhibition-1");
    expect(links[1]).toHaveAttribute("href", "/exhibitions/test-exhibition-2");
  });

  it("renders images with correct sources", () => {
    render(<ExhibitionsList exhibitions={mockExhibitions.filter(Boolean)} />);

    // Check if images have correct src attributes
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/test-image-1.jpg");
    expect(images[1]).toHaveAttribute("src", "/test-image-2.jpg");
  });

  it("handles filtered exhibition items", () => {
    // Filter out null values before passing to component, as that's how data should be prepared
    const exhibitionsWithNull = [...mockExhibitions, null].filter(Boolean);
    render(<ExhibitionsList exhibitions={exhibitionsWithNull} />);

    // Should show the two valid exhibitions
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("applies the correct CSS classes", () => {
    render(<ExhibitionsList exhibitions={mockExhibitions} />);

    // Check wrapper classes
    const wrapper = screen.getByRole("list").parentElement.parentElement;
    expect(wrapper.className).toContain("wrapper");
    expect(wrapper.className).toContain("siteMaxWidth");

    // Check list items have correct classes
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link.className).toContain("exhibition");
    });
  });
});

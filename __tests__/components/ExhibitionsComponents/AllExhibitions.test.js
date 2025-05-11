import React from "react";
import { render, screen } from "@testing-library/react";
import AllExhibitions from "../../../components/ExhibitionsComponents/AllExhibitions";
import { TITLE, DESCRIPTION } from "../../../constants/exhibitions.js";

describe("AllExhibitions", () => {
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

  it("renders the feature header with correct title and description", () => {
    render(<AllExhibitions exhibitions={mockExhibitions} />);

    // Check if the feature header renders with correct content
    expect(screen.getByText(TITLE)).toBeInTheDocument();

    // Using a regex to match the description text that may contain line breaks
    const descriptionText = DESCRIPTION.replace(/\n/g, " ").trim();
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

  it("renders exhibitions list component with provided exhibitions", () => {
    render(<AllExhibitions exhibitions={mockExhibitions} />);

    // Check if exhibition titles are rendered via ExhibitionsList
    expect(screen.getByText("Test Exhibition 1")).toBeInTheDocument();
    expect(screen.getByText("Test Exhibition 2")).toBeInTheDocument();
  });

  it("renders with correct HTML structure and data attributes", () => {
    const { container } = render(
      <AllExhibitions exhibitions={mockExhibitions} />,
    );

    // Check if the main wrapper has the correct data-testid attribute
    const wrapper = container.querySelector('[data-testid="exhibitions-home"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("handles empty exhibitions array", () => {
    render(<AllExhibitions exhibitions={[]} />);

    // Header should still be present
    expect(screen.getByText(TITLE)).toBeInTheDocument();

    // Using a regex to match the description text that may contain line breaks
    const descriptionText = DESCRIPTION.replace(/\n/g, " ").trim();
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });
});

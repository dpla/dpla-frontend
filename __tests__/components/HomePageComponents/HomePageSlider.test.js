import React from "react";
import { render, screen } from "@testing-library/react";
import HomePageSlider from "../../../components/HomePageComponents/HomePageSlider";

// Mock react-slick
jest.mock("react-slick", () => {
  return function MockSlider({ children }) {
    return <div data-testid="mock-slider">{children}</div>;
  };
});

// Mock react-markdown
jest.mock("react-markdown", () => {
  return function MockMarkdown({ children }) {
    return <div>{children}</div>;
  };
});

// Mock ChevronThickOrange SVG
jest.mock("components/svg/ChevronThickOrange", () => {
  return function MockChevron() {
    return <span data-testid="mock-chevron">→</span>;
  };
});

// Mock next/link since we're not testing its implementation
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({ children, className, href }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe("HomePageSlider", () => {
  const mockProps = {
    browseLinkName: "exhibitions",
    browseLinkUrl: "/exhibitions",
    items: [
      {
        name: "Test Exhibition 1",
        repImageUrl: "https://example.com/image1.jpg",
        href: "/exhibition/test-1",
      },
      {
        name: "Test Exhibition 2",
        thumbnailUrl: "https://example.com/image2.jpg",
        href: "/exhibition/test-2",
      },
    ],
    slidesToShow: 2.5,
    title: "Featured Exhibitions",
    theme: "blue",
  };

  it("renders the title and browse all link", () => {
    render(<HomePageSlider {...mockProps} />);

    // Check if title is rendered
    expect(screen.getByText("Featured Exhibitions")).toBeInTheDocument();

    // Check if browse all link is rendered with correct text
    const browseLink = screen.getByText(/Browse all/);
    expect(browseLink).toBeInTheDocument();
    expect(screen.getByText("exhibitions")).toBeInTheDocument();
    expect(browseLink.closest("a")).toHaveAttribute("href", "/exhibitions");
  });

  it("renders all slider items with correct content", () => {
    render(<HomePageSlider {...mockProps} />);

    // Check if all items are rendered
    mockProps.items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      const link = screen.getByText(item.name).closest("a");
      expect(link).toHaveAttribute("href", item.href);
    });
  });

  it("applies the correct theme class", () => {
    const { container } = render(<HomePageSlider {...mockProps} />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("theme_blue");
  });

  it("renders with default slidesToShow when not provided", () => {
    const propsWithoutSlides = {
      ...mockProps,
      slidesToShow: undefined,
    };
    render(<HomePageSlider {...propsWithoutSlides} />);
    // Component should render without errors
    expect(screen.getByTestId("exhibitions")).toBeInTheDocument();
  });
});

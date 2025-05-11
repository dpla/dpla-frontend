import React from "react";
import { render, screen } from "@testing-library/react";
import HomePro from "components/HomePageComponents/HomePro";

describe("HomePro", () => {
  const mockProps = {
    news: [
      {
        title: "Test News Item",
        excerpt: "Test news excerpt",
        link: "/news/test-news",
      },
    ],
    content: {
      acf: {
        feature: {
          title: "Test Feature Title",
          text: "Test feature text",
          button_text: "Learn More",
          button_url: "/test-url",
          image: "/test-image.jpg",
        },
      },
    },
  };

  it("renders the hero section with correct text", () => {
    render(<HomePro {...mockProps} />);

    // Check if hero text is present
    expect(
      screen.getByText("Welcome to the DPLA Professional Community"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "DPLA Pro is where DPLA, our Hub Network, and our broader community connect and share resources.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the feature section when feature content is provided", () => {
    render(<HomePro {...mockProps} />);

    // Check if feature content is rendered
    expect(screen.getByText("Test Feature Title")).toBeInTheDocument();
    expect(screen.getByText("Test feature text")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders all navigation links in the section list", () => {
    render(<HomePro {...mockProps} />);

    // Check if all section links are present
    expect(screen.getByText("Hub Network")).toBeInTheDocument();
    expect(screen.getByText("Prospective Hubs")).toBeInTheDocument();
    expect(screen.getByText("Developers")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Ebooks")).toBeInTheDocument();
  });

  it("renders the news lane with provided news items", () => {
    render(<HomePro {...mockProps} />);

    // Check if news section is present
    expect(screen.getByText("DPLA News")).toBeInTheDocument();
    expect(screen.getByText("Test News Item")).toBeInTheDocument();
  });

  it("does not render feature section when feature is not provided", () => {
    const propsWithoutFeature = {
      ...mockProps,
      content: {
        acf: {
          feature: null,
        },
      },
    };
    render(<HomePro {...propsWithoutFeature} />);

    // Check that feature content is not rendered
    expect(screen.queryByText("Test Feature Title")).not.toBeInTheDocument();
  });

  it("renders the StayInformed component", () => {
    render(<HomePro {...mockProps} />);

    // Since StayInformed is a component, we might need to add a test-id or
    // check for specific content rendered by StayInformed component
    expect(document.querySelector(".stayInformed")).toBeInTheDocument();
  });
});

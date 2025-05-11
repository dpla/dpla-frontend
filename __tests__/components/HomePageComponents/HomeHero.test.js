import React from "react";
import { render, screen } from "../../utils/test-utils";
import HomeHero from "components/HomePageComponents/HomeHero";

// Mock the entire local constants module
jest.mock("constants/local", () => ({
  LOCALS: {
    demo: {
      name: "Demo Hub",
      theme: "demo-theme",
      logo: "demo-logo.png",
      heroLogo: "demo-hero.png",
      background: "demo-bg.png",
      hasAbout: true,
    },
  },
}));

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_SITE_ENV: "production",
  NEXT_PUBLIC_LOCAL_ID: "default",
};

// Save original env
const originalEnv = process.env;

describe("HomeHero", () => {
  beforeEach(() => {
    // Setup process.env for each test
    process.env = { ...originalEnv, ...mockEnv };
  });

  afterEach(() => {
    // Restore process.env
    process.env = originalEnv;
  });

  it("renders DPLA logo and donate button in non-local environment", () => {
    process.env.NEXT_PUBLIC_SITE_ENV = "production";

    render(<HomeHero />);

    expect(
      screen.getByText("Digital Public Library of America")
    ).toBeInTheDocument();
    expect(screen.getByText("Donate")).toBeInTheDocument();
  });

  it("renders local logo and name in local environment", () => {
    process.env.NEXT_PUBLIC_SITE_ENV = "local";
    process.env.NEXT_PUBLIC_LOCAL_ID = "demo";

    render(<HomeHero />);

    const localLogo = screen.getByRole("img");
    expect(localLogo).toHaveAttribute("id", "demo-localLogo");
    expect(screen.queryByText("Donate")).not.toBeInTheDocument();
  });

  it("renders header description when provided", () => {
    const headerDescription = "Test Description";
    render(<HomeHero headerDescription={headerDescription} />);

    expect(screen.getByText(headerDescription)).toBeInTheDocument();
  });

  it("renders search form with correct elements", () => {
    render(<HomeHero />);

    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAttribute("placeholder", "Search the collection");
    expect(searchInput).toHaveAttribute("name", "q");

    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchButton).toBeInTheDocument();
  });

  it("renders navigation links in non-local environment", () => {
    process.env.NEXT_PUBLIC_SITE_ENV = "production";

    render(<HomeHero />);

    expect(screen.getByText("Browse by Topic")).toBeInTheDocument();
    expect(screen.getByText("New? Start Here")).toBeInTheDocument();
  });

  it("renders 'Learn more' link in local environment when hasAbout is true", () => {
    process.env.NEXT_PUBLIC_SITE_ENV = "local";
    process.env.NEXT_PUBLIC_LOCAL_ID = "demo";

    // No need to mock LOCALS here as it's already mocked globally

    render(<HomeHero />);

    expect(screen.getByText("Learn more about Demo Hub")).toBeInTheDocument();
  });

  it("applies feature class when feature prop is true", () => {
    render(<HomeHero feature={true} />);

    const wrapper = screen.getByTestId("home-hero");
    expect(wrapper.className).toContain("withFeature");
  });
});

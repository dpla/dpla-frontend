import React from "react";
import { render, screen } from "../utils/test-utils";
import DPLAHead from "components/DPLAHead";

// Mock next/head to just render children
jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

// Mock lib functions
jest.mock("lib", () => ({
  getMetaPageTitle: jest.fn((title) => title || "Default Title"),
  getCurrentFullUrl: jest.fn(() => "https://example.com/page"),
}));

// Mock LOCALS
jest.mock("constants/local", () => ({
  LOCALS: {
    testlocal: {
      name: "Test Local Name",
      description: "Test Local Description",
      logo: "test-logo.png",
      favicon: "test-favicon.png",
    },
  },
}));

describe("DPLAHead", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.NEXT_PUBLIC_SITE_ENV = "production";
    process.env.NEXT_PUBLIC_LOCAL_ID = "testlocal";
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("renders default meta tags and title for non-local env", () => {
    render(<DPLAHead />);
    expect(document.querySelector('meta[name="description"]').content).toMatch(
      /Digital Public Library/
    );
    expect(document.querySelector('meta[name="og:site_name"]').content).toBe(
      "Digital Public Library of America"
    );
    expect(document.querySelector('meta[name="og:type"]').content).toBe(
      "website"
    );
    expect(document.querySelector("title").textContent).toBe("Default Title");
    expect(
      document.querySelector('link[rel="apple-touch-icon"]')
    ).toHaveAttribute("href", "/static/favicons/apple-touch-icon.png");
  });

  it("renders custom meta tags and title from props", () => {
    render(
      <DPLAHead
        pageTitle="Custom Title"
        pageDescription="Custom Description"
        pageImage="/custom-image.png"
        pageImageCaption="Custom Caption"
        seoType="article"
        additionalLinks={<link rel="canonical" href="/custom-canonical" />}
      />
    );
    expect(document.querySelector('meta[name="description"]').content).toBe(
      "Custom Description"
    );
    expect(document.querySelector('meta[name="og:title"]').content).toBe(
      "Custom Title"
    );
    expect(document.querySelector('meta[name="og:type"]').content).toBe(
      "article"
    );
    expect(document.querySelector('meta[name="twitter:image"]').content).toBe(
      "/custom-image.png"
    );
    expect(
      document.querySelector('meta[name="twitter:image:alt"]').content
    ).toBe("Custom Caption");
    expect(document.querySelector('link[rel="canonical"]').href).toMatch(
      "/custom-canonical"
    );
  });

  it("renders local-specific meta and favicon when env is local", () => {
    process.env.NEXT_PUBLIC_SITE_ENV = "local";
    render(<DPLAHead />);
    expect(document.querySelector('meta[name="description"]').content).toBe(
      "Test Local Description"
    );
    expect(document.querySelector('meta[name="og:site_name"]').content).toBe(
      "Test Local Name"
    );
    expect(document.querySelector('link[rel="apple-touch-icon"]').href).toMatch(
      "test-favicon.png"
    );
  });

  it("renders default image url in og:image and twitter:image if no pageImage is provided", async () => {
    render(<DPLAHead />);
    // Wait for componentDidMount to set state
    await Promise.resolve();
    const ogImage = document.querySelector('meta[name="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    expect(ogImage).toBeTruthy();
    expect(twitterImage).toBeTruthy();
    // Should use the defaultImageUrl set in state
    expect(ogImage.content).toMatch(/dpla-logo-square_250.png/);
    expect(twitterImage.content).toMatch(/dpla-logo-square_250.png/);
  });
});

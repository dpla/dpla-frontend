import React from "react";
import { render, screen } from "@testing-library/react";
import LocalIntro from "../../../components/HomePageComponents/LocalIntro";

// Mock rehype-raw
jest.mock("rehype-raw", () => () => {});

// Mock react-markdown with simple markdown-like rendering
jest.mock("react-markdown", () => {
  return function MockMarkdown({ children, id, className }) {
    // Simple markdown parsing simulation
    const content = children.replace(/^# (.+)$/m, "$1").replace(/\n\n/g, " ");
    // Simple HTML parsing simulation
    const htmlContent = content.replace(/<strong>(.+?)<\/strong>/g, "$1");
    
    return (
      <div id={id} className={className}>
        {htmlContent}
      </div>
    );
  };
});

describe("LocalIntro", () => {
  const mockProps = {
    content: "# Test Content\n\nThis is a test markdown content.",
  };

  beforeEach(() => {
    // Mock the environment variable
    process.env.NEXT_PUBLIC_LOCAL_ID = "test-local";
  });

  afterEach(() => {
    // Clean up environment variable
    delete process.env.NEXT_PUBLIC_LOCAL_ID;
  });

  it("renders the markdown content correctly", () => {
    render(<LocalIntro {...mockProps} />);
    
    // Check if the content is rendered
    expect(screen.getByText("Test Content This is a test markdown content.")).toBeInTheDocument();
  });

  it("applies correct CSS classes to wrapper", () => {
    const { container } = render(<LocalIntro {...mockProps} />);
    const wrapper = container.firstChild;
    
    expect(wrapper).toHaveClass("wrapper", "siteMaxWidth");
  });

  it("sets correct id on markdown component", () => {
    const { container } = render(<LocalIntro {...mockProps} />);
    const markdownElement = container.querySelector("#test-local-intro");
    
    expect(markdownElement).toBeInTheDocument();
  });

  it("renders HTML content as text", () => {
    const propsWithHtml = {
      content: "# Test Content\n\n<strong>Bold text</strong>",
    };
    
    render(<LocalIntro {...propsWithHtml} />);
    
    expect(screen.getByText("Test Content Bold text")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../../components/ExhibitionsComponents/ExhibitionSection/Header";
import { useRouter } from "next/router";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  const mockRouter = {
    query: {
      exhibitionSlug: "test-exhibition",
    },
  };

  beforeEach(() => {
    useRouter.mockImplementation(() => mockRouter);
  });

  it("renders the title correctly", () => {
    render(<Header title="Test Exhibition Section" />);
    expect(screen.getByText("Test Exhibition Section")).toBeInTheDocument();
  });

  it("renders the Exhibitions link", () => {
    render(<Header title="Test Exhibition Section" />);
    const exhibitionsLink = screen.getByText("Exhibitions");
    expect(exhibitionsLink).toBeInTheDocument();
    expect(exhibitionsLink.closest("a")).toHaveAttribute("href", "/exhibitions");
  });

  it("renders the close exhibition link with correct href", () => {
    render(<Header title="Test Exhibition Section" />);
    const closeLink = screen.getByText("Close Exhibition");
    expect(closeLink).toBeInTheDocument();
    expect(closeLink.closest("a")).toHaveAttribute(
      "href",
      "/exhibitions/test-exhibition"
    );
  });

  it("renders the close icon", () => {
    const { container } = render(<Header title="Test Exhibition Section" />);
    const closeIcon = container.querySelector(".closeIcon");
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon.tagName.toLowerCase()).toBe("svg");
  });
});

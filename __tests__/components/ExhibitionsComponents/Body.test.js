import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Body from "../../../components/ExhibitionsComponents/ExhibitionSection/Body";

jest.mock("../../../components/ExhibitionsComponents/ExhibitionSection/Sidebar", () => {
  return function MockSidebar({ isShowing }) {
    return <div data-testid="sidebar" data-showing={isShowing}>Sidebar</div>;
  };
});

jest.mock("../../../components/ExhibitionsComponents/ExhibitionSection/Viewer", () => {
  return function MockViewer() {
    return <div data-testid="viewer">Viewer</div>;
  };
});

jest.mock("../../../components/ExhibitionsComponents/ExhibitionSection/Subheader", () => {
  return function MockSubheader({ onClickMenuButton, subsectionTitle, isMenuOpen }) {
    return (
      <div data-testid="subheader">
        <span>{subsectionTitle}</span>
        <button onClick={onClickMenuButton} data-menu-open={isMenuOpen}>
          Toggle Menu
        </button>
      </div>
    );
  };
});

describe("Body", () => {
  const mockProps = {
    section: {
      title: "Test Section",
      slug: "test-section"
    },
    subsection: {
      title: "Test Subsection",
      slug: "test-subsection"
    },
    sectionMap: {
      "test-section": { title: "Test Section", slug: "test-section" }
    },
    subsectionMap: {
      "test-subsection": { title: "Test Subsection", slug: "test-subsection" }
    },
    exhibitionSlug: "test-exhibition"
  };

  it("renders the main content structure correctly", () => {
    render(<Body {...mockProps} />);

    // Check if main structural elements are present
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTestId("subheader")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toBeInTheDocument();
  });

  it("passes correct props to subheader", () => {
    render(<Body {...mockProps} />);
    
    const subheader = screen.getByTestId("subheader");
    expect(subheader).toHaveTextContent("Test Subsection");
    expect(screen.getByRole("button")).toHaveAttribute("data-menu-open", "false");
  });

  it("toggles menu state when menu button is clicked", () => {
    render(<Body {...mockProps} />);
    
    const menuButton = screen.getByRole("button");
    const sidebar = screen.getByTestId("sidebar");
    
    // Initial state
    expect(sidebar).toHaveAttribute("data-showing", "false");
    
    // Click menu button
    fireEvent.click(menuButton);
    
    // Check if menu is open
    expect(sidebar).toHaveAttribute("data-showing", "true");
    
    // Click again to close
    fireEvent.click(menuButton);
    
    // Check if menu is closed
    expect(sidebar).toHaveAttribute("data-showing", "false");
  });

  it("passes correct props to sidebar", () => {
    render(<Body {...mockProps} />);
    
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute("data-showing", "false");
  });

  it("passes correct props to viewer", () => {
    render(<Body {...mockProps} />);
    
    const viewer = screen.getByTestId("viewer");
    expect(viewer).toBeInTheDocument();
  });
});

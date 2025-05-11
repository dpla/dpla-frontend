import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Subheader from "../../../../components/ExhibitionsComponents/ExhibitionSection/Subheader";

describe("Subheader", () => {
  const mockProps = {
    subsectionTitle: "Test Subsection",
    onClickMenuButton: jest.fn(),
    isMenuOpen: false,
  };

  it("renders the subsection title", () => {
    render(<Subheader {...mockProps} />);
    expect(screen.getByText("Test Subsection")).toBeInTheDocument();
  });

  it("renders the menu button with 'Show Menu' when menu is closed", () => {
    render(<Subheader {...mockProps} />);
    const menuButton = screen.getByRole("button");

    expect(menuButton).toHaveTextContent("ShowMenu");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the menu button with 'Hide Menu' when menu is open", () => {
    render(<Subheader {...mockProps} isMenuOpen={true} />);
    const menuButton = screen.getByRole("button");

    expect(menuButton).toHaveTextContent("HideMenu");
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onClickMenuButton when menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Subheader {...mockProps} />);

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    expect(mockProps.onClickMenuButton).toHaveBeenCalled();
  });

  it("applies the openMenu class when menu is open", () => {
    const { container } = render(
      <Subheader {...mockProps} isMenuOpen={true} />
    );
    expect(container.firstChild).toHaveClass("openMenu");
  });

  it("does not apply the openMenu class when menu is closed", () => {
    const { container } = render(<Subheader {...mockProps} />);
    expect(container.firstChild).not.toHaveClass("openMenu");
  });
});

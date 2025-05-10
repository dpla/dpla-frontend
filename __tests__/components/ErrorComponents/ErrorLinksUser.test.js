import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorLinksUser from "../../../components/ErrorComponents/ErrorLinksUser";

describe("ErrorLinksUser", () => {
  it("renders all navigation links", () => {
    render(<ErrorLinksUser />);

    // Check if all links are present with correct hrefs
    expect(screen.getByRole("link", { name: "search" })).toHaveAttribute(
      "href",
      "/search"
    );

    expect(
      screen.getByRole("link", { name: "items by topic" })
    ).toHaveAttribute("href", "/browse-by-topic");

    expect(screen.getByRole("link", { name: "partners" })).toHaveAttribute(
      "href",
      "/browse-by-partner"
    );

    expect(screen.getByRole("link", { name: "exhibitions" })).toHaveAttribute(
      "href",
      "/exhibitions"
    );

    expect(
      screen.getByRole("link", { name: "primary source sets" })
    ).toHaveAttribute("href", "/primary-source-sets");
  });

  it("renders all link descriptions", () => {
    render(<ErrorLinksUser />);

    // Check that descriptions for links are present
    expect(screen.getByText(/our collections/i)).toBeInTheDocument();
    expect(screen.getByText(/browse/i)).toBeInTheDocument();
    expect(
      screen.getByText(/discover items from specific/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/view our/i)).toBeInTheDocument();
    expect(screen.getByText(/explore our/i)).toBeInTheDocument();
  });
});

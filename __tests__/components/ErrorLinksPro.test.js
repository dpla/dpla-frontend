import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";

describe("ErrorLinksPro", () => {
  it("renders all links with correct text and href attributes", () => {
    render(<ErrorLinksPro />);

    // Test each link's presence and href
    const links = [
      { text: "about DPLA", href: "/about" },
      { text: "projects", href: "/projects" },
      { text: "events", href: "/events" },
      { text: "Hub Network", href: "/hubs" },
      { text: "resources for developers", href: "/developers" },
      { text: "education", href: "/education" },
      { text: "reps program", href: "/community-reps" },
      { text: "ebooks", href: "/ebooks" },
    ];

    links.forEach(({ text, href }) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", href);
    });
  });

  it("renders the component within a ul element", () => {
    render(<ErrorLinksPro />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe("UL");
  });

  it("renders the correct number of list items", () => {
    render(<ErrorLinksPro />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(8);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/ExhibitionsComponents/Footer";

describe("Footer", () => {
  it("renders the footer text correctly", () => {
    render(<Footer />);

    // Check if the curator text is present
    expect(
      screen.getByText(
        "Exhibitions curated by DPLA staff, DPLA partner institutions, and graduate students in library and information science and public history."
      )
    ).toBeInTheDocument();

    // Check if contact information is present
    expect(screen.getByText(/Feedback\? Contact us at/)).toBeInTheDocument();

    // Check if email link is present and has correct href
    const emailLink = screen.getByText("info@dp.la");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:info@dp.la");
    expect(emailLink).toHaveClass("link");
  });

  it("renders with correct CSS classes", () => {
    render(<Footer />);

    // Check if wrapper div has the correct class
    const wrapper =
      screen.getByText(/Exhibitions curated/).parentElement.parentElement;
    expect(wrapper).toHaveClass("wrapper");

    // Check if inner div has the correct classes
    const innerDiv = screen.getByText(/Exhibitions curated/).parentElement;
    expect(innerDiv).toHaveClass("otherInfo");

    // Check if paragraphs have the correct class
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toHaveClass("footerText");
    });
  });
});

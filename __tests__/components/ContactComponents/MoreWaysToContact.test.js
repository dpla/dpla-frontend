import React from "react";
import { render, screen } from "../../utils/test-utils";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";

describe("MoreWaysToContact", () => {
  it("renders the header correctly", () => {
    render(<MoreWaysToContact />);
    expect(screen.getByText("More Ways To Contact Us")).toBeInTheDocument();
  });

  it("renders all contact methods with correct content", () => {
    render(<MoreWaysToContact />);

    // Check email
    expect(screen.getByText("General Email")).toBeInTheDocument();
    const emailLink = screen.getByText("info@dp.la");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:info@dp.la");

    // Check phone
    expect(screen.getByText("Telephone")).toBeInTheDocument();
    expect(screen.getByText("888-444-0612")).toBeInTheDocument();

    // Check address
    expect(screen.getByText("Mailing Address")).toBeInTheDocument();
    const addressCell = screen
      .getByText("Mailing Address")
      .closest("tr")
      .querySelector(".tableItem");
    expect(addressCell).toHaveTextContent("Digital Public Library of America");
    expect(addressCell).toHaveTextContent("(at Government Center)");
    expect(addressCell).toHaveTextContent("1 Washington Mall #1019");
    expect(addressCell).toHaveTextContent("Boston, MA 02108");
  });

  it("renders social media links correctly", () => {
    render(<MoreWaysToContact />);

    expect(screen.getByText("Social Media")).toBeInTheDocument();

    const socialLinks = {
      Twitter: "https://twitter.com/dpla",
      Facebook: "https://www.facebook.com/digitalpubliclibraryofamerica",
      Instagram: "https://www.instagram.com/digpublib/",
      YouTube: "https://www.youtube.com/user/digpublib/videos",
    };

    Object.entries(socialLinks).forEach(([platform, url]) => {
      const link = screen.getByText(platform);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", url);
    });
  });

  it("renders mailing list links correctly", () => {
    render(<MoreWaysToContact />);

    expect(screen.getByText("Mailing Lists")).toBeInTheDocument();

    const mailingLists = {
      "General List":
        "https://us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=1ee988aadc",
      "Education List":
        "http://dp.us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=de870d2705",
      "Genealogy List":
        "http://dp.us4.list-manage2.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=f36418b975",
      "Ebooks List":
        "https://dp.us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=f8292db847",
    };

    Object.entries(mailingLists).forEach(([list, url]) => {
      const link = screen.getByText(list);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", url);
    });
  });

  it("renders all content in a table structure", () => {
    render(<MoreWaysToContact />);

    // Check table structure
    expect(screen.getByRole("table")).toBeInTheDocument();
    const rowgroups = screen.getAllByRole("rowgroup");
    expect(rowgroups).toHaveLength(2); // thead and tbody

    // Check all rows are present
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(6); // Header row + 5 content rows
  });
});

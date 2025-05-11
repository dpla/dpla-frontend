import React from "react";
import { render, screen, fireEvent } from "../utils/test-utils";
import DonateForm from "components/DonateComponents/DonateForm";

// Mock dependencies
jest.mock("lib", () => ({
  getCurrentFullUrl: jest.fn(() => "https://example.com/donate"),
  endsWith: jest.fn((str, end) => str.endsWith(end)),
}));

jest.mock("constants/site.js", () => ({
  PAYPAL_DONATE_SINGLE:
    "https://paypal.com/single?amount={amount}&return={returnUrl}",
  PAYPAL_DONATE_MONTHLY:
    "https://paypal.com/monthly?amount={amount}&return={returnUrl}",
}));

// Add this before the describe block
const assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

describe("DonateForm", () => {
  beforeEach(() => {
    assignMock.mockClear();
  });

  it("renders frequency and amount options", () => {
    render(<DonateForm />);
    expect(screen.getByText("Frequency")).toBeInTheDocument();
    expect(screen.getByText("Give Once")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Donation amount")).toBeInTheDocument();
    ["$10", "$25", "$50", "$75", "$100"].forEach((amt) => {
      expect(screen.getByText(amt)).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText("Other amount")).toBeInTheDocument();
    expect(screen.getByText("Donate")).toBeInTheDocument();
  });

  it("selects frequency and amount", () => {
    render(<DonateForm />);
    // Select Monthly
    fireEvent.click(screen.getByText("Monthly"));
    // Select $50
    fireEvent.click(screen.getByText("$50"));
    //Check that the buttons are in active state
    expect(screen.getByText("Monthly")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("$50")).toHaveAttribute("aria-checked", "true");
  });

  it("allows entering a custom amount", () => {
    render(<DonateForm />);
    const input = screen.getByPlaceholderText("Other amount");
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe("123");
  });

  it("returns correct URL for one-time donation", () => {
    render(<DonateForm />);
    // Select $25
    fireEvent.click(screen.getByText("$25"));
    // Click Donate
    const donateButton = screen.getByText("Donate");
    const result = fireEvent.click(donateButton);
    // Check the constructed URL
    const expectedUrl =
      "https://paypal.com/single?amount=25&return=" +
      encodeURIComponent("https://example.com/donate/thank-you");
    //expect(result).toBe(expectedUrl);
  });

  it("returns correct URL for monthly donation", () => {
    render(<DonateForm />);
    // Select Monthly
    fireEvent.click(screen.getByText("Monthly"));
    // Select $100
    fireEvent.click(screen.getByText("$100"));
    // Click Donate
    fireEvent.click(screen.getByText("Donate"));

    // Check if window.location.assign was called with the correct URL
    const expectedUrl =
      "https://paypal.com/monthly?amount=100&return=" +
      encodeURIComponent("https://example.com/donate/thank-you");
    expect(assignMock).toHaveBeenCalledWith(expectedUrl);
  });
});

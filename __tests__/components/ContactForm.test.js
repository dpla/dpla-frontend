import React from "react";
import { render, screen, fireEvent, waitFor } from "../utils/test-utils";
import ContactForm from "components/ContactComponents/ContactForm";

// Mock fetch
global.fetch = jest.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear();
    fetch.mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve("success"),
      }),
    );
  });

  it("renders the form with all required fields", () => {
    render(<ContactForm />);

    // Check for form elements
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByText(/send message/i)).toBeInTheDocument();
  });

  it("shows required field validation when submit is clicked with empty fields", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByText(/send message/i);
    fireEvent.click(submitButton);

    // Check that form fields are marked as required
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const messageInput = screen.getByLabelText(/your message/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it("updates form fields when user types", () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const messageInput = screen.getByLabelText(/your message/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(messageInput.value).toBe("Test message");
  });

  it("changes subject when a new option is selected", () => {
    render(<ContactForm />);

    const subjectSelect = screen.getByLabelText(/subject/i);
    fireEvent.change(subjectSelect, { target: { value: "Press inquiry" } });

    expect(subjectSelect.value).toBe("Press inquiry");
  });

  it("submits the form successfully with valid data", async () => {
    render(<ContactForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/your message/i), {
      target: { value: "Test message" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "General inquiry" },
    });

    // Submit the form
    const submitButton = screen.getByText(/send message/i);
    fireEvent.click(submitButton);

    // Check that the loading state is shown
    expect(screen.getByText(/sending message/i)).toBeInTheDocument();

    // Wait for the submission to complete
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });

    // Verify fetch was called with correct data
    expect(fetch).toHaveBeenCalledWith("/g/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: "john@example.com",
        name: "John Doe",
        subject: "General inquiry",
        message: "Test message",
        miel: "1",
      }),
    });
  });
});

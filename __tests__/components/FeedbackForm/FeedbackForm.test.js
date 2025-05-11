import React from "react";
import { render, screen, fireEvent, waitFor } from "../../utils/test-utils";
import FeedbackForm from "components/FeedbackForm";

// Mock scroll functionality for tests
window.scroll = jest.fn();

// Mock the react-aria-modal
jest.mock('react-aria-modal', () => {
  return {
    __esModule: true,
    default: ({ children, titleText, onExit, initialFocus, getApplicationNode }) => (
      <dialog aria-label={titleText}>
        {children}
      </dialog>
    )
  };
});
// Mock next/router
jest.mock("next/router", () => ({
  withRouter: (Component) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      router: {
        pathname: "/test-page",
        query: {},
      },
    };
    return Component;
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe("FeedbackForm", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    // Mock fetch default response
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("Success"),
      })
    );
  });

  it("renders feedback button and opens modal on click", () => {
    render(<FeedbackForm />);
    
    // Check if feedback button exists
    const feedbackButton = screen.getByText("Feedback");
    expect(feedbackButton).toBeInTheDocument();
    
    // Click feedback button
    fireEvent.click(feedbackButton);
    
    // Check if modal content is displayed
    expect(screen.getByText("Comment")).toBeInTheDocument();
    expect(screen.getByText("Correction")).toBeInTheDocument();
    expect(screen.getByText("Bug")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your feedback")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email (optional)")).toBeInTheDocument();
  });

  it("allows selecting different feedback types", () => {
    render(<FeedbackForm />);
    
    // Open modal
    fireEvent.click(screen.getByText("Feedback"));
    
    // Test radio buttons
    const commentRadio = screen.getByLabelText("Comment");
    const correctionRadio = screen.getByLabelText("Correction");
    const bugRadio = screen.getByLabelText("Bug");
    
    expect(commentRadio).toBeChecked();
    
    fireEvent.click(correctionRadio);
    expect(correctionRadio).toBeChecked();
    expect(commentRadio).not.toBeChecked();
    
    fireEvent.click(bugRadio);
    expect(bugRadio).toBeChecked();
    expect(correctionRadio).not.toBeChecked();
  });

  it("updates character count when typing feedback", () => {
    render(<FeedbackForm />);
    
    // Open modal
    fireEvent.click(screen.getByText("Feedback"));
    
    const textarea = screen.getByPlaceholderText("Enter your feedback");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    
    expect(screen.getByText("387 characters remaining")).toBeInTheDocument();
  });

  it("handles email input", () => {
    render(<FeedbackForm />);
    
    // Open modal
    fireEvent.click(screen.getByText("Feedback"));
    
    const emailInput = screen.getByPlaceholderText("Email (optional)");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    
    expect(emailInput.value).toBe("test@example.com");
  });

  it("submits feedback successfully", async () => {
    render(<FeedbackForm />);
    
    // Open modal
    fireEvent.click(screen.getByText("Feedback"));
    
    // Fill out form
    fireEvent.change(screen.getByPlaceholderText("Enter your feedback"), {
      target: { value: "Test feedback message" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email (optional)"), {
      target: { value: "test@example.com" },
    });
    
    // Submit form
    fireEvent.click(screen.getByText("Send"));
    
    // Check loading state
    expect(screen.getByText("Sending…")).toBeInTheDocument();
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText("Thank you for your feedback.")).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct data
    expect(fetch).toHaveBeenCalledWith("/g/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: expect.any(String),
    });
  });

  it("requires feedback message before submission", () => {
    render(<FeedbackForm />);
    
    // Open modal
    fireEvent.click(screen.getByText("Feedback"));
    
    // Try to submit without message
    fireEvent.click(screen.getByText("Send"));
    
    // Form should not submit (fetch should not be called)
    expect(fetch).not.toHaveBeenCalled();
  });

  it("closes modal when clicking cancel/close button", () => {
    render(<FeedbackForm />);
    
    // Open modal
    fireEvent.click(screen.getByText("Feedback"));
    expect(screen.getByText("Comment")).toBeInTheDocument();
    
    // Click cancel button
    fireEvent.click(screen.getByText("Cancel"));
    
    // Modal content should not be visible
    expect(screen.queryByText("Comment")).not.toBeInTheDocument();
  });
});

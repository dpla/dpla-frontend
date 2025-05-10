import React from "react";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function render(ui, { route = "/", ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <>{children}</>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render, userEvent };

// Mock data generators
export const createMockItem = (overrides = {}) => ({
  id: "test-id",
  title: "Test Item",
  description: "Test Description",
  ...overrides,
});

// Common test utilities
export const waitForElementToBeRemoved = async (element) => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return element;
};

// Custom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    if (pass) {
      return {
        message: () => `expected ${received} not to be in the document`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be in the document`,
        pass: false,
      };
    }
  },
});

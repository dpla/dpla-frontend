# Testing Guide for DPLA Frontend

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Run tests:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run tests in CI environment
yarn test:ci
```

## Test Structure

Tests are organized in the following structure:

```
src/
├── __tests__/           # Root test directory
│   ├── components/      # Component tests
│   ├── pages/          # Page tests
│   ├── utils/          # Utility function tests
│   └── __mocks__/      # Mock files
├── __snapshots__/      # Jest snapshot files
└── test-utils/         # Test utilities and helpers
```

## Writing Tests

### Component Tests

```javascript
import { render, screen } from "../test-utils";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

### Page Tests

```javascript
import { render, screen } from "../test-utils";

describe("PageName", () => {
  it("renders page content", () => {
    render(<PageName />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**

   - Focus on what the component does, not how it does it
   - Test user interactions and outcomes

2. **Use Semantic Queries**

   - Prefer `getByRole`, `getByLabelText`, `getByPlaceholderText`
   - Avoid `getByTestId` unless necessary

3. **Keep Tests Simple**

   - One assertion per test when possible
   - Clear test descriptions
   - Avoid complex setup

4. **Mock External Dependencies**

   - Use Jest mocks for external services
   - Mock API calls and data fetching

5. **Test Coverage**
   - Aim for 70% coverage on critical paths
   - Focus on business logic and user interactions
   - Don't test implementation details

## Common Patterns

### Testing API Calls

```javascript
import { render, screen, waitFor } from "../test-utils";

describe("DataFetching", () => {
  it("loads and displays data", async () => {
    render(<Component />);
    await waitFor(() => {
      expect(screen.getByText("Loaded Data")).toBeInTheDocument();
    });
  });
});
```

### Testing User Interactions

```javascript
import { render, screen, userEvent } from "../test-utils";

describe("UserInteraction", () => {
  it("handles user input", async () => {
    render(<Component />);
    await userEvent.type(screen.getByRole("textbox"), "test input");
    expect(screen.getByDisplayValue("test input")).toBeInTheDocument();
  });
});
```

## Troubleshooting

1. **Test Environment Issues**

   - Clear Jest cache: `yarn jest --clearCache`
   - Check test environment variables
   - Verify mock implementations

2. **Common Errors**
   - "Cannot find module": Check import paths
   - "Not wrapped in act()": Use `waitFor` or `findBy`
   - "Unable to find role": Check component accessibility

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing](https://nextjs.org/docs/testing)

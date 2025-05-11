// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock TextEncoder/TextDecoder
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock next/router
jest.mock("next/router", () => {
  const withRouter = (Component) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
      return (
        <Component
          {...props}
          router={{
            route: "/",
            pathname: "",
            query: {},
            asPath: "",
            push: jest.fn(),
            replace: jest.fn(),
          }}
        />
      );
    };
  };
  return {
    useRouter() {
      return {
        route: "/",
        pathname: "",
        query: {},
        asPath: "",
        push: jest.fn(),
        replace: jest.fn(),
      };
    },
    withRouter,
  };
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img alt={""} {...props} />;
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_ENV = "test";
process.env.NEXT_PUBLIC_LOCAL_ID = "test";

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      /Warning: ReactDOM.render is no longer supported in React 18/.test(
        args[0],
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

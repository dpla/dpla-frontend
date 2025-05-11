import { render, screen, fireEvent } from "../../utils/test-utils";
import Button from "shared/Button";

describe("Button Component", () => {
  it("renders button with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state correctly", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});

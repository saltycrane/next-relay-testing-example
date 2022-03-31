import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

test("Hello is rendered", () => {
  render(<div>Hello</div>);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

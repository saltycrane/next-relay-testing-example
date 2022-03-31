import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import { RelayEnvironmentProvider } from "react-relay";
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils";

import MyContent from "../MyContent";

test("renders loading state", () => {
  const environment = createMockEnvironment();
  render(
    <RelayEnvironmentProvider environment={environment}>
      <MyContent />
    </RelayEnvironmentProvider>,
  );
  const loading = screen.getByTestId("my-loading");
  expect(loading).toBeInTheDocument();
});

test("renders data", async () => {
  const environment = createMockEnvironment();
  render(
    <RelayEnvironmentProvider environment={environment}>
      <MyContent />
    </RelayEnvironmentProvider>,
  );
  environment.mock.resolveMostRecentOperation((operation) => {
    return MockPayloadGenerator.generate(operation, {
      Person() {
        return {
          id: "my-test-id",
          name: "My Test Name",
        };
      },
    });
  });
  const myContent = await waitFor(() => {
    return screen.getByTestId("my-content");
  });
  expect(myContent).toHaveTextContent("My Test Name");
});

test("renders error", async () => {
  // Silence expected console.errors - https://github.com/facebook/react/issues/11098
  const realConsoleError = console.error;
  console.error = jest.fn((message: string) => {
    if (message.startsWith("The above error occurred in")) {
      return;
    }
    if (message.startsWith("Error: Uncaught [Error: My Test error]")) {
      return;
    }
    realConsoleError(message);
  });
  const environment = createMockEnvironment();
  render(
    <RelayEnvironmentProvider environment={environment}>
      <MyContent />
    </RelayEnvironmentProvider>,
  );
  environment.mock.rejectMostRecentOperation(new Error("My Test error"));
  const myContent = await waitFor(() => {
    return screen.getByTestId("my-error");
  });
  expect(myContent).toHaveTextContent("My Test error");
  console.error = realConsoleError;
});

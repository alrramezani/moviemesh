import { render, fireEvent } from "@testing-library/react";
import usePeopleQuery from "@/hooks/usePeopleQuery";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

// Mock Next.js navigation
jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

const mockPush = jest.fn();
const createSearchParams = (initial: Record<string, string>) =>
  new URLSearchParams(initial);

describe("usePeopleQuery hook", () => {
  const TestComponent = () => {
    const { ids, addId, removeId, clearAll } = usePeopleQuery();
    return (
      <div>
        <div data-testid="ids">{ids.join(",")}</div>
        <button onClick={() => addId("123")}>Add 123</button>
        <button onClick={() => removeId("123")}>Remove 123</button>
        <button onClick={clearAll}>Clear All</button>
      </div>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("initializes with empty ids if no query param exists", () => {
    (useSearchParams as jest.Mock).mockReturnValue(createSearchParams({}));

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("ids").textContent).toBe("");
  });

  it("parses existing people param", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      createSearchParams({ people: "123,456" })
    );

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("ids").textContent).toBe("123,456");
  });

  it("adds a person id", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      createSearchParams({ people: "456" })
    );

    const { getByText } = render(<TestComponent />);
    fireEvent.click(getByText("Add 123"));
    expect(mockPush).toHaveBeenCalledWith("?people=456%2C123");
  });

  it("removes a person id", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      createSearchParams({ people: "123,456" })
    );

    const { getByText } = render(<TestComponent />);
    fireEvent.click(getByText("Remove 123"));
    expect(mockPush).toHaveBeenCalledWith("?people=456");
  });

  it("clears all ids", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      createSearchParams({ people: "123,456" })
    );

    const { getByText } = render(<TestComponent />);
    fireEvent.click(getByText("Clear All"));
    expect(mockPush).toHaveBeenCalledWith("?");
  });

  it("does not add duplicate ids", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      createSearchParams({ people: "123" })
    );

    const { getByText } = render(<TestComponent />);
    fireEvent.click(getByText("Add 123"));
    expect(mockPush).not.toHaveBeenCalled();
  });
});

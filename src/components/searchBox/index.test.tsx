import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";

import SearchBox from "./index";
import useSearch from "@/hooks/useSearch";
import "@testing-library/jest-dom";

jest.mock("@/hooks/useSearch", () => jest.fn());

describe("SearchBox", () => {
  const mockOnSelect = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input with placeholder", () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    render(<SearchBox placeholder="Search People" onSelect={mockOnSelect} />);

    expect(screen.getByPlaceholderText("Search People")).toBeInTheDocument();
  });

  it("shows skeleton while loading", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    const { findByTestId } = render(<SearchBox onSelect={mockOnSelect} />);
    expect(await findByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders search results", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          name: "John Doe",
          original_name: "Johnathan Doe",
          profile_path: null,
          known_for_department: "Acting",
        },
      ],
      isLoading: false,
    });

    const { findByText } = render(<SearchBox onSelect={mockOnSelect} />);

    expect(await findByText(/John Doe/)).toBeInTheDocument();
    expect(await findByText(/known for: Acting/)).toBeInTheDocument();
  });

  it("shows 'no matches' message when data is empty", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    const { findByText } = render(<SearchBox onSelect={mockOnSelect} />);
    expect(await findByText(/no matches found/i)).toBeInTheDocument();
  });

  it("calls onSelect when a person is selected", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [
        {
          id: 2,
          name: "Alice",
          original_name: "Alice A.",
          profile_path: null,
          known_for_department: "Directing",
        },
      ],
      isLoading: false,
    });

    const { findByTestId } = render(<SearchBox onSelect={mockOnSelect} />);
    fireEvent.touchStart(await findByTestId("search-item-2"));
    fireEvent.mouseDown(await findByTestId("search-item-2"));
    expect(mockOnSelect).toHaveBeenCalledWith(2);
  });

  it("refetches when input value changes with debounce and data=isStale", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isStale: true,
    });

    const { getByRole } = render(<SearchBox onSelect={mockOnSelect} />);

    const input = getByRole("searchbox");
    act(() => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "Ali" } });
    });
    await waitFor(() => {
      expect(useSearch).toHaveBeenLastCalledWith("Ali");
    });
  });
});

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

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
  }),
  useSearchParams: () => new URLSearchParams(''),
}));

jest.mock("@/hooks/useSearch", () => jest.fn());

describe("SearchBox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input with placeholder", () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    render(<SearchBox placeholder="Search People" />);

    expect(screen.getByPlaceholderText("Search People")).toBeInTheDocument();
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

    const { findByText } = render(<SearchBox />);

    expect(await findByText(/John Doe/)).toBeInTheDocument();
    expect(await findByText(/known for: Acting/)).toBeInTheDocument();
  });

  it("shows 'no matches' message when data is empty", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    const { findByText } = render(<SearchBox />);
    expect(await findByText(/no matches found/i)).toBeInTheDocument();
  });

  

  it("refetches when input value changes with debounce and data=isStale", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isStale: true,
    });

    const { getByRole } = render(<SearchBox />);

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

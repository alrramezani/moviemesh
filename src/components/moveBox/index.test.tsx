import { render, screen } from "@testing-library/react";
import MovieBox from "@/components/moveBox";
import usePeopleQuery from "@/hooks/usePeopleQuery";
import useMoviesStore from "@/stores/useMoviesStore";
import usePeopleStore from "@/stores/usePeopleStore";
import React from "react";

jest.mock("@/components/searchBox", () => {
  const MockSearchBox = () => <div>Mocked SearchBox</div>;
  MockSearchBox.displayName = "MockSearchBox";
  return MockSearchBox;
});
jest.mock("@/hooks/usePeopleQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/stores/usePeopleStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/stores/useMoviesStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));
const mockedUsePeopleStore = usePeopleStore as jest.MockedFunction<
  typeof usePeopleStore
>;
const mockedUsePeopleQuery = usePeopleQuery as jest.MockedFunction<
  typeof usePeopleQuery
>;
const mockedUseMoviesStore = useMoviesStore as jest.MockedFunction<
  typeof useMoviesStore
>;

describe("MovieBox Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SearchBox if no cast is selected", () => {
    mockedUsePeopleQuery.mockReturnValue({
      ids: [],
      addId: jest.fn(),
      removeId: jest.fn(),
      clearAll: jest.fn(),
    });
    mockedUseMoviesStore.mockReturnValue({ data: [] });
    mockedUsePeopleStore.mockReturnValue({ people: [] });

    render(<MovieBox />);

    expect(screen.getByText(/discover movies/i)).toBeInTheDocument();
    expect(screen.getByTestId("search-box")).toBeInTheDocument();
  });

  it("shows no results message when cast selected but no movies", () => {
    mockedUsePeopleQuery.mockReturnValue({
      ids: ["1"],
      addId: jest.fn(),
      removeId: jest.fn(),
      clearAll: jest.fn(),
    });
    mockedUseMoviesStore.mockReturnValue({ data: [] });
    mockedUsePeopleStore.mockReturnValue({
      people: [{ id: 1, name: "John Doe" }],
    });

    render(<MovieBox />);

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("renders movies when data is available", () => {
    mockedUsePeopleQuery.mockReturnValue({
      ids: ["1"],
      addId: jest.fn(),
      removeId: jest.fn(),
      clearAll: jest.fn(),
    });
    mockedUseMoviesStore.mockReturnValue({
      data: [
        {
          id: 123,
          movieData: { title: "Inception", poster_path: "/poster.jpg" },
          sharedBy: [{ personId: 1, roles: ["Actor"] }],
        },
      ],
    });
    mockedUsePeopleStore.mockReturnValue({
      people: [{ id: 1, name: "John Doe" }],
    });

    render(<MovieBox />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByAltText("Inception")).toBeInTheDocument();
  });

  it("renders fallback icon when poster is missing", () => {
    mockedUsePeopleQuery.mockReturnValue({
      ids: ["1"],
      addId: jest.fn(),
      removeId: jest.fn(),
      clearAll: jest.fn(),
    });
    mockedUseMoviesStore.mockReturnValue({
      data: [
        {
          id: 456,
          movieData: { original_name: "Untitled", poster_path: null },
          sharedBy: [{ personId: 1, roles: ["Director"] }],
        },
      ],
    });
    mockedUsePeopleStore.mockReturnValue({
      people: [{ id: 1, name: "Jane Smith" }],
    });

    render(<MovieBox />);

    expect(screen.getByText("Untitled")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByTestId("image-icon")).toBeInTheDocument();
  });
});

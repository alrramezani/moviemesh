import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/sidebar";
import usePeopleStore from "@/stores/usePeopleStore";
import usePeopleQuery from "@/hooks/usePeopleQuery";
import "@testing-library/jest-dom";

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
beforeAll(() => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1024,
  });

  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query.includes("max-width: 768px")
      ? window.innerWidth < 768
      : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});
const mockedUsePeopleStore = usePeopleStore as jest.MockedFunction<
  typeof usePeopleStore
>;

describe("Sidebar", () => {
  const mockRemoveId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUsePeopleStore.mockReturnValue({
      data: [
        {
          id: "1",
          name: "John Doe",
          profile_path: null,
          known_for_department: "Acting",
          place_of_birth: "NY",
        },
      ],
      loading: false,
    });

    (usePeopleQuery as jest.Mock).mockReturnValue({
      removeId: mockRemoveId,
      ids: ["1"],
    });
  });

  it("renders without crashing and displays person name", () => {
    render(<Sidebar />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("hides details when sidebar is collapsed", () => {
    render(<Sidebar />);
    const name = screen.queryByText("John Doe");
    expect(name).toBeInTheDocument();
  });

  it("applies '-translate-x-[100vw]' class when isHide is true", () => {
    (usePeopleQuery as jest.Mock).mockReturnValue({
      ids: [],
      addId: jest.fn(),
      removeId: jest.fn(),
      clearAll: jest.fn(),
    });
    render(<Sidebar />);
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("-translate-x-[100vw]");
  });

  it("calls removeId when remove button is clicked", () => {
    render(<Sidebar />);
    const removeButton = screen.getByTestId("remove-button");
    fireEvent.click(removeButton);
    expect(mockRemoveId).toHaveBeenCalledWith("1");
  });

  it("shows loading when loading is true", () => {
    mockedUsePeopleStore.mockReturnValue({
      data: [],
      loading: true,
    });

    render(<Sidebar />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
});

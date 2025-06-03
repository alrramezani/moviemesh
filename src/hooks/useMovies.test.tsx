import { renderHook, waitFor } from "@testing-library/react";
import useMovies from "@/hooks/useMovies";
import { PersonCredits } from "@/types";
import getSharedMovies from "@/utils/getSharedMovies";
import QueryWrapper from "@/utils/queryWrapper";

jest.mock("@/utils/getSharedMovies", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockPersonCredits: PersonCredits = {
  id: 1,
  cast: [],
  crew: [],
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockPersonCredits),
  })
) as jest.Mock;

describe("useMovies", () => {
  it("fetches credits and returns shared movies", async () => {
    const fakeSharedMovies = [{ id: 100, movieData: {}, sharedBy: [] }];
    (getSharedMovies as jest.Mock).mockReturnValue(fakeSharedMovies);

    const { result } = renderHook(() => useMovies(["1", "2"]), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0);
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(getSharedMovies).toHaveBeenCalled();
    expect(result.current.data).toEqual(fakeSharedMovies);
  });
});

import useMoviesStore from "@/stores/useMoviesStore";
import { act } from "@testing-library/react";
import { CombinedMovie } from "@/types";
// Define a mock movie
const mockMovie = {
    id: "1",
    title: "Test Movie",
    year: "2023",
    genre: "Action",
    director: "Someone",
    rating: 8.5,
} as unknown as CombinedMovie; 
describe("useMoviesStore Zustand store", () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    const { setMoviesData, setMoviesLoading } = useMoviesStore.getState();
    setMoviesData([]);
    setMoviesLoading(false);
  });

  it("should have initial state", () => {
    const state = useMoviesStore.getState();
    expect(state.moviesData).toEqual([]);
    expect(state.moviesLoading).toBe(false);
  });

  it("should update moviesData correctly", () => {
    act(() => {
      useMoviesStore.getState().setMoviesData([mockMovie]);
    });

    const state = useMoviesStore.getState();
    expect(state.moviesData).toEqual([mockMovie]);
  });

  it("should update moviesLoading correctly", () => {
    act(() => {
      useMoviesStore.getState().setMoviesLoading(true);
    });

    const state = useMoviesStore.getState();
    expect(state.moviesLoading).toBe(true);
  });
});
"use client"
import { create } from "zustand";
import { CombinedMovie } from "@/types";
interface MoviesStore {
  moviesData: CombinedMovie[];
  moviesLoading: boolean;
  setMoviesData: (data: CombinedMovie[]) => void;
  setMoviesLoading: (loading: boolean) => void;
}

const useMoviesStore = create<MoviesStore>((set) => ({
  moviesData: [],
  moviesLoading: false,
  setMoviesData: (data) => set({ moviesData: data }),
  setMoviesLoading: (loading) => set({ moviesLoading: loading }),
}));

export default useMoviesStore;

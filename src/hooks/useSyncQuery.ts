"use client";
import usePeopleQuery from "@/hooks/usePeopleQuery";
import { useEffect } from "react";
import useMovies from "@/hooks/useMovies";
import usePersons from "@/hooks/usePersons";
import usePeopleStore from "@/stores/usePeopleStore";
import useMoviesStore from "@/stores/useMoviesStore";

export default function useQuerySync() {
  const { ids } = usePeopleQuery();

  // PEOPLE STORE
  const setPeopleData = usePeopleStore((s) => s.setPeopleData);
  const setPeopleLoading = usePeopleStore((s) => s.setPeopleLoading);

  // // MOVIE STORE
  const setMoviesData = useMoviesStore((s) => s.setMoviesData);
  const setMoviesLoading = useMoviesStore((s) => s.setMoviesLoading);

  // Fetch data using hooks
  const { data: moviesData, isLoading: moviesLoading } = useMovies(ids);
  const { data: peopleData, isLoading: peopleLoading } = usePersons(ids);

  useEffect(() => {
    if (peopleData) {
      setPeopleData(peopleData);
    }
    setPeopleLoading(peopleLoading);
  }, [peopleData, peopleLoading, setPeopleData, setPeopleLoading]);

  // Sync loading and data to movie store
  useEffect(() => {
    if (moviesData) {
      setMoviesData(moviesData);
    }
    setMoviesLoading(moviesLoading);
  }, [moviesData, moviesLoading, setMoviesData, setMoviesLoading]);
}

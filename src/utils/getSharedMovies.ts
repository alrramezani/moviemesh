import { PersonCredits, CombinedMovie, TmdbMovieCreditBase } from "@/types";

export default function getSharedMovies(
  personCredits: PersonCredits[]
): CombinedMovie[] {
  if (personCredits.length === 0) return [];

  const personMovieMap: Map<
    number,
    Map<number, { movie: TmdbMovieCreditBase; roles: string[] }>
  > = new Map();

  for (const person of personCredits) {
    const movieMap = new Map<
      number,
      { movie: TmdbMovieCreditBase; roles: string[] }
    >();

    for (const movie of person.cast) {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, { movie, roles: [] });
      }
      movieMap.get(movie.id)?.roles.push(`Actor: ${movie.character}`);
    }

    for (const movie of person.crew) {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, { movie, roles: [] });
      }
      movieMap.get(movie.id)?.roles.push(`Crew: ${movie.job}`);
    }

    personMovieMap.set(person.id, movieMap);
  }

  const allMovieIdSets = [...personMovieMap.values()].map(
    (map) => new Set(map.keys())
  );
  const sharedMovieIds = [
    ...allMovieIdSets.reduce((acc, set) => {
      return new Set([...acc].filter((id) => set.has(id)));
    }),
  ];

  const result: CombinedMovie[] = sharedMovieIds.map((movieId) => {
    const movieData = [...personMovieMap.values()][0].get(movieId)!.movie;

    const sharedBy = [...personMovieMap.entries()].map(
      ([personId, movieMap]) => {
        const roles = movieMap.get(movieId)?.roles || [];
        return {
          personId,
          roles,
        };
      }
    );

    return {
      id: movieId,
      movieData,
      sharedBy,
    };
  });

  return result;
}

import getSharedMovies from "./getSharedMovies";
import { PersonCredits, TmdbCastCredit, TmdbCrewCredit } from "@/types";

const mockMovie = (id: number): TmdbCastCredit & TmdbCrewCredit => ({
  id,
  title: `Movie ${id}`,
  poster_path: null,
  release_date: "2020-01-01",
  vote_average: 7.5,
  vote_count: 1000,
  overview: "Some overview",
  media_type: "movie",
  character: `Character ${id}`,
  credit_id: `cast-credit-${id}`,
  order: 0,
  department: "Directing",
  job: `Director ${id}`,
});

describe("getSharedMovies", () => {
  it("returns an empty array if input is empty", () => {
    expect(getSharedMovies([])).toEqual([]);
  });

  it("returns an empty array if no movies are shared", () => {
    const input: PersonCredits[] = [
      {
        id: 1,
        cast: [mockMovie(1)],
        crew: [],
      },
      {
        id: 2,
        cast: [mockMovie(2)],
        crew: [],
      },
    ];

    expect(getSharedMovies(input)).toEqual([]);
  });

  it("returns shared movies between two people", () => {
    const sharedMovie = mockMovie(3);
    const input: PersonCredits[] = [
      {
        id: 1,
        cast: [sharedMovie],
        crew: [],
      },
      {
        id: 2,
        cast: [],
        crew: [sharedMovie],
      },
    ];

    const result = getSharedMovies(input);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(3);
    expect(result[0].movieData.id).toBe(3);
    expect(result[0].sharedBy).toEqual(
      expect.arrayContaining([
        {
          personId: 1,
          roles: [`Actor: ${sharedMovie.character}`],
        },
        {
          personId: 2,
          roles: [`Crew: ${sharedMovie.job}`],
        },
      ])
    );
  });

  it("handles multiple shared movies correctly", () => {
    const shared1 = mockMovie(10);
    const shared2 = mockMovie(20);
    const input: PersonCredits[] = [
      {
        id: 1,
        cast: [shared1, shared2],
        crew: [],
      },
      {
        id: 2,
        cast: [],
        crew: [shared1, shared2],
      },
    ];

    const result = getSharedMovies(input);
    expect(result.length).toBe(2);
    const ids = result.map((m) => m.id);
    expect(ids).toContain(10);
    expect(ids).toContain(20);
  });
});
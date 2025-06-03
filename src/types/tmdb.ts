export interface TmdbMovieCreditBase {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  media_type: string;
}

export interface TmdbCastCredit extends TmdbMovieCreditBase {
  character: string;
  credit_id: string;
  order: number;
}

export interface TmdbCrewCredit extends TmdbMovieCreditBase {
  department: string;
  job: string;
  credit_id: string;
}

export type PersonCredits = {
  id: number;
  cast: TmdbCastCredit[];
  crew: TmdbCrewCredit[];
};

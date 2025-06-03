import { TmdbMovieCreditBase } from "@/types";
export interface CombinedMovie {
  id: number;
  movieData: TmdbMovieCreditBase;
  sharedBy: Array<{
    personId: number;
    roles: string[];
  }>;
}

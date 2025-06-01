export type personType = {
  adult: boolean;
  also_known_as: string[];
  biography: string | null;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  original_name?:string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

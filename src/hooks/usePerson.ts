import { useQuery } from "@tanstack/react-query";
type responseType = {
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
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};
const fetchPerson = async (personId: number): Promise<responseType[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "person/" + personId,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
      },
    }
  );
  const data = await response.json();
  return data.results;
};

const usePerson = (personId: number) => {
  return useQuery({
    queryKey: ["person", personId],
    queryFn: () => fetchPerson(personId),
    enabled: false,
  });
};

export default usePerson;

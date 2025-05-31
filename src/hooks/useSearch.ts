import { useQuery } from "@tanstack/react-query";
type responseType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};
const fetchPersons = async (
  query: string,
  limit = 10
): Promise<responseType[]> => {
  const params = new URLSearchParams();
  params.append("query", query);
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "search/person?" + params,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
      },
    }
  );
  const data = await response.json();
  return data.results.slice(0, limit);
};

const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchPersons(query),
    enabled: false,
  });
};

export default useSearch;

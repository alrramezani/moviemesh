import { useQuery } from "@tanstack/react-query";
import { personType } from "@/types";
const fetchPersons = async (
  query: string,
  limit = 10
): Promise<personType[]> => {
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!query,
  });
};

export default useSearch;

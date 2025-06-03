import { useQueries } from "@tanstack/react-query";
import{PersonCredits} from "@/types"
import getSharedMovies from "@/utils/getSharedMovies";

const fetchCredits = async (personId: string): Promise<PersonCredits> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      "person/" +
      personId +
      "/combined_credits",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
      },
    }
  );
  const data = await response.json();
  return data;
};


const useMovies = (personIds: string[]) => {
  return useQueries({
    queries: personIds.map((id) => ({
      queryKey: ["person", id],
      queryFn: () => fetchCredits(id),
      staleTime: Infinity,
    })),
    combine: (results) => {
      const creditsArray = results
        .map((r) => r.data)
        .filter((r): r is PersonCredits => r !== undefined);

      return {
        data: getSharedMovies(creditsArray),
        pending: results.some((result) => result.isPending),
        isLoading: results.some((r) => r.isLoading),
        isError: results.some((r) => r.isError),
        isSuccess: results.every((r) => r.isSuccess),
        errors: results.map((r) => r.error).filter(Boolean),
      };
    },
  });
};

export default useMovies;

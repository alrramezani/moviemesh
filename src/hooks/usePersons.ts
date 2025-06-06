import { useQueries } from "@tanstack/react-query";
import { personType } from "@/types";
const fetchPerson = async (personId: string): Promise<personType> => {
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
  return data;
};

const usePersons = (personIds: string[]) => {
  return useQueries({
    queries: personIds.map((id) => ({
      queryKey: ["person", id],
      queryFn: () => fetchPerson(id),
      staleTime: Infinity,
      enabled: !!id,
    })),
    combine: (results) => {
      return {
        data: results.map((r) => r.data).filter((d): d is personType => !!d),
        pending: results.some((result) => result.isPending),
        isLoading: results.some((r) => r.isLoading),
        isError: results.some((r) => r.isError),
        isSuccess: results.every((r) => r.isSuccess),
        isFetching: results.some((r) => r.isFetching),
        errors: results.map((r) => r.error).filter(Boolean),
      };
    },
  });
};

export default usePersons;

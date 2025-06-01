import { useQuery } from "@tanstack/react-query";
import { personType } from "@/types";
const fetchPerson = async (personId?: number): Promise<personType[]> => {
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

const usePerson = (personId?: number) => {
  return useQuery({
    queryKey: ["person", personId],
    queryFn: () => fetchPerson(personId),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: !!personId,
  });
};

export default usePerson;

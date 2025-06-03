import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useSyncQuery() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.size) {
      console.log(searchParams.get("people"));
    }
  }, [searchParams]);
}

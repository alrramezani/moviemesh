"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function usePeopleQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentIds = useMemo(() => {
    const value = searchParams.get("people");
    return value ? value.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const updateUrl = useCallback(
    (newIds: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newIds.length === 0) {
        params.delete("people");
      } else {
        params.set("people", newIds.join(","));
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const addId = useCallback(
    (id: string) => {
      if (!currentIds.includes(id)) {
        updateUrl([...currentIds, id]);
      }
    },
    [currentIds, updateUrl]
  );

  const removeId = useCallback(
    (id: string) => {
      updateUrl(currentIds.filter((x) => x != id));
    },
    [currentIds, updateUrl]
  );

  const clearAll = useCallback(() => {
    updateUrl([]);
  }, [updateUrl]);

  return {
    ids: currentIds,
    addId,
    removeId,
    clearAll,
  };
}
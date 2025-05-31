"use client";
import usePerson from "@/hooks/usePerson";
import { useEffect } from "react";
export default function Home() {
  const { refetch } = usePerson(287);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="bg-white w-[60%] p-4 rounded-2xl shadow">
        <h1 className="text-4xl font-bold mb-4">🎬 MovieMesh</h1>
        <p className="text-lg max-w-xl">
          An open-source movie search app — discover films through the people
          who made them.
        </p>
        <p className="mt-4 text-sm opacity-70 mb-4">
          🚧 Work in progress. Stay tuned!
        </p>
      </div>
    </main>
  );
}

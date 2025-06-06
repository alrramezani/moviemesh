"use client";
import useQuerySync from "@/hooks/useSyncQuery";
import Sidebar from "@/components/sidebar";
import MovieBox from "@/components/moveBox";
export default function Home() {
  useQuerySync();
  return (
    <main className="px-4">
      <Sidebar />
      <MovieBox />
    </main>
  );
}

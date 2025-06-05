"use client";
import useQuerySync from "@/hooks/useSyncQuery";
import Sidebar from "@/components/sidebar";
import SearchBox from "@/components/searchBox";
import usePeopleQuery from "@/hooks/usePeopleQuery";
export default function Home() {
  const { ids } = usePeopleQuery();
  useQuerySync();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <Sidebar isHide={!ids.length} />
      <div className="w-[60%]">
        <h1 className="text-4xl font-bold mb-10">
          Discover movies by your favorite cast members
        </h1>
        <div className=" bg-white rounded-2xl shadow p-4">
          <SearchBox />
        </div>
      </div>
    </main>
  );
}

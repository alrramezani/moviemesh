"use client";
import usePeopleQuery from "@/hooks/usePeopleQuery";
import useSyncQuery from "@/hooks/useSyncQuery";
import SearchBox from "@/components/searchBox";
// import usePersons from "@/hooks/usePersons"
import useMovies from "@/hooks/useMovies";
export default function Home() {
  useSyncQuery();
  const {data,isLoading} =useMovies(["31",'525']);
  console.log(isLoading,data);
  
  const{addId}=usePeopleQuery()
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
        <SearchBox onSelect={addId}/>
      </div>
    </main>
  );
}

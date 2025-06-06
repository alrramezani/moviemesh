import usePeopleQuery from "@/hooks/usePeopleQuery";
import SearchBox from "@/components/searchBox";
import useMoviesStore from "@/stores/useMoviesStore";
import usePeopleStore from "@/stores/usePeopleStore";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { ImageIcon } from "@/components/icons";

export default function MovieBox() {
  const { ids } = usePeopleQuery();
  const { data } = useMoviesStore(
    useShallow((s) => ({
      data: s.moviesData
    }))
  );
  const { people } = usePeopleStore(
    useShallow((s) => ({
      people: s.peopleData,
    }))
  );
  if (!ids.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center min-h-screen">
        <h1 className="text-4xl font-bold mb-10 md:w-[60%]">
          Discover movies by your favorite cast members
        </h1>
        <div className="bg-white rounded-2xl shadow p-4 w-full md:w-[60%]">
          <SearchBox />
        </div>
      </div>
    );
  }
  const personName = (id: number) => {
    const person = people.find((p) => p.id === id);
    return person?.name;
  };
  return (
    <div className="ml-20 md:ml-[336px] mr-4 my-2 bg-white rounded-lg shadow p-4 min-h-[calc(100vh-16px)]">
      {!data.length && (
        <div className="w-full h-full flex justify-center items-center text-2xl py-32">
          No results. Try searching with fewer or different cast members.
        </div>
      )}
      {data.map((movie) => (
        <div key={movie.id} className="flex mb-2 pb-2 border-b border-gray-200">
          <div className="w-16 h-20 md:w-32 md:h-40 flex justify-center rounded-xs overflow-hidden">
            {!movie.movieData.poster_path ? (
              <div className="bg-gray-50 w-full h-full flex items-center justify-center">
                <ImageIcon className={`text-gray-300 object-cover w-10 h-12`} />
              </div>
            ) : (
              <Image
                width={120}
                height={180}
                className="object-cover"
                src={
                  process.env.NEXT_PUBLIC_W500_IMAGE +
                  movie.movieData.poster_path
                }
                alt={movie.movieData.title ?? movie.movieData.original_name}
              />
            )}
          </div>
          <div className="pl-2 flex-1">
            <p className="font-medium capitalize text-ellipsis md:mb-2 md:text-lg">
              {movie.movieData.title ?? movie.movieData.original_name}
            </p>
            {movie.sharedBy.map((person) => (
              <div key={person.personId} className="text-sm">
                {personName(person.personId)}{" "}
                <span className="text-xs text-gray-600">
                  (
                  {person.roles.map((role, i) => (
                    <span className="mx-0.5" key={i}>
                      {role}
                    </span>
                  ))}
                  )
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

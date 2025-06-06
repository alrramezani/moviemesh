"use client"
import Image from "next/image";
import usePeopleQuery from "@/hooks/usePeopleQuery";

export default function Fotter() {
  const { ids } = usePeopleQuery();

  return (
    <footer className={`bg-white text-center border-t border-gray-100 py-4 text-xs pl-16 pr-2 md:text-sm ${!ids.length?"md:pl-0":"md:pl-[336px]"} `}>
      <p className="mb-2">
        © 2025 MovieMesh. Open source on GitHub: alrramezani/moviemesh.
      </p>
      <p className="mb-2">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Image
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
          alt="The Movie Database (TMDb) logo"
          className="mx-auto h-6 md:h-8"
          width={180}
          height={40}
        />
      </a>
    </footer>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Open_Sans } from "next/font/google";
import ReactQueryProvider from "@/components/reactQueryProvider";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MovieMesh | Discover by Cast & Creators",
  description:
    "An open-source movie search tool powered by TMDB. Find films by actor, director, or both.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <footer className=" bg-white text-center border-t border-gray-100 py-4 mt-8 text-sm">
          <p className="mb-2">
            © 2025 MovieMesh. Open source on GitHub: alrramezani/moviemesh.
          </p>
          <p className="mb-2">
            This product uses the TMDb API but is not endorsed or certified by
            TMDb.
          </p>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
              alt="The Movie Database (TMDb) logo"
              className="mx-auto h-6 md:h-8"
              width={180}
            />
          </a>
        </footer>
      </body>
    </html>
  );
}

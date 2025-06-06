import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Fotter from "@/components/footer";
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
            <Suspense fallback={<div>Loading Sidebar...</div>}>

        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Fotter />
        </Suspense>
      </body>
    </html>
  );
}

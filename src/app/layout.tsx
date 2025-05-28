import type { Metadata } from 'next'
import "@/app/globals.css"
import { Montserrat, Open_Sans } from 'next/font/google';
import ReactQueryProvider from "@/components/ReactQueryProvider"
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata:Metadata = {
  title: 'MovieMesh | Discover by Cast & Creators',
  description: 'An open-source movie search tool powered by TMDB. Find films by actor, director, or both.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

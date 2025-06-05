"use client";
import useQuerySync from "@/hooks/useSyncQuery";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

export default function Home() {
  useQuerySync();
  const [hide,setHide] =useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <Sidebar isHide={hide}/>
      <div className="bg-white w-[60%] p-4 rounded-2xl shadow">
        <h1 className="text-4xl font-bold mb-4">🎬 MovieMesh</h1>
        <p className="text-lg max-w-xl">
          An open-source movie search app — discover films through the people
          who made them.
        </p>
        <p className="mt-4 text-sm opacity-70 mb-4" onClick={()=>setHide(!hide)}>
          🚧 Work in progress. Stay tuned!
        </p>
      </div>
    </main>
  );
}

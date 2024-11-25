"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "No query provided";

  return (<>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1>Search Results</h1>
        <p>Your query: {query}</p>
        <ul>
          {Array.from({ length: 15 }).map((_, index) => (
            <li key={index}>Result #{index + 1}</li>
          ))}
        </ul>
      </main></>
  );
}

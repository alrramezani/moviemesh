"use client";

import { useState, useEffect } from "react";
import { debounce } from "lodash";
type AutocompleteSearchType = {
  placeholder?: string;
};

export default function AutocompleteSearch({
  placeholder,
}: AutocompleteSearchType) {
  const [focus, setFocus] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  const debouncedSearch = debounce((value) => {
    console.log("Search:", value);
  }, 500);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query,debouncedSearch]);

  return (
    <div
      className={`w-full ${
        focus ? "fixed h-full bg-white z-50" : "relative"
      } top-0 left-0 md:relative`}
    >
      <div className=" relative">
        <div
          className={`absolute inset-y-0 start-0 flex items-center ps-3 ${
            focus ? "" : "pointer-events-none"
          }`}
        >
          <svg
            className={`w-4 h-4 text-gray-500 ${focus ? "hidden" : "block"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <svg
            className={`w-6 h-6 cursor-pointer text-gray-500 ${
              focus ? "block" : "hidden"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setFocus(false)}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50  ${
            focus
              ? "focus:outline-none focus:ring-0"
              : "focus:ring-blue-500 focus:border-blue-500 rounded-lg"
          }`}
          placeholder={placeholder || "Search Casts..."}
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocus(true)}
        />
      </div>
    </div>
  );
}

// {/* Mobile only */}
//       <div className="block md:hidden bg-blue-100 p-4">
//         <p className="text-center text-sm text-blue-800">This is the Mobile Version</p>
//       </div>

//       {/* Desktop only */}
//       <div className="hidden md:block bg-green-100 p-4">
//         <p className="text-center text-lg text-green-800">This is the Desktop Version</p>
//       </div>

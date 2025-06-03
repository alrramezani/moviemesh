"use client";
import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import useSearch from "@/hooks/useSearch";
import Skeleton from "@/components/skeleton";
import Image from "next/image";
import { SearchIcon, ArrowLeftIcon, UserIcon } from "@/components/icons";
type SearchBoxType = {
  placeholder?: string;
  onSelect: (id: string ) => void;
};
export default function SearchBox({
  placeholder = "Search Casts...",
  onSelect,
}: SearchBoxType) {
  const [focus, setFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const { data, isLoading } = useSearch(queryKey);
  const debouncedQueryKey = useMemo(
    () =>
      debounce((value: string) => {
        if (value.length > 2) setQueryKey(value);
      }, 500),
    []
  );
  useEffect(() => {
    if (inputValue.length < 3) {
      setQueryKey("");
    }
    debouncedQueryKey(inputValue);
    return () => debouncedQueryKey.cancel();
  }, [inputValue, debouncedQueryKey]);
  const resetAll = () => {
    setInputValue("");
    setQueryKey("");
    setFocus(false);
  };
  const handleSelect = (id: string | number) => {
    onSelect(id as string);
    resetAll();
  };
  return (
    <div
      className={`w-full ${
        focus ? "fixed h-full bg-white z-50" : "relative"
      } top-0 left-0 md:relative md:z-10 flex flex-col`}
    >
      <div className="relative">
        <div
          className={`absolute inset-y-0 start-0 flex items-center ps-3 ${
            focus ? "" : "pointer-events-none"
          } md:pointer-events-none`}
        >
          <SearchIcon
            className={`w-4 h-4 text-gray-500 ${
              focus ? "hidden" : "block"
            } md:block`}
          />
          <ArrowLeftIcon
            className={`w-6 h-6 cursor-pointer text-gray-500 ${
              focus ? "block" : "hidden"
            } md:hidden`}
            onClick={resetAll}
          />
        </div>
        <input
          type="search"
          className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50  ${
            focus ? "focus:outline-none focus:ring-0" : "rounded-lg"
          } md:rounded-lg`}
          placeholder={placeholder}
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
      <div
        className={`p-4 overflow-y-auto max-h-screen md:absolute md:bg-gray-50 md:border-gray-300 md:border-t-0 md:border md:rounded-b-lg md:w-full md:max-h-80 md:top-full md:mt-[-6px] md:empty:hidden ${
          !focus && " md:hidden"
        }`}
      >
        {isLoading ? (
          <Skeleton type="userSearch" count={5} />
        ) : (
          data?.map((person, i) => (
            <div key={person.id}>
              <div
                className="flex items-center cursor-pointer"
                data-testid={"search-item-" + person.id}
                onMouseDown={() => handleSelect(person.id)}
                onTouchStart={() => handleSelect(person.id)}
              >
                {!person.profile_path ? (
                  <UserIcon className="w-10 h-10 me-3 text-gray-200" />
                ) : (
                  <div className="w-10 h-10 overflow-hidden rounded-full me-3">
                    <Image
                      width={40}
                      height={60}
                      className="object-cover"
                      src={
                        process.env.NEXT_PUBLIC_W500_IMAGE + person.profile_path
                      }
                      alt={person.name}
                    />
                  </div>
                )}
                <div className="pl-2 text-left">
                  <div className="mb-2 w-full text-ellipsis">
                    {person.name}
                    <small className="pl-1 text-xs">
                      {person.original_name}
                    </small>
                  </div>
                  <div className="text-sm w-full text-ellipsis">
                    known for: {person.known_for_department}
                  </div>
                </div>
              </div>
              {i < data.length - 1 && (
                <div className="flex items-center justify-center">
                  <div className="h-[1px] bg-gray-200 w-3/4 my-2"></div>
                </div>
              )}
            </div>
          ))
        )}
        {data && data.length <= 0 && (
          <div className="flex items-center justify-center h-16 text-center">
            Oops! No matches found. Give it another go.
          </div>
        )}
      </div>
    </div>
  );
}

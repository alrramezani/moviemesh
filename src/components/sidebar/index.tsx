"use client";
import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import usePeopleStore from "@/stores/usePeopleStore";
import { personType } from "@/types";
import Image from "next/image";
import { CloseIcon, UserIcon } from "@/components/icons";
import SearchBox from "@/components/searchBox";
import usePeopleQuery from "@/hooks/usePeopleQuery";
type SidebarType = {
  isHide: boolean;
};

export default function Sidebar({ isHide }: SidebarType) {
  const { removeId } = usePeopleQuery();
  const { data, loading } = usePeopleStore(
    useShallow((s) => ({
      data: s.peopleData,
      loading: s.peopleLoading,
    }))
  );
  const [isOpen, SetIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen, isMobile]);
  return (
    <>
      <div
        onClick={() => SetIsOpen(false)}
        className={`bg-black fixed top-0 left-0 z-50 w-full h-full opacity-10 transition-all duration-300 md:hidden ease-in-out ${
          isHide ? "hidden" : isOpen ? "visible" : "hidden"
        }`}
      ></div>
      <aside
        onClick={() => SetIsOpen(true)}
        className={`fixed top-2 bottom-2 inset-x-2 z-50 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto
    ${isHide ? "-translate-x-[100vw]" : "translate-x-0"}
    ${isOpen ? " w-[85%]" : "w-14"}
    md:w-80`}
      >
        {loading && (
          <div data-testid="loading" className=" absolute h-full w-full bg-gray-200 rounded-lg animate-pulse cursor-progress" />
        )}
        <div className={`${isOpen ? "block" : "hidden"} md:block sticky top-0`}>
          <SearchBox type="inBox" />
        </div>
        {data.map((person: personType) => (
          <div
            key={person.id}
            className={`flex px-2 relative ${isOpen ? "my-3" : "my-2"}`}
          >
            <div
              data-testid="remove-button"
              onClick={() => removeId(person.id as unknown as string)}
              className={`bg-gray-100 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer absolute right-2 top-2 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <CloseIcon className="text-gray-500 text-xs w-4 h-4" />
            </div>
            <div className={`flex justify-center ${isOpen ? "" : "w-fit"}`}>
              {!person.profile_path ? (
                <div
                  className={`bg-gray-50 rounded-lg ${
                    isOpen ? "w-16 h-16" : "w-10 h-10"
                  } md:w-16 md:h-16`}
                >
                  <UserIcon
                    className={`text-gray-200 object-cover ${
                      isOpen ? "w-16 h-16" : "w-10 h-10"
                    } md:w-16 md:h-16`}
                  />
                </div>
              ) : (
                <Image
                  data-tooltip-target="tooltip-jese"
                  className={`rounded-lg object-cover ${
                    isOpen ? "w-16 h-16" : "w-10 h-10"
                  } md:w-16 md:h-16`}
                  width={120}
                  height={180}
                  src={process.env.NEXT_PUBLIC_W500_IMAGE + person.profile_path}
                  alt={person.name}
                />
              )}
            </div>
            <div
              className={`pl-2 py-1 w-fit text-left ${
                isOpen ? "block" : "hidden"
              } md:block`}
            >
              <p className="font-medium capitalize text-ellipsis">
                {person.name}
              </p>
              <p className="text-sm ">
                {person.known_for_department}
                {person.place_of_birth && (
                  <>
                    <span className=" text-lg"> . </span>
                    <small className=" text-xs">{person.place_of_birth}</small>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}

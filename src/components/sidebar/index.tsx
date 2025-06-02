import React, { useState, useEffect } from "react";
type SidebarType = {
  children: React.ReactNode;
  isOpen: boolean;
  isHide: boolean;
};

export default function Sidebar({ children, isOpen, isHide }: SidebarType) {
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
        className={`bg-black fixed top-0 left-0 z-50 w-full h-full opacity-10 transition-all duration-300 md:hidden ease-in-out ${
          isHide ? "hidden" : isOpen ? "visible" : "hidden"
        }`}
      ></div>
      <aside
        className={`fixed top-2 bottom-2 inset-x-2 z-50 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out
    ${isHide ? "-translate-x-full" : "translate-x-0"}
    ${isOpen ? "w-[calc(100%-1rem)]" : "w-14"}
    md:w-80`}
      >
        {children}
      </aside>
    </>
  );
}

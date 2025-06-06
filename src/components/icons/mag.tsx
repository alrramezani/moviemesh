import React from "react";

const MagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35m2.5-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"
    />
  </svg>
);

export default MagIcon;
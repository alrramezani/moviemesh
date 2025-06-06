import React from "react";
type Props = React.HTMLAttributes<HTMLElement>;
export default function CloseIcon({ ...rest }: Props) {
  return (
    <i {...rest} className={`inline-block ${rest.className || ""}`}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
    </i>
  );
}

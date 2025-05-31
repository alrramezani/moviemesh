import React from "react";
type Props = React.HTMLAttributes<HTMLElement>;
export default function ArrowLeftIcon({ ...rest }: Props) {
  return (
    <i {...rest}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M5 12l4-4m-4 4 4 4"
        />
      </svg>
    </i>
  );
}

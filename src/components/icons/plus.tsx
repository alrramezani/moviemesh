import React from "react";
type Props = React.HTMLAttributes<HTMLElement>;
export default function PlusIcon({ ...rest }: Props) {
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
          stroke-strokeLinejoin="round"
          stroke-strokeWidth={2}
          d="M5 12h14m-7 7V5"
        />
      </svg>
    </i>
  );
}

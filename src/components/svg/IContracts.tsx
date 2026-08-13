import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IContracts({
  color = "currentColor",
  className = "",
}: IconProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <path
          d="M2.5 8.33366C2.5 5.19096 2.5 3.61961 3.47631 2.6433C4.45262 1.66699 6.02397 1.66699 9.16667 1.66699H10.8333C13.976 1.66699 15.5474 1.66699 16.5237 2.6433C17.5 3.61961 17.5 5.19096 17.5 8.33366V11.667C17.5 14.8097 17.5 16.381 16.5237 17.3573C15.5474 18.3337 13.976 18.3337 10.8333 18.3337H9.16667C6.02397 18.3337 4.45262 18.3337 3.47631 17.3573C2.5 16.381 2.5 14.8097 2.5 11.667V8.33366Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M6.66602 10H13.3327"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.66602 6.66699H13.3327"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.66602 13.333H10.8327"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
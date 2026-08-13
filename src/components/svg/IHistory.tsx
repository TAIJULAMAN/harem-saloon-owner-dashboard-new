import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IHistory({
  color = "currentColor",
  className = "",
}: IconProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M10 7L2 7"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 12H2"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 17H2"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="17"
          cy="12"
          r="5"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M17 10V11.8462L18 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
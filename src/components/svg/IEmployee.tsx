import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IEmployee({
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
        <circle
          cx="9.99935"
          cy="5.00033"
          r="3.33333"
          stroke={color}
          strokeWidth="1.25"
        />
        <path
          d="M15 7.49967C16.3807 7.49967 17.5 6.56693 17.5 5.41634C17.5 4.26575 16.3807 3.33301 15 3.33301"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M5 7.49967C3.61929 7.49967 2.5 6.56693 2.5 5.41634C2.5 4.26575 3.61929 3.33301 5 3.33301"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <ellipse
          cx="10"
          cy="14.1663"
          rx="5"
          ry="3.33333"
          stroke={color}
          strokeWidth="1.25"
        />
        <path
          d="M16.666 15.8337C18.1279 15.5131 19.166 14.7012 19.166 13.7503C19.166 12.7994 18.1279 11.9876 16.666 11.667"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M3.33398 15.8337C1.87211 15.5131 0.833984 14.7012 0.833984 13.7503C0.833984 12.7994 1.87211 11.9876 3.33398 11.667"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
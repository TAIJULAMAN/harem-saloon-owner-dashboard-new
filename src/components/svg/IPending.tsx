import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IPending({
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
          d="M13.3333 3.33594C15.1459 3.34603 16.1274 3.4264 16.7678 4.06672C17.5 4.79896 17.5 5.97747 17.5 8.33449V13.3345C17.5 15.6915 17.5 16.87 16.7678 17.6023C16.0355 18.3345 14.857 18.3345 12.5 18.3345H7.5C5.14298 18.3345 3.96447 18.3345 3.23223 17.6023C2.5 16.87 2.5 15.6915 2.5 13.3345V8.33449C2.5 5.97747 2.5 4.79896 3.23223 4.06672C3.87255 3.4264 4.85414 3.34603 6.66667 3.33594"
          stroke={color}
          strokeWidth="1.25"
        />
        <path
          d="M5.83398 12.084H12.5007"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M5.83398 15H10.4173"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M6.66602 2.91602C6.66602 2.22566 7.22566 1.66602 7.91602 1.66602H12.0827C12.773 1.66602 13.3327 2.22566 13.3327 2.91602V3.74935C13.3327 4.4397 12.773 4.99935 12.0827 4.99935H7.91602C7.22566 4.99935 6.66602 4.4397 6.66602 3.74935V2.91602Z"
          stroke={color}
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
}
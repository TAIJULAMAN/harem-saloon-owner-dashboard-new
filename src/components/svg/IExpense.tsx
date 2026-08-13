import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IExpense({
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
          d="M5 6.66675H8.33333"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.3611 7.5H15.1923C13.7054 7.5 12.5 8.61929 12.5 10C12.5 11.3807 13.7054 12.5 15.1923 12.5H17.3611C17.4306 12.5 17.4653 12.5 17.4946 12.4982C17.944 12.4709 18.302 12.1385 18.3314 11.7212C18.3333 11.6939 18.3333 11.6617 18.3333 11.5972V8.40278C18.3333 8.33829 18.3333 8.30605 18.3314 8.27883C18.302 7.86153 17.944 7.52914 17.4946 7.50178C17.4653 7.5 17.4306 7.5 17.3611 7.5Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M17.4702 7.49992C17.4054 5.93967 17.1965 4.98304 16.523 4.30956C15.5467 3.33325 13.9754 3.33325 10.8327 3.33325L8.33268 3.33325C5.18999 3.33325 3.61864 3.33325 2.64233 4.30956C1.66602 5.28587 1.66602 6.85722 1.66602 9.99992C1.66602 13.1426 1.66602 14.714 2.64233 15.6903C3.61864 16.6666 5.18999 16.6666 8.33268 16.6666H10.8327C13.9754 16.6666 15.5467 16.6666 16.523 15.6903C17.1965 15.0168 17.4054 14.0602 17.4702 12.4999"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M14.9942 10H15.0017"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IIncome({
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
        <g clipPath="url(#clip0_income)">
          <path
            d="M9.99935 18.3334C14.6017 18.3334 18.3327 14.6025 18.3327 10.0001C18.3327 5.39771 14.6017 1.66675 9.99935 1.66675C5.39698 1.66675 1.66602 5.39771 1.66602 10.0001C1.66602 14.6025 5.39698 18.3334 9.99935 18.3334Z"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M10 5V15M12.5 7.91667C12.5 6.76667 11.3808 5.83333 10 5.83333C8.61917 5.83333 7.5 6.76667 7.5 7.91667C7.5 9.06667 8.61917 10 10 10C11.3808 10 12.5 10.9333 12.5 12.0833C12.5 13.2333 11.3808 14.1667 10 14.1667C8.61917 14.1667 7.5 13.2333 7.5 12.0833"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_income">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
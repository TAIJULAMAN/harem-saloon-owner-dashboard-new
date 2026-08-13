import React from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const IDollar: React.FC<IconProps> = ({ color = "#29343D", size=24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M10 5V15M12.5 7.91667C12.5 6.76667 11.3808 5.83333 10 5.83333C8.61917 5.83333 7.5 6.76667 7.5 7.91667C7.5 9.06667 8.61917 10 10 10C11.3808 10 12.5 10.9333 12.5 12.0833C12.5 13.2333 11.3808 14.1667 10 14.1667C8.61917 14.1667 7.5 13.2333 7.5 12.0833"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IDollar;

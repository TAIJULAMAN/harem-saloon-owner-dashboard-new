import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IOverview({ color = "currentColor", className = "" }: IconProps) {
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
          d="M18.3327 18.3327H9.99935C6.07098 18.3327 4.10679 18.3327 2.8864 17.1123C1.66602 15.8919 1.66602 13.9277 1.66602 9.99935V1.66602"
          stroke={color} // Change stroke color based on the prop
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M15.8335 5.83398L13.2351 9.10599C12.8371 9.60718 12.6381 9.85778 12.4096 9.97992C12.0584 10.1677 11.6386 10.1768 11.2795 10.0045C11.0459 9.89242 10.8362 9.65072 10.4168 9.1673C9.99737 8.6839 9.78765 8.44219 9.5541 8.33011C9.19499 8.15777 8.77525 8.1669 8.42397 8.35469C8.19551 8.47682 7.9965 8.72741 7.59849 9.2286L5 12.5007"
          stroke={color} // Change stroke color based on the prop
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
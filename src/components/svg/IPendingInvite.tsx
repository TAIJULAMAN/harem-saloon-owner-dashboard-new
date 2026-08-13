import React from "react";

type IconProps = {
  color?: string;
  className?: string;
};

export default function IPendingInvite({
  color = "currentColor",
  className = "",
}: IconProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0)">
          <path
            d="M14.9993 5.08398C16.0828 5.19055 16.8121 5.4314 17.3564 5.97572C18.3327 6.95203 18.3327 8.52338 18.3327 11.6661C18.3327 14.8088 18.3327 16.3801 17.3564 17.3564C16.3801 18.3327 14.8087 18.3327 11.666 18.3327H8.33268C5.18999 18.3327 3.61864 18.3327 2.64233 17.3564C1.66602 16.3801 1.66602 14.8088 1.66602 11.6661C1.66602 8.52338 1.66602 6.95203 2.64233 5.97572C3.18664 5.4314 3.91592 5.19055 4.99935 5.08398"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M8.33398 5H11.6673"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.16602 7.5H10.8327"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6.79908 9.83191L6.43926 9.53207C5.73151 8.94228 5.37764 8.64738 5.18882 8.24424C5 7.8411 5 7.38046 5 6.45918V5.83268C5 3.8685 5 2.8864 5.61019 2.27621C6.22039 1.66602 7.20248 1.66602 9.16667 1.66602H10.8333C12.7975 1.66602 13.7796 1.66602 14.3898 2.27621C15 2.8864 15 3.8685 15 5.83268V6.45918C15 7.38046 15 7.8411 14.8112 8.24424C14.6224 8.64738 14.2685 8.94228 13.5607 9.53207L13.2009 9.83191C11.6704 11.1074 10.9051 11.7451 10 11.7451C9.09488 11.7451 8.32961 11.1074 6.79908 9.83191Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 8.33398L6.79908 9.83322C8.32961 11.1087 9.09488 11.7464 10 11.7464C10.9051 11.7464 11.6704 11.1087 13.2009 9.83322L15 8.33398"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}


type IconProps = {
    color?: string;
    size?: number;
    className?: string;
};

export default function TeamIcon({
    color = "#635BFF",
    size = 24,
    className = "",
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <circle
                cx="12"
                cy="6"
                r="4"
                stroke={color}
                strokeWidth="1.5"
            />

            <path
                d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <ellipse
                cx="12"
                cy="17"
                rx="6"
                ry="4"
                stroke={color}
                strokeWidth="1.5"
            />

            <path
                d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
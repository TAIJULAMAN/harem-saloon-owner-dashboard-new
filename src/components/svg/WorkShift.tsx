type IconProps = {
    className?: string;
    color?: string;
    size?: number;
};

export default function WorkShift({
    className = "",
    color = "#635BFF",
    size = 24,
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
    );
}
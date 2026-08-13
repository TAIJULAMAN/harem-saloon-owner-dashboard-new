type IconProps = {
    className?: string;
    color?: string;
    size?: number;
};

export default function ShiftIcon({
    className = "",
    color = "#635BFF",
    size = 20,
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            className={className}
        >
            <path
                d="M15 3.33398L17.5 5.83398M17.5 5.83398L15 8.33398M17.5 5.83398L13.3333 5.83398C12.4316 5.83278 11.554 6.12531 10.8333 6.66732M15 16.6673L17.5 14.1673M17.5 14.1673L15 11.6673M17.5 14.1673H13.3333C12.2283 14.1673 11.1685 13.7283 10.3871 12.9469C9.60565 12.1655 9.16667 11.1057 9.16667 10.0007C9.16667 8.89558 8.72768 7.83577 7.94628 7.05437C7.16488 6.27297 6.10507 5.83398 5 5.83398H2.5M7.5 13.334C6.77877 13.8749 5.90154 14.1673 5 14.1673H2.5"
                stroke={color}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
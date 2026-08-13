import React from "react"

type Props = React.SVGProps<SVGSVGElement> & {
    size?: number
    color?: string
}

const StockIcon: React.FC<Props> = ({ size = 17, color = "#635BFF", ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={(size * 13) / 17} // maintain original aspect ratio
            viewBox="0 0 17 13"
            fill="none"
            {...props}
        >
            <path
                d="M4.15441 0.625V11.625M4.15441 11.625L7.68382 7.95833M4.15441 11.625L0.625001 7.95833M12.0956 11.625V0.625M12.0956 0.625L15.625 4.29167M12.0956 0.625L8.56618 4.29167"
                stroke={color}
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default StockIcon
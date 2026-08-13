import { ReactNode } from "react"
import Link from "next/link"

type ButtonConfig = {
    label: string
    onClick?: () => void
    href?: string
    icon?: ReactNode
    variant?: "primary" | "secondary" | "outline"
    fullWidth?: boolean
}

type PageHeaderProps = {
    title: string
    buttons?: ButtonConfig[]
}

export default function PageHeaderWithButton({ title, buttons = [] }: PageHeaderProps) {
    const getButtonStyle = (variant: string = "primary") => {
        switch (variant) {
            case "outline":
                return "border border-[#6366F1] text-[#6366F1] hover:bg-[#EEF2FF]"
            case "secondary":
                return "bg-[#DDDBFF] text-[#6366F1] hover:bg-[#E0E7FF]"
            default:
                return "bg-[#6366F1] text-white hover:bg-[#4F46E5]"
        }
    }

    const renderButton = (btn: ButtonConfig, index: number) => {
        const className = `
            cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px]
            flex items-center justify-center sm:justify-start gap-2
            transition-colors w-full sm:w-auto
            ${getButtonStyle(btn.variant)}
        `

        if (btn.href) {
            return (
                <Link key={index} href={btn.href}>
                    <button className={className}>
                        {btn.icon}
                        {btn.label}
                    </button>
                </Link>
            )
        }

        return (
            <button key={index} onClick={btn.onClick} className={className}>
                {btn.icon}
                {btn.label}
            </button>
        )
    }

    return (
        <div className="font-manrope">
            <div className="bg-white rounded-[12px] px-4 sm:px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                    {/* Title */}
                    <h1 className="text-[#1A1A2E] font-bold text-base">
                        {title}
                    </h1>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">
                        {buttons.map(renderButton)}
                    </div>
                </div>
            </div>
        </div>
    )
}
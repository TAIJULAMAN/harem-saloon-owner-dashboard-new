"use client"
import React from "react"
interface StatItem {
    label: string
    value: string | number
}

interface StatsBarProps {
    stats: StatItem[]
}

export default function BottomStatusBar({ stats }: StatsBarProps) {
    return (
        <div className="bg-[#FAFAFA] px-5 py-6 flex flex-wrap items-center justify-between gap-6 font-manrope w-full border border-[#E0E6EB] rounded-xl mb-4">
            {stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                    <div className="flex items-center gap-3">
                        <span className="text-[#0A2540] text-sm font-semibold">{stat.label}</span>
                        <span className="bg-[#6366F1] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                            {stat.value}
                        </span>
                    </div>
                    {idx < stats.length - 1 && (
                        <div className="hidden sm:block w-px h-4 bg-[#E0E6EB]" />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}
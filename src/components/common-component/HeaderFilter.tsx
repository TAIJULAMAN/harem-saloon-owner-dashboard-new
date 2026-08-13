"use client";

import { Filter } from "lucide-react";

interface Category {
    label: string;
    value: string;
}

interface CategoryFilterProps {
    title?: string;
    categories: Category[];
    selected: string;
    onChange: (value: string) => void;
    showFilterIcon: boolean;
}

export default function HeaderFilter({
    title = "Categories",
    categories,
    selected,
    onChange,
    showFilterIcon
}: CategoryFilterProps) {
    return (
        <div className="px-6 py-4">
            <div className="flex flex-wrap gap-4 lg:gap-6 font-manrope">

                <div className="flex flex-col gap-2">
                    {/* Title */}
                    <div className="text-[#98A4AE] text-xs font-semibold flex items-center gap-2">
                        {title}
                        {showFilterIcon && <Filter size={11} className="text-[#9CA3AF]" />}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {categories.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => onChange(item.value)}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${selected === item.value
                                    ? "border-[#6366F1] text-[#6366F1]"
                                    : "border-[#EFF4FA] text-[#0A2540]"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
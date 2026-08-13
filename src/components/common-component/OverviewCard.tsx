import React from "react";

type Props = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgGradient: string;
  iconBg: string;
  extra?: string[];
};

export default function OverviewCard({
  title,
  value,
  icon,
  bgGradient,
  iconBg,
  extra = [],
}: Props) {
  return (
    <div
      className={`w-full p-4 sm:p-5 md:p-6 rounded-lg font-manrope bg-gradient-to-t ${bgGradient}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] ${iconBg} rounded-xl flex items-center justify-center text-white text-lg sm:text-xl`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-medium text-gray-800">
          {title}
        </h3>
      </div>

      {/* Value */}
      <div className="mt-3 sm:mt-4 text-[22px] sm:text-[26px] md:text-[28px] font-semibold text-gray-800">
        {value}
      </div>

      {/* Extra Info */}
      <div className="mt-2 text-[12px] sm:text-[13px] text-[#29343D] font-semibold space-y-1">
        {extra.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

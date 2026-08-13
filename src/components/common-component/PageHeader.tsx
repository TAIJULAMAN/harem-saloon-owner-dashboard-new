import React from "react";
import { ChevronLeft } from "lucide-react";
import BreadcrumbIcon from "../svg/BreadcrumbIcon";

export default function PageHeader({
  title,
  onBack,
  breadcrumb = [],
  HomeIcon,
}: {
  title: string;
  onBack?: () => void;
  breadcrumb?: { label: string; active: boolean }[];
  HomeIcon?: React.ReactNode;
}) {
  return (
    <div className="bg-white md:mb-0 mb-[16px] px-6 py-3.5 flex items-center justify-between border-b border-[#EFF4FA] rounded-xl flex-wrap gap-3">
      {/* Left side: Back button and title */}
      <div className="flex items-center gap-2 text-sm text-[#29343D]">
        {onBack && (
          <button
            onClick={onBack}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={16} className="text-[#635BFF]" />
          </button>
        )}
        <span className="text-base font-bold font-manrope text-[#29343D]">
          {title}
        </span>
      </div>

      {/* Right side: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#98A4AE]">
        {breadcrumb.length > 0 && (
          <>
            {/* Home Icon (JSX or fallback) */}
            {HomeIcon ? HomeIcon : <BreadcrumbIcon />}

            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-[#29343D]">/</span>
                <span
                  className={`text-sm px-2 py-0.5 font-manrope rounded-md ${
                    item.active
                      ? "text-[#635BFF] font-medium bg-[#EEEEFF]"
                      : "text-[#98A4AE]"
                  }`}
                >
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

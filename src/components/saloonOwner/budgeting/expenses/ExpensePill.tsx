import React from "react";

export type PillVariant = "solid" | "soft" | "outline" | "text";

interface ExpensePillProps {
  text: string;
  colorType: "green" | "blue" | "red" | "yellow" | "dark" | "cyan" | "purple" | "default";
  variant?: PillVariant;
}

export function ExpensePill({ text, colorType, variant = "solid" }: ExpensePillProps) {
  const solidMap: Record<string, string> = {
    green: "bg-[#22C55E] text-white",
    blue: "bg-[#635BFF] text-white",
    red: "bg-[#FB7185] text-white",
    yellow: "bg-[#FBBF24] text-white",
    dark: "bg-[#1E293B] text-white",
    cyan: "bg-[#2CC8D6] text-white",
    purple: "bg-[#A855F7] text-white",
    default: "bg-[#E2E8F0] text-[#1E293B]",
  };

  const softMap: Record<string, string> = {
    green: "bg-[#DCFCE7] text-[#22C55E]",
    blue: "bg-[#EEF2FF] text-[#635BFF]",
    red: "bg-[#FFE4E6] text-[#FB7185]",
    yellow: "bg-[#FEF3C7] text-[#FBBF24]",
    dark: "bg-[#F1F5F9] text-[#1E293B]",
    cyan: "bg-[#CFFAFE] text-[#2CC8D6]",
    purple: "bg-[#F3E8FF] text-[#A855F7]",
    default: "bg-[#F8FAFC] text-[#64748B]",
  };

  const outlineMap: Record<string, string> = {
    green: "border border-[#22C55E] text-[#22C55E]",
    blue: "border border-[#635BFF] text-[#635BFF]",
    red: "border border-[#FB7185] text-[#FB7185]",
    yellow: "border border-[#FBBF24] text-[#FBBF24]",
    dark: "border border-[#1E293B] text-[#1E293B]",
    cyan: "border border-[#2CC8D6] text-[#2CC8D6]",
    purple: "border border-[#A855F7] text-[#A855F7]",
    default: "border border-[#E2E8F0] text-[#64748B]",
  };

  const textMap: Record<string, string> = {
    green: "text-[#22C55E]",
    blue: "text-[#635BFF]",
    red: "text-[#FB7185]",
    yellow: "text-[#FBBF24]",
    dark: "text-[#1E293B]",
    cyan: "text-[#2CC8D6]",
    purple: "text-[#A855F7]",
    default: "text-[#64748B]",
  };

  let colorClasses = "";
  if (variant === "solid") colorClasses = solidMap[colorType] || solidMap.default;
  if (variant === "soft") colorClasses = softMap[colorType] || softMap.default;
  if (variant === "outline") colorClasses = outlineMap[colorType] || outlineMap.default;
  if (variant === "text") colorClasses = textMap[colorType] || textMap.default;

  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-bold rounded-full ${colorClasses}`}>
      {text}
    </span>
  );
}

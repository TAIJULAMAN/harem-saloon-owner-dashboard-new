import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "light-purple" | "ghost";
  icon?: LucideIcon | React.ElementType;
  title?: string;
  children?: ReactNode;
}

export function CustomButton({ 
  variant = "primary", 
  icon: Icon,
  title, 
  children, 
  className = "", 
  ...props 
}: CustomButtonProps) {
  const baseStyles = "w-full sm:w-auto justify-center px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0";
  
  const variants = {
    primary: "bg-[#635BFF] hover:bg-[#524be0] text-white shadow-sm shadow-[#635BFF]/20",
    secondary: "bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B]",
    outline: "border border-[#635BFF] text-[#635BFF] bg-white hover:bg-[#EEF2FF]",
    "light-purple": "bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF]",
    ghost: "bg-transparent hover:bg-[#F8FAFC] text-[#64748B]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {title || children}
    </button>
  );
}

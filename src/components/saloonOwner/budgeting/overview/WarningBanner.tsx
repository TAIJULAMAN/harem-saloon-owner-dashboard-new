import React from "react";
import { AlertCircle } from "lucide-react";

export function WarningBanner() {
  return (
    <div className="bg-[#FEF9C3]/50 border border-[#FEF08A] rounded-lg p-4 flex items-center gap-3">
      <div className="text-[#EAB308]">
        <AlertCircle className="w-5 h-5" />
      </div>
      <p className="text-[#CA8A04] text-sm font-medium">
        Warning — Attention! You've already used 85% of your HR budget.
      </p>
    </div>
  );
}

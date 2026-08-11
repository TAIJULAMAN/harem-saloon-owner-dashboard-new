import React from "react";
import Link from "next/link";
import { RefreshCw, Eye } from "lucide-react";

export default function DashboardHeaderActions() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-sm border border-[#E2E8F0]">
      <h1 className="text-xl font-bold text-[#1E293B]">Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F1F5F9] text-[#64748B] rounded-lg text-sm font-semibold hover:bg-[#E2E8F0] transition-colors w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
        <Link
          href="/dashboard/appointments"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#635BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#534dfd] transition-colors shadow-md shadow-[#635BFF]/20 w-full sm:w-auto"
        >
          <Eye className="w-4 h-4" />
          View All Appointments
        </Link>
      </div>
    </div>
  );
}

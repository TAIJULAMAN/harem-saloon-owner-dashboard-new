"use client";
import React from "react";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function AppointViewNav({
  onCancelAppointment,
}: {
  onCancelAppointment: () => void;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="bg-white border-b border-[#EFF4FA] px-4 sm:px-[30px] py-3 flex items-center justify-between gap-3 rounded-xl">
        <div className="flex items-center gap-2">
          <button className="cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft color="#635BFF" size={24} />
          </button>
          <h1 className="text-base font-bold font-manrope text-[#29343D]">
            View Appointment
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/appointment/reschedule">
            <button className="px-3 sm:px-4 py-2 text-sm font-semibold font-manrope text-[#16CDC7] bg-[#ECFDFD] hover:bg-[#d4faf9] rounded-[8px] transition-colors cursor-pointer whitespace-nowrap">
              Reschedule
            </button>
          </Link>
          <button
            onClick={onCancelAppointment}
            className="px-3 sm:px-4 py-2 text-sm font-semibold font-manrope text-[#FF6692] bg-[#FFE5ED] hover:bg-[#ffd0e0] rounded-[8px] transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel Appointment
          </button>
          <div className="hidden sm:flex items-center gap-1.5">
            <Home size={20} className="text-[#526B7A]" />
            <span className="text-[#98A4AE] text-sm">/</span>
            <span className="px-3 py-1.5 bg-[#DDDBFF] text-[#635BFF] text-sm font-semibold font-manrope rounded-[8px]">
              Appointments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

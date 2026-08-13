import { Appointment } from "@/@types/dashboard/appointment.type";
import { BookingStep, StepState } from "@/@types/salon-owner/bookingStep.type";
import { Status } from "@/@types/salon-owner/Statu.type";
import React from "react";
import StepIcon from "./StepIcon";
import Link from "next/link";
function getSteps(status: Status): BookingStep[] {
  const base = [
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
  ];
  switch (status) {
    case "Booked":
    case "Confirmed":
      return base.map((s) => ({ ...s, state: "todo" as StepState }));
    case "Arrived":
      return [
        { ...base[0], state: "active" as StepState },
        { ...base[1], state: "todo" as StepState },
        { ...base[2], state: "todo" as StepState },
      ];
    case "Started":
      return [
        { ...base[0], state: "done" as StepState },
        { ...base[1], state: "active" as StepState },
        { ...base[2], state: "todo" as StepState },
      ];
    case "Completed":
      return base.map((s) => ({ ...s, state: "done" as StepState }));
    case "Canceled":
      return base.map((s) => ({ ...s, state: "canceled" as StepState }));
    default:
      return base.map((s) => ({ ...s, state: "todo" as StepState }));
  }
}

function stepLineColor(state: StepState): string {
  if (state === "done") return "bg-[#4CD964]";
  if (state === "active") return "bg-[#635BFF]";
  if (state === "canceled") return "bg-[#FF6692]";
  return "bg-[#D1D5DB]";
}

// Boking steper
function stepBadge(state: StepState): { label: string; className: string } {
  if (state === "done")
    return { label: "Completed", className: "bg-[#EBFAF0] text-[#36C76C]" };
  if (state === "active")
    return { label: "Doing", className: "bg-[#DDDBFF] text-[#635BFF]" };
  if (state === "canceled")
    return { label: "Cancelled", className: "bg-[#FFE5ED] text-[#FF6692]" };
  return { label: "To Do", className: "bg-[#EFF4FA] text-[#0A2540]" };
}
export default function ExpandedRowDetail({ row }: { row: Appointment }) {
  const steps = getSteps(row.status);
  const showReceipt = row.status === "Started" || row.status === "Completed";

  return (
    <tr className="bg-[#F9FAFB]">
      <td colSpan={7} className="px-6 py-8 border-b border-[#E0E6EB]">
        {/* Title */}
        <p className="text-base font-bold font-manrope text-[#29343D] mb-4 text-center tracking-tight">
          Booking Order
        </p>

        {/* Stepper â€” circles connected by full-width lines */}
        <div className="max-w-[361px] mx-auto">
          {/* Top row: line + circles */}
          <div className="flex items-center justify-center px-4">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Circle */}
                <div className="">
                  <StepIcon state={step.state} index={idx} />
                </div>
                {/* Full connector line between circles */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] ${stepLineColor(step.state)}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom row: labels under each circle */}
          <div className="flex items-start justify-between mt-3">
            {steps.map((step, idx) => {
              const badge = stepBadge(step.state);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-[8px] text-[11px] font-semibold font-manrope whitespace-nowrap ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <p className="mt-2 text-[11px] font-manrope text-[#9CA3AF] text-center">
                    {step.time}
                  </p>
                  <p className="mt-0.5 text-[12px] font-bold font-manrope text-[#1A2332] text-center">
                    {step.service}
                  </p>
                  <p className="mt-0.5 text-[11px] font-manrope text-[#9CA3AF] text-center">
                    {step.staff}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Print Receipt */}
        {showReceipt && (
          <div className="flex justify-center mt-8">
            <Link href={`/dashboard/appointment/print-receipt/${row.id}`}>
              <button className="px-4 py-2.5 bg-[#DDDBFF] hover:bg-[#c9c8ff] text-[#635BFF] text-[12px] font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer tracking-wide">
                Print Receipt
              </button>
            </Link>
          </div>
        )}
      </td>
    </tr>
  );
}

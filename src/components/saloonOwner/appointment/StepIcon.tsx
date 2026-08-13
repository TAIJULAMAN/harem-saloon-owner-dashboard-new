import { StepState } from "@/@types/salon-owner/bookingStep.type";

export default function StepIcon({ state, index }: { state: StepState; index: number }) {
  const base =
    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold font-manrope z-10 relative";
  if (state === "done")
    return (
      <div className={`${base} bg-[#4CD964] text-white`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10l4.5 4.5L16 6"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  if (state === "active")
    return <div className={`${base} bg-[#635BFF] text-white`}>{index + 1}</div>;
  if (state === "canceled")
    return (
      <div className={`${base} bg-[#FF6692] text-white`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 3l10 10M13 3L3 13"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  return (
    <div
      className={`${base} bg-white border-2 border-[#D1D5DB] text-[#9CA3AF]`}
    >
      {index + 1}
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import IAppoinUser from "../IAppoinUser";
import IView from "./IView";
import TeamFilterDropdown from "../TeamFilterDropdown";

export default function RescheduleCalanderHead({
  setActivePeriod,
  activePeriod,
  prevDay,
  formatDate,
  nextDay,
  currentDate,
}: {
  prevDay: () => void;
  formatDate: (date: Date) => string;
  nextDay: () => void;
  currentDate: Date;
  setActivePeriod: (period: "Month" | "Week" | "Day") => void;
  activePeriod: "Month" | "Week" | "Day";
}) {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 px-7 py-7 flex-shrink-0">
        <TeamFilterDropdown />

        {/* Center: date nav */}
        <div className="flex items-center border border-[#E8EEFF] rounded-[8px] overflow-hidden">
          <button onClick={prevDay} className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
            <ChevronLeft size={18} className="text-[#635BFF]" />
          </button>
          <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap">
            {formatDate(currentDate)}
          </span>
          <button onClick={nextDay} className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
            <ChevronRight size={18} className="text-[#635BFF]" />
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden bg-[#F7F9FC]">
            {(["Month", "Week", "Day"] as const).map((p, i) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`relative px-6 py-[10px] text-[16px] font-manrope font-medium transition-all cursor-pointer
      ${
        activePeriod === p
          ? "bg-[#DDDBFF] text-[#0A2540]"
          : "text-[#526B7A] bg-[white] hover:text-[#29343D]"
      }
      ${i !== 2 ? "border-r border-[#E0E6EB]" : ""}
      `}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="bg-[#EFF4FA] rounded-[8px] px-4 py-2.5">
            <IView />
          </div>
        </div>
      </div>
    </div>
  );
}

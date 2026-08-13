import { useOutsideClick } from "@/helpers/OutsideClickFN";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
type AppStatus = "Booked" | "Confirmed" | "Arrived" | "Started" | "No-show";

const statusStyle: Record<AppStatus, string> = {
  Booked: "bg-[#DDDBFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "bg-[#F6F7F9] text-[#0A2540]",
  "No-show": "bg-[#FFE5ED] text-[#FF6692]",
};
interface StatusDropdownProps {
  value: AppStatus;
  onChange: (s: AppStatus) => void;
}

export default function StatusDropdown({
  value,
  onChange,
}: StatusDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-sm font-semibold font-manrope cursor-pointer ${statusStyle[value]}`}
      >
        {value}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 min-w-[120px]">
          {["Booked", "Confirmed", "Arrived", "Started", "No-show"].map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s as AppStatus);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

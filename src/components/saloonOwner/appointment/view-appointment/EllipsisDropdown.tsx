import { useOutsideClick } from "@/helpers/OutsideClickFN";
import { EllipsisVertical } from "lucide-react";
import { useRef, useState } from "react";
interface EllipsisDropdownProps {
  onAddNote: () => void;
}
export default function EllipsisDropdown({ onAddNote }: EllipsisDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-9 h-9 flex items-center justify-center border border-[#E0E6EB] bg-white rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
      >
        <EllipsisVertical size={17} className="text-[#526B7A]" />
      </button>

      {open && (
        <div className="absolute right-0 bottom-[calc(100%+6px)] z-50 bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.10)] border border-[#EFF4FA] py-1.5 min-w-[140px]">
          <button
            className="w-full text-left px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            onClick={() => {
              setOpen(false);
              onAddNote();
            }}
          >
            Add a Note
          </button>
          <button
            className="w-full text-left px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            onClick={() => setOpen(false)}
          >
            No-show
          </button>
        </div>
      )}
    </div>
  );
}

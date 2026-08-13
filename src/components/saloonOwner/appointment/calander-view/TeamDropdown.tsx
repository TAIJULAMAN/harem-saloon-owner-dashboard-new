import { useEffect, useRef, useState } from "react";
import IAppoinUser from "../IAppoinUser";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";

const DEMO_MEMBERS = [
  { id: "1", name: "Shah Aman", avatar: "/avatar/icon1.png" },
  { id: "2", name: "Hasan Saon", avatar: "/avatar/icon2.png" },
  { id: "3", name: "Hridoy Khan", avatar: "/avatar/icon3.png" },
];

export default function TeamDropdown({
  selectedIds,
  onChange,
  singleSelect,
}: {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  singleSelect?: boolean;
  teamMembers?: { id: string; name: string; avatar: string }[];
}) {
  const teamMembers = DEMO_MEMBERS;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const allSelected = teamMembers.every((m) => selectedIds.includes(m.id));
  const displayMember =
    singleSelect && selectedIds.length === 1
      ? teamMembers.find((m) => m.id === selectedIds[0])
      : null;

  const toggle = (id: string) => {
    if (singleSelect) {
      onChange([id]);
      setOpen(false);
      return;
    }
    if (id === "all") {
      onChange(allSelected ? [] : teamMembers.map((m) => m.id));
      return;
    }
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    onChange(next);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 border border-[#E0E6EB] rounded-[8px] px-4 py-2.5 cursor-pointer hover:border-[#635BFF] transition-colors bg-white"
      >
        {displayMember ? (
          <Image
            src={displayMember.avatar}
            alt={displayMember.name}
            width={22}
            height={22}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 bg-[#EEEEFF] rounded-[6px] flex items-center justify-center">
            <IAppoinUser />
          </div>
        )}
        <span className="text-sm font-manrope font-medium text-[#29343D]">
          {displayMember ? displayMember.name : "All Team"}
        </span>
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 bg-white rounded-[14px] shadow-[0px_12px_32px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-2 min-w-[200px]">
          {!singleSelect && (
            <div
              onClick={() => toggle("all")}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F6FA] cursor-pointer transition-colors mx-1 rounded-[8px]"
            >
              <div
                className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center ${allSelected ? "bg-[#635BFF]" : "border-2 border-[#E0E6EB] bg-white"}`}
              >
                {allSelected && (
                  <Check size={13} color="white" strokeWidth={3} />
                )}
              </div>
              <div className="w-[42px] h-[42px] rounded-[10px] bg-[#EEEEFF] flex items-center justify-center">
                <IAppoinUser />
              </div>
              <span className="text-sm font-manrope font-semibold text-[#29343D]">
                All Team
              </span>
            </div>
          )}
          {teamMembers.map((member) => {
            const checked = selectedIds.includes(member.id);
            return (
              <div
                key={member.id}
                onClick={() => toggle(member.id)}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F6FA] cursor-pointer transition-colors mx-1 rounded-[8px]"
              >
                {!singleSelect && (
                  <div
                    className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center ${checked ? "bg-[#635BFF]" : "border-2 border-[#E0E6EB] bg-white"}`}
                  >
                    {checked && (
                      <Check size={13} color="white" strokeWidth={3} />
                    )}
                  </div>
                )}
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={42}
                  height={42}
                  className="rounded-[10px] object-cover"
                />
                <span className="text-sm font-manrope font-semibold text-[#29343D] truncate">
                  {member.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

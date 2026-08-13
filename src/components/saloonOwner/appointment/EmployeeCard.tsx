import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
export default function EmployeeCard({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string;
}) {
  const [syncCalendar, setSyncCalendar] = useState(false);
  const [editCalendar, setEditCalendar] = useState(true);
  const [onlineBookings, setOnlineBookings] = useState(true);

  return (
    <div className="bg-[#F6F7F9] rounded-[12px] p-4 flex flex-col gap-4">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[10px] overflow-hidden bg-[#F4F6FA]">
          <Image
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
            width={48}
            height={48}
          />
        </div>
        <p className="text-sm font-semibold font-manrope text-[#29343D]">
          {name}
        </p>
      </div>
      {/* Settings rows */}
      <div className="space-y-3">
        {/* Sync with google calendar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-manrope text-[#29343D]">
            Sync with google calendar
          </span>
          <button
            onClick={() => setSyncCalendar((p) => !p)}
            className={`text-xs font-manrope font-medium px-3 py-1 rounded-[6px] border transition-colors cursor-pointer ${syncCalendar
                ? "bg-[#635BFF] text-white border-[#635BFF]"
                : "bg-[#EEEEFF] text-[#635BFF] border-[#EEEEFF]"
              }`}
          >
            Sync
          </button>
        </div>

        {/* Allow employee to edit own calendar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-manrope text-[#29343D]">
            Allow employee to edit own calendar
          </span>
          <Toggle
            checked={editCalendar}
            onChange={() => setEditCalendar((p) => !p)}
          />
        </div>

        {/* Show up in online bookings */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-manrope text-[#29343D]">
            Show up in online bookings
          </span>
          <Toggle
            checked={onlineBookings}
            onChange={() => setOnlineBookings((p) => !p)}
          />
        </div>
      </div>
    </div>
  );
}

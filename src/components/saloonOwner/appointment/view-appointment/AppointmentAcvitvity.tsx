import { ActivityItem } from "@/@types/salon-owner/ActivityItem.type";

export default function AppointmentAcvitvity({
  activities,
}: {
  activities: ActivityItem[];
}) {
  return (
    <div>
      <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
        <h2 className="text-[18px] font-bold font-manrope text-[#29343D] mb-7">
          Appointment Activity
        </h2>
        <div className="relative">
          <div
            className="absolute top-[7px] bottom-[7px] w-px bg-[#E0E6EB]"
            style={{ left: "139px" }}
          />
          <div className="space-y-8">
            {activities.map((act, i) => (
              <div key={i} className="flex items-start">
                <div className="w-[112px] flex-shrink-0">
                  <p className="text-[13px] font-bold font-manrope text-[#29343D] leading-tight">
                    {act.date}
                  </p>
                  <p className="text-[11px] font-manrope text-[#98A4AE] mt-0.5">
                    {act.time}
                  </p>
                </div>
                <div className="flex-shrink-0 relative z-10 px-5">
                  <div
                    className={`w-[14px] h-[14px] rounded-full border-2 bg-white mt-[1px] ${act.dot}`}
                  />
                </div>
                <p className="text-[14px] font-semibold font-manrope text-[#29343D] leading-tight mt-[1px]">
                  {act.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

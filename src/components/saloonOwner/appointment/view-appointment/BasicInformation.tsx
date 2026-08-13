import Image from "next/image";
import StatusDropdown from "./StatusDropdown";
type AppStatus = "Booked" | "Confirmed" | "Arrived" | "Started" | "No-show";
export default function BasicInformation({
  status,
  setStatus,
  onReschedule,
  onSetRepeating,
}: {
  status: AppStatus;
  setStatus: (status: AppStatus) => void;
  onReschedule: () => void;
  onSetRepeating?: () => void;
}) {
  return (
    <div>
      <div className="bg-white rounded-xl h-full border border-[#EFF4FA] p-[30px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-manrope text-[#29343D]">
            Basic Informations
          </h2>
          <span className="text-sm font-bold font-manrope text-[#29343D]">
            #000
          </span>
        </div>

        <p className="text-[10px] font-manrope text-[#98A4AE] mb-2">Client</p>

        <div className="flex items-center justify-between bg-[#F4F6FA] rounded-[10px] p-4 mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/avatar/icon1.png"
              alt="Maria Fernandez"
              width={56}
              height={56}
              className="rounded-[10px] object-cover flex-shrink-0"
            />
            <div>
              <p className="text-base font-bold font-manrope text-[#29343D]">
                Maria Fernandez
              </p>
              <p className="text-sm font-manrope text-[#98A4AE]">
                maria@gmail.com
              </p>
            </div>
          </div>
          <button className="px-4 py-2.5 bg-[#EEEEFF] hover:bg-[#DDDBFF] text-[#635BFF] text-xs font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer whitespace-nowrap">
            View Profile
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-manrope text-[#98A4AE] mb-1">Date</p>
            <p className="text-sm font-semibold font-manrope text-[#29343D]">
              02/08/2025
            </p>
          </div>
          <div>
            <p className="text-xs font-manrope text-[#98A4AE] mb-1">Time</p>
            <p className="text-sm font-semibold font-manrope text-[#29343D]">
              11:00 - 11:15
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-manrope text-[#98A4AE] mb-1.5">Status</p>
            <StatusDropdown value={status} onChange={setStatus} />
          </div>
          <div>
            <p className="text-xs font-manrope text-[#98A4AE] mb-1.5">
              Repeating
            </p>
            <button
              onClick={onSetRepeating}
              className="px-3 py-1.5 bg-[#F6F7F9] text-[#0A2540] text-xs font-semibold font-manrope rounded-[8px] hover:text-[#635BFF] transition-colors cursor-pointer"
            >
              Set as Repeating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

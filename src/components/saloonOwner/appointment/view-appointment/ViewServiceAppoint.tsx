import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EllipsisDropdown from "./EllipsisDropdown";
export default function ViewServiceAppoint({
  openNoteEditor,
}: {
  openNoteEditor: () => void;
}) {
  return (
    <div>
      <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
        <h2 className="text-[18px] font-bold font-manrope text-[#29343D] mb-5">
          Services
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-[#EFF4FA]">
                {[
                  "Service",
                  "Date",
                  "Price",
                  "Start Time",
                  "Duration",
                  "Employee",
                ].map((h, i) => (
                  <th
                    key={i}
                    className="pb-4 text-left text-sm font-manrope text-[#29343D] whitespace-nowrap pr-6 last:pr-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-5 text-sm font-semibold font-manrope text-[#29343D] pr-6">
                  Haircut
                </td>
                <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6 whitespace-nowrap">
                  02/08/2025
                </td>
                <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6">
                  € 170
                </td>
                <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6">
                  11:00
                </td>
                <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6 whitespace-nowrap">
                  15 min
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2 bg-[#F4F6FA] rounded-[10px] px-3 py-2 w-fit">
                    <Image
                      src="/avatar/icon1.png"
                      alt="Maria Rodriguez"
                      width={48}
                      height={48}
                      className="rounded-[8px] object-cover"
                    />
                    <span className="flex items-center gap-6 text-sm font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                      Maria Rodriguez
                      <ChevronDown strokeWidth={1.5} color="#29343D" />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-2 border border-[#E0E6EB] rounded-[12px] px-5 py-5 flex items-center justify-between">
          <p className="text-sm font-semibold font-manrope text-[#29343D]">
            Total
          </p>
          <p className="text-[18px] font-bold font-manrope text-[#29343D]">
            € 340
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-6">
          <button className="px-5 py-2.5 border border-[#E0E6EB] bg-white text-sm font-semibold font-manrope text-[#526B7A] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
            Back
          </button>
          <div className="flex items-center gap-3">
            <EllipsisDropdown onAddNote={openNoteEditor} />
            <Link href="/dashboard/appointment/checkout">
              <button className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

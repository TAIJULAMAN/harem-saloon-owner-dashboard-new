import React from "react";
import Image from "next/image";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import TeamFilterDropdown from "./TeamFilterDropdown";
import RowActions from "./RowActions";
import ExpandedRowDetail from "./ExpandedRowDetail";
import StatusBadge from "./StatusBadge";
import { Appointment, statusStyles } from "./data";
import Pagination from "@/components/saloonOwner/common/Pagination";

interface AppointmentTableViewProps {
  setSearchOpen: (val: boolean) => void;
  activePeriod: "Month" | "Week" | "Day";
  setActivePeriod: (val: "Month" | "Week" | "Day") => void;
  paginated: Appointment[];
  currentPage: number;
  itemsPerPage: number;
  expandedRow: number | null;
  handleChevronClick: (index: number) => void;
  filtered: Appointment[];
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dateLabel: string;
  handleNavigate: (dir: number) => void;
}

export default function AppointmentTableView({
  setSearchOpen,
  activePeriod,
  setActivePeriod,
  paginated,
  currentPage,
  itemsPerPage,
  expandedRow,
  handleChevronClick,
  filtered,
  totalPages,
  setCurrentPage,
  dateLabel,
  handleNavigate,
}: AppointmentTableViewProps) {
  return (
    <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden p-4 sm:p-6 lg:p-[30px]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <TeamFilterDropdown />
          <button
            onClick={() => setSearchOpen(true)}
            className="w-11 h-10 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          >
            <Search size={18} className="text-[#0A2540]" />
          </button>
        </div>
        <div className="flex items-center border border-[#E8EEFF] rounded-[12px] overflow-hidden">
          <button onClick={() => handleNavigate(-1)} className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
            <ChevronLeft size={18} className="text-[#635BFF]" />
          </button>
          <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap">
            {dateLabel}
          </span>
          <button onClick={() => handleNavigate(1)} className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
            <ChevronRight size={18} className="text-[#635BFF]" />
          </button>
        </div>
        <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden">
          {(["Month", "Week", "Day"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-3 sm:px-4 py-2 text-sm font-manrope font-medium transition-colors cursor-pointer ${
                activePeriod === p
                  ? "bg-[#EEEEFF] text-[#635BFF]"
                  : "text-[#526B7A] hover:text-[#29343D]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-[#E0E6EB] rounded-[12px] overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
              {[
                "ID",
                "Client",
                "Service",
                "Scheduled Date",
                "Price",
                "Status",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-5 border-r border-[#E0E6EB] last:border-r-0 text-sm font-semibold font-manrope text-[#29343D] text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + i;
              const isExpanded = expandedRow === globalIndex;
              return (
                <React.Fragment key={globalIndex}>
                  <tr
                    className={`border-b border-[#E0E6EB] transition-colors ${
                      isExpanded ? "bg-[#F7F7FF]" : "hover:bg-[#FAFBFF]"
                    } ${isExpanded ? "" : "last:border-b-0"}`}
                  >
                    <td className="px-4 py-4 border-r border-[#E0E6EB]">
                      <span className="text-sm font-semibold font-manrope text-[#635BFF]">
                        {row.id}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-[#E0E6EB]">
                      <div className="flex items-center gap-3">
                        {row?.clientAvatar ? (
                          <Image
                            src={row?.clientAvatar}
                            alt={row.clientName}
                            width={36}
                            height={36}
                            className="rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-[36px] h-[36px] rounded-xl bg-[#EEEEFF] flex items-center justify-center">
                            <span className="text-[#635BFF] font-semibold">
                              {row.clientName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold font-manrope text-[#29343D]">
                            {row.clientName}
                          </p>
                          <p className="text-xs font-manrope text-[#98A4AE]">
                            {row.clientPhone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-[#E0E6EB]">
                      <span className="text-sm font-manrope text-[#29343D]">
                        {row.service}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-[#E0E6EB]">
                      <span className="text-sm font-manrope text-[#526B7A] whitespace-nowrap">
                        {row.scheduledDate}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-[#E0E6EB]">
                      <span className="text-sm font-manrope text-[#29343D]">
                        {row.price}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-[#E0E6EB]">
                      <StatusBadge
                        status={row.status}
                        statusStyles={statusStyles}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-center">
                        <RowActions />
                        <button
                          onClick={() => handleChevronClick(globalIndex)}
                          className="p-1.5 hover:bg-[#F4F6FA] rounded-lg cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronUp size={16} className="text-[#635BFF]" />
                          ) : (
                            <ChevronDown size={16} className="text-[#635BFF]" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && <ExpandedRowDetail row={row} />}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemName?: string;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  itemName = "items",
  onPageChange,
}: PaginationProps) {

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0] bg-white rounded-b-lg">
      <div className="text-[13px] text-[#64748B]">
        Showing <span className="font-bold text-[#1E293B]">{startItem}</span> to <span className="font-bold text-[#1E293B]">{endItem}</span> of <span className="font-bold text-[#1E293B]">{totalItems}</span> {itemName}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-1 h-[32px] px-3 border border-[#E2E8F0] rounded-lg text-[13px] font-medium transition-colors text-[#64748B] hover:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:border-[#E2E8F0] disabled:hover:bg-white disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange && onPageChange(page)}
            className={`min-w-[32px] h-[32px] flex items-center justify-center rounded-lg text-[13px] font-medium transition-colors border ${currentPage === page
              ? "bg-[#635BFF] text-white border-[#635BFF]"
              : "bg-white text-[#64748B] border-[#E2E8F0] hover:bg-[#F8FAFC]"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center justify-center gap-1 h-[32px] px-3 border border-[#E2E8F0] rounded-lg text-[13px] font-medium transition-colors text-[#64748B] hover:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:border-[#E2E8F0] disabled:hover:bg-white disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

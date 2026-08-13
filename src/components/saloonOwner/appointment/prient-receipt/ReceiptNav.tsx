import { ChevronLeft, Download } from "lucide-react";

export default function ReceiptNav() {
  return (
    <div>
      <div className="bg-white border-b border-[#EFF4FA] px-4 py-3 flex items-center justify-between rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <button className="cursor-pointer">
            <ChevronLeft color="#635BFF" size={24} />
          </button>
          <div>
            <p className="text-base font-bold font-manrope text-[#29343D]">
              Service Receipt
            </p>
            <p className="text-xs font-manrope text-[#98A4AE]">
              Italian Fiscal Invoice
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#DDDBFF] hover:bg-[#DDDBFF] transition-colors text-[#635BFF] text-sm font-semibold font-manrope rounded-[8px] cursor-pointer">
          <Download size={15} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}

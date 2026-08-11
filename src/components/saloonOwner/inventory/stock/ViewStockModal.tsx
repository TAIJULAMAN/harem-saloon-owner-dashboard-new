import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ViewStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockData?: any;
}

export default function ViewStockModal({ isOpen, onClose, stockData }: ViewStockModalProps) {
  if (!stockData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="View Movement" maxWidth="max-w-4xl">
      <div className="-m-6 p-6 bg-[#F8FAFC] rounded-b-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Side: Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
            <h3 className="text-[16px] font-bold text-[#1E293B] mb-8">{stockData.productName || "Curology Face wash"}</h3>

            <div className="grid grid-cols-2 gap-y-7 gap-x-4">
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Date</p>
                <p className="text-[13px] font-bold text-[#1E293B]">{stockData.date}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Type</p>
                <div className="flex items-center gap-1.5">
                  {stockData.type === "In" ? (
                    <>
                      <ArrowDown className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[13px] font-bold text-[#10B981]">In</span>
                    </>
                  ) : (
                    <>
                      <ArrowUp className="w-3.5 h-3.5 text-[#F43F5E]" />
                      <span className="text-[13px] font-bold text-[#F43F5E]">Out</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">SKU</p>
                <p className="text-[13px] font-bold text-[#1E293B]">{stockData.sku}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Barcodes</p>
                <p className="text-[13px] font-bold text-[#1E293B]">7891234567895</p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Category</p>
                <p className="text-[13px] font-bold text-[#1E293B]">Category 1</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Brand</p>
                <p className="text-[13px] font-bold text-[#1E293B]">Brand Name</p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Quantity</p>
                <p className="text-[13px] font-bold text-[#1E293B]">{stockData.quantity}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Status</p>
                {stockData.status === "In Stock" ? (
                  <span className="inline-block bg-[#DCFCE7] text-[#16A34A] px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-block bg-[#FFE4E6] text-[#E11D48] px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    Out of Stock
                  </span>
                )}
              </div>

              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Sales Price</p>
                <p className="text-[13px] font-bold text-[#1E293B]">€ {stockData.price}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Responsible User</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[13px] font-bold text-[#1E293B]">Maria Rodriguez</p>
                </div>
              </div>

              <div className="col-span-2">
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1.5">Note</p>
                <p className="text-[13px] font-bold text-[#1E293B] leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Photo */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
            <h3 className="text-[16px] font-bold text-[#1E293B] mb-8">Product Photo</h3>
            <div className="w-full h-[400px] rounded-lg overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Product" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

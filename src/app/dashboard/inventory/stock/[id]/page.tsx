"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowUp, ArrowDown } from "lucide-react";

export default function StockDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();

  const stockData = {
    id: unwrappedParams.id,
    date: "02/01/2025 12:00",
    type: "In",
    sku: "PROD-2025-001",
    productName: "Curology Face wash",
    quantity: 10,
    status: "In Stock",
    price: 270,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/inventory/stock')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          View Stock History
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side: Details */}
          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
            <h3 className="text-[18px] font-bold text-[#1E293B] mb-8 font-manrope">{stockData.productName}</h3>

            <div className="grid grid-cols-2 gap-y-8 gap-x-6">
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Date</p>
                <p className="text-[14px] font-bold text-[#1E293B]">{stockData.date}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Type</p>
                <div className="flex items-center gap-1.5">
                  {stockData.type === "In" ? (
                    <>
                      <ArrowDown className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[14px] font-bold text-[#10B981]">In</span>
                    </>
                  ) : (
                    <>
                      <ArrowUp className="w-4 h-4 text-[#F43F5E]" />
                      <span className="text-[14px] font-bold text-[#F43F5E]">Out</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">SKU</p>
                <p className="text-[14px] font-bold text-[#1E293B]">{stockData.sku}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Barcodes</p>
                <p className="text-[14px] font-bold text-[#1E293B]">7891234567895</p>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Category</p>
                <p className="text-[14px] font-bold text-[#1E293B]">Category 1</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Brand</p>
                <p className="text-[14px] font-bold text-[#1E293B]">Brand Name</p>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Quantity</p>
                <p className="text-[14px] font-bold text-[#1E293B]">{stockData.quantity}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Status</p>
                {stockData.status === "In Stock" ? (
                  <span className="inline-flex items-center bg-[#DCFCE7] text-[#16A34A] px-3 py-1 rounded-lg text-[11px] font-bold">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-[#FCE7F3] text-[#F43F5E] px-3 py-1 rounded-lg text-[11px] font-bold">
                    Out of Stock
                  </span>
                )}
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Sales Price</p>
                <p className="text-[14px] font-bold text-[#1E293B]">€ {stockData.price}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Responsible User</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[14px] font-bold text-[#1E293B]">Maria Rodriguez</p>
                </div>
              </div>

              <div className="col-span-2">
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Note</p>
                <p className="text-[14px] font-bold text-[#1E293B] leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Photo */}
          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
            <h3 className="text-[18px] font-bold text-[#1E293B] mb-8 font-manrope">Product Photo</h3>
            <div className="w-full h-[400px] rounded-lg overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Product" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

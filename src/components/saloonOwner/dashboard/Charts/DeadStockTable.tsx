"use client";

import React, { useState } from "react";
import { Info, AlertCircle, TrendingDown } from "lucide-react";

const deadStockData = [
  {
    id: 1,
    product: "Sea Salt Texturizing Spray",
    sku: "RET-HAIR-009",
    daysUnsold: 112,
    quantity: 45,
    value: 675.00,
    status: "Critical"
  },
  {
    id: 2,
    product: "Lavender Essential Oil",
    sku: "RET-SPA-042",
    daysUnsold: 98,
    quantity: 12,
    value: 240.00,
    status: "Warning"
  },
  {
    id: 3,
    product: "Matte Finish Pomade",
    sku: "RET-HAIR-015",
    daysUnsold: 94,
    quantity: 28,
    value: 420.00,
    status: "Warning"
  },
  {
    id: 4,
    product: "Cuticle Oil Pen",
    sku: "RET-NAIL-022",
    daysUnsold: 88,
    quantity: 65,
    value: 325.00,
    status: "Watch"
  }
];

export default function DeadStockTable() {
  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Dead Stock / Slow Movers
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Products unsold for 90+ days. Run a discount campaign or bundle them with popular services.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Products with no sales velocity in 90+ days</p>
        </div>
        <div className="bg-[#FEF2F2] px-3 py-1.5 rounded-lg border border-[#FEE2E2] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#EF4444]" />
          <span className="text-[12px] font-bold text-[#EF4444]">€ 1,660 Tied Up</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              <th className="pb-3 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Product</th>
              <th className="pb-3 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Days Unsold</th>
              <th className="pb-3 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Tied Value</th>
            </tr>
          </thead>
          <tbody>
            {deadStockData.map((item, index) => (
              <tr key={item.id} className={index !== deadStockData.length - 1 ? "border-b border-[#F1F5F9]" : ""}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-4 h-4 text-[#94A3B8]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#1E293B]">{item.product}</p>
                      <p className="text-[11px] font-medium text-[#94A3B8] mt-0.5">SKU: {item.sku} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <span className={`inline-flex px-2 py-1 rounded-full text-[11px] font-bold ${
                    item.status === 'Critical' ? 'bg-[#FEE2E2] text-[#EF4444]' : 
                    item.status === 'Warning' ? 'bg-[#FEF3C7] text-[#F59E0B]' : 
                    'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    {item.daysUnsold} Days
                  </span>
                </td>
                <td className="py-4 align-middle text-right">
                  <span className="text-[13px] font-bold text-[#1E293B]">€ {item.value.toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

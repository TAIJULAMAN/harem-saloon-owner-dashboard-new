"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Trash2, Eye, Printer, User } from "lucide-react";
import Image from "next/image";

import PrintReceiptModal from "@/components/saloonOwner/financial/payments/PrintReceiptModal";

export default function ViewSalePage() {
  const params = useParams();
  const id = params?.id as string;
  const [isPrintReceiptModalOpen, setIsPrintReceiptModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-10">
      {/* Top Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/dashboard/financial/payments" className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors">
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          <span className="text-[14px] font-bold font-manrope">View Sale</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-[#94A3B8] hover:text-[#F43F5E] transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
          <span className="text-[#94A3B8]">/</span>
          <span className="bg-[#EEF2FF] text-[#635BFF] px-3 py-1 rounded-lg text-[12px] font-bold">
            Sales
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-6">

        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-6">
          {/* Basic Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
            <h3 className="text-[14px] font-bold text-[#1E293B] mb-6 font-manrope">Basic Details</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-10">
              <div>
                <div className="text-[11px] font-medium text-[#94A3B8] mb-1">ID</div>
                <div className="text-[13px] font-bold text-[#1E293B]">#000</div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Payment Date</div>
                <div className="text-[13px] font-bold text-[#1E293B]">5 Aug 2025, 12:30</div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Method</div>
                <span className="inline-block px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-lg text-[11px] font-bold">
                  Cash
                </span>
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Payment Status</div>
                <span className="inline-block px-3 py-1 bg-[#10B981] text-white rounded-full text-[11px] font-bold">
                  Fully Paid
                </span>
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Receipt Issue</div>
                <span className="inline-block px-2.5 py-1 border border-[#F59E0B] text-[#F59E0B] rounded-full text-[11px] font-bold">
                  Half Printed
                </span>
              </div>
              <div className="col-span-2 grid grid-cols-2 mt-2">
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-2">Client</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                      <Image src="/avatar/icon1.png" alt="Client" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1E293B]">Maria Rodriguez</div>
                      <div className="text-[11px] font-medium text-[#94A3B8]">maria@beautywellness.com</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-2">Receipt Issued By</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                      <Image src="/avatar/icon2.png" alt="Staff" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1E293B]">Maria Rodriguez</div>
                      <div className="text-[11px] font-medium text-[#94A3B8]">maria@beautywellness.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
            <h3 className="text-[14px] font-bold text-[#1E293B] mb-6 font-manrope">Activity</h3>

            <div className="relative border-l border-[#E2E8F0] ml-3 space-y-8 pb-4">

              {/* Activity Item 1 */}
              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-[#F43F5E] rounded-full"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[11px] font-bold text-[#64748B] mb-1">Today at 14:34</div>
                    <div className="text-[13px] font-medium text-[#1E293B] mb-0.5">€ 10 refunded by cash</div>
                    <div className="text-[11px] text-[#94A3B8]">Completed by Maria Fernandez</div>
                  </div>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-[#635BFF] rounded-full"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[11px] font-bold text-[#64748B] mb-1">Today at 14:34</div>
                    <div className="text-[13px] font-medium text-[#1E293B] mb-0.5">Sale 1 created</div>
                    <div className="text-[11px] text-[#94A3B8]">Completed by Maria Fernandez</div>
                  </div>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-[#14B8A6] rounded-full"></div>
                <div className="flex justify-between items-start group">
                  <div>
                    <div className="text-[11px] font-bold text-[#64748B] mb-1">Today at 14:34</div>
                    <div className="text-[13px] font-medium text-[#1E293B] mb-0.5">Automation</div>
                    <div className="text-[11px] text-[#94A3B8]">Confirmation sent through Whatsapp/Email/Phone</div>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center bg-[#EEF2FF] text-[#635BFF] rounded-lg transition-colors hover:bg-[#E0E7FF] shrink-0 ml-2">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* Sale #000 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
          <h3 className="text-[14px] font-bold text-[#1E293B] font-manrope">Sale #000</h3>
          <div className="text-[11px] font-medium text-[#64748B] mb-6">5 Aug 2025, 12:30</div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="pb-3 text-[12px] font-bold text-[#1E293B]">Service</th>
                  <th className="pb-3 text-[12px] font-bold text-[#1E293B]">Employee</th>
                  <th className="pb-3 text-[12px] font-bold text-[#1E293B]">Start Time</th>
                  <th className="pb-3 text-[12px] font-bold text-[#1E293B]">Date</th>
                  <th className="pb-3 text-[12px] font-bold text-[#1E293B]">Duration</th>
                  <th className="pb-3 text-[12px] font-bold text-[#1E293B]">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 text-[13px] font-medium text-[#475569]">Haircut</td>
                  <td className="py-4 text-[13px] font-medium text-[#475569]">Maria Rodriguez</td>
                  <td className="py-4 text-[13px] font-medium text-[#475569]">12:00</td>
                  <td className="py-4 text-[13px] font-medium text-[#475569]">5 Aug 2025</td>
                  <td className="py-4 text-[13px] font-medium text-[#475569]">15 min</td>
                  <td className="py-4 text-[13px] font-medium text-[#475569]">€ 170</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-5 space-y-3">
            <h4 className="text-[13px] font-bold text-[#1E293B] mb-4">Order Summary</h4>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#64748B] font-medium">Subtotal</span>
              <span className="text-[#475569] font-medium">€ 170</span>
            </div>
            <div className="flex justify-between items-center text-[13px] font-bold">
              <span className="text-[#1E293B]">Total</span>
              <span className="text-[#1E293B]">€ 170</span>
            </div>

            <div className="pt-4 mt-2">
              <div className="flex justify-between items-center text-[13px] mb-1">
                <span className="text-[#64748B] font-medium">Paid with Cash</span>
                <span className="text-[#475569] font-medium">€ 10</span>
              </div>
              <div className="text-[11px] font-medium text-[#94A3B8] mb-4">5 Aug 2025, 12:30</div>
              <div className="flex justify-between items-center text-[13px] font-bold">
                <span className="text-[#1E293B]">Balance</span>
                <span className="text-[#1E293B]">€ 160</span>
              </div>
            </div>
          </div>
          {/* Receipt Status */}
          <div className="bg-white mt-5 rounded-lg p-5 shadow-sm border border-[#E2E8F0]">
            <h3 className="text-[14px] font-bold text-[#1E293B] mb-6 font-manrope">Receipt Status</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#475569]">Cash</span>
                  <span className="px-2.5 py-1 border border-[#10B981] text-[#10B981] rounded-full text-[10px] font-bold">
                    Printed
                  </span>
                </div>
                <Link
                  href={`/dashboard/financial/payments/${id}/receipt`}
                  className="flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[12px] font-bold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Receipt
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#475569]">Online payment</span>
                  <span className="px-2.5 py-1 border border-[#F59E0B] text-[#F59E0B] rounded-full text-[10px] font-bold">
                    To be printed
                  </span>
                </div>
                <button
                  onClick={() => setIsPrintReceiptModalOpen(true)}
                  className="flex items-center gap-2 bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg text-[12px] font-bold transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Refund #1 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
          <h3 className="text-[14px] font-bold text-[#1E293B] font-manrope">Refund #1</h3>
          <div className="text-[11px] font-medium text-[#64748B] mb-6">5 Aug 2025, 12:30</div>

          <div className="border border-[#E2E8F0] rounded-lg p-5 space-y-3">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#64748B] font-medium">Accidental Charge</span>
              <span className="text-[#475569] font-medium">€ 170</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#64748B] font-medium">Refund Amount</span>
              <span className="text-[#475569] font-medium">- € 10</span>
            </div>
            <div className="pt-2 border-t border-[#F1F5F9] mt-2">
              <div className="flex justify-between items-center text-[13px] mt-2">
                <span className="text-[#64748B] font-medium">Subtotal</span>
                <span className="text-[#475569] font-medium">- € 10</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-bold mt-3">
                <span className="text-[#1E293B]">Total</span>
                <span className="text-[#1E293B]">- € 10</span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <div className="flex justify-between items-center text-[13px] font-bold mb-1">
                <span className="text-[#1E293B]">Refunded with Cash</span>
                <span className="text-[#1E293B]">- € 10</span>
              </div>
              <div className="text-[12px] font-medium text-[#94A3B8]">Refund amount</div>
            </div>
          </div>
        </div>
      </div>

      <PrintReceiptModal
        isOpen={isPrintReceiptModalOpen}
        onClose={() => setIsPrintReceiptModalOpen(false)}
        status="not_received"
        onPrint={() => {
          setIsPrintReceiptModalOpen(false);
        }}
      />
    </div>
  );
}

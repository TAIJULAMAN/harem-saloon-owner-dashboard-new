"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { useParams } from "next/navigation";

export default function ServiceReceiptPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="space-y-4 pb-10">

      {/* Top Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg px-5 py-3.5 flex items-center justify-between shadow-sm">
        <Link
          href={`/dashboard/financial/payments/${id}`}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[#635BFF]" />
          <div>
            <div className="text-[13px] font-bold text-[#1E293B]">Service Receipt</div>
            <div className="text-[11px] text-[#94A3B8]">Italian Fiscal Invoice</div>
          </div>
        </Link>
        <button className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </button>
      </div>

      {/* Electronic Invoice */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
        <h2 className="text-[15px] font-bold text-[#1E293B] mb-4">Eletronic Invoice</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#E2E8F0] rounded-lg py-6 px-5">
            <div className="text-[13px] font-bold text-[#1E293B] mb-1">2025-000123</div>
            <div className="text-[11px] text-[#94A3B8]">Receipt No.</div>
          </div>
          <div className="border border-[#E2E8F0] rounded-lg py-6 px-5">
            <div className="text-[13px] font-bold text-[#1E293B] mb-1">11/30/2024</div>
            <div className="text-[11px] text-[#94A3B8]">Date</div>
          </div>
        </div>
      </div>

      {/* Transferor / Transferee */}
      <div className="grid grid-cols-2 gap-4">
        {/* Transferor/Provider */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
          <h2 className="text-[15px] font-bold text-[#1E293B] mb-4">Transferor/Provider</h2>
          <div className="space-y-5">
            <div>
              <div className="text-[13px] font-bold text-[#1E293B]">Bella Vista Salon</div>
              <div className="text-[11px] text-[#64748B] mt-1">Via Roma, 123</div>
              <div className="text-[11px] text-[#64748B]">20121 Milan (MI) - Italy</div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">P.IVA</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">IT12345678901</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">Tax Code</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">12345678901</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">PEC</div>
                <div className="text-[12px] font-semibold text-[#1E293B] break-all">amministrazione@pec.salonflow.it</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">Recipient Code</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">XXXXXXX</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">Telephone</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">+39 02 1234567</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">Email</div>
                <div className="text-[12px] font-semibold text-[#1E293B] break-all">fatturazione@salonflow.it</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transferee/Client */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
          <h2 className="text-[15px] font-bold text-[#1E293B] mb-4">Transferee/Client</h2>
          <div className="space-y-5">
            <div>
              <div className="text-[13px] font-bold text-[#1E293B]">Maria Rodriguez</div>
              <div className="text-[11px] text-[#64748B] mt-1">Via Esempio, 456</div>
              <div className="text-[11px] text-[#64748B]">10100 Turin (TO) - Italy</div>
            </div>
            <div>
              <div className="text-[10px] font-medium text-[#94A3B8] mb-0.5">Tax Code</div>
              <div className="text-[12px] font-semibold text-[#1E293B]">98765432109</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-[15px] font-bold text-[#1E293B]">Service Description</h2>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
              <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B] w-[40%]">Name</th>
              <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B] text-right">Amount</th>
              <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B] text-right">Unit Price</th>
              <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B] text-right">VAT Rate</th>
              <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B] text-right">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 px-6 text-[12px] text-[#475569]">Haircut</td>
              <td className="py-4 px-6 text-[12px] text-[#475569] text-right">1</td>
              <td className="py-4 px-6 text-[12px] text-[#475569] text-right">€ 245.08</td>
              <td className="py-4 px-6 text-[12px] text-[#475569] text-right">22%</td>
              <td className="py-4 px-6 text-[12px] font-bold text-[#1E293B] text-right">€ 245.08</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* VAT Summary + Document Totals */}
      <div className="grid grid-cols-2 gap-4">
        {/* VAT Summary */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="text-[15px] font-bold text-[#1E293B]">VAT Summary</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B]">Rate</th>
                <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B]">Taxable</th>
                <th className="py-3.5 px-6 text-[12px] font-bold text-[#1E293B]">IVA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-6 text-[12px] text-[#475569]">0%</td>
                <td className="py-4 px-6 text-[12px] text-[#475569]">€ 0</td>
                <td className="py-4 px-6 text-[12px] text-[#475569]">€ 0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Document Totals */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="text-[15px] font-bold text-[#1E293B]">Document Totals</h2>
          </div>
          <div className="px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#94A3B8]">Total Taxable Amount</span>
              <span className="text-[12px] text-[#475569]">€ 170</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#94A3B8]">Total VAT</span>
              <span className="text-[12px] text-[#475569]">€ 0</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
              <span className="text-[13px] font-bold text-[#1E293B]">Document Total</span>
              <span className="text-[13px] font-bold text-[#1E293B]">€ 170</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-[15px] font-bold text-[#1E293B]">Payment Methods</h2>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-4 gap-6 mb-5">
            <div>
              <div className="text-[11px] text-[#94A3B8] mb-1">Method</div>
              <div className="text-[12px] font-semibold text-[#1E293B]">Credit Card</div>
            </div>
            <div>
              <div className="text-[11px] text-[#94A3B8] mb-1">Payment Date</div>
              <div className="text-[12px] font-semibold text-[#1E293B]">12/02/2024</div>
            </div>
            <div>
              <div className="text-[11px] text-[#94A3B8] mb-1">Deadline</div>
              <div className="text-[12px] font-semibold text-[#1E293B]">12/14/2024</div>
            </div>
            <div>
              <div className="text-[11px] text-[#94A3B8] mb-1">Amount Paid</div>
              <div className="text-[12px] font-semibold text-[#1E293B]">€ 170</div>
            </div>
          </div>
          <div className="pt-4 border-t border-[#E2E8F0]">
            <div className="text-[11px] text-[#94A3B8] mb-1.5">Status</div>
            <span className="inline-block px-3 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full text-[11px] font-bold">
              Paid
            </span>
          </div>
        </div>
      </div>

      {/* Legal Notes */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-[15px] font-bold text-[#1E293B]">Legal Notes</h2>
        </div>
        <div className="px-6 py-5">
          <ul className="space-y-2.5">
            {[
              "Invoice issued pursuant to art. 21 of Presidential Decree 26 October 1972, n. 633 and subsequent amendments.",
              "VAT paid by the purchaser pursuant to art. 17, paragraph 6, of Presidential Decree 26 October 1972, n. 633.",
              "Digitally signed electronic document pursuant to Legislative Decree 82/2005.",
              "Replacement storage of documents pursuant to the Ministerial Decree of 17 June 2014.",
              "Competent court: Milan. Applicable law: Italian.",
              "Company subject to the management and coordination of [Holding Company].",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#94A3B8] shrink-0 leading-5">•</span>
                <span className="text-[12px] text-[#64748B] leading-5">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center bg-white rounded-lg">
        <p className="text-[11px] text-[#94A3B8] leading-6">
          SalonFlow Srl - Via Roma, 123 - 20121 Milan (MI) - VAT number: IT12345678901 - SDI Code: XXXXXXX <br />
          Share Capital: € 10,000.00 i.v. - REA MI-1234567 - SDI Code: XXXXXXX <br />
          www.salonflow.it - info@salonflow.it - Tel: +39 02 1234567
        </p>
      </div>

    </div>
  );
}

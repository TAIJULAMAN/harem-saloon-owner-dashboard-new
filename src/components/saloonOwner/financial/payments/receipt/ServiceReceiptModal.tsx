import React from "react";
import { ChevronLeft, Download } from "lucide-react";

interface ServiceReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData?: any;
}

export default function ServiceReceiptModal({ isOpen, onClose }: ServiceReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#F4F6FB] z-[50] overflow-y-auto">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[#635BFF]" />
          <div>
            <div className="text-[13px] font-bold text-[#1E293B]">Service Receipt</div>
            <div className="text-[10px] text-[#94A3B8]">Italian Fiscal Invoice</div>
          </div>
        </button>
        <button className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-5 space-y-5">

        {/* Electronic Invoice */}
        <section>
          <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Eletronic Invoice</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
            <div className="grid grid-cols-2">
              <div className="border-r border-[#E2E8F0] pr-6">
                <div className="text-[13px] font-bold text-[#1E293B]">2025-000123</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Receipt No.</div>
              </div>
              <div className="pl-6">
                <div className="text-[13px] font-bold text-[#1E293B]">11/30/2024</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Date</div>
              </div>
            </div>
          </div>
        </section>

        {/* Transferor / Transferee */}
        <div className="grid grid-cols-2 gap-5">
          {/* Transferor/Provider */}
          <section>
            <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Transferor/Provider</h2>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 space-y-4">
              <div>
                <div className="text-[13px] font-bold text-[#1E293B]">Bella Vista Salon</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Via Roma, 123</div>
                <div className="text-[11px] text-[#64748B]">20121 Milan (MI) - Italy</div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <div className="text-[10px] text-[#94A3B8] mb-0.5">P.IVA</div>
                  <div className="text-[11px] font-semibold text-[#1E293B]">IT12345678901</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94A3B8] mb-0.5">Tax Code</div>
                  <div className="text-[11px] font-semibold text-[#1E293B]">12345678901</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94A3B8] mb-0.5">PEC</div>
                  <div className="text-[11px] font-semibold text-[#1E293B] break-all">amministrazione@pec.salonflow.it</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94A3B8] mb-0.5">Recipient Code</div>
                  <div className="text-[11px] font-semibold text-[#1E293B]">XXXXXXX</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94A3B8] mb-0.5">Telephone</div>
                  <div className="text-[11px] font-semibold text-[#1E293B]">+39 02 1234567</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94A3B8] mb-0.5">Email</div>
                  <div className="text-[11px] font-semibold text-[#1E293B] break-all">fatturazione@salonflow.it</div>
                </div>
              </div>
            </div>
          </section>

          {/* Transferee/Client */}
          <section>
            <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Transferee/Client</h2>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 space-y-4 h-[calc(100%-28px)]">
              <div>
                <div className="text-[13px] font-bold text-[#1E293B]">Maria Rodriguez</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Via Esempio, 456</div>
                <div className="text-[11px] text-[#64748B]">10100 Turin (TO) - Italy</div>
              </div>
              <div>
                <div className="text-[10px] text-[#94A3B8] mb-0.5">Tax Code</div>
                <div className="text-[11px] font-semibold text-[#1E293B]">98765432109</div>
              </div>
            </div>
          </section>
        </div>

        {/* Service Description */}
        <section>
          <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Service Description</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B] w-[40%]">Name</th>
                  <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B] text-right">Amount</th>
                  <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B] text-right">Unit Price</th>
                  <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B] text-right">VAT Rate</th>
                  <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B] text-right">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3.5 px-5 text-[12px] text-[#475569]">Haircut</td>
                  <td className="py-3.5 px-5 text-[12px] text-[#475569] text-right">1</td>
                  <td className="py-3.5 px-5 text-[12px] text-[#475569] text-right">€ 245.08</td>
                  <td className="py-3.5 px-5 text-[12px] text-[#475569] text-right">22%</td>
                  <td className="py-3.5 px-5 text-[12px] font-semibold text-[#1E293B] text-right">€ 245.08</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* VAT Summary + Document Totals */}
        <div className="grid grid-cols-2 gap-5">
          {/* VAT Summary */}
          <section>
            <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">VAT Summary</h2>
            <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                    <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B]">Rate</th>
                    <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B]">Taxable</th>
                    <th className="py-3 px-5 text-[11px] font-bold text-[#1E293B]">IVA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3.5 px-5 text-[12px] text-[#475569]">0%</td>
                    <td className="py-3.5 px-5 text-[12px] text-[#475569]">€ 0</td>
                    <td className="py-3.5 px-5 text-[12px] text-[#475569]">€ 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Document Totals */}
          <section>
            <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Document Totals</h2>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Total Taxable Amount</span>
                <span className="text-[12px] text-[#475569] font-medium">€ 170</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Total VAT</span>
                <span className="text-[12px] text-[#475569] font-medium">€ 0</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] mt-1">
                <span className="text-[13px] font-bold text-[#1E293B]">Document Total</span>
                <span className="text-[13px] font-bold text-[#1E293B]">€ 170</span>
              </div>
            </div>
          </section>
        </div>

        {/* Payment Methods */}
        <section>
          <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Payment Methods</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-[10px] text-[#94A3B8] mb-1">Method</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">Credit Card</div>
              </div>
              <div>
                <div className="text-[10px] text-[#94A3B8] mb-1">Payment Date</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">12/02/2024</div>
              </div>
              <div>
                <div className="text-[10px] text-[#94A3B8] mb-1">Deadline</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">12/14/2024</div>
              </div>
              <div>
                <div className="text-[10px] text-[#94A3B8] mb-1">Amount Paid</div>
                <div className="text-[12px] font-semibold text-[#1E293B]">€ 170</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[10px] text-[#94A3B8] mb-1">Status</div>
              <span className="inline-block px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-lg text-[11px] font-bold">
                Paid
              </span>
            </div>
          </div>
        </section>

        {/* Legal Notes */}
        <section>
          <h2 className="text-[13px] font-bold text-[#1E293B] mb-3">Legal Notes</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
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
                  <span className="text-[#94A3B8] text-[12px] shrink-0 leading-5">•</span>
                  <span className="text-[11px] text-[#64748B] leading-5">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-2 pb-6 text-center">
          <div className="text-[10px] text-[#94A3B8] leading-relaxed">
            SalonFlow Srl - Via Roma, 123 - 20121 Milan (MI) - VAT number: IT12345678901 · SDI Code: XXXXXXX <br />
            Share Capital: € 10,000.00 - REA MI-1234567 · SDI Code: XXXXXXX <br />
            www.salonflow.it · info@salonflow.it · Tel: +39 02 1234567
          </div>
        </div>

      </div>
    </div>
  );
}

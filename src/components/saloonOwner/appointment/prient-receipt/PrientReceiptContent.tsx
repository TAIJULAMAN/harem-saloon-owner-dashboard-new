"use client";
import InvoiceHead from "./InvoiceHead";
import LegalNotes from "./LegalNotes";
import ReceiptNav from "./ReceiptNav";
import ServiceDescription from "./ServiceDescription";
import Transfer from "./Transfer";
import Vatsummarydocumenttotals from "./Vatsummarydocumenttotals";

export default function PrientReceiptContent() {
  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] font-manrope">
      {/* Top Nav */}
      <ReceiptNav />
      {/* Page Content */}
      <div className="w-full space-y-5">
        {/* Electronic Invoice */}
        <InvoiceHead />
        {/* transfer */}
        <Transfer />
        {/* Service Description */}
        <ServiceDescription />

        {/* VAT Summary + Document Totals */}
        <Vatsummarydocumenttotals />
        <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-6">
            Payment Methods
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {/* Row 1 */}
            <div>
              <p className="text-xs font-manrope text-[#98A4AE]">Mode</p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                Credit Card
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#98A4AE]">
                Payment Date
              </p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                12/02/2024
              </p>
            </div>

            {/* Row 2 */}
            <div>
              <p className="text-xs font-manrope text-[#98A4AE]">Deadline</p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                12/14/2024
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#98A4AE]">Amount Paid</p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                â‚¬ 299.00
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-5">
            <p className="text-xs font-manrope text-[#98A4AE]">Status</p>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EBFAF0] text-[#36C76C] text-xs font-semibold font-manrope">
              Paid
            </span>
          </div>
        </section>

        {/*  Legal Notes */}
        <LegalNotes />

        {/* Footer */}
        <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px] text-center">
          <p className="text-sm font-manrope text-[#526B7A] leading-relaxed mb-2">
            SalonFlow Srl Â· Via Roma, 123 Â· 20121 Milan (MI) Â· VAT number:
            IT12345678901
          </p>
          <p className="text-sm font-manrope text-[#526B7A] leading-relaxed mb-2">
            Share Capital: â‚¬ 10,000.00 iv Â· REA MI-1234567 Â· SDI Code: XXXXXXX
          </p>
          <p className="text-sm font-manrope text-[#526B7A] leading-relaxed">
            www.salonflow.it Â· info@salonflow.it Â· Tel: +39 02 1234567
          </p>
        </div>
      </div>
    </div>
  );
}

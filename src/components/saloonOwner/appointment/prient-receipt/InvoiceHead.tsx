export default function InvoiceHead() {
  return (
    <div>
      <section className="bg-white rounded-xl border border-[#EFF4FA] p-[30px]">
        <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
          Eletronic Invoice
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[#EFF4FA] rounded-[10px] p-[30px]">
            <p className="text-[18px] font-bold font-manrope text-[#29343D] mb-1">
              2025-000123
            </p>
            <p className="text-[15px] font-manrope text-[#98A4AE]">
              Receipt No.
            </p>
          </div>
          <div className="border border-[#EFF4FA] rounded-[10px] p-[30px]">
            <p className="text-[18px] font-bold font-manrope text-[#29343D] mb-1">
              11/30/2024
            </p>
            <p className="text-[15px] font-manrope text-[#98A4AE]">Date</p>
          </div>
        </div>
      </section>
    </div>
  );
}

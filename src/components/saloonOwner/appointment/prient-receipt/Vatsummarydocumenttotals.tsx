export default function Vatsummarydocumenttotals() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* VAT Summary */}
        <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            VAT Summary
          </h2>

          <div className="border border-[#EFF4FA] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0">
              <thead>
                <tr className="bg-[#F3F3FF]">
                  <th className="px-[14px] py-6 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D]">
                    Rate
                  </th>
                  <th className="px-[14px] py-6 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D]">
                    Taxable
                  </th>
                  <th className="px-[14px] py-6 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D]">
                    IVA
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-[#EFF4FA]">
                  <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#29343D]">
                    22%
                  </td>
                  <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#526B7A]">
                    â‚¬ 245.08
                  </td>
                  <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#526B7A]">
                    â‚¬ 53.92
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Document Totals */}
        <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            Document Totals
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-manrope text-[#98A4AE]">
                Total Taxable Amount
              </p>
              <p className="text-sm font-manrope text-[#29343D]">â‚¬ 245.08</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-manrope text-[#98A4AE]">Total VAT</p>
              <p className="text-sm font-manrope text-[#29343D]">â‚¬ 245.08</p>
            </div>

            <div className="border-t border-[#EFF4FA] pt-4 flex items-center justify-between">
              <p className="text-sm font-manrope text-[#98A4AE]">
                Document Total
              </p>
              <p className="text-xl font-bold font-manrope text-[#29343D]">
                â‚¬ 299.00
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

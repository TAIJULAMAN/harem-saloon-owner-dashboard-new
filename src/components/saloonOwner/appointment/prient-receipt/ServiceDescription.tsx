export default function ServiceDescription() {
  return (
    <div>
      <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
        <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
          Service Description
        </h2>
        <div className="border border-[#EFF4FA] rounded-[10px] overflow-hidden">
          <table className="w-full border-collapse [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0">
            <thead>
              <tr className="bg-[#F3F3FF]">
                <th className="px-[14px] py-7 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D] w-full">
                  Name
                </th>
                <th className="px-[14px] py-7 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                  Amount
                </th>
                <th className="px-[14px] py-7 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                  Unit Price
                </th>
                <th className="px-[14px] py-7 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                  VAT Rate
                </th>
                <th className="px-[14px] py-7 border-r border-[#E0E6EB] text-left text-sm font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#EFF4FA]">
                <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#29343D]">
                  Haircut
                </td>
                <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#526B7A]">
                  1
                </td>
                <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#526B7A]">
                  â‚¬ 245.08
                </td>
                <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-manrope text-[#526B7A]">
                  22%
                </td>
                <td className="px-[14px] py-7 border-r border-[#E0E6EB] text-sm font-semibold font-manrope text-[#29343D]">
                  â‚¬ 245.08
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

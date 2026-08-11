import { ExpensePill, PillVariant } from "./ExpensePill";
import { ActionMenu } from "./ActionMenu";

interface ExpenseTableProps {
  expenses: any[];
  onView: (expense: any) => void;
  onEdit: (expense: any) => void;
  onAttach: (expense: any) => void;
  onDelete: (expense: any) => void;
}

export function ExpenseTable({ expenses, onView, onEdit, onAttach, onDelete }: ExpenseTableProps) {
  return (
    <div className="w-full mt-6 bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[13px] font-bold text-[#1E293B]">
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Date</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Macro-categories</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Category</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Cost</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Supplier</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Payment method</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px]">Note</th>
              <th className="py-4 px-5 font-extrabold uppercase tracking-wide text-[#94A3B8] text-[11px] text-center sticky right-0 bg-[#F8FAFC] shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)] z-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-5 text-[13px] font-bold text-[#1E293B]">{expense.date}</td>
                <td className="py-4 px-5">
                  <ExpensePill text={expense.macroCategory.text} colorType={expense.macroCategory.colorType} variant="solid" />
                </td>
                <td className="py-4 px-5">
                  <ExpensePill text={expense.category.text} colorType={expense.category.colorType} variant="soft" />
                </td>
                <td className="py-4 px-5 text-[13px] font-bold text-[#1E293B]">{expense.cost}</td>
                <td className="py-4 px-5 text-[13px] font-medium text-[#475569]">{expense.supplier}</td>
                <td className="py-4 px-5">
                  <ExpensePill text={expense.paymentMethod.text} colorType={expense.paymentMethod.colorType} variant="soft" />
                </td>
                <td className="py-4 px-5 text-[13px] font-medium text-[#475569] max-w-[200px] truncate">
                  {expense.note || <span className="text-[#94A3B8] italic">No note</span>}
                </td>
                <td className="py-4 px-5 text-center sticky right-0 bg-white group-hover:bg-slate-50 transition-colors shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)] z-10">
                  <div className="flex justify-center relative">
                    <ActionMenu
                      onView={() => onView(expense)}
                      onEdit={() => onEdit(expense)}
                      onAttach={() => onAttach(expense)}
                      onDelete={() => onDelete(expense)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Edit, Paperclip, Trash2 } from "lucide-react";
import { ExpensePill } from "./ExpensePill";
import { ActionMenu } from "./ActionMenu";

interface ExpenseGridProps {
  expenses: any[];
  onView: (expense: any) => void;
  onEdit: (expense: any) => void;
  onAttach: (expense: any) => void;
  onDelete: (expense: any) => void;
}

export function ExpenseGrid({ expenses, onView, onEdit, onAttach, onDelete }: ExpenseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {expenses.map((expense) => (
        <div key={expense.id} className="bg-white border border-[#E2E8F0] rounded-lg p-5">
          {/* Top row */}
          <div className="flex justify-between items-start mb-4">
            <div className="text-[14px] font-bold text-[#1E293B]">{expense.date}</div>
            <div className="flex items-center gap-3">
              <div className="text-[13px] font-bold text-[#1E293B]">{expense.cost}</div>
              <ActionMenu
                onView={() => onView(expense)}
                onEdit={() => onEdit(expense)}
                onAttach={() => onAttach(expense)}
                onDelete={() => onDelete(expense)}
                buttonClassName="w-6 h-6 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                menuClassName="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 overflow-hidden py-1"
              />
            </div>
          </div>

          {/* Grid of properties */}
          <div className="grid grid-cols-2 gap-y-4 mb-4">
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] mb-1.5">Macro-category</div>
              <ExpensePill text={expense.macroCategory.text} colorType={expense.macroCategory.colorType} variant="solid" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] mb-1.5">Category</div>
              <ExpensePill text={expense.category.text} colorType={expense.category.colorType} variant="soft" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] mb-1.5">Payment Method</div>
              <ExpensePill text={expense.paymentMethod.text} colorType={expense.paymentMethod.colorType} variant="soft" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] mb-1.5">Supplier</div>
              <div className="text-[13px] font-bold text-[#1E293B]">{expense.supplier}</div>
            </div>
          </div>

          {/* Note */}
          <div>
            <div className="text-[11px] font-bold text-[#94A3B8] mb-1">Note</div>
            <div className="text-[13px] font-bold text-[#1E293B]">{expense.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


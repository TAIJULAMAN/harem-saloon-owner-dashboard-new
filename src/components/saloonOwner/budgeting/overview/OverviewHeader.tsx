"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AddExpenseModal } from "../expenses/modals/AddExpenseModal";
import { BudgetExceededModal } from "../expenses/modals/BudgetExceededModal";
import { ExportDropdown } from "./ExportDropdown";

export function OverviewHeader({ reportMonth }: { reportMonth: string }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBudgetWarningOpen, setIsBudgetWarningOpen] = useState(false);

  const handleSaveExpense = () => {
    setIsAddModalOpen(false);
    setIsBudgetWarningOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="flex flex-wrap items-center gap-4">
        <ExportDropdown reportMonth={reportMonth} />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#635BFF] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:bg-[#5249EC] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>
      </div>

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveExpense}
      />

      <BudgetExceededModal
        isOpen={isBudgetWarningOpen}
        onClose={() => setIsBudgetWarningOpen(false)}
        onConfirm={() => setIsBudgetWarningOpen(false)}
      />
    </div>
  );
}


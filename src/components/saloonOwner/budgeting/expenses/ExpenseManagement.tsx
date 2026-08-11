"use client";

import React, { useState } from "react";
import { Search, List, LayoutGrid } from "lucide-react";
import { ExpenseHeader } from "./ExpenseHeader";
import { ExpenseFilters } from "./ExpenseFilters";
import { ExpenseTable } from "./ExpenseTable";
import { ExpenseGrid } from "./ExpenseGrid";
import Pagination from "@/components/saloonOwner/common/Pagination";
import { AddExpenseModal } from "./modals/AddExpenseModal";
import { BudgetExceededModal } from "./modals/BudgetExceededModal";
import { AttachReceiptsModal } from "./modals/AttachReceiptsModal";
import { ViewExpenseModal } from "./modals/ViewExpenseModal";
import { DeleteExpenseModal } from "./modals/DeleteExpenseModal";
import { MOCK_EXPENSES as mockExpenses } from "../data";

export function ExpenseManagement() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    date: "",
    macroCategory: "",
    category: "",
    supplier: "",
    paymentMethod: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBudgetWarningOpen, setIsBudgetWarningOpen] = useState(false);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [viewExpenseData, setViewExpenseData] = useState<any>(null);

  const handleSaveExpense = () => {
    // For demonstration, trigger budget warning
    setIsAddModalOpen(false);
    setIsBudgetWarningOpen(true);
  };

  // Derive filter options from mockExpenses
  const filterOptions = React.useMemo(() => {
    const dates = Array.from(new Set(mockExpenses.map(e => e.date.split(' ')[0])));
    const macroCategories = Array.from(new Set(mockExpenses.map(e => e.macroCategory.text)));
    const categories = Array.from(new Set(mockExpenses.map(e => e.category.text)));
    const suppliers = Array.from(new Set(mockExpenses.map(e => e.supplier)));
    const paymentMethods = Array.from(new Set(mockExpenses.map(e => e.paymentMethod.text)));

    return { dates, macroCategories, categories, suppliers, paymentMethods };
  }, [mockExpenses]);

  // Filter & Search Logic
  const filteredExpenses = React.useMemo(() => {
    return mockExpenses.filter((expense) => {
      // Search
      const matchesSearch =
        expense.cost.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.note.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Filters
      if (filters.date && !expense.date.startsWith(filters.date)) return false;
      if (filters.macroCategory && expense.macroCategory.text !== filters.macroCategory) return false;
      if (filters.category && expense.category.text !== filters.category) return false;
      if (filters.supplier && expense.supplier !== filters.supplier) return false;
      if (filters.paymentMethod && expense.paymentMethod.text !== filters.paymentMethod) return false;

      return true;
    });
  }, [mockExpenses, searchQuery, filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 text-[#1E293B]">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
        <ExpenseHeader onAddExpense={() => setIsAddModalOpen(true)} />
        <ExpenseFilters
          filters={filters}
          setFilters={(newFilters) => { setFilters(newFilters); setCurrentPage(1); }}
          options={filterOptions}
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">

        {/* Search & Toggle Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-[300px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-semibold text-[#1E293B] outline-none placeholder:text-[#94A3B8] focus:border-[#635BFF] transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode("list")}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-[#635BFF] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-[#635BFF] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Component */}
        {viewMode === "list" ? (
          <ExpenseTable
            expenses={paginatedExpenses}
            onView={(expense) => setViewExpenseData(expense)}
            onEdit={() => setIsAddModalOpen(true)}
            onAttach={() => setIsAttachModalOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
          />
        ) : (
          <ExpenseGrid
            expenses={paginatedExpenses}
            onView={(expense) => setViewExpenseData(expense)}
            onEdit={() => setIsAddModalOpen(true)}
            onAttach={() => setIsAttachModalOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
          />
        )}

        {filteredExpenses.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredExpenses.length}
            itemsPerPage={itemsPerPage}
            itemName="expenses"
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="py-12 text-center text-[13px] font-medium text-[#94A3B8]">
            No expenses found.
          </div>
        )}

      </div>

      {/* Modals */}
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

      <AttachReceiptsModal
        isOpen={isAttachModalOpen}
        onClose={() => setIsAttachModalOpen(false)}
        onSave={() => setIsAttachModalOpen(false)}
      />

      <ViewExpenseModal
        isOpen={!!viewExpenseData}
        onClose={() => setViewExpenseData(null)}
        expenseData={viewExpenseData}
      />

      <DeleteExpenseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />

    </div>
  );
}

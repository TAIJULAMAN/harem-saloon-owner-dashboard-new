import React from "react";
import { CustomSelect } from "@/components/common/CustomSelect";

interface ExpenseFiltersProps {
  filters: {
    date: string;
    macroCategory: string;
    category: string;
    supplier: string;
    paymentMethod: string;
  };
  setFilters: (filters: any) => void;
  options: {
    dates: string[];
    macroCategories: string[];
    categories: string[];
    suppliers: string[];
    paymentMethods: string[];
  };
}

export function ExpenseFilters({ filters, setFilters, options }: ExpenseFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const FilterGroup = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (val: string) => void }) => (
    <div className="flex-1 min-w-[140px]">
      <label className="block text-[11px] font-bold text-[#94A3B8] mb-1.5">{label}</label>
      <CustomSelect 
        value={value || "All"} 
        options={["All", ...options]} 
        onChange={onChange}
        className="w-full"
        buttonClassName="w-full justify-between"
        align="left"
      />
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E2E8F0]">
      <FilterGroup 
        label="Date" 
        value={filters.date}
        onChange={(v) => updateFilter("date", v === "All" ? "" : v)}
        options={options.dates}
      />
      <FilterGroup 
        label="Macro-categories" 
        value={filters.macroCategory}
        onChange={(v) => updateFilter("macroCategory", v === "All" ? "" : v)}
        options={options.macroCategories}
      />
      <FilterGroup 
        label="Category" 
        value={filters.category}
        onChange={(v) => updateFilter("category", v === "All" ? "" : v)}
        options={options.categories}
      />
      <FilterGroup 
        label="Supplier" 
        value={filters.supplier}
        onChange={(v) => updateFilter("supplier", v === "All" ? "" : v)}
        options={options.suppliers}
      />
      <FilterGroup 
        label="Payment Method" 
        value={filters.paymentMethod}
        onChange={(v) => updateFilter("paymentMethod", v === "All" ? "" : v)}
        options={options.paymentMethods}
      />
    </div>
  );
}

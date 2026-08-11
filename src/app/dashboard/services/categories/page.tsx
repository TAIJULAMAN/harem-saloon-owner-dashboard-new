"use client";

import React, { useState } from "react";
import { Download, Plus, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddCategoryModal from "@/components/saloonOwner/services/AddCategoryModal";
import EditCategoryModal from "@/components/saloonOwner/services/EditCategoryModal";
import DeleteCategoryModal from "@/components/saloonOwner/services/DeleteCategoryModal";

type CategoryRecord = {
  id: string;
  name: string;
  categoryStyle: string;
  relatedServices: number;
};

const initialCategories: CategoryRecord[] = [
  { id: "1", name: "Category 1", categoryStyle: "bg-[#E0E7FF] text-[#635BFF]", relatedServices: 1 },
  { id: "2", name: "Category 2", categoryStyle: "bg-[#CCFBF1] text-[#14B8A6]", relatedServices: 1 },
  { id: "3", name: "Category 3", categoryStyle: "bg-[#DCFCE7] text-[#22C55E]", relatedServices: 1 },
  { id: "4", name: "Category 4", categoryStyle: "bg-[#FEF9C3] text-[#EAB308]", relatedServices: 1 },
  { id: "5", name: "Category 5", categoryStyle: "bg-[#FCE7F3] text-[#EC4899]", relatedServices: 1 },
  { id: "6", name: "Category 6", categoryStyle: "bg-[#F1F5F9] text-[#64748B]", relatedServices: 1 },
  { id: "7", name: "Category 1", categoryStyle: "bg-[#E0E7FF] text-[#635BFF]", relatedServices: 1 },
  { id: "8", name: "Category 2", categoryStyle: "bg-[#CCFBF1] text-[#14B8A6]", relatedServices: 1 },
  { id: "9", name: "Category 3", categoryStyle: "bg-[#DCFCE7] text-[#22C55E]", relatedServices: 1 },
  { id: "10", name: "Category 4", categoryStyle: "bg-[#FEF9C3] text-[#EAB308]", relatedServices: 1 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>(initialCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<any>(null);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddCategory = (data: any) => {
    const newCat = {
      id: String(categories.length + 1),
      ...data
    };
    setCategories([newCat, ...categories]);
  };

  const handleEditCategory = (data: any) => {
    if (activeCategory) {
      setCategories(categories.map(c => c.id === activeCategory.id ? { ...data } : c));
    }
  };

  const handleDeleteCategory = () => {
    if (activeCategory) {
      setCategories(categories.filter(c => c.id !== activeCategory.id));
      setIsDeleteModalOpen(false);
      setActiveCategory(null);
    }
  };

  const handleExportData = () => {
    const headers = ["Category Name", "Related Services"];
    const csvContent = [
      headers.join(","),
      ...categories.map(c => [`"${c.name}"`, `"${c.relatedServices}"`].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "categories_export.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Categories</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportData}
            className="w-full sm:w-auto justify-center bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors shadow-sm shadow-[#635BFF]/20 whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-1/3">Category</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-1/3">Related Services</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center w-1/3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category) => (
                <tr key={category.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${category.categoryStyle}`}>
                      {category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium border-r border-[#E2E8F0]">
                    {category.relatedServices}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => { setActiveCategory(category); setIsEditModalOpen(true); }}
                        className="text-[#64748B] hover:text-[#10B981] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setActiveCategory(category); setIsDeleteModalOpen(true); }}
                        className="text-[#64748B] hover:text-[#EF4444] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={categories.length}
          itemsPerPage={itemsPerPage}
          itemName="categories"
          onPageChange={setCurrentPage}
        />
      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCategory}
      />
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditCategory}
        initialData={activeCategory}
      />
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
      />
    </div>
  );
}

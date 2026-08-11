"use client";

import React, { useState } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  Download,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddCategoryModal from "@/components/saloonOwner/inventory/categories/AddCategoryModal";
import EditCategoryModal from "@/components/saloonOwner/inventory/categories/EditCategoryModal";
import DeleteCategoryModal from "@/components/saloonOwner/inventory/categories/DeleteCategoryModal";

interface Category {
  id: string;
  name: string;
  relatedProducts: number;
}

const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Category 1", relatedProducts: 1 },
  { id: "2", name: "Category 2", relatedProducts: 1 },
  { id: "3", name: "Category 3", relatedProducts: 1 },
  { id: "4", name: "Category 4", relatedProducts: 1 },
  { id: "5", name: "Category 5", relatedProducts: 1 },
  { id: "6", name: "Category 6", relatedProducts: 1 },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleAddCategory = (data: any) => {
    setCategories([data, ...categories]);
  };

  const handleEditCategory = (data: any) => {
    setCategories(categories.map(c => c.id === data.id ? data : c));
  };

  const handleDeleteCategory = () => {
    if (activeCategory) {
      setCategories(categories.filter(c => c.id !== activeCategory.id));
      setActiveCategory(null);
    }
    setIsDeleteModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  const getCategoryStyle = (name: string) => {
    switch (name) {
      case "Category 1": return "bg-[#E0E7FF] text-[#635BFF]";
      case "Category 2": return "bg-[#CCFBF1] text-[#0D9488]";
      case "Category 3": return "bg-[#DCFCE7] text-[#16A34A]";
      case "Category 4": return "bg-[#FEF3C7] text-[#D97706]";
      case "Category 5": return "bg-[#FFE4E6] text-[#F43F5E]";
      default: return "bg-transparent text-[#1E293B] font-medium";
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Categories</h1>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto justify-center bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Category</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Related Products</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] whitespace-nowrap w-[200px] text-center font-manrope">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className={`px-3 py-1.5 rounded-lg text-[12px] font-bold whitespace-nowrap inline-block ${getCategoryStyle(category.name)}`}>
                      {category.name}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px]">{category.relatedProducts}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/inventory/categories/${category.id}`)}
                        className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
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
          totalItems={totalItems}
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

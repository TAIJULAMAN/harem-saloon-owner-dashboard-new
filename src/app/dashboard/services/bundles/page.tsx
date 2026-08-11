"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/saloonOwner/common/Pagination";
import EditBundleModal from "@/components/saloonOwner/services/EditBundleModal";
import DeleteBundleModal from "@/components/saloonOwner/services/DeleteBundleModal";

type BundleRecord = {
  id: string;
  name: string;
  category: string;
  categoryStyle: string;
  relatedServices: number;
};

const initialBundles: BundleRecord[] = [
  { id: "1", name: "Bundle 1", category: "Category 1", categoryStyle: "bg-[#E0E7FF] text-[#635BFF]", relatedServices: 1 },
  { id: "2", name: "Bundle 2", category: "Category 2", categoryStyle: "bg-[#CCFBF1] text-[#14B8A6]", relatedServices: 1 },
  { id: "3", name: "Bundle 3", category: "Category 3", categoryStyle: "bg-[#DCFCE7] text-[#22C55E]", relatedServices: 1 },
  { id: "4", name: "Bundle 4", category: "Category 4", categoryStyle: "bg-[#FEF9C3] text-[#EAB308]", relatedServices: 1 },
  { id: "5", name: "Bundle 5", category: "Category 5", categoryStyle: "bg-[#FCE7F3] text-[#EC4899]", relatedServices: 1 },
  { id: "6", name: "Bundle 6", category: "Category 6", categoryStyle: "bg-[#F1F5F9] text-[#64748B]", relatedServices: 1 },
  { id: "7", name: "Bundle 7", category: "Category 3", categoryStyle: "bg-[#DCFCE7] text-[#22C55E]", relatedServices: 1 },
  { id: "8", name: "Bundle 8", category: "Category 4", categoryStyle: "bg-[#FEF9C3] text-[#EAB308]", relatedServices: 1 },
  { id: "9", name: "Bundle 9", category: "Category 5", categoryStyle: "bg-[#FCE7F3] text-[#EC4899]", relatedServices: 1 },
  { id: "10", name: "Bundle 10", category: "Category 1", categoryStyle: "bg-[#E0E7FF] text-[#635BFF]", relatedServices: 1 },
];

export default function BundlesPage() {
  const router = useRouter();
  const [bundles, setBundles] = useState<BundleRecord[]>(initialBundles);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeBundle, setActiveBundle] = useState<any>(null);

  const totalPages = Math.ceil(bundles.length / itemsPerPage);
  const paginatedBundles = bundles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEditBundle = (data: any) => {
    if (activeBundle) {
      setBundles(bundles.map(b => b.id === activeBundle.id ? { ...data } : b));
    }
  };

  const handleDeleteBundle = () => {
    if (activeBundle) {
      setBundles(bundles.filter(b => b.id !== activeBundle.id));
      setIsDeleteModalOpen(false);
      setActiveBundle(null);
    }
  };

  const handleExportData = () => {
    const headers = ["Bundle Name", "Category", "Related Services"];
    const csvContent = [
      headers.join(","),
      ...bundles.map(b => [`"${b.name}"`, `"${b.category}"`, `"${b.relatedServices}"`].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bundles_export.csv");
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
        <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Bundles</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportData}
            className="w-full sm:w-auto justify-center bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <Link
            href="/dashboard/services/bundles/add"
            className="w-full sm:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors shadow-sm shadow-[#635BFF]/20 whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Bundle
          </Link>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Bundle Name</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Category</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Related Services</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBundles.map((bundle) => (
                <tr key={bundle.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 text-[13px] font-semibold text-[#1E293B] border-r border-[#E2E8F0]">
                    {bundle.name}
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${bundle.categoryStyle}`}>
                      {bundle.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium border-r border-[#E2E8F0]">
                    {bundle.relatedServices}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/services/bundles/${bundle.id}`)}
                        className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setActiveBundle(bundle); setIsEditModalOpen(true); }}
                        className="text-[#64748B] hover:text-[#10B981] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setActiveBundle(bundle); setIsDeleteModalOpen(true); }}
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
          totalItems={bundles.length}
          itemsPerPage={itemsPerPage}
          itemName="bundles"
          onPageChange={setCurrentPage}
        />
      </div>

      <EditBundleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditBundle}
        initialData={activeBundle}
      />
      <DeleteBundleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBundle}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { DownloadIcon } from "../overview/DownloadIcon";
import { AddPaymentMethodModal } from "./modals/AddPaymentMethodModal";
import { DeletePaymentMethodModal } from "./modals/DeletePaymentMethodModal";
import { EditPaymentMethodModal } from "./modals/EditPaymentMethodModal";
import { AttachReceiptsModal } from "../expenses/modals/AttachReceiptsModal";
import { PaymentMethodsList } from "./PaymentMethodsList";

export default function PaymentMethodsManagement() {
  const [exportOpen, setExportOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setExportOpen(false);
    const content = format === 'PDF' ? "PDF Export\n\nPayment Methods Data" : "Name,Account Type\nVisa,Credit Card\n";
    const blob = new Blob([content], { type: format === 'PDF' ? "text/plain" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment_methods_${format.toLowerCase()}.${format === 'PDF' ? 'txt' : 'csv'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAttach = (id: string) => {
    setSelectedMethodId(id);
    setIsAttachModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedMethodId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedMethodId(id);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-5 bg-white shrink-0 mb-5 rounded-lg">
        <h1 className="text-[16px] sm:text-xl font-bold text-[#1E293B]">Payment Methods Management</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#D6D9FF] transition-colors"
            >
              <DownloadIcon className="w-4 h-4" />
              Export Monthly Report
              <ChevronDown className="w-4 h-4" />
            </button>
            {exportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-2">
                <button
                  onClick={() => handleExport('PDF')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] text-sm font-medium"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleExport('Excel')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] text-sm font-medium"
                >
                  Excel
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#635BFF] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:bg-[#5249EC] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg overflow-hidden flex flex-col p-5">
        <PaymentMethodsList
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <AddPaymentMethodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={() => setIsAddModalOpen(false)}
      />

      <DeletePaymentMethodModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />

      <EditPaymentMethodModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={() => setIsEditModalOpen(false)}
        methodId={selectedMethodId}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  Plus,
  MoreVertical,
  Ban,
  Download,
  Printer
} from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddReceiptModal from "@/components/saloonOwner/financial/receipts/AddReceiptModal";
import ViewReceiptModal from "@/components/saloonOwner/financial/receipts/ViewReceiptModal";
import EditReceiptModal from "@/components/saloonOwner/financial/receipts/EditReceiptModal";
import DeleteReceiptModal from "@/components/saloonOwner/financial/receipts/DeleteReceiptModal";

interface Payment {
  id: string;
  date: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  method: "Cash" | "Card Terminal" | "Gift Card" | "Online Payment";
  status: "Issued" | "Draft" | "Canceled";
}

const MOCK_PAYMENTS: Payment[] = [
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Cash", status: "Issued" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Card Terminal", status: "Issued" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Gift Card", status: "Draft" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Online Payment", status: "Canceled" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Online Payment", status: "Canceled" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Cash", status: "Draft" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Gift Card", status: "Issued" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Card Terminal", status: "Issued" },
  { id: "#000", date: "5 Aug 2025, 12:30", clientName: "Maria Rodriguez", clientEmail: "maria@beautywellness.com", amount: 2300, method: "Card Terminal", status: "Issued" },
];

export default function ReceiptsPage() {
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activePayment, setActivePayment] = useState<Payment | null>(null);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  const handleAddPayment = (data: any) => {
    setPayments([data, ...payments]);
  };

  const handleEditPayment = (data: any) => {
    setPayments(payments.map(p => p.id === data.id ? data : p));
  };

  const handleDeletePayment = () => {
    if (activePayment) {
      setPayments(payments.filter(p => p.id !== activePayment.id));
      setActivePayment(null);
    }
    setIsDeleteModalOpen(false);
  };

  const [activeMethod, setActiveMethod] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filteredPayments = payments.filter((payment) => {
    return activeMethod === "All" || payment.method === activeMethod || (activeMethod === "Online P." && payment.method === "Online Payment");
  });

  const totalItems = filteredPayments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const getMethodStyle = (method: Payment["method"]) => {
    switch (method) {
      case "Cash": return "bg-[#DCFCE7] text-[#16A34A]";
      case "Card Terminal": return "bg-[#CCFBF1] text-[#0D9488]";
      case "Gift Card": return "bg-[#F3E8FF] text-[#9333EA]";
      case "Online Payment": return "bg-[#FEF3C7] text-[#D97706]";
    }
  };

  const getStatusStyle = (status: Payment["status"]) => {
    switch (status) {
      case "Issued": return "bg-[#635BFF] text-white";
      case "Draft": return "bg-[#FBBF24] text-white";
      case "Canceled": return "bg-[#F43F5E] text-white";
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeMethod, itemsPerPage]);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header & Filters Box */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">

        {/* Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Receipts</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

            {/* Search Bar */}
            <div className="">
              <div className="relative max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Method Filter Select */}
            <div className="relative w-full sm:w-[150px]">
              <select
                value={activeMethod}
                onChange={(e) => setActiveMethod(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E2E8F0] text-[#475569] text-[13px] font-bold px-4 py-2.5 rounded-lg pr-10 outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
              >
                <option value="All">All Methods</option>
                <option value="Cash">Cash</option>
                <option value="Card Terminal">Card Terminal</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Online P.">Online P.</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Date Range Select */}
            <div className="relative w-full sm:w-[150px]">
              <select className="w-full appearance-none bg-white border border-[#E2E8F0] text-[#475569] text-[13px] font-bold px-4 py-2.5 rounded-lg pr-10 outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                <option value="All Time">All Time</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex justify-center items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Receipt
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
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">ID</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">Date</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">Client</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">Amount</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">Method</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">Status</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] text-center font-manrope">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedPayments.map((payment, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#635BFF] font-medium text-[13px]">{payment.id}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px]">{payment.date}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="font-bold text-[#1E293B] text-[13px]">{payment.clientName}</div>
                    <div className="text-[#94A3B8] text-[11px] font-medium mt-0.5">{payment.clientEmail}</div>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px]">€ {payment.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${getMethodStyle(payment.method)}`}>
                      {payment.method === "Gift Card" ? "Gif Card" : payment.method}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${getStatusStyle(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center relative">
                    <button
                      onClick={() => setOpenActionMenuId(openActionMenuId === payment.id + i ? null : payment.id + i)}
                      className="text-[#1E293B] hover:bg-[#F1F5F9] p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openActionMenuId === payment.id + i && (
                      <div className="absolute right-10 top-10 bg-white border border-[#E2E8F0] shadow-lg rounded-lg py-2 w-44 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <button
                          onClick={() => { setActivePayment(payment); setIsViewModalOpen(true); setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4 text-[#635BFF]" />
                          View Receipt
                        </button>
                        <button
                          onClick={() => { setActivePayment(payment); setIsEditModalOpen(true); setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4 text-[#0EA5E9]" />
                          Edit
                        </button>
                        <button
                          onClick={() => { setActivePayment(payment); setIsDeleteModalOpen(true); setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-2"
                        >
                          <Ban className="w-4 h-4 text-[#EF4444]" />
                          Cancel
                        </button>
                        <button
                          onClick={() => { setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-2"
                        >
                          <Download className="w-4 h-4 text-[#635BFF]" />
                          Download
                        </button>
                        <button
                          onClick={() => { setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-2"
                        >
                          <Printer className="w-4 h-4 text-[#94A3B8]" />
                          Print Receipt
                        </button>
                      </div>
                    )}
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
          itemName="receipts"
          onPageChange={setCurrentPage}
        />
      </div>

      <AddReceiptModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddPayment}
      />
      <ViewReceiptModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        receiptData={activePayment}
      />
      <EditReceiptModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditPayment}
        initialData={activePayment}
      />
      <DeleteReceiptModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePayment}
      />
    </div>
  );
}

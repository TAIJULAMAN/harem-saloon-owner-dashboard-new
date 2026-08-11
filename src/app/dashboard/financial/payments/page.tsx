"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Edit2,
  Trash2,
  Download,
  Plus,
  MoreVertical,
  RefreshCcw,
  Printer,
  Upload
} from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddPaymentModal from "@/components/saloonOwner/financial/payments/AddPaymentModal";
import EditPaymentModal from "@/components/saloonOwner/financial/payments/EditPaymentModal";
import DeletePaymentModal from "@/components/saloonOwner/financial/payments/DeletePaymentModal";
import RefundModal from "@/components/saloonOwner/financial/payments/RefundModal";
import CancelReceiptModal from "@/components/saloonOwner/financial/payments/CancelReceiptModal";
import PrintReceiptModal from "@/components/saloonOwner/financial/payments/PrintReceiptModal";
import ServiceReceiptModal from "@/components/saloonOwner/financial/payments/receipt/ServiceReceiptModal";
import { financialStatCardsData } from "./data";
import ExpenseBreakdownChart from "@/components/saloonOwner/dashboard/Charts/ExpenseBreakdownChart";
import RevenueVsExpensesChart from "@/components/saloonOwner/dashboard/Charts/RevenueVsExpensesChart";
import PaymentMethodsChart from "@/components/saloonOwner/dashboard/Charts/PaymentMethodsChart";

interface Payment {
  id: string;
  date: string;
  client: { name: string; email: string };
  teamMember: { name: string; email: string };
  method: "Cash" | "Card Terminal" | "Gift Card" | "Online Payment";
  status: "Fully Paid" | "Half Paid" | "Not Paid";
  receiptStatus: "Completed" | "Half Printed" | "Not Issued";
}

const MOCK_PAYMENTS: Payment[] = [
  { id: "000", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Cash", status: "Fully Paid", receiptStatus: "Completed" },
  { id: "001", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptStatus: "Not Issued" },
  { id: "002", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Gift Card", status: "Half Paid", receiptStatus: "Half Printed" },
  { id: "003", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Online Payment", status: "Not Paid", receiptStatus: "Not Issued" },
  { id: "004", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Online Payment", status: "Not Paid", receiptStatus: "Not Issued" },
  { id: "005", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Cash", status: "Half Paid", receiptStatus: "Half Printed" },
  { id: "006", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Gift Card", status: "Fully Paid", receiptStatus: "Completed" },
  { id: "007", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptStatus: "Completed" },
  { id: "008", date: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptStatus: "Completed" },
];

export default function PaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isCancelReceiptModalOpen, setIsCancelReceiptModalOpen] = useState(false);
  const [isPrintReceiptModalOpen, setIsPrintReceiptModalOpen] = useState(false);
  const [isServiceReceiptOpen, setIsServiceReceiptOpen] = useState(false);
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
  const [activePaymentStatus, setActivePaymentStatus] = useState("All");
  const [activeReceiptStatus, setActiveReceiptStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredPayments = payments.filter((payment) => {
    const matchesMethod = activeMethod === "All" || payment.method === activeMethod || (activeMethod === "Online P." && payment.method === "Online Payment");
    const matchesPaymentStatus = activePaymentStatus === "All" || payment.status === activePaymentStatus;
    const matchesReceiptStatus = activeReceiptStatus === "All" || payment.receiptStatus === activeReceiptStatus || (activeReceiptStatus === "Half Completed" && payment.receiptStatus === "Half Printed");
    return matchesMethod && matchesPaymentStatus && matchesReceiptStatus;
  });

  const totalItems = filteredPayments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeMethod, activePaymentStatus, activeReceiptStatus, itemsPerPage]);

  const getMethodStyle = (method: Payment["method"]) => {
    switch (method) {
      case "Cash": return "bg-[#DCFCE7] text-[#16A34A]";
      case "Card Terminal": return "bg-[#CCFBF1] text-[#0D9488]";
      case "Gift Card": return "bg-[#E0E7FF] text-[#635BFF]"; // Light blue/purple
      case "Online Payment": return "bg-[#FEF3C7] text-[#D97706]";
    }
  };

  const getStatusStyle = (status: Payment["status"]) => {
    switch (status) {
      case "Fully Paid": return "bg-[#22C55E] text-white";
      case "Half Paid": return "bg-[#FBBF24] text-white";
      case "Not Paid": return "bg-[#F43F5E] text-white";
    }
  };

  const getReceiptStatusStyle = (status: Payment["receiptStatus"]) => {
    switch (status) {
      case "Completed": return "border border-[#22C55E] text-[#22C55E] bg-white";
      case "Half Printed": return "border border-[#FBBF24] text-[#FBBF24] bg-white";
      case "Not Issued": return "border border-[#F43F5E] text-[#F43F5E] bg-white";
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header & Filters Box */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-[#E2E8F0] space-y-8">

        {/* Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Payments</h1>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            <select
              value={activeMethod}
              onChange={(e) => setActiveMethod(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#475569] outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <option value="All">All Methods</option>
              <option value="Cash">Cash</option>
              <option value="Card Terminal">Card Terminal</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Online P.">Online Payment</option>
            </select>
            <select
              value={activePaymentStatus}
              onChange={(e) => setActivePaymentStatus(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#475569] outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <option value="All">All Payment Status</option>
              <option value="Fully Paid">Fully Paid</option>
              <option value="Half Paid">Half Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
            <select
              value={activeReceiptStatus}
              onChange={(e) => setActiveReceiptStatus(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#475569] outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <option value="All">All Receipt Status</option>
              <option value="Completed">Completed</option>
              <option value="Half Completed">Half Printed</option>
              <option value="Not Issued">Not Issued</option>
            </select>
            <button
              onClick={() => router.push("/dashboard/financial/payments/automations")}
              className="w-full md:w-auto justify-center bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              Set Automations
            </button>
            <button
              onClick={() => router.push("/dashboard/financial/payments/import")}
              className="w-full md:w-auto justify-center bg-white border border-[#635BFF] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap hover:bg-[#F1F5F9]"
            >
              Import Receipts
            </button>
            <button className="w-full md:w-auto justify-center bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Payment
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className="mb-8 mt-2">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">Analytics Overview</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {financialStatCardsData.map((card) => (
            <div key={card.id} className={`p-6 rounded-lg border border-[#E2E8F0] shadow-sm relative overflow-hidden ${card.cardStyle}`}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBgColor} ${card.iconShadowColor}`}>
                  {card.icon}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#64748B] text-[13px] font-semibold mb-1">{card.title}</h3>
                <div className="flex items-end gap-3">
                  <span className="text-[#1E293B] text-[24px] font-bold">{card.value}</span>
                </div>
                {card.change && (
                  <div className="text-[11px] font-bold text-[#10B981] mt-2">
                    {card.change}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
          <div className="xl:col-span-1"><ExpenseBreakdownChart /></div>
          <div className="xl:col-span-1"><PaymentMethodsChart /></div>
          <div className="xl:col-span-1"><RevenueVsExpensesChart /></div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">ID</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Payment Date</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Client</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Team Member</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Method</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Status</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Receipt Issue</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] text-center whitespace-nowrap font-manrope">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedPayments.map((payment, i) => (
                <tr key={payment.id + i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#635BFF] font-medium text-[13px]">{payment.id}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px] whitespace-nowrap">{payment.date}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="font-bold text-[#1E293B] text-[13px] whitespace-nowrap">{payment.client.name}</div>
                    <div className="text-[#94A3B8] text-[11px] font-medium mt-0.5 whitespace-nowrap">{payment.client.email}</div>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="font-bold text-[#1E293B] text-[13px] whitespace-nowrap">{payment.teamMember.name}</div>
                    <div className="text-[#94A3B8] text-[11px] font-medium mt-0.5 whitespace-nowrap">{payment.teamMember.email}</div>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${getMethodStyle(payment.method)}`}>
                        {payment.method === "Gift Card" ? "Gif Card" : payment.method}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${getStatusStyle(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${getReceiptStatusStyle(payment.receiptStatus)}`}>
                        {payment.receiptStatus}
                      </span>
                      {payment.receiptStatus === "Not Issued" && (
                        <button className="bg-[#C4B5FD] hover:bg-[#A78BFA] text-white px-3 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap">
                          Issue Receipt
                        </button>
                      )}
                    </div>
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
                        <Link
                          href={`/dashboard/financial/payments/${payment.id}`}
                          onClick={(e) => {
                            setOpenActionMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-3"
                        >
                          <Eye className="w-4 h-4 text-[#635BFF]" />
                          View Details
                        </Link>
                        <button
                          onClick={() => { setActivePayment(payment); setIsRefundModalOpen(true); setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-3"
                        >
                          <RefreshCcw className="w-4 h-4 text-[#FBBF24]" />
                          Refund
                        </button>
                        <button
                          onClick={() => { setActivePayment(payment); setIsPrintReceiptModalOpen(true); setOpenActionMenuId(null); }}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-3"
                        >
                          <Printer className="w-4 h-4 text-[#64748B]" />
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
          itemName="payments"
          onPageChange={setCurrentPage}
        />
      </div>

      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddPayment}
      />
      <EditPaymentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={activePayment}
        onSave={handleEditPayment}
      />
      <DeletePaymentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePayment}
      />

      {/* New Modals */}
      <RefundModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        payment={activePayment}
        onIssueRefund={() => {
          setIsRefundModalOpen(false);
          // Only show cancel receipt if it was issued
          if (activePayment?.receiptStatus === "Completed" || activePayment?.receiptStatus === "Half Printed") {
            setIsCancelReceiptModalOpen(true);
          }
        }}
      />

      <CancelReceiptModal
        isOpen={isCancelReceiptModalOpen}
        onClose={() => setIsCancelReceiptModalOpen(false)}
        onConfirm={() => {
          setIsCancelReceiptModalOpen(false);
          // Actual cancellation logic would go here
        }}
      />

      <PrintReceiptModal
        isOpen={isPrintReceiptModalOpen}
        onClose={() => setIsPrintReceiptModalOpen(false)}
        status={activePayment?.status === "Fully Paid" ? "received" : "not_received"}
        onPrint={() => {
          setIsPrintReceiptModalOpen(false);
          setIsServiceReceiptOpen(true);
        }}
      />

      <ServiceReceiptModal
        isOpen={isServiceReceiptOpen}
        onClose={() => setIsServiceReceiptOpen(false)}
        receiptData={activePayment}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";

type SalaryRecord = {
  id: string;
  name: string;
  uploader: string;
  avatarBg: string;
  avatarUrl: string;
  role: string;
  netAmount: string;
  month?: string; // Optional since approved table doesn't have it
  date: string;
  status: "pending" | "paid" | "Approved";
  grossSalary?: string;
  netSalary?: string;
  trfMonthly?: string;
  cumulativeTrf?: string;
  iban?: string;
};

const mockDetails = {
  grossSalary: "€ 3,200.00",
  netSalary: "€ 2,600.00",
  trfMonthly: "€ 600.00",
  cumulativeTrf: "€ 3,800.00",
  iban: "IT60 X054 ******** 123"
};

const initialPendingSalaries: SalaryRecord[] = [
  {
    id: "1",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FCE7F3]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=fce7f3",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#E0E7FF]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2&backgroundColor=e0e7ff",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#DCFCE7]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria3&backgroundColor=dcfce7",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FEE2E2]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria4&backgroundColor=fee2e2",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "5",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FEF9C3]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria5&backgroundColor=fef9c3",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
];

const initialApprovedSalaries: SalaryRecord[] = [
  {
    id: "6",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FCE7F3]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria6&backgroundColor=fce7f3",
    role: "Staff",
    netAmount: "€ 3,200.00",
    date: "Dec 01, 2024",
    status: "Approved",
  },
];

const mockHistoryData: SalaryRecord[] = [
  {
    id: "h1",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FCE7F3]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=fce7f3",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "h2",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#E0E7FF]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2&backgroundColor=e0e7ff",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "h3",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#DCFCE7]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria3&backgroundColor=dcfce7",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "h4",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FEE2E2]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria4&backgroundColor=fee2e2",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
  {
    id: "h5",
    name: "Maria Rodriguez",
    uploader: "Mario Rossi",
    avatarBg: "bg-[#FEF9C3]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria5&backgroundColor=fef9c3",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "pending",
    ...mockDetails
  },
];


export default function SalariesPage() {
  const [activeTab, setActiveTab] = useState("Pending Approval");
  const [pendingSalaries, setPendingSalaries] = useState<SalaryRecord[]>(initialPendingSalaries);
  const [approvedSalaries, setApprovedSalaries] = useState<SalaryRecord[]>(initialApprovedSalaries);

  // Expandable rows state
  const [expandedRows, setExpandedRows] = useState<string[]>(["1", "h1"]);

  // Revolut Payment Modal Workflow State (0: closed, 1: confirm, 2: 2fa, 3: processing, 4: success)
  const [paymentWorkflowStep, setPaymentWorkflowStep] = useState<0 | 1 | 2 | 3 | 4>(0);

  const toggleRow = (id: string) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#FEF9C3] text-[#EAB308]"; // Under Review
      case "paid":
        return "bg-[#86EFAC] text-[#16A34A]";
      case "Approved":
        return "bg-[#22C55E] text-white";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Under Review";
      case "Approved": return "Approved";
      default: return status;
    }
  };

  const handleApprove = (id: string) => {
    const record = pendingSalaries.find((s) => s.id === id);
    if (record) {
      setPendingSalaries(pendingSalaries.filter((s) => s.id !== id));
      setApprovedSalaries([...approvedSalaries, { ...record, status: "Approved", month: undefined }]);
    }
  };

  const handleReject = (id: string) => {
    setPendingSalaries(pendingSalaries.filter((s) => s.id !== id));
  };

  // Handle auto-advance for processing state
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentWorkflowStep === 3) {
      timer = setTimeout(() => {
        setPaymentWorkflowStep(4);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [paymentWorkflowStep]);


  // Helper component for expanded row content
  const ExpandedRowDetails = ({ record }: { record: SalaryRecord }) => (
    <div className="flex items-center justify-between pl-[84px] pr-[150px] py-4 bg-white border-x border-[#E2E8F0]">
      <div className="flex items-center gap-12">
        <div>
          <div className="text-[10px] text-[#94A3B8] font-bold mb-1 uppercase tracking-wider">Gross Salary</div>
          <div className="text-[13px] font-bold text-[#1E293B]">{record.grossSalary}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#94A3B8] font-bold mb-1 uppercase tracking-wider">Net Salary</div>
          <div className="text-[13px] font-bold text-[#1E293B]">{record.netSalary}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#94A3B8] font-bold mb-1 uppercase tracking-wider">TRF (Monthly)</div>
          <div className="text-[13px] font-bold text-[#1E293B]">{record.trfMonthly}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#94A3B8] font-bold mb-1 uppercase tracking-wider">Cumulative TRF</div>
          <div className="text-[13px] font-bold text-[#1E293B]">{record.cumulativeTrf}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#94A3B8] font-bold mb-1 uppercase tracking-wider">IBAN</div>
          <div className="text-[13px] font-bold text-[#1E293B]">{record.iban}</div>
        </div>
      </div>
      <button className="bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-[#C7D2FE] transition-colors flex items-center gap-2">
        <Eye className="w-4 h-4" />
        View Payslip
      </button>
    </div>
  );

  return (
    <div className="w-full space-y-6 pb-12 relative">

      {/* Top Header & Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Salaries</h1>
            <button className="w-full sm:w-auto justify-center bg-[#E0E7FF] hover:bg-[#C7D2FE] text-[#635BFF] px-6 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 border-b border-[#E2E8F0] overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("Pending Approval")}
              className={`pb-4 text-[13px] font-bold transition-colors relative whitespace-nowrap shrink-0 ${activeTab === "Pending Approval" ? "text-[#635BFF]" : "text-[#64748B] hover:text-[#1E293B]"
                }`}
            >
              Pending Approval (5)
              {activeTab === "Pending Approval" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("Payment History")}
              className={`pb-4 text-[13px] font-bold transition-colors relative whitespace-nowrap shrink-0 ${activeTab === "Payment History" ? "text-[#635BFF]" : "text-[#64748B] hover:text-[#1E293B]"
                }`}
            >
              Payment History (10)
              {activeTab === "Payment History" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Pending Approval Tab --- */}
      {activeTab === "Pending Approval" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Pending Review Table */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <h2 className="text-[15px] font-bold text-[#1E293B]">Pending Review</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full sm:w-64 pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-[13px] outline-none focus:border-[#635BFF] transition-colors bg-white"
                  />
                </div>
                <button className="w-full sm:w-auto justify-center bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#F43F5E] px-4 py-2 rounded-lg font-bold text-[13px] transition-colors shrink-0">
                  Reapproval All (5)
                </button>
                <button className="w-full sm:w-auto justify-center bg-[#14B8A6] hover:bg-[#0D9488] text-white px-4 py-2 rounded-lg font-bold text-[13px] transition-colors shrink-0">
                  Approval All (5)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-[#F8F9FE] border-y border-[#E2E8F0]">
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Team Member</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Role</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Net Amount</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Month</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Date</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Status</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSalaries.map((salary) => (
                    <React.Fragment key={salary.id}>
                      <tr className={`border-b border-[#E2E8F0] transition-colors ${expandedRows.includes(salary.id) ? "bg-[#F8F9FE]" : "hover:bg-[#F8FAFC]"}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${salary.avatarBg}`}>
                              <img src={salary.avatarUrl} alt={salary.name} className="w-10 h-10 object-cover mix-blend-multiply" />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{salary.name}</div>
                              <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">Uploaded by: {salary.uploader}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEF9C3] text-[#EAB308]">
                            {salary.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium">{salary.netAmount}</td>
                        <td className="px-6 py-4 text-[13px] text-[#475569]">{salary.month}</td>
                        <td className="px-6 py-4 text-[13px] text-[#475569]">{salary.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(salary.status)}`}>
                            {getStatusText(salary.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => toggleRow(salary.id)} className="text-[#635BFF] hover:bg-[#E0E7FF] p-1.5 rounded-lg transition-colors">
                              {expandedRows.includes(salary.id) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                            <button
                              onClick={() => handleApprove(salary.id)}
                              className="w-8 h-8 rounded-lg bg-[#CCFBF1] hover:bg-[#99F6E4] text-[#0D9488] flex items-center justify-center transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(salary.id)}
                              className="w-8 h-8 rounded-lg bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#F43F5E] flex items-center justify-center transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRows.includes(salary.id) && (
                        <tr>
                          <td colSpan={7} className="p-0 border-b border-[#E2E8F0]">
                            <ExpandedRowDetails record={salary} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between border border-[#E2E8F0]">
              <span className="text-[14px] font-bold text-[#1E293B]">Total Amount</span>
              <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[13px] font-bold">
                € 16,000.00
              </span>
            </div>
          </div>

          {/* Approved and Ready for Payment Table */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <h2 className="text-[15px] font-bold text-[#1E293B] mb-6">Approved and Ready for Payment</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#F8F9FE] border-y border-[#E2E8F0]">
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Team Member</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Role</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Net Amount</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Date</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Status</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedSalaries.map((salary) => (
                    <tr key={salary.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${salary.avatarBg}`}>
                            <img src={salary.avatarUrl} alt={salary.name} className="w-10 h-10 object-cover mix-blend-multiply" />
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{salary.name}</div>
                            <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">Uploaded by: {salary.uploader}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEF9C3] text-[#EAB308]">
                          {salary.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium">{salary.netAmount}</td>
                      <td className="px-6 py-4 text-[13px] text-[#475569]">{salary.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(salary.status)}`}>
                          {getStatusText(salary.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => toggleRow(salary.id)} className="text-[#635BFF] hover:bg-[#E0E7FF] p-1.5 rounded-lg transition-colors">
                            {expandedRows.includes(salary.id) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => setPaymentWorkflowStep(1)}
                            className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-4 py-1.5 rounded-lg text-[12px] font-bold transition-colors"
                          >
                            Pay Now
                          </button>
                          <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-1.5 rounded-lg text-[12px] font-bold transition-colors">
                            Mark as Paid
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between border border-[#E2E8F0]">
              <span className="text-[14px] font-bold text-[#1E293B]">Total Amount</span>
              <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[13px] font-bold">
                € 3,200.00
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --- Payment History Tab --- */}
      {activeTab === "Payment History" && (
        <div className="space-y-6 animate-in fade-in duration-300">

          {["December 2024", "November 2024"].map((monthSection) => (
            <div key={monthSection} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E2E8F0]">
                <h2 className="text-[16px] font-bold text-[#635BFF]">{monthSection}</h2>
                <div className="text-right mt-2 sm:mt-0">
                  <div className="text-[15px] font-bold text-[#1E293B]">€ 16,000.00</div>
                  <div className="text-[12px] font-medium text-[#94A3B8]">5 Payments</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1100px]">
                  <thead>
                    <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">December 2024</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Role</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Net Amount</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Month</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Date</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope">Status</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockHistoryData.map((salary, idx) => {
                      const uid = `${monthSection}-${salary.id}`;
                      return (
                        <React.Fragment key={uid}>
                          <tr className={`border-b border-[#E2E8F0] transition-colors ${expandedRows.includes(uid) ? "bg-[#F8F9FE]" : "hover:bg-[#F8FAFC]"}`}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${salary.avatarBg}`}>
                                  <img src={salary.avatarUrl} alt={salary.name} className="w-10 h-10 object-cover mix-blend-multiply" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{salary.name}</div>
                                  <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">Uploaded by: {salary.uploader}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEF9C3] text-[#EAB308]">
                                {salary.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium">{salary.netAmount}</td>
                            <td className="px-6 py-4 text-[13px] text-[#475569]">{salary.month}</td>
                            <td className="px-6 py-4 text-[13px] text-[#475569]">{salary.date}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(salary.status)}`}>
                                {getStatusText(salary.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-4">
                                <button onClick={() => toggleRow(uid)} className="text-[#635BFF] hover:bg-[#E0E7FF] p-1.5 rounded-lg transition-colors">
                                  {expandedRows.includes(uid) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                                <button className="border border-[#E0E7FF] text-[#635BFF] px-4 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#E0E7FF] transition-colors flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  View Payslip
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedRows.includes(uid) && (
                            <tr>
                              <td colSpan={7} className="p-0 border-b border-[#E2E8F0]">
                                <ExpandedRowDetails record={salary} />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F8FAFC] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-[#1E293B]">Month Total</span>
                  <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[13px] font-bold">€ 16,000.00</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-[#1E293B]">Average Salary</span>
                  <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[13px] font-bold">€ 16,000.00</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* --- Salary Payment Modals Workflow --- */}

      {paymentWorkflowStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPaymentWorkflowStep(0)}></div>

          {/* Step 1: Confirm Payment */}
          {paymentWorkflowStep === 1 && (
            <div className="bg-white rounded-lg w-full max-w-[550px] p-0 relative z-10 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-[#1E293B]">Salary Payment</h2>
                <button onClick={() => setPaymentWorkflowStep(0)} className="text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 pb-4">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 bg-[#E0E7FF] rounded-full flex items-center justify-center text-[#635BFF] mb-4">
                    <ShieldAlert className="w-7 h-7" /> {/* Re-using Shield as bank icon proxy */}
                  </div>
                  <h3 className="text-[18px] font-bold text-[#1E293B] mb-2">Confirm Payment to Staff (1)</h3>
                  <p className="text-[13px] text-[#94A3B8]">
                    You are about to process payments for 1 staff member totaling <span className="font-bold text-[#1E293B]">€ 3,200.00</span>.
                  </p>
                </div>

                <div className="bg-[#F8F9FE] border border-[#E0E7FF] rounded-lg p-5 mb-6">
                  <div className="text-[14px] font-bold text-[#635BFF] mb-4">Revolut Business</div>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Account ending in</div>
                      <div className="text-[13px] font-bold text-[#1E293B]">...8902</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Available Balance</div>
                      <div className="text-[13px] font-bold text-[#1E293B]">€ 45,000.00</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Amount to Pay</div>
                      <div className="text-[13px] font-bold text-[#1E293B]">€ 3,200.00</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Estimated Fees</div>
                      <div className="text-[13px] font-bold text-[#1E293B]">€ 2.50</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[13px] font-bold text-[#1E293B] mb-4">Payment Details</h4>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-[#FCE7F3]">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=fce7f3" alt="Maria Rodriguez" className="w-10 h-10 object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#1E293B]">Maria Rodriguez</div>
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF9C3] text-[#EAB308] mt-1">Staff</span>
                      </div>
                    </div>
                    <div className="text-[16px] font-bold text-[#1E293B]">€ 3,200.00</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#94A3B8]">TRF: <span className="font-medium text-[#1E293B]">€ 600.00</span></span>
                      <span className="text-[#94A3B8]">Net Salary: <span className="font-medium text-[#1E293B]">€ 2,600.00</span></span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#94A3B8]">Taxes: <span className="font-medium text-[#1E293B]">€ 400.00</span></span>
                      <span className="text-[#94A3B8]">Gross Salary: <span className="font-medium text-[#1E293B]">€ 3,200.00</span></span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFBEB] border border-[#FEF08A] rounded-lg p-4 flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#FDE68A] text-[#D97706] flex items-center justify-center shrink-0">
                    <span className="font-bold text-[12px]">!</span>
                  </div>
                  <p className="text-[12px] text-[#D97706] font-medium leading-relaxed">
                    <span className="font-bold">Warning — </span> This action is irreversible. Funds will be transferred immediately.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-[#E2E8F0] flex items-center justify-end gap-3 mt-2">
                <button
                  onClick={() => setPaymentWorkflowStep(0)}
                  className="bg-[#F8FAFC] text-[#1E293B] text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setPaymentWorkflowStep(2)}
                  className="bg-[#635BFF] text-white text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 2FA Verification */}
          {paymentWorkflowStep === 2 && (
            <div className="bg-white rounded-lg w-full max-w-[450px] p-0 relative z-10 shadow-2xl flex flex-col animate-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-[#1E293B]">Salary Payment</h2>
                <button onClick={() => setPaymentWorkflowStep(0)} className="text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[14px] text-[#64748B] mb-6 leading-relaxed">
                  Enter the 6-digit code sent to your Revolut Business app to authorize this payment.
                </p>

                <div className="text-center mb-8">
                  <div className="text-[32px] font-bold text-[#1E293B]">€ 3,200.00</div>
                </div>

                <div className="mb-8">
                  <label className="block text-[12px] font-bold text-[#1E293B] mb-4 text-center">Two-Factor Auth Code (2FA)</label>
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-10 h-12 sm:w-12 sm:h-14 border border-[#E2E8F0] rounded-lg text-center text-[20px] sm:text-[24px] font-bold text-[#1E293B] focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#E0E7FF] transition-all bg-white"
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setPaymentWorkflowStep(3)}
                  className="w-full bg-[#635BFF] text-white text-[14px] font-bold py-3.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm mb-4"
                >
                  Verify & Process Payment
                </button>

                <div className="text-center">
                  <span className="text-[13px] text-[#94A3B8]">Didn't get the code? <button className="text-[#635BFF] font-bold hover:underline">Resend</button></span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {paymentWorkflowStep === 3 && (
            <div className="bg-white rounded-lg w-full max-w-[500px] p-8 relative z-10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-[#E0E7FF] rounded-full flex items-center justify-center text-[#635BFF] mb-6 relative">
                  <ShieldAlert className="w-8 h-8" />
                  <div className="absolute inset-0 rounded-full border-4 border-[#635BFF] border-t-transparent animate-spin"></div>
                </div>
                <h2 className="text-[20px] font-bold text-[#1E293B] mb-3">Processing Payments...</h2>
                <p className="text-[14px] text-[#94A3B8]">
                  Please wait while we securely process these transactions...
                </p>
              </div>

              <div className="bg-[#F8F9FE] border border-[#E0E7FF] rounded-lg p-5 mb-6 text-center">
                <p className="text-[13px] text-[#635BFF] font-medium mb-1">Processing payments through Revolut API...</p>
                <p className="text-[12px] text-[#94A3B8]">Do not close this window.</p>
              </div>

              <div className="border border-[#E2E8F0] rounded-lg p-4 mb-6 flex items-center justify-between bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-[#FCE7F3]">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=fce7f3" alt="Maria Rodriguez" className="w-10 h-10 object-cover mix-blend-multiply" />
                  </div>
                  <div className="text-[14px] font-bold text-[#1E293B]">Maria Rodriguez</div>
                </div>
                <div className="flex items-center gap-2 text-[#3B82F6]">
                  <div className="w-4 h-4 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin"></div>
                  <span className="text-[13px] font-bold">Processing...</span>
                </div>
              </div>

              <div className="bg-[#FFFBEB] border border-[#FEF08A] rounded-lg p-4 flex gap-4">
                <div className="w-5 h-5 rounded-full bg-[#FDE68A] text-[#D97706] flex items-center justify-center shrink-0">
                  <span className="font-bold text-[12px]">!</span>
                </div>
                <p className="text-[12px] text-[#D97706] font-medium">
                  Do not close this window or navigate away until the process is complete.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {paymentWorkflowStep === 4 && (
            <div className="bg-white rounded-lg w-full max-w-[550px] p-8 relative z-10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-[#E2F7F5] rounded-full flex items-center justify-center text-[#14B8A6] mb-6">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={3} />
                </div>
                <h2 className="text-[22px] font-bold text-[#1E293B] mb-2">Payment Processing Complete</h2>
                <p className="text-[14px] text-[#94A3B8]">
                  All transactions have been successfully processed and recorded.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#DCFCE7] border border-[#BBF7D0] rounded-lg p-5 relative overflow-hidden">
                  <div className="text-[12px] font-bold text-[#16A34A] mb-1">Total Successfully Paid</div>
                  <div className="text-[24px] font-bold text-[#16A34A] mb-2">1</div>
                  <div className="text-[13px] font-medium text-[#16A34A]">€ 3,200.00</div>
                  <CheckCircle2 className="absolute -right-4 -bottom-4 w-24 h-24 text-[#BBF7D0] opacity-50" />
                </div>
                <div className="bg-[#FFE4E6] border border-[#FECDD3] rounded-lg p-5 relative overflow-hidden">
                  <div className="text-[12px] font-bold text-[#E11D48] mb-1">Failed Payments</div>
                  <div className="text-[24px] font-bold text-[#E11D48] mb-2">0</div>
                  <div className="text-[13px] font-medium text-[#E11D48]">€ 0.00</div>
                  <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-[#FECDD3] opacity-50" />
                </div>
              </div>

              <div className="border border-[#E2E8F0] rounded-lg p-4 mb-8 bg-white shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-[#FCE7F3]">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=fce7f3" alt="Maria Rodriguez" className="w-10 h-10 object-cover mix-blend-multiply" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1E293B]">Maria Rodriguez</div>
                    <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">...8902</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#10B981]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[13px] font-bold">Paid Successfully</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPaymentWorkflowStep(0)}
                  className="w-full bg-[#E0E7FF] text-[#635BFF] text-[14px] font-bold py-3.5 rounded-lg hover:bg-[#C7D2FE] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

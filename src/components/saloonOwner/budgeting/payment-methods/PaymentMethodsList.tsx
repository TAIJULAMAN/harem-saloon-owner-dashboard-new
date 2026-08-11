"use client";

import React from "react";
import { CreditCard, Banknote, Building2, Landmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionMenu } from "../expenses/ActionMenu";
import { ExpensePill } from "../expenses/ExpensePill";
import { MOCK_PAYMENT_METHODS } from "../data";

const iconMap: Record<string, React.ReactNode> = {
  "Credit Card": <CreditCard className="w-5 h-5 text-[#2CC8D6]" />,
  "Cash": <Banknote className="w-5 h-5 text-[#22C55E]" />,
  "Direct debit": <Landmark className="w-5 h-5 text-[#635BFF]" />,
  "Bank transfer": <Building2 className="w-5 h-5 text-[#F5B800]" />
};

const iconBgMap: Record<string, string> = {
  "Credit Card": "bg-[#E0F9FB]",
  "Cash": "bg-[#DCFCE7]",
  "Direct debit": "bg-[#E0E7FF]",
  "Bank transfer": "bg-[#FEF3C7]" // fixed yellow bg
};

const pillColorMap: Record<string, any> = {
  "Credit Card": "cyan",
  "Cash": "green",
  "Direct debit": "blue", // Use blue instead of purple as per design color #635BFF
  "Bank transfer": "yellow"
};

interface PaymentMethodsListProps {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function PaymentMethodsList({ onDelete, onEdit }: PaymentMethodsListProps) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto custom-scrollbar h-full">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <th className="p-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Name</th>
            <th className="p-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Account Type</th>
            <th className="p-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Initial Value</th>
            <th className="p-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider text-center sticky right-0 bg-[#F8FAFC] shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)] z-10">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F1F5F9]">
          {MOCK_PAYMENT_METHODS.map((method) => (
            <tr key={method.id} className="hover:bg-[#F8FAFC] transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBgMap[method.accountType] || "bg-gray-100"}`}>
                    {iconMap[method.accountType]}
                  </div>
                  <span className="text-[13px] font-medium text-[#1E293B]">{method.name}</span>
                </div>
              </td>
              <td className="p-4">
                <ExpensePill text={method.accountType} colorType={pillColorMap[method.accountType] || "default"} variant="soft" />
              </td>
              <td className="p-4 text-[13px] font-medium text-[#64748B]">
                {method.initialValue}
              </td>
              <td className="p-4 text-center sticky right-0 bg-white group-hover:bg-[#F8FAFC] shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.02)] transition-colors">
                <div className="flex justify-center relative">
                  <ActionMenu
                    onView={() => router.push(`/dashboard/budgeting/payment-methods/${method.id}`)}
                    onEdit={() => onEdit(method.id)}
                    onDelete={() => onDelete(method.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
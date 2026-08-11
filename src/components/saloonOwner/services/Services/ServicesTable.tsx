"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Eye, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import { ServiceRecord } from "@/components/saloonOwner/services/Services/data";

interface ServicesTableProps {
  paginatedServices: ServiceRecord[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setActiveService: (service: ServiceRecord) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export default function ServicesTable({
  paginatedServices,
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  setActiveService,
  setIsEditModalOpen,
  setIsDeleteModalOpen
}: ServicesTableProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Name</th>
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Category</th>
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Default Duration</th>
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Post-break Min</th>
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Price</th>
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">VAT</th>
              <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServices.map((service) => (
              <tr key={service.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0">
                      <Image width={40} height={40} src="/icons/scissors.svg" alt="Service" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#1E293B]">{service.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${service.categoryStyle}`}>
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <div className="flex items-center gap-2 text-[13px] text-[#1E293B] font-medium">
                    <Clock className="w-4 h-4 text-[#64748B]" />
                    {service.duration}
                  </div>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <div className="flex items-center gap-2 text-[13px] text-[#1E293B] font-medium">
                    <Clock className="w-4 h-4 text-[#64748B]" />
                    {service.postBreak}
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium border-r border-[#E2E8F0]">
                  {service.price}
                </td>
                <td className="px-6 py-4 text-[13px] text-[#1E293B] font-medium border-r border-[#E2E8F0]">
                  {service.vat}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/services/${service.id}`)}
                      title="View"
                      className="w-[38px] h-8 flex items-center justify-center rounded-lg bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] transition-colors"
                    >
                      <Eye className="w-[18px] h-[18px]" />
                    </button>
                    <button
                      onClick={() => { setActiveService(service); setIsEditModalOpen(true); }}
                      className="w-[38px] h-8 flex items-center justify-center rounded-lg bg-[#F0FDFA] text-[#14B8A6] hover:bg-[#CCFBF1] transition-colors"
                    >
                      <Edit2 className="w-[18px] h-[18px]" />
                    </button>
                    <button
                      onClick={() => { setActiveService(service); setIsDeleteModalOpen(true); }}
                      className="w-[38px] h-8 flex items-center justify-center rounded-lg bg-[#FFF1F2] text-[#F43F5E] hover:bg-[#FFE4E6] transition-colors"
                    >
                      <Trash2 className="w-[18px] h-[18px]" />
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
        itemName="services"
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

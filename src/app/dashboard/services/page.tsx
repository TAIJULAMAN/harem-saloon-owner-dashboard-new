"use client";

import React, { useState } from "react";
import { Eye, Scissors, Wind, Brush, Droplets, Sparkles, Smile, Bath, Paintbrush, Pipette, Star, Heart, Syringe, Crown, Flame, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import EditServiceModal from "@/components/saloonOwner/services/EditServiceModal";
import DeleteServiceModal from "@/components/saloonOwner/services/DeleteServiceModal";
import TopHeader from "@/components/saloonOwner/services/Services/TopHeader";
import ServicesTable from "@/components/saloonOwner/services/Services/ServicesTable";

import { ServiceRecord, categoryStyles, initialServices } from "@/components/saloonOwner/services/Services/data";
import { serviceStatCardsData } from "./data";
import RevenueByCategoryChart from "@/components/saloonOwner/dashboard/Charts/RevenueByCategoryChart";
import ServiceTrendsChart from "@/components/saloonOwner/dashboard/Charts/ServiceTrendsChart";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceRecord[]>(initialServices);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceRecord | null>(null);

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter(service => service.category === activeCategory);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEditService = (data: any) => {
    if (activeService) {
      setServices(services.map(s => s.id === activeService.id ? { ...data, categoryStyle: categoryStyles[data.category] || categoryStyles["Category 1"] } : s));
    }
  };

  const handleDeleteService = () => {
    if (activeService) {
      setServices(services.filter(s => s.id !== activeService.id));
      setIsDeleteModalOpen(false);
      setActiveService(null);
    }
  };

  const handleExportServices = () => {
    const headers = ["Name", "Category", "Default Duration", "Post-break Min", "Price", "VAT"];
    const csvContent = [
      headers.join(","),
      ...services.map(service =>
        [
          `"${service.name}"`,
          `"${service.category}"`,
          `"${service.duration}"`,
          `"${service.postBreak}"`,
          `"${service.price}"`,
          `"${service.vat}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "services_export.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      <TopHeader
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onExport={handleExportServices}
      />

      {/* Analytics Overview Section */}
      <div className="mb-8">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">Analytics Overview</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {serviceStatCardsData.map((card) => (
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-8">
          <RevenueByCategoryChart />
          <ServiceTrendsChart />
        </div>
      </div>

      <ServicesTable
        paginatedServices={paginatedServices}
        totalItems={filteredServices.length}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setActiveService={setActiveService}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditService}
        initialData={activeService}
      />
      <DeleteServiceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteService}
      />
    </div>
  );
}

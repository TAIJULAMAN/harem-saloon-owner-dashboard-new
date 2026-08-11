"use client";

import Link from "next/link";

import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
  Clock,
  MoreVertical,
  Send,
  Users,
  UserCog,
  Download,
} from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddWaiverModal from "@/components/saloonOwner/waivers/AddWaiverModal";
import ViewWaiverModal from "@/components/saloonOwner/waivers/ViewWaiverModal";
import EditWaiverModal from "@/components/saloonOwner/waivers/EditWaiverModal";
import DeleteWaiverModal from "@/components/saloonOwner/waivers/DeleteWaiverModal";
import SignNowSendToModal from "@/components/saloonOwner/waivers/SignNowSendToModal";
import AssignWaiverModal from "@/components/saloonOwner/waivers/AssignWaiverModal";

interface Waiver {
  id: string;
  name: string;
  signers: number;
  signedCount: string;
  lastUpdate: string;
}

const MOCK_WAIVERS: Waiver[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `Waiver ${i + 1}`,
  signers: 2,
  signedCount: "30 times",
  lastUpdate: "1h ago",
}));

export default function WaiversPage() {
  const [waiversData, setWaiversData] = useState<Waiver[]>(MOCK_WAIVERS);
  const [activeTab, setActiveTab] = useState("Waiver Templates");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.action-menu-container')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSignNowOpen, setIsSignNowOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isAssignEmployeeOpen, setIsAssignEmployeeOpen] = useState(false);

  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);

  const totalItems = waiversData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWaivers = waiversData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, itemsPerPage]);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleOpenEdit = (waiver: Waiver) => {
    setSelectedWaiver(waiver);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (waiver: Waiver) => {
    setSelectedWaiver(waiver);
    setIsDeleteOpen(true);
  };

  const handleOpenSignNow = (waiver: Waiver) => {
    setSelectedWaiver(waiver);
    setIsSignNowOpen(true);
  };

  const handleOpenAssign = (waiver: Waiver) => {
    setSelectedWaiver(waiver);
    setIsAssignOpen(true);
  };

  const handleOpenAssignEmployee = (waiver: Waiver) => {
    setSelectedWaiver(waiver);
    setIsAssignEmployeeOpen(true);
  };

  const handleAddWaiver = (newWaiverData: any) => {
    const newWaiver: Waiver = {
      id: Math.random().toString(36).substr(2, 9),
      name: newWaiverData.name,
      signers: newWaiverData.signers,
      signedCount: newWaiverData.signedCount,
      lastUpdate: newWaiverData.lastUpdate,
    };
    setWaiversData([newWaiver, ...waiversData]);
  };

  const handleEditWaiver = (updatedWaiverData: any) => {
    setWaiversData(waiversData.map(w => w.id === updatedWaiverData.id ? updatedWaiverData : w));
  };

  const handleDeleteWaiver = () => {
    if (!selectedWaiver) return;
    setWaiversData(waiversData.filter(w => w.id !== selectedWaiver.id));
    setIsDeleteOpen(false);
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Waivers</h1>
          <Link
            href="/dashboard/waivers/add"
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Waiver
          </Link>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 px-2">
        {["Waiver Templates", "Waiver Signed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${activeTab === tab
              ? "border border-[#635BFF] text-[#635BFF] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              : "text-[#64748B] hover:text-[#1E293B]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-visible">

        {/* Table */}
        <div className="overflow-x-auto min-h-[450px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="py-5 px-6 text-[14px] font-bold text-[#1E293B] whitespace-nowrap">Name</th>
                <th className="py-5 px-6 text-[14px] font-bold text-[#1E293B] whitespace-nowrap">Signers</th>
                <th className="py-5 px-6 text-[14px] font-bold text-[#1E293B] whitespace-nowrap">Signed</th>
                <th className="py-5 px-6 text-[14px] font-bold text-[#1E293B] whitespace-nowrap">Last Update</th>
                <th className="py-5 px-6 text-[14px] font-bold text-[#1E293B] text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedWaivers.map((waiver) => (
                <tr key={waiver.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#635BFF]" />
                      </div>
                      <span className="text-[#1E293B] font-bold text-[14px]">{waiver.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#475569] font-medium text-[14px]">{waiver.signers}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#475569] font-medium text-[14px]">{waiver.signedCount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#475569] font-medium text-[14px]">{waiver.lastUpdate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center relative action-menu-container">
                    <button
                      onClick={() => toggleMenu(waiver.id)}
                      className="text-[#64748B] hover:text-[#1E293B] transition-colors p-2 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === waiver.id && (
                      <div className="absolute right-10 top-12 w-[240px] bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#E2E8F0] py-2 z-50 text-left">
                        <Link
                          href={`/dashboard/waivers/${waiver.id}`}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                        >
                          <Eye className="w-[18px] h-[18px] text-[#635BFF]" />
                          View
                        </Link>
                        <button
                          onClick={() => { handleOpenEdit(waiver); setOpenMenuId(null); }}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                        >
                          <Edit className="w-[18px] h-[18px] text-[#635BFF]" />
                          Edit
                        </button>
                        <button
                          onClick={() => { handleOpenSignNow(waiver); setOpenMenuId(null); }}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                        >
                          <Send className="w-[18px] h-[18px] text-[#10B981]" />
                          Sign Now/Send To
                        </button>
                        <button
                          onClick={() => { handleOpenAssign(waiver); setOpenMenuId(null); }}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                        >
                          <Users className="w-[18px] h-[18px] text-[#10B981]" />
                          Assign to Client's Profiles
                        </button>
                        <button
                          onClick={() => { handleOpenAssignEmployee(waiver); setOpenMenuId(null); }}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                        >
                          <UserCog className="w-[18px] h-[18px] text-[#64748B]" />
                          Assign to Employee
                        </button>
                        <button
                          onClick={() => setOpenMenuId(null)}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                        >
                          <Download className="w-[18px] h-[18px] text-[#64748B]" />
                          Download
                        </button>
                        <button
                          onClick={() => { handleOpenDelete(waiver); setOpenMenuId(null); }}
                          className="w-full px-5 py-2.5 text-[14px] font-medium text-[#EF4444] hover:bg-red-50 flex items-center gap-3 transition-colors"
                        >
                          <Trash2 className="w-[18px] h-[18px] text-[#EF4444]" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {waiversData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={waiversData.length}
            itemsPerPage={itemsPerPage}
            itemName="waivers"
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* --- Modals --- */}
      <AddWaiverModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddWaiver}
      />

      <ViewWaiverModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        waiver={selectedWaiver}
      />

      <EditWaiverModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        waiver={selectedWaiver}
        onSave={handleEditWaiver}
      />

      <DeleteWaiverModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        waiver={selectedWaiver}
        onConfirm={handleDeleteWaiver}
      />

      <SignNowSendToModal
        isOpen={isSignNowOpen}
        onClose={() => setIsSignNowOpen(false)}
        waiver={selectedWaiver}
      />

      <AssignWaiverModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        waiver={selectedWaiver}
        assignType="clients"
      />

      <AssignWaiverModal
        isOpen={isAssignEmployeeOpen}
        onClose={() => setIsAssignEmployeeOpen(false)}
        waiver={selectedWaiver}
        assignType="employees"
      />
    </div>
  );
}

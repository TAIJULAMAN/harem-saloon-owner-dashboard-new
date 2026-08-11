"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Plus, Clock, Eye, Trash2, Edit, Search, Download, MoreVertical, Calendar, Key, PauseCircle } from "lucide-react";

import Pagination from "@/components/saloonOwner/common/Pagination";
import AddEmployeeModal from "@/components/saloonOwner/team/AddEmployeeModal";
import DeleteMemberModal from "@/components/saloonOwner/team/DeleteMemberModal";
import AddTimeOffModal from "@/components/saloonOwner/team/AddTimeOffModal";

import { teamStatCardsData } from "./data";
import TopPerformersChart from "@/components/saloonOwner/dashboard/Charts/TopPerformersChart";
import LaborCostChart from "@/components/saloonOwner/dashboard/Charts/LaborCostChart";

import { MemberData, initialMembers } from "@/components/saloonOwner/team/team";

export default function MembersPage() {
  const [membersData, setMembersData] = useState<MemberData[]>(initialMembers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | string | null>(null);

  React.useEffect(() => {
    const handleClick = () => setOpenActionMenuId(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedContractType, setSelectedContractType] = useState("");

  const handleEditClick = (member: MemberData) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (member: MemberData) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedMember) {
      setMembersData(membersData.filter(m => m.id !== selectedMember.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedMember(null);
  };

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? member.role === selectedRole : true;
    const matchesContract = selectedContractType ? member.contractType === selectedContractType : true;
    return matchesSearch && matchesRole && matchesContract;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / itemsPerPage));
  const paginatedData = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getRoleBadge = (role: string) => {
    if (role === "Manager") return "bg-[#E0F7FA] text-[#00BCD4]";
    if (role === "Staff") return "bg-[#FFF9C4] text-[#FBC02D]";
    if (role === "Accountant") return "bg-[#F3E8FF] text-[#A855F7]";
    return "bg-gray-100 text-gray-500";
  };

  const getStatusBadge = (status: string) => {
    if (status === "Active") return "bg-[#22C55E] text-white";
    if (status === "Pending") return "bg-[#FACC15] text-white";
    if (status === "Inactive") return "bg-[#F43F5E] text-white";
    return "bg-gray-400 text-white";
  };

  const getEmploymentStatusBadge = (status: string) => {
    if (status.includes("Out of Team")) return "bg-[#FFE4E6] text-[#F43F5E]";
    return "bg-[#F1F5F9] text-[#475569]";
  };

  const getContractTypeBadge = (type: string) => {
    if (type === "Full Time") return "border-[#4ADE80] text-[#4ADE80]";
    if (type === "Part Time") return "border-[#A855F7] text-[#A855F7]";
    if (type === "Stage") return "border-[#F43F5E] text-[#F43F5E]";
    if (type === "Vat collaboration") return "border-[#FACC15] text-[#FACC15]";
    return "border-gray-400 text-gray-500";
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Members</h1>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <Link href="/dashboard/team/members/import" className="border border-[#635BFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#EEF2FF] transition-colors w-full sm:w-auto text-center">
            Import Members
          </Link>
          <button className="bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#D6DFFE] transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>

          <select
            value={selectedRole}
            onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-auto border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#64748B] bg-[#F8FAFC]"
          >
            <option value="">All Roles</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
            <option value="Accountant">Accountant</option>
          </select>

          <select
            value={selectedContractType}
            onChange={(e) => { setSelectedContractType(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-auto border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#64748B] bg-[#F8FAFC]"
          >
            <option value="">All Contract Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Stage">Stage</option>
            <option value="Vat collaboration">Vat collaboration</option>
          </select>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 shrink-0" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className="mb-8">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">Analytics Overview</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {teamStatCardsData.map((card) => (
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
          <TopPerformersChart />
          <LaborCostChart />
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Name</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Role</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Status</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Employment Status</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Contract Type</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Last Active</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((member) => (
                <tr key={member.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  {/* Name Column */}
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${member.avatarBg}`}>
                        <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{member.name}</div>
                        <div className="text-[12px] text-[#94A3B8] font-medium mt-0.5">{member.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role Column */}
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getRoleBadge(member.role)}`}>
                      {member.role}
                    </span>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getStatusBadge(member.status)}`}>
                      {member.status}
                    </span>
                  </td>

                  {/* Employment Status Column */}
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${getEmploymentStatusBadge(member.employmentStatus)}`}>
                      {member.employmentStatus}
                    </span>
                  </td>

                  {/* Contract Type Column */}
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold border ${getContractTypeBadge(member.contractType)}`}>
                      {member.contractType}
                    </span>
                  </td>

                  {/* Last Active Column */}
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[#475569]">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[13px] font-medium">{member.lastActive}</span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-center">
                    <div className="relative flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionMenuId(openActionMenuId === member.id ? null : member.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#1E293B] transition-colors flex items-center justify-center"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openActionMenuId === member.id && (
                        <div
                          className="absolute right-1/2 translate-x-1/2 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link
                            href={`/dashboard/team/members/${member.id}`}
                            className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#635BFF] transition-colors"
                          >
                            <Eye className="w-4 h-4 text-[#635BFF]" />
                            View Details
                          </Link>

                          {member.status !== "Inactive" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMember(member);
                                setIsTimeOffModalOpen(true);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#635BFF] transition-colors text-left"
                            >
                              <Clock className="w-4 h-4 text-[#635BFF]" />
                              Add Time Off
                            </button>
                          )}

                          <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#10B981] transition-colors text-left">
                            <Calendar className="w-4 h-4 text-[#10B981]" />
                            View Calendar
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#64748B] transition-colors text-left">
                            <Key className="w-4 h-4 text-[#94A3B8]" />
                            Reset Password
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#FFF1F2] hover:text-[#F59E0B] transition-colors text-left">
                            <PauseCircle className="w-4 h-4 text-[#F59E0B]" />
                            Suspend
                          </button>

                          {member.status === "Inactive" && (
                            <button
                              onClick={() => handleDeleteClick(member)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#FFF1F2] hover:text-[#EF4444] transition-colors text-left"
                            >
                              <Trash2 className="w-4 h-4 text-[#FCA5A5]" />
                              Delete user
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredMembers.length}
            itemsPerPage={itemsPerPage}
            itemName="members"
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="p-8 text-center text-[#64748B] text-[14px]">
            No members found matching your filters.
          </div>
        )}
      </div>

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Edit Modal (reuses AddEmployeeModal) */}
      <AddEmployeeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        isEdit={true}
      />

      <DeleteMemberModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        memberName={selectedMember?.name}
      />

      <AddTimeOffModal
        isOpen={isTimeOffModalOpen}
        onClose={() => setIsTimeOffModalOpen(false)}
      />
    </div>
  );
}

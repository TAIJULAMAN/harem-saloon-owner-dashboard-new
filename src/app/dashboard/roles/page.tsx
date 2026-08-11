"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Eye, Edit, Trash2, MoreVertical, Pencil } from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import Modal from "@/components/saloonOwner/common/Modal";

interface RoleData {
  id: string;
  name: string;
  role: string;
  email: string;
  date: string;
  createdBy: string;
  creatorRole: string;
  avatarBg: string;
  avatarUrl: string;
  lastUpdate: string;
}

export default function RolesPage() {
  const initialRoles: RoleData[] = [
    {
      id: "1",
      name: "Shah Aman",
      role: "Owner",
      email: "aman@gmail.com",
      date: "05/05/2026",
      createdBy: "Maria Rodriguez",
      creatorRole: "Owner",
      avatarBg: "bg-[#FCE7F3]",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=ffdfbf",
      lastUpdate: "1 h ago"
    },
    {
      id: "2",
      name: "Shovon Ali",
      role: "Admin",
      email: "shovon@gmail.com",
      date: "05/05/2026",
      createdBy: "Maria Rodriguez",
      creatorRole: "Owner",
      avatarBg: "bg-[#E2E8F0]",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2&backgroundColor=c0aede",
      lastUpdate: "1 h ago"
    },
    {
      id: "3",
      name: "Tanvir Hasan",
      role: "Accountant",
      email: "tanvir@gmail.com",
      date: "05/05/2026",
      createdBy: "Maria Rodriguez",
      creatorRole: "Owner",
      avatarBg: "bg-[#CCFBF1]",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria3&backgroundColor=b6e3f4",
      lastUpdate: "1 h ago"
    },
    {
      id: "4",
      name: "MD Razu",
      role: "Admin",
      email: "razu@gmail.com",
      date: "05/05/2026",
      createdBy: "Maria Rodriguez",
      creatorRole: "Owner",
      avatarBg: "bg-[#FEE2E2]",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria4&backgroundColor=ffdfbf",
      lastUpdate: "1 h ago"
    }
  ];
  const [rolesData, setRolesData] = useState<RoleData[]>(initialRoles);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest('.action-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });

  const handleOpenEdit = (role: RoleData) => {
    setSelectedRole(role);
    setFormData({ name: role.name, email: role.email, password: "", role: role.role });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (role: RoleData) => {
    setSelectedRole(role);
    setIsDeleteOpen(true);
  };

  const handleEditRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setRolesData(rolesData.map(role =>
      role.id === selectedRole.id ? { ...role, name: formData.name, role: formData.role, email: formData.email, lastUpdate: "Just now" } : role
    ));
    setIsEditOpen(false);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;
    setRolesData(rolesData.filter(role => role.id !== selectedRole.id));
    setIsDeleteOpen(false);
  };

  // Pagination calculation
  const totalPages = Math.ceil(rolesData.length / itemsPerPage);
  const paginatedData = rolesData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-5 flex justify-between items-center">
        <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Roles</h1>
        <Link href="/dashboard/roles/create">
          <button
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-sm font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] last:border-r-0 w-[20%]">Name</th>
                <th className="px-6 py-5 text-sm font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] last:border-r-0 w-[15%]">Role</th>
                <th className="px-6 py-5 text-sm font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] last:border-r-0 w-[20%]">Email</th>
                <th className="px-6 py-5 text-sm font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] last:border-r-0 w-[15%]">Date</th>
                <th className="px-6 py-5 text-sm font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] last:border-r-0 w-[20%]">Created by</th>
                <th className="px-6 py-5 text-sm font-bold text-[#1E293B] font-manrope text-center w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? paginatedData.map((role) => (
                <tr key={role.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 border-r border-[#E2E8F0] last:border-r-0">
                    <span className="text-[13px] font-semibold text-[#1E293B]">{role.name}</span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] last:border-r-0">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#475569]">{role.role}</span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] last:border-r-0">
                    <span className="text-[13px] font-semibold text-[#1E293B]">{role.email}</span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] last:border-r-0 text-[13px] text-[#64748B] font-medium">
                    {role.date}
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] last:border-r-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${role.avatarBg}`}>
                        <img src={role.avatarUrl} alt={role.createdBy} className="w-8 h-8 object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{role.createdBy}</div>
                        <div className="text-[12px] text-[#94A3B8] font-medium mt-0.5">{role.creatorRole}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <div className="relative action-dropdown-container">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === role.id ? null : role.id);
                          }}
                          className="text-[#1E293B] hover:bg-[#F1F5F9] transition-colors p-2 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeDropdown === role.id && (
                          <div
                            className="absolute right-0 top-full mt-1 z-[60] w-36 bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-[#E2E8F0] py-2 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link href={`/dashboard/roles/${role.id}`} className="block w-full">
                              <button
                                onClick={() => setActiveDropdown(null)}
                                className="w-full px-4 py-2.5 text-left text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-[#635BFF]" />
                                View
                              </button>
                            </Link>
                            <button
                              onClick={() => { handleOpenEdit(role); setActiveDropdown(null); }}
                              className="w-full px-4 py-2.5 text-left text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                            >
                              <Pencil className="w-4 h-4 text-[#635BFF]" />
                              Edit
                            </button>
                            <button
                              onClick={() => { handleOpenDelete(role); setActiveDropdown(null); }}
                              className="w-full px-4 py-2.5 text-left text-[14px] font-medium text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-[#F43F5E]" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[13px] font-medium text-[#94A3B8]">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {rolesData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={rolesData.length}
            itemsPerPage={itemsPerPage}
            itemName="roles"
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* --- Modals --- */}

      {/* Edit Role Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Role">
        <form onSubmit={handleEditRole} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1E293B]">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1E293B]">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1E293B]">Role</label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all bg-white cursor-pointer appearance-none"
            >
              <option value="">Select Role</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="Accountant">Accountant</option>
            </select>
          </div>
          <div className="pt-2 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setIsEditOpen(false)} className="px-5 py-2.5 text-sm font-bold text-[#64748B] hover:text-[#1E293B] bg-transparent hover:bg-[#F1F5F9] rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors shadow-sm shadow-[#10B981]/20">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Role Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Role">
        {selectedRole && (
          <div className="space-y-4 text-center pb-2">
            <h3 className="text-xl font-bold text-[#1E293B] font-manrope">Are you absolutely sure?</h3>
            <p className="text-[13px] text-[#64748B] px-2 font-medium leading-relaxed">
              This action cannot be undone. This will permanently delete the role assignment for <span className="font-bold text-[#1E293B]">{selectedRole.name}</span> from the system.
            </p>
            <div className="pt-6 flex items-center justify-center gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteRole} className="px-6 py-2.5 text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] shadow-sm shadow-[#EF4444]/20 rounded-lg transition-colors">
                Yes, Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

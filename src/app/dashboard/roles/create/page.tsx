"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

export default function CreateRolePage() {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
  });

  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    manageSalonProfile: true,
    manageSubscription: true,
    manageRoles: true,
    viewAuditLog: true,
    viewTeamCalendars: true,
    viewAllCalendars: true,
    createAppointments: true,
    editOwnAppointments: true,
    editOthersAppointments: true,
    approveRejectBookings: true,
    overrideConflicts: true,
    blockTime: true,
    manageShiftScheduling: true,
    configureServiceDurations: true,
    exportCalendar: true,
    viewClientNotes: true,
  });

  const togglePermission = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full space-y-6 pb-10">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/roles" className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Create Role</h1>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold text-[#64748B]">
          <Home className="w-3.5 h-3.5" />
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#635BFF] bg-[#EEF2FF] px-2 py-0.5 rounded-lg">Roles</span>
        </div>
      </div>

      {/* Basic Details */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 space-y-6">
        <h2 className="text-[15px] font-bold text-[#1E293B] font-manrope">Basic Details</h2>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#1E293B]">Role Name *</label>
          <input
            type="text"
            placeholder="Enter role name"
            value={formData.roleName}
            onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
            className="w-full max-w-xl border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all placeholder:text-[#94A3B8]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#1E293B]">Description (Optional)</label>
          <textarea
            placeholder="Enter a description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all placeholder:text-[#94A3B8] resize-y"
          />
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 space-y-6">
        <h2 className="text-[15px] font-bold text-[#1E293B] font-manrope">Permissions</h2>

        {/* Tenant & Users */}
        <div className="border border-[#E2E8F0] rounded-lg p-5 space-y-5">
          <h3 className="text-[14px] font-bold text-[#1E293B] font-manrope">Tenant & Users</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <PermissionItem
              title="Manage salon profile"
              subtitle="Branding, name, header and business info"
              checked={permissions.manageSalonProfile}
              onChange={() => togglePermission('manageSalonProfile')}
            />
            <PermissionItem
              title="Manage subscription & feature toggles"
              subtitle="Allow subscription & feature toggles"
              checked={permissions.manageSubscription}
              onChange={() => togglePermission('manageSubscription')}
            />
            <PermissionItem
              title="Manage roles & member invites"
              subtitle="Add/remove users, set permissions"
              checked={permissions.manageRoles}
              onChange={() => togglePermission('manageRoles')}
            />
            <PermissionItem
              title="View audit log / user operation history"
              checked={permissions.viewAuditLog}
              onChange={() => togglePermission('viewAuditLog')}
            />
          </div>
        </div>

        {/* Calendar & Bookings */}
        <div className="border border-[#E2E8F0] rounded-lg p-5 space-y-5">
          <h3 className="text-[14px] font-bold text-[#1E293B] font-manrope">Calendar & Bookings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <PermissionItem
              title="View team calendars (same salon)"
              checked={permissions.viewTeamCalendars}
              onChange={() => togglePermission('viewTeamCalendars')}
            />
            <PermissionItem
              title="View all salon calendars (incl. private slots)"
              checked={permissions.viewAllCalendars}
              onChange={() => togglePermission('viewAllCalendars')}
            />
            <PermissionItem
              title="Create appointments"
              checked={permissions.createAppointments}
              onChange={() => togglePermission('createAppointments')}
            />
            <PermissionItem
              title="Edit appointments (own)"
              checked={permissions.editOwnAppointments}
              onChange={() => togglePermission('editOwnAppointments')}
            />
            <PermissionItem
              title="Edit appointments (others)"
              checked={permissions.editOthersAppointments}
              onChange={() => togglePermission('editOthersAppointments')}
            />
            <PermissionItem
              title="Approve/reject client self-bookings"
              checked={permissions.approveRejectBookings}
              onChange={() => togglePermission('approveRejectBookings')}
            />
            <PermissionItem
              title="Override conflicts/overbook"
              checked={permissions.overrideConflicts}
              onChange={() => togglePermission('overrideConflicts')}
            />
            <PermissionItem
              title="Block time / set breaks"
              checked={permissions.blockTime}
              onChange={() => togglePermission('blockTime')}
            />
            <PermissionItem
              title="Manage shift scheduling & rotations"
              subtitle="(recurring, Saturday rotation rules)"
              checked={permissions.manageShiftScheduling}
              onChange={() => togglePermission('manageShiftScheduling')}
            />
            <PermissionItem
              title="Configure service durations & availability logic"
              checked={permissions.configureServiceDurations}
              onChange={() => togglePermission('configureServiceDurations')}
            />
            <PermissionItem
              title="Export calendar / sync"
              checked={permissions.exportCalendar}
              onChange={() => togglePermission('exportCalendar')}
            />
            <PermissionItem
              title="View client notes from calendar"
              checked={permissions.viewClientNotes}
              onChange={() => togglePermission('viewClientNotes')}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <Link href="/dashboard/roles">
            <button type="button" className="px-6 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors">
              Cancel
            </button>
          </Link>
          <button type="button" className="px-6 py-2.5 text-[13px] font-bold text-white bg-[#635BFF] hover:bg-[#524be0] rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function PermissionItem({ title, subtitle, checked, onChange }: { title: string, subtitle?: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-[13px] font-bold text-[#1E293B] leading-snug">{title}</div>
        {subtitle && <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5 leading-snug">{subtitle}</div>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-opacity-75 ${checked ? 'bg-[#7C3AED] bg-opacity-70' : 'bg-[#E2E8F0]'
          }`}
      >
        <span
          className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${checked ? 'translate-x-[18px]' : 'translate-x-[2px]'
            }`}
        />
      </button>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Home, Eye, Pencil } from "lucide-react";

export default function ViewRolePage() {
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

  const users = [
    { id: 1, name: "Maria Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=ffdfbf" },
    { id: 2, name: "Maria Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2&backgroundColor=c0aede" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/roles" className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Owner</h1>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#635BFF] text-white text-[11px] font-bold">2</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold text-[#64748B]">
          <Home className="w-3.5 h-3.5" />
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#635BFF] bg-[#EEF2FF] px-2 py-0.5 rounded-lg">Roles</span>
        </div>
      </div>

      {/* Basic Details */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 flex flex-col gap-6">
        <h2 className="text-[15px] font-bold text-[#1E293B] font-manrope">Basic Details</h2>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-[12px] font-medium text-[#94A3B8]">Name</div>
            <div className="text-[14px] font-bold text-[#1E293B]">Audience 02</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-[12px] font-medium text-[#94A3B8]">Type of Membership</div>
            <div className="text-[14px] font-medium text-[#1E293B] leading-relaxed max-w-4xl">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
          </div>
        </div>
      </div>

      {/* Users Assigned */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 flex flex-col gap-6">
        <h2 className="text-[15px] font-bold text-[#1E293B] font-manrope">Users Assigned</h2>

        <div className="flex flex-wrap gap-4">
          {users.map((user, i) => (
            <div key={user.id} className="flex items-center justify-between gap-4 p-3 pr-4 border border-[#E2E8F0] rounded-lg bg-white min-w-[320px] flex-1 max-w-[400px]">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${i === 0 ? 'bg-[#FCE7F3]' : 'bg-[#CCFBF1]'}`}>
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 object-cover mix-blend-multiply" />
                </div>
                <span className="text-[14px] font-bold text-[#1E293B]">{user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F0F9FF] text-[#0EA5E9] hover:bg-[#E0F2FE] transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 flex flex-col gap-6">
        <h2 className="text-[15px] font-bold text-[#1E293B] font-manrope">Permissions</h2>

        {/* Tenant & Users */}
        <div className="border border-[#E2E8F0] rounded-lg p-5 flex flex-col gap-5">
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
        <div className="border border-[#E2E8F0] rounded-lg p-5 flex flex-col gap-5">
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
      <div className="flex flex-col gap-0.5">
        <div className="text-[13px] font-bold text-[#1E293B] leading-snug">{title}</div>
        {subtitle && <div className="text-[11px] text-[#94A3B8] font-medium leading-snug">{subtitle}</div>}
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

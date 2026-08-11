"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function PermissionsTab() {
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);

  // State for toggles
  const [tenantPermissions, setTenantPermissions] = useState({
    manageSalonProfile: true,
    manageSubscription: true,
    manageRoles: true,
    viewAuditLog: true,
  });

  const [bookingPermissions, setBookingPermissions] = useState({
    viewTeamCalendars: true,
    editAppointmentsOwn: true,
    overrideConflicts: true,
    configureServiceDurations: true,
    viewAllSalonCalendars: true,
    editAppointmentsOthers: true,
    blockTime: true,
    exportCalendar: true,
    createAppointments: true,
    approveRejectBookings: true,
    manageShiftScheduling: true,
    viewClientNotes: true,
  });

  // Custom Toggle Component to match new design (light purple bg, dark purple thumb when active)
  const Toggle = ({
    checked,
    onChange
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#E0E7FF]' : 'bg-[#E2E8F0]'
        }`}
    >
      <span
        className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded shadow-sm ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-[16px] bg-[#635BFF]' : 'translate-x-0 bg-white'
          }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-[#E2E8F0] pb-4">
        <h2 className="text-[18px] font-bold text-[#1E293B]">Permissions</h2>
        <button className="bg-[#E0E7FF] text-[#635BFF] px-4 py-1.5 rounded-lg text-[13px] font-bold hover:bg-[#C7D2FE] transition-colors">
          Role: Staff
        </button>
      </div>

      {/* Tenant & Users Section */}
      <div className="mb-6 bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-[15px] font-bold text-[#1E293B] mb-6">Tenant & Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
          {/* Item 1 */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">Manage salon profile</div>
              <div className="text-[11px] font-medium text-[#94A3B8]">Branding name header and business info</div>
            </div>
            <Toggle
              checked={tenantPermissions.manageSalonProfile}
              onChange={() => setTenantPermissions({ ...tenantPermissions, manageSalonProfile: !tenantPermissions.manageSalonProfile })}
            />
          </div>
          {/* Item 2 */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">Manage subscription & feature toggles</div>
              <div className="text-[11px] font-medium text-[#94A3B8]">Allow subscription & feature toggles</div>
            </div>
            <Toggle
              checked={tenantPermissions.manageSubscription}
              onChange={() => setTenantPermissions({ ...tenantPermissions, manageSubscription: !tenantPermissions.manageSubscription })}
            />
          </div>
          {/* Item 3 */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">Manage roles & member invites</div>
              <div className="text-[11px] font-medium text-[#94A3B8]">Add/remove users, set permissions</div>
            </div>
            <Toggle
              checked={tenantPermissions.manageRoles}
              onChange={() => setTenantPermissions({ ...tenantPermissions, manageRoles: !tenantPermissions.manageRoles })}
            />
          </div>
          {/* Item 4 */}
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">View audit log / user operation history</div>
            <Toggle
              checked={tenantPermissions.viewAuditLog}
              onChange={() => setTenantPermissions({ ...tenantPermissions, viewAuditLog: !tenantPermissions.viewAuditLog })}
            />
          </div>
        </div>
      </div>

      {/* Calendar & Bookings Section */}
      <div className="mb-8 bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-[15px] font-bold text-[#1E293B] mb-6">Calendar & Bookings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">

          {/* Column 1 items */}
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">View team calendars (same salon)</div>
            <Toggle checked={bookingPermissions.viewTeamCalendars} onChange={() => setBookingPermissions({ ...bookingPermissions, viewTeamCalendars: !bookingPermissions.viewTeamCalendars })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Edit appointments (onw)</div>
            <Toggle checked={bookingPermissions.editAppointmentsOwn} onChange={() => setBookingPermissions({ ...bookingPermissions, editAppointmentsOwn: !bookingPermissions.editAppointmentsOwn })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Override conflicts/overbook</div>
            <Toggle checked={bookingPermissions.overrideConflicts} onChange={() => setBookingPermissions({ ...bookingPermissions, overrideConflicts: !bookingPermissions.overrideConflicts })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Configure service durations & availability logic</div>
            <Toggle checked={bookingPermissions.configureServiceDurations} onChange={() => setBookingPermissions({ ...bookingPermissions, configureServiceDurations: !bookingPermissions.configureServiceDurations })} />
          </div>

          {/* Column 2 items */}
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">View all salon calendars (incl. private slots)</div>
            <Toggle checked={bookingPermissions.viewAllSalonCalendars} onChange={() => setBookingPermissions({ ...bookingPermissions, viewAllSalonCalendars: !bookingPermissions.viewAllSalonCalendars })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Edit appointments (others)</div>
            <Toggle checked={bookingPermissions.editAppointmentsOthers} onChange={() => setBookingPermissions({ ...bookingPermissions, editAppointmentsOthers: !bookingPermissions.editAppointmentsOthers })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Block time / set breaks</div>
            <Toggle checked={bookingPermissions.blockTime} onChange={() => setBookingPermissions({ ...bookingPermissions, blockTime: !bookingPermissions.blockTime })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Export calendar / sync</div>
            <Toggle checked={bookingPermissions.exportCalendar} onChange={() => setBookingPermissions({ ...bookingPermissions, exportCalendar: !bookingPermissions.exportCalendar })} />
          </div>

          {/* Column 3 items */}
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Create appointments</div>
            <Toggle checked={bookingPermissions.createAppointments} onChange={() => setBookingPermissions({ ...bookingPermissions, createAppointments: !bookingPermissions.createAppointments })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Approve/reject client self-bookings</div>
            <Toggle checked={bookingPermissions.approveRejectBookings} onChange={() => setBookingPermissions({ ...bookingPermissions, approveRejectBookings: !bookingPermissions.approveRejectBookings })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">Manage shift scheduling & rotations (recurring. Saturday rotation rules)</div>
            <Toggle checked={bookingPermissions.manageShiftScheduling} onChange={() => setBookingPermissions({ ...bookingPermissions, manageShiftScheduling: !bookingPermissions.manageShiftScheduling })} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-[13px] font-bold text-[#1E293B]">View client notes from calendar</div>
            <Toggle checked={bookingPermissions.viewClientNotes} onChange={() => setBookingPermissions({ ...bookingPermissions, viewClientNotes: !bookingPermissions.viewClientNotes })} />
          </div>

        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#E2E8F0] pt-6 gap-4 sm:gap-0">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => setIsChangeRoleModalOpen(true)}
            className="flex-1 sm:flex-none bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#C7D2FE] transition-colors text-center"
          >
            Change Role
          </button>
          <button className="flex-1 sm:flex-none bg-[#F8FAFC] text-[#64748B] px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#F1F5F9] transition-colors text-center">
            Reset
          </button>
        </div>
        <button className="w-full sm:w-auto bg-[#F8FAFC] text-[#CBD5E1] px-6 py-2 rounded-lg text-[13px] font-bold cursor-not-allowed text-center">
          Save Changes
        </button>
      </div>

      {/* Change Role Modal */}
      {isChangeRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsChangeRoleModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[400px] p-6 relative z-10 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1E293B]">Change Role</h2>
              <button onClick={() => setIsChangeRoleModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Role *</label>
              <div className="relative">
                <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#1E293B] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
                  <option>Staff</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsChangeRoleModalOpen(false)}
                className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

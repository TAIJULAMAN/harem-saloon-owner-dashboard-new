"use client";

import React, { useState } from "react";
import {
  Download,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Search,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
import Modal from "@/components/saloonOwner/common/Modal";
import Pagination from "@/components/saloonOwner/common/Pagination";
import { dummyClientsData, statCardsDemoData } from "./data";
import Link from "next/link";
import ClientRetentionChart from "@/components/saloonOwner/dashboard/Charts/ClientRetentionChart";
import TopSpendersTable from "@/components/saloonOwner/dashboard/Charts/TopSpendersTable";

export default function ClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAddAllergieOpen, setIsAddAllergieOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedClients.length === paginatedData.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedData.map((c) => c.id));
    }
  };

  const toggleSelectClient = (id: string) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const filteredData = dummyClientsData.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">
          Clients
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          <Link
            href="/dashboard/clients/import"
            className="w-full sm:w-auto justify-center bg-white border-2 border-[#E0E7FF] hover:bg-[#F8F9FE] text-[#635BFF] px-4 py-1.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors shrink-0"
          >
            Import Clients
          </Link>
          <button
            onClick={() => setIsExportOpen(true)}
            className="w-full sm:w-auto justify-center bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="w-full sm:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors shadow-sm shadow-[#635BFF]/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className="mb-8">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">
          Analytics Overview
        </h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {statCardsDemoData.map((card) => (
            <div
              key={card.id}
              className={`p-6 rounded-lg border border-[#E2E8F0] shadow-sm relative overflow-hidden ${card.cardStyle}`}
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBgColor} ${card.iconShadowColor}`}
                >
                  {card.icon}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#64748B] text-[13px] font-semibold mb-1">
                  {card.title}
                </h3>
                <div className="flex items-end gap-3">
                  <span className="text-[#1E293B] text-[24px] font-bold">
                    {card.value}
                  </span>
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
          <ClientRetentionChart />
          <TopSpendersTable />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-bold text-[#1E293B]">All Clients</h2>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[30%]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors shrink-0 ${
                        selectedClients.length === paginatedData.length &&
                        paginatedData.length > 0
                          ? "bg-[#635BFF] border-[#635BFF] text-white"
                          : selectedClients.length > 0
                            ? "bg-[#F43F5E] border-[#F43F5E] text-white"
                            : "bg-white border-[#CBD5E1]"
                      }`}
                    >
                      {selectedClients.length === paginatedData.length &&
                      paginatedData.length > 0 ? (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : selectedClients.length > 0 ? (
                        <svg
                          width="10"
                          height="2"
                          viewBox="0 0 10 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </button>
                    {selectedClients.length > 0 ? (
                      <span
                        className={
                          selectedClients.length === paginatedData.length
                            ? "text-[#635BFF]"
                            : "text-[#F43F5E]"
                        }
                      >
                        {selectedClients.length === paginatedData.length
                          ? "Unselect All Clients"
                          : "Select All Clients"}
                      </span>
                    ) : (
                      <span>Name</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[20%]">
                  Telephone
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[20%]">
                  Last Appointment
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[15%]">
                  Allergies
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[10%]">
                  Created at
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center w-[5%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors group"
                >
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleSelectClient(client.id)}
                        className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors shrink-0 ${
                          selectedClients.includes(client.id)
                            ? "bg-[#635BFF] border-[#635BFF] text-white"
                            : "bg-white border-[#CBD5E1]"
                        }`}
                      >
                        {selectedClients.includes(client.id) && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${client.avatarBg}`}
                      >
                        <img
                          src={client.avatarUrl}
                          alt={client.name}
                          className="w-8 h-8 object-cover mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#1E293B]">
                          {client.name}
                        </div>
                        <div className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[13px] font-semibold text-[#64748B]">
                      {client.telephone}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[13px] font-semibold text-[#64748B]">
                      {client.lastAppointment}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEF9C3] text-[#EAB308]">
                      Fragrances Allergie
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[13px] font-semibold text-[#64748B]">
                      {client.createdAt}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center relative">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === client.id ? null : client.id,
                          )
                        }
                        className="text-[#64748B] hover:text-[#1E293B] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9]"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openDropdownId === client.id && (
                        <div className="absolute right-8 top-10 w-40 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-10 flex flex-col items-start">
                          <Link
                            href={`/dashboard/clients/${client.id}`}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#635BFF] transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4 text-[#635BFF]" /> View
                            Details
                          </Link>
                          <button className="w-full text-left px-4 py-2 text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#10B981] transition-colors flex items-center gap-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-[#10B981]"
                            >
                              <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" x2="16" y1="2" y2="6" />
                              <line x1="8" x2="8" y1="2" y2="6" />
                              <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                            Book now
                          </button>
                          <button
                            onClick={() => {
                              setIsEditOpen(true);
                              setOpenDropdownId(null);
                              setSelectedClient(client);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0EA5E9] transition-colors flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4 text-[#0EA5E9]" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setIsDeleteOpen(true);
                              setOpenDropdownId(null);
                              setSelectedClient(client);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#F43F5E] transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4 text-[#F43F5E]" /> Delete
                          </button>
                          <button
                            onClick={() => {
                              setIsAddAllergieOpen(true);
                              setOpenDropdownId(null);
                              setSelectedClient(client);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#FBBF24] transition-colors flex items-center gap-2"
                          >
                            <ShieldAlert className="w-4 h-4 text-[#FBBF24]" />{" "}
                            Add Allergie
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            itemName="clients"
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Client"
      >
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddOpen(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#1E293B]">
                First Name *
              </label>
              <input
                required
                type="text"
                placeholder="Enter first name"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#1E293B]">
                Last Name *
              </label>
              <input
                required
                type="text"
                placeholder="Enter last name *"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#1E293B]">
                Date of birth
              </label>
              <input
                type="text"
                placeholder="Enter date of birth"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
              />
            </div>
            <div className="space-y-2 relative">
              <label className="text-[13px] font-bold text-[#1E293B]">
                Gender
              </label>
              <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] appearance-none bg-white transition-all text-[#94A3B8]">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#1E293B]">
                Telephone *
              </label>
              <input
                required
                type="tel"
                placeholder="Enter telephone"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#1E293B]">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-2.5 text-[13px] font-bold text-white bg-[#635BFF] hover:bg-[#524be0] rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Client"
      >
        {selectedClient && (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditOpen(false);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#1E293B]">
                  First Name *
                </label>
                <input
                  defaultValue={selectedClient.name.split(" ")[0]}
                  required
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#1E293B]">
                  Last Name *
                </label>
                <input
                  defaultValue={selectedClient.name
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                  required
                  type="text"
                  placeholder="Enter last name *"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#1E293B]">
                  Date of birth
                </label>
                <input
                  defaultValue="November 7, 1992"
                  type="text"
                  placeholder="Enter date of birth"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-[13px] font-bold text-[#1E293B]">
                  Gender
                </label>
                <select
                  defaultValue="female"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] appearance-none bg-white transition-all text-[#1E293B]"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#1E293B]">
                  Telephone *
                </label>
                <input
                  defaultValue={selectedClient.telephone}
                  required
                  type="tel"
                  placeholder="Enter telephone"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#1E293B]">
                  E-mail
                </label>
                <input
                  defaultValue={selectedClient.email}
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-all"
                />
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 text-[13px] font-bold text-white bg-[#635BFF] hover:bg-[#524be0] rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
      <Modal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Export Client Data"
      >
        <div className="space-y-4">
          <p className="text-[13px] text-[#64748B]">
            Choose the format to export your client list.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsExportOpen(false)}
              className="flex flex-col items-center justify-center gap-2 p-4 border border-[#E2E8F0] rounded-lg hover:border-[#635BFF] hover:bg-[#EEF2FF] transition-all text-[#1E293B]"
            >
              <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center">
                <span className="font-bold text-sm">CSV</span>
              </div>
              <span className="text-[13px] font-bold">Export as CSV</span>
            </button>
            <button
              onClick={() => setIsExportOpen(false)}
              className="flex flex-col items-center justify-center gap-2 p-4 border border-[#E2E8F0] rounded-lg hover:border-[#10B981] hover:bg-[#ECFDF5] transition-all text-[#1E293B]"
            >
              <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#10B981] flex items-center justify-center">
                <span className="font-bold text-sm">PDF</span>
              </div>
              <span className="text-[13px] font-bold">Export as PDF</span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Client"
      >
        {selectedClient && (
          <div className="space-y-4 text-center pb-2">
            <h3 className="text-xl font-bold text-[#1E293B] font-manrope">
              Are you sure?
            </h3>
            <p className="text-[13px] text-[#64748B] px-2 font-medium leading-relaxed">
              This will permanently delete the client{" "}
              <span className="font-bold text-[#1E293B]">
                {selectedClient.name}
              </span>
              . This action cannot be undone.
            </p>
            <div className="pt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] shadow-sm shadow-[#EF4444]/20 rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Download Details"
      >
        {selectedClient && (
          <div className="space-y-5">
            <p className="text-[13px] text-[#64748B]">
              Download a detailed report for{" "}
              <span className="font-bold text-[#1E293B]">
                {selectedClient.name}
              </span>
              .
            </p>
            <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#64748B] font-medium">Telephone</span>
                <span className="font-bold text-[#1E293B]">
                  {selectedClient.telephone}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#64748B] font-medium">Email</span>
                <span className="font-bold text-[#1E293B]">
                  {selectedClient.email}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#64748B] font-medium">Joined</span>
                <span className="font-bold text-[#1E293B]">
                  {selectedClient.createdAt}
                </span>
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setIsDownloadOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-[#64748B] bg-transparent hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDownloadOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-lg transition-colors shadow-sm shadow-[#06B6D4]/20 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* Add Allergie Modal */}
      <Modal
        isOpen={isAddAllergieOpen}
        onClose={() => setIsAddAllergieOpen(false)}
        title="Add Allergie"
        maxWidth="max-w-2xl"
      >
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#1E293B] mb-2">
              Name *
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#1E293B] mb-2">
              Severity (optional)
            </label>
            <div className="relative">
              <select className="w-full appearance-none border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors bg-white">
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#1E293B] mb-2">
              Note
            </label>
            <textarea
              placeholder="Enter note"
              rows={4}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors resize-y"
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsAddAllergieOpen(false)}
              className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold transition-colors"
            >
              Save Allergie
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

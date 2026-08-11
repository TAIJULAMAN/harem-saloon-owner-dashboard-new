"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  Calendar,
  FileText,
  User,
  Banknote,
  Store,
  Clock,
  Star,
  Shield,
  Briefcase,
  Facebook,
  Instagram,
  Lock,
  Edit2,
  XCircle,
  Ban,
  Home,
  Download,
  CheckCircle2,
  RefreshCw,
  X,
  Activity,
  BarChart2,
  Image
} from "lucide-react";
import { initialMembers } from "@/components/saloonOwner/team/team";
import RemunerationTab from "@/components/saloonOwner/team/RemunerationTab";
import AnalyticsTab from "@/components/saloonOwner/team/AnalyticsTab";
import ScheduledShiftsTab from "@/components/saloonOwner/team/ScheduledShiftsTab";
import CalendarTab from "@/components/saloonOwner/team/CalendarTab";
import ProductionTab from "@/components/saloonOwner/team/ProductionTab";
import PermissionsTab from "@/components/saloonOwner/team/PermissionsTab";
import DocumentationTab from "@/components/saloonOwner/team/DocumentationTab";
import MediaTab from "@/components/saloonOwner/team/MediaTab";
import Pagination from "@/components/saloonOwner/common/Pagination";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const id = params.id;
  const member = initialMembers.find((m) => m.id === id) || initialMembers[0];

  const [activeTab, setActiveTab] = useState("Basic Data");
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
  const [isReactiveModalOpen, setIsReactiveModalOpen] = useState(false);
  const [isRepeatChecked, setIsRepeatChecked] = useState(false);

  // Dynamically set active state based on table data
  const isUserActive = member.status === "Active";

  // State for service toggles
  const [services, setServices] = useState([
    { id: 1, name: "Hair Color", duration: "15 min", price: "€ 170", active: true },
    { id: 2, name: "Hair Color", duration: "30 min", price: "€ 170", active: false },
    { id: 3, name: "Hair Color", duration: "15 min", price: "€ 170", active: false },
    { id: 4, name: "Hair Color", duration: "15 min", price: "€ 170", active: true },
    { id: 5, name: "Hair Color", duration: "30 min", price: "€ 170", active: false },
    { id: 6, name: "Hair Color", duration: "15 min", price: "€ 170", active: false },
  ]);

  const [currentServicePage, setCurrentServicePage] = useState(1);
  const SERVICES_PER_PAGE = 6;
  const servicesTotalPages = Math.ceil(services.length / SERVICES_PER_PAGE) || 1;
  const servicesPaginated = services.slice((currentServicePage - 1) * SERVICES_PER_PAGE, currentServicePage * SERVICES_PER_PAGE);

  const tabs = [
    { id: "Basic Data", icon: User },
    { id: "Remuneration", icon: Banknote },
    { id: "Activity in Salon", icon: Activity },
    { id: "Calendar", icon: Calendar },
    { id: "Schedules/Shifts", icon: Clock },
    { id: "Production", icon: BarChart2 },
    { id: "Evaluation", icon: Star },
    { id: "Permissions", icon: Shield },
    { id: "Documentation", icon: FileText },
    { id: "Media", icon: Image },
  ];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between">
        <Link
          href="/dashboard/team/members"
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors font-bold text-[14px]"
        >
          <ChevronLeft className="w-4 h-4" />
          {member.name}
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-[#94A3B8] hover:text-[#1E293B] transition-colors">
            <Home className="w-[18px] h-[18px]" />
          </Link>
          <span className="text-[#94A3B8]">/</span>
          <span className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-3 py-1 rounded-lg">Team Members</span>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] flex flex-col">
        {/* Banner Image */}
        <div
          className="h-48 md:h-[220px] w-full bg-cover bg-center bg-[#C4B5FD] relative rounded-t-xl overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")'
          }}
        >
          {/* Fallback gradient if image fails or isn't loaded */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4C6F4]/50 to-[#A78BFA]/50 mix-blend-overlay"></div>
        </div>

        {/* Content Area */}
        <div className="relative bg-white px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-end pb-8 pt-32 md:pt-6 min-h-[140px] z-10">

          {/* Avatar and Info (Absolute Centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-[50px] flex flex-col items-center w-64">
            <div className="w-[100px] h-[100px] rounded-full border-[5px] border-white shadow-sm overflow-hidden bg-[#FCE7F3] mb-3">
              <img src={member.avatarUrl} alt="Avatar" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <h2 className="text-[19px] font-bold text-[#1E293B]">{member.name}</h2>
            <div className="text-[13px] text-[#94A3B8] font-medium mb-2">Bologna, Italy</div>
            {isUserActive ? (
              <span className="bg-[#DCFCE7] text-[#22C55E] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
                Active
              </span>
            ) : (
              <span className="bg-[#FEE2E2] text-[#EF4444] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
                Inactive
              </span>
            )}
          </div>

          {/* Left Stats */}
          <div className="flex gap-8 md:gap-14 w-full md:w-auto justify-center md:justify-start">
            <div className="flex flex-col items-center text-center">
              <User className="w-[22px] h-[22px] text-[#64748B] mb-2" />
              <div className="text-[15px] font-bold text-[#1E293B]">May 31, 2022</div>
              <div className="text-[12px] text-[#94A3B8] font-medium">Start Date</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Briefcase className="w-[22px] h-[22px] text-[#64748B] mb-2" />
              <div className="text-[15px] font-bold text-[#1E293B]">Permanent</div>
              <div className="text-[12px] text-[#94A3B8] font-medium">Contract Type</div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="w-full md:w-auto flex justify-center md:justify-end mt-6 md:mt-0 relative">
            <button
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="bg-[#E0E7FF] text-[#635BFF] flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#C7D2FE] transition-colors"
            >
              Actions
              <ChevronDown className="w-4 h-4" />
            </button>

            {isActionsOpen && (
              <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-lg shadow-lg border border-[#E2E8F0] p-2 z-20">
                {isUserActive ? (
                  <>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#F8FAFC] rounded-lg group transition-colors">
                      <Edit2 className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#635BFF]" />
                      <span className="text-[13px] font-medium text-[#1E293B]">Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTimeOffModalOpen(true);
                        setIsActionsOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#F8FAFC] rounded-lg group transition-colors"
                    >
                      <Clock className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#635BFF]" />
                      <span className="text-[13px] font-medium text-[#1E293B]">Add Time Off</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTerminateModalOpen(true);
                        setIsActionsOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#FDF2F8] rounded-lg group transition-colors"
                    >
                      <XCircle className="w-[18px] h-[18px] text-[#EF4444]" />
                      <span className="text-[13px] font-medium text-[#EF4444]">Terminate Contract</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#FFFBEB] rounded-lg group transition-colors">
                      <Ban className="w-[18px] h-[18px] text-[#EAB308]" />
                      <span className="text-[13px] font-medium text-[#EAB308]">Disable platform access</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#F8FAFC] rounded-lg group transition-colors">
                      <Edit2 className="w-[18px] h-[18px] text-[#06B6D4]" />
                      <span className="text-[13px] font-medium text-[#1E293B]">Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTimeOffModalOpen(true);
                        setIsActionsOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#F8FAFC] rounded-lg group transition-colors"
                    >
                      <Clock className="w-[18px] h-[18px] text-[#8B5CF6]" />
                      <span className="text-[13px] font-medium text-[#1E293B]">Add Time Off</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsReactiveModalOpen(true);
                        setIsActionsOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#F0FDF4] rounded-lg group transition-colors"
                    >
                      <RefreshCw className="w-[18px] h-[18px] text-[#22C55E]" />
                      <span className="text-[13px] font-medium text-[#1E293B]">Reactive Profile</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="bg-[#EEF2FF] px-4 sm:px-6 overflow-x-auto flex justify-start md:justify-center rounded-b-xl">
          <div className="flex items-center min-w-max gap-6 sm:gap-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 text-[13px] font-bold transition-all relative shrink-0 ${isActive ? "text-[#635BFF]" : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.id}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "Basic Data" && (
        <div className="space-y-6">

          {/* Row 1: Personal Data & Contract */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Personal Data Card */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-bold text-[#1E293B]">Personal data</h3>
                <button className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Date of birth</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">November 7, 1992</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Age</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">31 years old</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Gender</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Female</div>
                </div>
                <div></div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Telephone</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">+39 338 789 312</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Email</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">anna@bellavita.com</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Emergency Contact</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Marco Rossi (+39 335 345 678)</div>
                </div>
              </div>
            </div>

            {/* Contract Card */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
              <div className="flex items-center justify-between mb-6 relative">
                <h3 className="text-[16px] font-bold text-[#1E293B]">Contract</h3>
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1E293B] text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
                      Download Contract
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1E293B] rotate-45"></div>
                    </div>
                  </div>
                  <button className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
                    Edit
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">End Date</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Indeterminate</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Tax ID Code</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">RSSMRA91B25H890Z</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Role</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Staff</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Remuneration</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Fixed (€ 3.200)</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">IBAN</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">IT68 X054 ******** 125</div>
                </div>
              </div>
            </div>

          </div>

          {/* Full Address Card */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-bold text-[#1E293B]">Full Address</h3>
              <button className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Address</div>
                <div className="text-[13px] font-bold text-[#1E293B]">Independence Street 567</div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-1">City</div>
                <div className="text-[13px] font-bold text-[#1E293B]">Bologna</div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Province</div>
                <div className="text-[13px] font-bold text-[#1E293B]">Bologna (BO)</div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-1">CAP</div>
                <div className="text-[13px] font-bold text-[#1E293B]">40135</div>
              </div>
            </div>
          </div>

          {/* Services Card */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-bold text-[#1E293B]">Services</h3>
              <button className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
                Add Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesPaginated.map((service, idx) => {
                const originalIdx = (currentServicePage - 1) * SERVICES_PER_PAGE + idx;
                return (
                  <div key={originalIdx} className={`flex items-center justify-between rounded-lg p-5 border transition-colors ${service.active ? "bg-[#F5F3FF] border-[#EDE9FE]" : "bg-[#F8FAFC] border-[#F1F5F9]"
                    }`}>
                    <div>
                      <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">{service.name}</div>
                      <div className="text-[11px] font-bold text-[#94A3B8]">{service.duration}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-[16px] font-bold text-[#1E293B]">{service.price}</div>
                      <button
                        onClick={() => {
                          const newServices = [...services];
                          newServices[originalIdx].active = !newServices[originalIdx].active;
                          setServices(newServices);
                        }}
                        className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${service.active ? 'bg-[#635BFF]' : 'bg-[#CBD5E1]'
                          }`}
                      >
                        <span className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${service.active ? 'translate-x-[20px]' : 'translate-x-0'
                          }`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="-mx-6 -mb-6 mt-6">
              <Pagination
                currentPage={currentServicePage}
                totalPages={servicesTotalPages}
                totalItems={services.length}
                itemsPerPage={SERVICES_PER_PAGE}
                itemName="services"
                onPageChange={setCurrentServicePage}
              />
            </div>
          </div>

          {/* Additional Data Card */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-bold text-[#1E293B]">Additional Data</h3>
              <Link href={`/dashboard/team/members/${id}/edit-additional-data`} className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
                Edit
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-3 uppercase tracking-wider">Certifications</div>
                <div className="flex gap-4 text-[13px] font-medium text-[#1E293B]">
                  <span>Professional Hairdresser</span>
                  <span>Business Management</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-3 uppercase tracking-wider">Completed courses</div>
                <div className="flex flex-col gap-1 text-[13px] font-medium text-[#1E293B]">
                  <span>Leadership Management</span>
                  <span>Customer Service Excellence</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-3 uppercase tracking-wider">Languages</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1E293B]">Italian</span>
                    <span className="bg-[#E0E7FF] text-[#635BFF] text-[10px] font-bold px-3 py-1 rounded-full">Native</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1E293B]">English</span>
                    <span className="bg-[#DCFCE7] text-[#22C55E] text-[10px] font-bold px-3 py-1 rounded-full">C1 Fluent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1E293B]">Spanish</span>
                    <span className="bg-[#FEF9C3] text-[#EAB308] text-[10px] font-bold px-3 py-1 rounded-full">B2 Intermediate</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] font-medium mb-3 uppercase tracking-wider">Direct Manager</div>
                <div className="text-[13px] font-bold text-[#1E293B]">Maria Rodriguez</div>
              </div>
            </div>
          </div>

          {/* Social & Access Card */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-bold text-[#1E293B]">Social & Access</h3>
              <button className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
                Change Permits
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Left Column */}
              <div className="flex flex-col">
                <div className="text-[11px] text-[#94A3B8] font-medium mb-2 uppercase tracking-wider">Social Connected</div>
                <div className="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 text-[#1877F2]" fill="currentColor" strokeWidth={0} />
                    <span className="text-[13px] font-bold text-[#1E293B]">Facebook</span>
                  </div>
                  <span className="bg-[#FEF9C3] text-[#EAB308] text-[10px] font-bold px-3 py-1 rounded-full">Not Connected</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-[#E1306C]" />
                    <span className="text-[13px] font-bold text-[#1E293B]">Instagram</span>
                  </div>
                  <span className="bg-[#DCFCE7] text-[#22C55E] text-[10px] font-bold px-3 py-1 rounded-full">Connected</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col">
                <div className="text-[11px] text-[#94A3B8] font-medium mb-2 uppercase tracking-wider">Platform Access</div>
                <div className="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#64748B]" />
                    <span className="text-[13px] font-bold text-[#1E293B]">Last Access</span>
                  </div>
                  <span className="text-[13px] font-bold text-[#1E293B]">1h ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#64748B]" />
                    <span className="text-[13px] font-bold text-[#1E293B]">Permits</span>
                  </div>
                  <span className="bg-[#E0E7FF] text-[#635BFF] text-[10px] font-bold px-3 py-1 rounded-full">All</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === "Remuneration" && <RemunerationTab />}

      {activeTab === "Activity in Salon" && <AnalyticsTab />}

      {activeTab === "Calendar" && <CalendarTab />}

      {activeTab === "Schedules/Shifts" && <ScheduledShiftsTab />}

      {activeTab === "Production" && <ProductionTab />}

      {activeTab === "Permissions" && <PermissionsTab />}

      {activeTab === "Documentation" && <DocumentationTab />}

      {activeTab === "Media" && <MediaTab />}

      {/* Terminate Contract Modal */}
      {isTerminateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsTerminateModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 md:p-8 relative z-10 shadow-xl flex flex-col gap-6">
            <div>
              <h2 className="text-[20px] font-bold text-[#1E293B] mb-2">Terminate Contract</h2>
              <p className="text-[#64748B] text-[14px]">Are you sure you want to terminate this contract?</p>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Date *</label>
                <input
                  type="text"
                  placeholder="Enter end date"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Reason *</label>
                <textarea
                  placeholder="Enter reason"
                  rows={4}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Remove Access To The Platform On *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select date"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all pr-10"
                  />
                  <Calendar className="w-5 h-5 text-[#64748B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => setIsTerminateModalOpen(false)}
                className="px-6 py-2.5 rounded-lg text-[14px] font-bold text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg text-[14px] font-bold text-[#EF4444] bg-[#FEE2E2] hover:bg-[#FECACA] transition-colors">
                Terminate Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reactive Profile Modal */}
      {isReactiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReactiveModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[400px] p-6 relative z-10 shadow-xl flex flex-col gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#1E293B] mb-2">Reactive Profile</h2>
              <p className="text-[#64748B] text-[14px]">Are you sure you want to reactive this user?</p>
            </div>
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setIsReactiveModalOpen(false)}
                className="px-5 py-2 rounded-lg text-[14px] font-bold text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors border border-[#E2E8F0]"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsReactiveModalOpen(false)}
                className="px-5 py-2 rounded-lg text-[14px] font-bold text-[#06B6D4] bg-[#ECFEFF] border border-[#A5F3FC] hover:bg-[#CFFAFE] transition-colors"
              >
                Reactive Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Time Off Modal */}
      {isTimeOffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsTimeOffModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto relative z-10 shadow-xl flex flex-col">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between z-20">
              <h2 className="text-[18px] font-bold text-[#1E293B]">Add Time Off</h2>
              <button onClick={() => setIsTimeOffModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Type *</label>
                <div className="relative">
                  <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                    <option value="annual">Annual leave</option>
                    <option value="sick">Sick leave</option>
                    <option value="personal">Personal leave</option>
                    <option value="maternity">Maternity leave</option>
                    <option value="paternity">Paternity leave</option>
                    <option value="bereavement">Bereavement leave</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Date *</label>
                  <div className="relative">
                    <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-all pr-10" />
                    <Calendar className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Date *</label>
                  <div className="relative">
                    <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-all pr-10" />
                    <Calendar className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Time *</label>
                  <input type="time" defaultValue="09:00" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Time *</label>
                  <input type="time" defaultValue="17:00" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-all" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="repeat-checkbox"
                  className="w-4 h-4 text-[#635BFF] border-[#E2E8F0] rounded focus:ring-[#635BFF] cursor-pointer"
                  checked={isRepeatChecked}
                  onChange={(e) => setIsRepeatChecked(e.target.checked)}
                />
                <label htmlFor="repeat-checkbox" className="text-[14px] font-medium text-[#1E293B] cursor-pointer">Repeat</label>
              </div>

              {isRepeatChecked && (
                <div className="bg-[#F8FAFC] rounded-lg p-5 space-y-4 border border-[#E2E8F0]">
                  <h4 className="text-[13px] font-bold text-[#1E293B]">Repeat frequency</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'daily', label: 'Daily', sub: 'Repeat blocks of time a day' },
                      { id: 'weekly', label: 'Weekly', sub: 'Repeat on [Day] of every week' },
                      { id: 'biweekly', label: 'Every 2 weeks', sub: 'Repeat every 2 weeks on [Day]' },
                      { id: 'monthly', label: 'Monthly', sub: 'Repeat on date of every month' },
                      { id: 'quarterly', label: 'Quarterly', sub: 'Repeat every 3 months on date' },
                      { id: 'yearly', label: 'Yearly', sub: 'Repeat on [Date] of every year' },
                    ].map((freq, idx) => (
                      <div key={freq.id} className="flex gap-3">
                        <input type="radio" name="repeat-freq" id={freq.id} defaultChecked={idx === 0} className="mt-1 w-4 h-4 text-[#635BFF] border-[#E2E8F0] focus:ring-[#635BFF] cursor-pointer" />
                        <div>
                          <label htmlFor={freq.id} className="text-[14px] font-medium text-[#1E293B] cursor-pointer block">{freq.label}</label>
                          <span className="text-[12px] text-[#94A3B8]">{freq.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Description (Optional)</label>
                <textarea
                  placeholder="Add description or note"
                  rows={3}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <span className="inline-block bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-3 py-1 rounded-full">
                  Time off total: 0h
                </span>
              </div>

              <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-4 flex gap-3">
                <div>
                  <h4 className="text-[13px] font-bold text-[#92400E] mb-1">Warning</h4>
                  <p className="text-[13px] text-[#B45309]">Online bookings cannot be placed during time off.</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsTimeOffModalOpen(false)}
                  className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

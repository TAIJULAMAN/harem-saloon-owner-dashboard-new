"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Hash, FileText, Wallet, Ban, Minus, ChevronDown, ChevronUp, X, Check, Search, Download, Plus, MapPin, Settings, Eye, Trash2, RefreshCcw, Printer, Edit2, Play, MoreVertical, Paperclip, Mail, MessageSquare, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { dummyClientsData } from "../data";
import Image from "next/image";
import Pagination from "@/components/saloonOwner/common/Pagination";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function ClientDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const client = dummyClientsData.find((c) => c.id === id) || dummyClientsData[0];

  const totalSpentNum = (parseInt(client.id.replace(/\D/g, "")) || 1) * 1158.42;
  const avgSpentNum = totalSpentNum / ((parseInt(client.id.replace(/\D/g, "")) || 1) * 3 + 2);

  const formattedTotalSpent = "€ " + Math.round(totalSpentNum).toLocaleString("en-US");
  const formattedAvgSpent = "€ " + Math.round(avgSpentNum).toLocaleString("en-US");

  const [activeTab, setActiveTab] = useState("Appointments");
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(0);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("Last 7 days");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [isCustomRangeModalOpen, setIsCustomRangeModalOpen] = useState(false);
  const [chartFilter, setChartFilter] = useState("Last 7 days");
  const [isChartFilterDropdownOpen, setIsChartFilterDropdownOpen] = useState(false);
  const chartFilterOptions = ["Last 7 days", "Last 14 days", "Last Month"];

  const [activeMediaFilter, setActiveMediaFilter] = useState("All type");
  const [isMediaDateDropdownOpen, setIsMediaDateDropdownOpen] = useState(false);
  const [selectedMediaDateFilter, setSelectedMediaDateFilter] = useState("Last 7 Days");
  const mediaDateOptions = ["Last 7 Days", "Last 14 Days", "Last Month", "Last Year"];
  const [openGiftCardMenu, setOpenGiftCardMenu] = useState<number | null>(null);

  const getChartData = () => {
    if (chartFilter === "Last 7 days") {
      return {
        labels: ['Sep 1', 'Sep 2', 'Sep 3', 'Sep 4', 'Sep 5', 'Sep 6', 'Sep 7'],
        data: [150, 250, 410, 300, 550, 350, 600],
        total: "€ 1,358",
        change: "+12%",
        trend: "up"
      };
    } else if (chartFilter === "Last 14 days") {
      return {
        labels: ['Aug 25', 'Aug 27', 'Aug 29', 'Aug 31', 'Sep 2', 'Sep 4', 'Sep 6'],
        data: [200, 350, 300, 450, 400, 500, 750],
        total: "€ 2,450",
        change: "+18%",
        trend: "up"
      };
    } else {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [1200, 1500, 1400, 1800],
        total: "€ 5,100",
        change: "+25%",
        trend: "up"
      };
    }
  };

  const currentChartData = getChartData();

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1E293B',
        bodyColor: '#10B981',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context: any) => context[0].label,
          label: (context: any) => `Money Spent: € ${context.raw}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8', font: { size: 10, weight: 500 } },
        border: { display: false }
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { display: false },
        border: { display: false }
      }
    },
    elements: {
      line: { tension: 0.4 },
      point: {
        radius: 0,
        hoverRadius: 6,
        backgroundColor: '#10B981',
        borderWidth: 2,
        borderColor: 'white'
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const chartData = {
    labels: currentChartData.labels,
    datasets: [
      {
        label: 'Money Spent',
        data: currentChartData.data,
        borderColor: '#10B981',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          return gradient;
        },
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const [isMarketingConsent, setIsMarketingConsent] = useState(true);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const [currentReceiptsPage, setCurrentReceiptsPage] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isViewNoteModalOpen, setIsViewNoteModalOpen] = useState(false);
  const [isAddAllergieModalOpen, setIsAddAllergieModalOpen] = useState(false);
  const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [minSpent, setMinSpent] = useState(0);
  const [maxSpent, setMaxSpent] = useState(200);
  const maxPossibleSpent = 500;

  const [activeCommChannelFilter, setActiveCommChannelFilter] = useState("All");
  const [activeCommStatusFilter, setActiveCommStatusFilter] = useState("All Statuses");
  const [activeCommDateFilter, setActiveCommDateFilter] = useState("All Time");
  const [currentCommLogPage, setCurrentCommLogPage] = useState(1);
  const [isCommLogModalOpen, setIsCommLogModalOpen] = useState(false);
  const [selectedCommLog, setSelectedCommLog] = useState<any>(null);

  const mockCommunicationLogs = [
    {
      id: 1,
      channel: "WhatsApp",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "Employee Name",
      date: "07/08/2025",
      time: "11:44",
      status: "Delivered",
      source: "Staff Member"
    },
    {
      id: 2,
      channel: "Email",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "System",
      date: "07/08/2025",
      time: "11:44",
      status: "Delivered",
      source: "System"
    },
    {
      id: 3,
      channel: "SMS",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "System",
      date: "07/08/2025",
      time: "11:44",
      status: "Sent",
      source: "System"
    },
    {
      id: 4,
      channel: "WhatsApp",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "Employee Name",
      date: "07/08/2025",
      time: "11:44",
      status: "Read",
      source: "Staff Member"
    },
    {
      id: 5,
      channel: "WhatsApp",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "Employee Name",
      date: "07/08/2025",
      time: "11:44",
      status: "Failed",
      source: "Staff Member"
    },
    {
      id: 6,
      channel: "Email",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "Employee Name",
      date: "07/08/2025",
      time: "11:44",
      status: "Failed",
      source: "Staff Member"
    },
    {
      id: 7,
      channel: "Email",
      title: "New appointment scheduled for tomorrow at 3 PM",
      employee: "Employee Name",
      date: "07/08/2025",
      time: "11:44",
      status: "Failed",
      source: "Staff Member"
    }
  ];

  const filteredCommLogs = mockCommunicationLogs.filter(log => {
    const channelMatch = activeCommChannelFilter === "All" || log.channel === activeCommChannelFilter;
    const statusMatch = activeCommStatusFilter === "All Statuses" || log.status === activeCommStatusFilter;
    const dateMatch = activeCommDateFilter === "All Time" || log.date === activeCommDateFilter;
    return channelMatch && statusMatch && dateMatch;
  });

  const COMM_LOGS_PER_PAGE = 5;
  const commLogsTotalItems = filteredCommLogs.length;
  const commLogsTotalPages = Math.ceil(commLogsTotalItems / COMM_LOGS_PER_PAGE) || 1;
  const commLogsPaginated = filteredCommLogs.slice((currentCommLogPage - 1) * COMM_LOGS_PER_PAGE, currentCommLogPage * COMM_LOGS_PER_PAGE);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxSpent - 1);
    setMinSpent(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minSpent + 1);
    setMaxSpent(value);
  };

  const dateOptions = ["Last 7 days", "Last 14 days", "Last Month", "Last 3 Months", "Custom Range"];
  const statusOptions = ["All", "Booked", "Confirmed", "Arrived", "Started", "Completed", "Canceled", "No-show"];

  const mockMedia = [
    { id: 1, type: "Photo", fileName: "Haircut_Front.jpeg", date: "08/09/2025 5:06 PM", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { id: 2, type: "Video", fileName: "Coloring_Process.mp4", date: "08/09/2025 5:15 PM", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { id: 3, type: "Photo", fileName: "Haircut_Back.jpeg", date: "08/09/2025 5:30 PM", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" }
  ];

  const filteredMedia = activeMediaFilter === "All type"
    ? mockMedia
    : mockMedia.filter(m => m.type === activeMediaFilter);

  const mockAppointments = [
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Haircut", status: "Booked", statusColor: "text-[#635BFF] bg-[#EEF2FF]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Expected" },
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Hair Color", status: "Confirmed", statusColor: "text-[#14B8A6] bg-[#CCFBF1]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Expected" },
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Blow Dry", status: "Arrived", statusColor: "text-[#EAB308] bg-[#FEFCE8]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Expected" },
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Blow Dry", status: "Started", statusColor: "text-[#0EA5E9] bg-[#E0F2FE]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Expected" },
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Blow Dry", status: "Completed", statusColor: "text-[#10B981] bg-[#DCFCE7]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Paid" },
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Blow Dry", status: "Canceled", statusColor: "text-[#F43F5E] bg-[#FFE4E6]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Expected" },
    { dateLine1: "1 AUG", dateLine2: "2025", title: "Blow Dry", status: "No-show", statusColor: "text-[#F43F5E] bg-white border border-[#F43F5E]", details: "17:00 • 15 min • Sophia Ventura - Angelica Last", price: "€ 170", priceStatus: "Expected" }
  ];

  return (
    <div className="w-full space-y-6">

      {/* Top Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center gap-4">
        <Link
          href="/dashboard/clients"
          className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1 rounded-lg hover:bg-[#EEF2FF]"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#1E293B] font-manrope">{client.name}</h1>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">

        {/* Banner Section */}
        <div className="w-full h-48 sm:h-56 relative bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] overflow-hidden">
          {/* Abstract background shapes */}
          <svg className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-multiply" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a5b4fc" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,186.7C384,160,480,96,576,90.7C672,85,768,139,864,165.3C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#818cf8" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,250.7C672,277,768,267,864,240C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="p-8 relative flex flex-col md:flex-row items-center justify-between gap-8 pt-20 md:pt-8">

          {/* Center Avatar (Absolute positioning to overlap banner) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-sm ${client.avatarBg}`}>
              <img src={client.avatarUrl} alt={client.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover mix-blend-multiply" />
            </div>
          </div>

          {/* Left Stats */}
          <div className="flex gap-8 w-full md:w-1/3 justify-center md:justify-start">
            <div className="flex flex-col items-center justify-center space-y-1">
              <Calendar className="w-5 h-5 text-[#64748B] mb-1" />
              <span className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Aug 8, 2024</span>
              <span className="text-[12px] font-medium text-[#94A3B8]">Created At</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <Hash className="w-5 h-5 text-[#64748B] mb-1" />
              <span className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">000000</span>
              <span className="text-[12px] font-medium text-[#94A3B8]">Client ID</span>
            </div>
          </div>

          {/* Center Info Details */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/3 mt-4 md:mt-12">
            <h2 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope leading-tight">{client.name}</h2>
            <p className="text-[13px] font-medium text-[#94A3B8] mt-1 mb-3">Bologna, Italy</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-[#14B8A6] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">VIP</span>
              <span className="border border-[#10B981] text-[#10B981] text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">New Client</span>
              <span className="border border-[#F43F5E] text-[#F43F5E] text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">Frequent Canceler</span>
            </div>
          </div>

          {/* Right Button */}
          <div className="flex justify-center md:justify-end w-full md:w-1/3 mt-4 md:mt-0 md:pt-12">
            <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors shadow-sm shadow-[#635BFF]/20">
              Book Now
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full bg-[#EEF2FF] flex items-center justify-start md:justify-center px-4 overflow-x-auto border-t border-[#E2E8F0]">
          <button
            onClick={() => setActiveTab("Basic Data")}
            className={`flex items-center justify-center gap-2 py-4 px-4 sm:px-6 text-[13px] font-bold transition-all border-b-2 whitespace-nowrap shrink-0 ${activeTab === "Basic Data" ? "border-[#635BFF] text-[#635BFF]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            Basic Data
          </button>
          <button
            onClick={() => setActiveTab("Appointments")}
            className={`flex items-center justify-center gap-2 py-4 px-4 sm:px-6 text-[13px] font-bold transition-all border-b-2 whitespace-nowrap shrink-0 ${activeTab === "Appointments" ? "border-[#635BFF] text-[#635BFF]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("Financial Information")}
            className={`flex items-center justify-center gap-2 py-4 px-4 sm:px-6 text-[13px] font-bold transition-all border-b-2 whitespace-nowrap shrink-0 ${activeTab === "Financial Information" ? "border-[#635BFF] text-[#635BFF]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            <Wallet className="w-4 h-4 shrink-0" />
            Financial Information
          </button>
          <button
            onClick={() => setActiveTab("Notes & Attachments")}
            className={`flex items-center justify-center gap-2 py-4 px-4 sm:px-6 text-[13px] font-bold transition-all border-b-2 whitespace-nowrap shrink-0 ${activeTab === "Notes & Attachments" ? "border-[#635BFF] text-[#635BFF]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
            Notes & Attachments
          </button>
          <button
            onClick={() => setActiveTab("Medical")}
            className={`flex items-center justify-center gap-2 py-4 px-4 sm:px-6 text-[13px] font-bold transition-all border-b-2 whitespace-nowrap shrink-0 ${activeTab === "Medical" ? "border-[#635BFF] text-[#635BFF]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M12 5 9.04 7.96a2.1 2.1 0 0 0 0 2.97l2.46 2.47a2.1 2.1 0 0 0 2.97 0l2.46-2.47a2.1 2.1 0 0 0 0-2.97L12 5Z" /></svg>
            Medical
          </button>
          <button
            onClick={() => setActiveTab("Communication Log")}
            className={`flex items-center justify-center gap-2 py-4 px-4 sm:px-6 text-[13px] font-bold transition-all border-b-2 whitespace-nowrap shrink-0 ${activeTab === "Communication Log" ? "border-[#635BFF] text-[#635BFF]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
            Communication Log
          </button>
        </div>
      </div>
      {activeTab === "Basic Data" && (
        <div className="space-y-6 pb-20">

          {/* Overview Cards */}
          <div>
            <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-4">Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#F5F3FF] p-5 rounded-lg flex flex-col justify-center h-28 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-[#635BFF] flex items-center justify-center text-white shrink-0">
                    <Wallet className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#1E293B]">Total Sales</span>
                </div>
                <div className="text-[1.5rem] font-bold text-[#1E293B] font-manrope mt-1">€ 23,850</div>
              </div>
              <div className="bg-[#F0FDFA] p-5 rounded-lg flex flex-col justify-center h-28 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-[#14B8A6] flex items-center justify-center text-white shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#1E293B]">Appointments</span>
                </div>
                <div className="text-[1.5rem] font-bold text-[#1E293B] font-manrope mt-1">18</div>
              </div>
              <div className="bg-[#FFF1F2] p-5 rounded-lg flex flex-col justify-center h-28 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-[#F43F5E] flex items-center justify-center text-white shrink-0">
                    <Ban className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#1E293B]">Canceled</span>
                </div>
                <div className="text-[1.5rem] font-bold text-[#1E293B] font-manrope mt-1">1</div>
              </div>
              <div className="bg-[#FEFCE8] p-5 rounded-lg flex flex-col justify-center h-28 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-[#EAB308] flex items-center justify-center text-white shrink-0">
                    <Minus className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#1E293B]">No-Show</span>
                </div>
                <div className="text-[1.5rem] font-bold text-[#1E293B] font-manrope mt-1">0</div>
              </div>
            </div>
          </div>

          {/* Personal Data & Full Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Personal Data */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 relative">
              <button className="absolute top-6 right-6 bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-3 py-1.5 rounded text-[11px] font-bold transition-colors">EDIT</button>
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-6">Personal data</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6">
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Date of birth</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">November 7, 1992</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Age</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">33 years old</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Gender</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">Female</div>
                </div>
                <div className="hidden sm:block"></div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Telephone</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">{client.telephone || "+33 536 999 572"}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Email</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">{client.email || "anna@bellavista.com"}</div>
                </div>
              </div>
            </div>

            {/* Full Address */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 relative">
              <button className="absolute top-6 right-6 bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-3 py-1.5 rounded text-[11px] font-bold transition-colors">EDIT</button>
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-6">Full Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6">
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Address</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">Independance Street 54/r</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">City</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">Bologna</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">Province</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">Bologna (BO)</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mb-1">CAP</div>
                  <div className="text-[12px] font-bold text-[#1E293B]">40129</div>
                </div>
              </div>
            </div>

          </div>

          {/* Waivers */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-6">Waivers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Card 1 */}
              <div className="border border-[#F1F5F9] rounded-[12px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <img src="/facebook.png" alt="Facebook" className="w-5 h-5 object-contain" />
                    <img src="/instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-[13px] font-medium text-[#635BFF]">Marketing consent</span>
                </div>
                <div
                  onClick={() => setIsMarketingConsent(!isMarketingConsent)}
                  className={`w-[34px] h-[18px] rounded-[6px] relative cursor-pointer transition-colors duration-200 ${isMarketingConsent ? 'bg-[#E0E7FF]' : 'bg-[#E2E8F0]'}`}
                >
                  <div className={`w-3.5 h-3.5 rounded-[4px] absolute top-[2px] transition-all duration-200 ${isMarketingConsent ? 'left-[18px] bg-[#635BFF]' : 'left-[2px] bg-[#94A3B8]'}`}></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-[#F1F5F9] rounded-[12px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/file.png" alt="File" className="w-5 h-5 object-contain" />
                  <span className="text-[13px] font-medium text-[#635BFF]">Social media posting</span>
                </div>
                <button className="bg-[#F0FDFA] text-[#14B8A6] px-3 py-1.5 rounded-lg text-[10px] font-medium hover:bg-[#CCFBF1] transition-colors">Sign Now</button>
              </div>

              {/* Card 3 */}
              <div className="border border-[#F1F5F9] rounded-[12px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/file.png" alt="File" className="w-5 h-5 object-contain" />
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-[#635BFF]">Social Media</span>
                    <span className="bg-[#F0FDF4] text-[#22C55E] text-[9px] font-medium px-2 py-0.5 rounded-full">Signed</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 flex items-center justify-center bg-[#F5F3FF] text-[#635BFF] rounded-lg hover:bg-[#EDE9FE] transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center bg-[#FFFBEB] text-[#FBBF24] rounded-lg hover:bg-[#FEF3C7] transition-colors">
                    <RefreshCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Preferences & Behavior */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 mb-6">
            <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-6">Preferences & Behavior</h3>

            <div className="space-y-8">

              {/* Preferred stylist/employee */}
              <div>
                <h4 className="text-[13px] font-bold text-[#334155] mb-4">Preferred stylist/employee</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 1, name: "Lola Ortega", role: "Staff", image: "/avatar/icon1.png", bgColor: "bg-[#FFE4E6]", alt: "Lola" },
                    { id: 2, name: "Virgie Sutton", role: "Staff", image: "/avatar/icon2.png", bgColor: "bg-[#F1F5F9]", alt: "Virgie" },
                    { id: 3, name: "Lois Gregory", role: "Staff", image: "/avatar/icon3.png", bgColor: "bg-[#CCFBF1]", alt: "Lois" },
                  ].map((staff) => (
                    <div key={staff.id} className="bg-white border border-[#F1F5F9] rounded-lg p-6 relative shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                      <button className="absolute top-4 right-4 text-[#F43F5E] opacity-50 hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className={`w-[72px] h-[72px] rounded-full ${staff.bgColor} mb-4 mx-auto flex items-center justify-center overflow-hidden`}>
                        <Image src={staff.image} alt={staff.alt} width={60} height={60} className="w-[60px] h-[60px] object-cover mix-blend-multiply" />
                      </div>
                      <div className="text-[14px] font-bold text-[#1E293B] text-center mb-0.5">{staff.name}</div>
                      <div className="text-[11px] text-[#94A3B8] font-medium text-center">{staff.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Services */}
                <div className="lg:col-span-2">
                  <h4 className="text-[13px] font-medium text-[#334155] mb-4">Services most frequently booked</h4>
                  <div className="space-y-2.5">
                    {[
                      { id: 1, name: "Haircuts" },
                      { id: 2, name: "Coloring" },
                      { id: 3, name: "Treatments" },
                    ].map((service, index) => (
                      <div key={service.id} className="bg-[#F8FAFC] rounded-[8px] px-3.5 py-4 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-[6px] bg-[#635BFF] text-white flex items-center justify-center text-[11px] font-medium shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-[12px] font-medium text-[#334155]">{service.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <h4 className="text-[13px] font-medium text-[#334155] mb-4">Preferred days/times</h4>
                  <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative">
                    <div className="space-y-4 relative">
                      <div className="absolute top-1 bottom-1 left-[70.5px] w-[1px] bg-[#E2E8F0]"></div>

                      <div className="flex items-center">
                        <div className="w-[55px] text-[11px] text-[#334155] font-medium text-right shrink-0">09:46 AM</div>
                        <div className="w-[32px] flex justify-center shrink-0 relative">
                          <div className="w-[10px] h-[10px] rounded-full bg-white border-[1.5px] border-[#635BFF] z-10 relative"></div>
                        </div>
                        <div className="text-[11px] font-medium text-[#334155]">Monday</div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-[55px] text-[11px] text-[#334155] font-medium text-right shrink-0">10:00 AM</div>
                        <div className="w-[32px] flex justify-center shrink-0 relative">
                          <div className="w-[10px] h-[10px] rounded-full bg-white border-[1.5px] border-[#06B6D4] z-10 relative"></div>
                        </div>
                        <div className="text-[11px] font-medium text-[#334155]">Tuesday</div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-[55px] text-[11px] text-[#334155] font-medium text-right shrink-0">12:00 AM</div>
                        <div className="w-[32px] flex justify-center shrink-0 relative">
                          <div className="w-[10px] h-[10px] rounded-full bg-white border-[1.5px] border-[#22C55E] z-10 relative"></div>
                        </div>
                        <div className="text-[11px] font-medium text-[#334155]">Thursday</div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-[55px] text-[11px] text-[#334155] font-medium text-right shrink-0">09:30 AM</div>
                        <div className="w-[32px] flex justify-center shrink-0 relative">
                          <div className="w-[10px] h-[10px] rounded-full bg-white border-[1.5px] border-[#FBBF24] z-10 relative"></div>
                        </div>
                        <div className="text-[11px] font-medium text-[#334155]">Friday</div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-[55px] text-[11px] text-[#334155] font-medium text-right shrink-0">09:30 AM</div>
                        <div className="w-[32px] flex justify-center shrink-0 relative">
                          <div className="w-[10px] h-[10px] rounded-full bg-white border-[1.5px] border-[#F43F5E] z-10 relative"></div>
                        </div>
                        <div className="text-[11px] font-medium text-[#334155]">Saturday</div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* History of Edit */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden mt-6">
            <div className="p-6 pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">History of edit</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Date / Time</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Field Changed</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Previous Value</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">New Value</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Edited By</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "5 Aug 2023, 09:44 AM", field: "Phone", prev: "+39 455 330 212", new: "+39 556 909 212", user: "Virgie Sutton", action: "Update", actionColor: "text-[#10B981] bg-[#DCFCE7]" },
                    { date: "5 Aug 2023, 09:44 AM", field: "Address", prev: "Independance Street 54/r", new: "Independance Street 54/r", user: "Virgie Sutton", action: "Update", actionColor: "text-[#10B981] bg-[#DCFCE7]" },
                    { date: "5 Aug 2023, 09:44 AM", field: "Email", prev: "anna@bellavista.com", new: "anna@gmail.com", user: "Lola Ortega", action: "Update", actionColor: "text-[#10B981] bg-[#DCFCE7]" },
                    { date: "5 Aug 2023, 09:44 AM", field: "Email", prev: "anna@gmail.com", new: "anna@bellavista.com", user: "Lola Ortega", action: "Update", actionColor: "text-[#10B981] bg-[#DCFCE7]" },
                    { date: "5 Aug 2023, 09:44 AM", field: "Profile Creation", prev: "-", new: "-", user: "Lola Gregory", action: "Created", actionColor: "text-[#635BFF] bg-[#EEF2FF]" }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors last:border-b-0">
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] text-[#64748B] font-medium">{row.date}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] text-[#1E293B] font-medium">{row.field}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] text-[#64748B] font-medium">{row.prev}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] text-[#64748B] font-medium">{row.new}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] text-[#1E293B] font-medium">{row.user}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.actionColor}`}>{row.action}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentHistoryPage}
              totalPages={2}
              totalItems={10}
              itemsPerPage={5}
              itemName="edits"
              onPageChange={setCurrentHistoryPage}
            />
          </div>
        </div>
      )}
      {activeTab === "Appointments" && (
        <div className="space-y-4 pb-20">

          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-[1.35rem] font-bold text-[#1E293B] font-manrope">Appointments</h2>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 w-full md:w-auto">
              {/* Amount Spent Functional Slider */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 w-full sm:w-auto">
                <span className="text-[14px] font-medium text-[#64748B] whitespace-nowrap mb-1 sm:mb-2.5">Amount Spent</span>
                <div className="flex flex-col w-full sm:w-[170px]">
                  {/* Slider Track */}
                  <div className="px-2 mb-3 relative">
                    <div className="relative h-[7px] bg-[#E0E7FF] rounded-full w-full">
                      <div
                        className="absolute h-full bg-[#635BFF] rounded-full"
                        style={{ left: `${(minSpent / maxPossibleSpent) * 100}%`, right: `${100 - (maxSpent / maxPossibleSpent) * 100}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxPossibleSpent}
                      value={minSpent}
                      onChange={handleMinChange}
                      className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[7px] pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#635BFF] z-10"
                    />
                    <input
                      type="range"
                      min="0"
                      max={maxPossibleSpent}
                      value={maxSpent}
                      onChange={handleMaxChange}
                      className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[7px] pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#635BFF] z-20"
                    />
                  </div>
                  {/* Inputs */}
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="number"
                      value={minSpent}
                      onChange={handleMinChange}
                      className="bg-white border border-[#E2E8F0] rounded-[8px] px-2 py-1.5 text-[14px] font-medium text-[#94A3B8] w-20 text-center outline-none focus:border-[#635BFF] transition-colors"
                    />
                    <span className="text-[#1E293B] font-medium">-</span>
                    <input
                      type="number"
                      value={maxSpent}
                      onChange={handleMaxChange}
                      className="bg-white border border-[#E2E8F0] rounded-[8px] px-2 py-1.5 text-[14px] font-medium text-[#94A3B8] w-20 text-center outline-none focus:border-[#635BFF] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Date Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => { setIsDateDropdownOpen(!isDateDropdownOpen); setIsStatusDropdownOpen(false); }}
                  className="flex items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[15px] text-[#334155] shadow-sm hover:border-[#CBD5E1] transition-colors w-full sm:w-[180px]"
                >
                  <span>{selectedDateFilter}</span>
                  <ChevronDown className="w-5 h-5 text-[#334155]" strokeWidth={2.5} />
                </button>
                {isDateDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[180px] bg-white border border-[#F1F5F9] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {dateOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          if (opt === "Custom Range") {
                            setIsCustomRangeModalOpen(true);
                            setIsDateDropdownOpen(false);
                          } else {
                            setSelectedDateFilter(opt);
                            setIsDateDropdownOpen(false);
                          }
                        }}
                        className="w-full text-left px-5 py-2.5 text-[16px] text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => { setIsStatusDropdownOpen(!isStatusDropdownOpen); setIsDateDropdownOpen(false); }}
                  className="flex items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[15px] text-[#334155] shadow-sm hover:border-[#CBD5E1] transition-colors w-full sm:min-w-[120px]"
                >
                  <span>{selectedStatusFilter}</span>
                  <ChevronDown className="w-5 h-5 text-[#334155]" strokeWidth={2.5} />
                </button>
                {isStatusDropdownOpen && (
                  <div className="absolute top-full right-0 md:left-0 md:right-auto mt-2 w-[160px] bg-white border border-[#F1F5F9] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSelectedStatusFilter(opt); setIsStatusDropdownOpen(false); }}
                        className="w-full text-left px-5 py-2.5 text-[16px] text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Click outside to close dropdowns hack (simple version) */}
          {(isDateDropdownOpen || isStatusDropdownOpen) && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => { setIsDateDropdownOpen(false); setIsStatusDropdownOpen(false); }}
            />
          )}

          {/* Appointments List */}
          <div className="space-y-3">
            {mockAppointments.map((apt, index) => {
              const isExpanded = expandedAppointment === index;
              return (
                <div key={index} className="bg-[#F8FAFC] rounded-lg border border-[#F1F5F9] overflow-hidden transition-all duration-300">
                  <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setExpandedAppointment(isExpanded ? null : index)}
                        className="p-1 text-[#94A3B8] hover:text-[#635BFF] transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <div className="bg-[#635BFF] text-white rounded-lg p-2 text-center w-14 h-14 flex flex-col items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold uppercase leading-tight">{apt.dateLine1}</span>
                        <span className="text-[12px] font-bold leading-tight">{apt.dateLine2}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[14px] font-bold text-[#1E293B]">{apt.title}</h4>
                          <span className={`${apt.statusColor} text-[10px] font-bold px-2 py-0.5 rounded-full`}>{apt.status}</span>
                        </div>
                        <div className="text-[11px] font-medium text-[#64748B] flex items-center gap-1">
                          {apt.details} •
                          <button onClick={() => setIsServicesModalOpen(true)} className="text-[#635BFF] hover:underline font-bold">List of Services</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-[#F1F5F9] pt-4 sm:pt-0 mt-4 sm:mt-0">
                      <div className="text-left sm:text-right">
                        <div className="text-[15px] font-bold text-[#1E293B]">{apt.price}</div>
                        <div className="text-[11px] text-[#94A3B8] font-medium">{apt.priceStatus}</div>
                      </div>
                      <button className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg text-[12px] font-bold transition-colors shadow-sm">
                        Checkout
                      </button>
                    </div>
                  </div>

                  {/* Expanded Booking Order UI */}
                  {isExpanded && (
                    <div className="border-t border-[#F1F5F9] bg-[#F8FAFC] p-6 pb-10 animate-in slide-in-from-top-2 duration-300 rounded-b-xl">
                      <h5 className="text-[13px] font-semibold text-[#334155] text-center mb-8">Booking Order</h5>

                      <div className="flex items-start justify-center max-w-sm mx-auto relative">
                        {/* Connecting Line */}
                        <div className="absolute top-[14px] left-[16.66%] right-[16.66%] h-[1.5px] bg-[#E2E8F0] z-0"></div>

                        {/* Step 1 */}
                        <div className="flex flex-col items-center flex-1 relative z-10">
                          <div className="w-[30px] h-[30px] rounded-full bg-[#FFFBEB] text-[#FBBF24] flex items-center justify-center text-[13px] font-medium mb-3 shadow-[0_0_0_4px_#F8FAFC]">
                            1
                          </div>
                          <div className="bg-[#FFFBEB] text-[#FBBF24] text-[11px] font-medium px-3.5 py-1 rounded-[10px] mb-3">Overdue</div>
                          <div className="text-[10px] text-[#94A3B8] font-medium mb-1">12:00-12:05</div>
                          <div className="text-[12px] font-semibold text-[#334155]">Shampoo</div>
                          <div className="text-[11px] text-[#94A3B8] font-medium">Angelica</div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center flex-1 relative z-10">
                          <div className="w-[30px] h-[30px] rounded-full bg-[#94A3B8] text-white flex items-center justify-center text-[13px] font-medium mb-3 shadow-[0_0_0_4px_#F8FAFC]">
                            2
                          </div>
                          <div className="bg-[#F1F5F9] text-[#475569] text-[11px] font-medium px-4 py-1 rounded-[10px] mb-3">To Do</div>
                          <div className="text-[10px] text-[#94A3B8] font-medium mb-1">12:00-12:05</div>
                          <div className="text-[12px] font-semibold text-[#334155]">Shampoo</div>
                          <div className="text-[11px] text-[#94A3B8] font-medium">Angelica</div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center flex-1 relative z-10">
                          <div className="w-[30px] h-[30px] rounded-full bg-[#94A3B8] text-white flex items-center justify-center text-[13px] font-medium mb-3 shadow-[0_0_0_4px_#F8FAFC]">
                            3
                          </div>
                          <div className="bg-[#F1F5F9] text-[#475569] text-[11px] font-medium px-4 py-1 rounded-[10px] mb-3">To Do</div>
                          <div className="text-[10px] text-[#94A3B8] font-medium mb-1">12:00-12:05</div>
                          <div className="text-[12px] font-semibold text-[#334155]">Shampoo</div>
                          <div className="text-[11px] text-[#94A3B8] font-medium">Angelica</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* List of Services Modal */}
          {isServicesModalOpen && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-lg w-full max-w-[500px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">List of Services</h3>
                  <button
                    onClick={() => setIsServicesModalOpen(false)}
                    className="text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9] p-1.5 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Shampoo", staff: "Angelica", time: "12:00-12:05", price: "€ 170" },
                    { title: "Haircut", staff: "Angelica", time: "12:05-12:50", price: "€ 170" },
                    { title: "Blow Dry", staff: "Angelica", time: "12:50-13:05", price: "€ 170" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9]">
                      <div>
                        <div className="text-[14px] font-bold text-[#1E293B] mb-0.5">{service.title}</div>
                        <div className="text-[12px] font-medium text-[#94A3B8]">{service.time} • {service.staff}</div>
                      </div>
                      <div className="text-[14px] font-bold text-[#1E293B]">{service.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Custom Range Date Picker Modal */}
          {isCustomRangeModalOpen && (
            <div
              className="fixed inset-0 bg-[#0F172A]/20 z-50 flex items-center justify-center p-4 backdrop-blur-[1px] animate-in fade-in duration-200"
              onClick={() => setIsCustomRangeModalOpen(false)}
            >
              <div
                className="bg-white rounded-[24px] w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-300 border border-[#F1F5F9] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8 px-2">
                  <button className="w-[36px] h-[36px] rounded-full border border-[#E0E7FF] flex items-center justify-center text-[#A5B4FC] hover:bg-[#EEF2FF] transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex-1 flex justify-center text-[17px] font-bold text-[#334155] tracking-wide">June 2024</div>
                  <div className="flex-1 flex justify-center text-[17px] font-bold text-[#334155] tracking-wide">July 2024</div>
                  <button className="w-[36px] h-[36px] rounded-full border border-[#E0E7FF] flex items-center justify-center text-[#A5B4FC] hover:bg-[#EEF2FF] transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                  {/* June */}
                  <div className="flex-1">
                    <div className="grid grid-cols-7 mb-5">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                        <div key={day} className="text-center text-[13px] font-medium text-[#94A3B8]">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2">
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(date => {
                        const isSelected = date >= 4 && date <= 8;
                        return (
                          <div key={date} className="flex justify-center items-center h-12">
                            <button className={`w-[42px] h-[42px] flex items-center justify-center rounded-full text-[16px] transition-colors ${isSelected ? 'bg-[#635BFF] text-white font-medium shadow-sm' : 'text-[#334155] hover:bg-[#F1F5F9]'}`}>
                              {date}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* July */}
                  <div className="flex-1">
                    <div className="grid grid-cols-7 mb-5">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                        <div key={day} className="text-center text-[13px] font-medium text-[#94A3B8]">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2">
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(date => {
                        return (
                          <div key={date} className="flex justify-center items-center h-12">
                            <button className="w-[42px] h-[42px] flex items-center justify-center rounded-full text-[16px] text-[#334155] hover:bg-[#F1F5F9] transition-colors">
                              {date}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {activeTab === "Financial Information" && (
        <div className="space-y-8 pb-20">

          {/* Analytics Section */}
          <div className="space-y-4">
            <h2 className="text-[14px] font-bold text-[#1E293B]">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-b from-[#635BFF4D] to-white rounded-lg p-5 border border-[#F1F5F9] shadow-[0_4px_20px_-10px_rgba(99,91,255,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center shadow-sm">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[13px] font-bold text-[#1E293B]">Total money Spent</span>
                </div>
                <div className="text-[24px] font-bold text-[#1E293B] font-manrope">{formattedTotalSpent}</div>
              </div>

              <div className="bg-gradient-to-b from-[#10B9814D] to-white rounded-lg p-5 border border-[#F1F5F9] shadow-[0_4px_20px_-10px_rgba(16,185,129,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#10B981] flex items-center justify-center shadow-sm">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[13px] font-bold text-[#1E293B]">Average Spent Per Visit</span>
                </div>
                <div className="text-[24px] font-bold text-[#1E293B] font-manrope">€ 258</div>
              </div>
            </div>
          </div>

          {/* Money Spent Chart */}
          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[14px] font-bold text-[#1E293B]">Money Spent</h3>
              <div className="relative">
                <button
                  onClick={() => setIsChartFilterDropdownOpen(!isChartFilterDropdownOpen)}
                  className="flex items-center justify-between gap-2 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[13px] font-bold text-[#1E293B] shadow-sm hover:bg-[#F8FAFC] transition-colors"
                >
                  <span>{chartFilter}</span>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                </button>
                {isChartFilterDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[150px] bg-white border border-[#F1F5F9] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {chartFilterOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setChartFilter(opt); setIsChartFilterDropdownOpen(false); }}
                        className="w-full text-left px-5 py-2.5 text-[14px] text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-[24px] font-bold text-[#1E293B] font-manrope mb-2">{currentChartData.total}</div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ECFDF5] text-[#10B981] text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <ChevronUp className="w-3 h-3" />
                  {currentChartData.change}
                </div>
                <span className="text-[12px] text-[#94A3B8] font-medium">vs previous period</span>
              </div>
            </div>

            {/* Functional Chart Area */}
            <div className="h-[200px] w-full">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* Breakdowns */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[13px] font-bold text-[#1E293B] mb-4">Breakdown by Employee</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F1F5F9] overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Staff${item}`} alt="Staff" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[12px] font-bold text-[#1E293B]">Barney</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-[#10B981]">€ 1,700</div>
                      <div className="text-[9px] font-medium text-[#94A3B8]">Total Earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-[#1E293B] mb-4">Breakdown by Service Type</h3>
              <div className="flex flex-col gap-3">
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center shadow-sm">
                      <span className="text-white text-[13px] font-bold">1</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#1E293B]">Haircuts</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#10B981]">€ 1,700</div>
                    <div className="text-[10px] font-medium text-[#94A3B8]">Total Earned</div>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center shadow-sm">
                      <span className="text-white text-[13px] font-bold">2</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#1E293B]">Coloring</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#10B981]">€ 1,700</div>
                    <div className="text-[10px] font-medium text-[#94A3B8]">Total Earned</div>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center shadow-sm">
                      <span className="text-white text-[13px] font-bold">3</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#1E293B]">Treatments</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#10B981]">€ 1,700</div>
                    <div className="text-[10px] font-medium text-[#94A3B8]">Total Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Receipts List */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-bold text-[#1E293B]">Receipts list</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Team Member</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Service</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Scheduled Date</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Price</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Payment Method</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "#0025", member: "Maria Rodriguez", service: "Haircut", date: "8 Aug 2025, 08:00 AM - 10:15 AM", price: "€ 170", payment: "Cash", status: "Pending" },
                    { id: "#0026", member: "Maria Rodriguez", service: "Haircut", date: "8 Aug 2025, 12:00 PM - 02:15 PM", price: "€ 170", payment: "Cash", status: "Returned" },
                    { id: "#0027", member: "Maria Rodriguez", service: "Haircut", date: "8 Aug 2025, 18:30 PM - 20:15 PM", price: "€ 170", payment: "On Card", status: "Returned" },
                    { id: "#0028", member: "Maria Rodriguez", service: "Haircut", date: "8 Aug 2025, 08:00 AM - 10:15 AM", price: "€ 170", payment: "Credit Card", status: "Paid" },
                    { id: "#0029", member: "Maria Rodriguez", service: "Haircut", date: "8 Aug 2025, 12:00 PM - 02:15 PM", price: "€ 170", payment: "Credit Card", status: "Pending" },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors last:border-b-0">
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] font-bold text-[#635BFF]">{row.id}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0]">
                        <div className="flex items-center gap-3">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.member}`} alt={row.member} className="w-7 h-7 rounded-full bg-[#EEF2FF]" />
                          <span className="text-[11px] font-bold text-[#1E293B]">{row.member}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] font-medium text-[#64748B]">{row.service}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] font-medium text-[#64748B]">{row.date}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0] text-[11px] font-bold text-[#1E293B]">{row.price}</td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0]">
                        <span className="text-[10px] font-bold text-[#10B981] border border-[#10B981]/30 bg-[#ECFDF5] px-2 py-1 rounded">{row.payment}</span>
                      </td>
                      <td className="px-6 py-4 border-r border-[#E2E8F0]">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${row.status === "Pending" ? "text-[#EAB308] bg-[#FEFCE8]" :
                          row.status === "Paid" ? "text-[#10B981] bg-[#DCFCE7]" :
                            "text-[#F43F5E] bg-[#FFE4E6]"
                          }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setSelectedReceipt(row); setIsPrintModalOpen(true); }}
                            className="p-1.5 bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] rounded-lg transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setSelectedReceipt(row); setIsDownloadModalOpen(true); }}
                            className="p-1.5 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors border border-[#E2E8F0]"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <Pagination
              currentPage={currentReceiptsPage}
              totalPages={3}
              totalItems={12}
              itemsPerPage={5}
              itemName="receipts"
              onPageChange={setCurrentReceiptsPage}
            />
          </div>

          {/* Gifts Cards */}
          <div className="space-y-6 bg-white rounded-lg shadow-sm border border-[#E2E8F0] px-5 py-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-[#1E293B]">Gifts Cards</h2>
              <Link href={`/dashboard/clients/${id}/gift-cards/add`} className="flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors">
                <Plus className="w-4 h-4" />
                Add Gift Card
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-300 rounded-full">
                    <Image src="/TotaltoStillSpend.png" alt="Total to Still Spend" width={20} height={10} className="w-10 h-10 object-contain" />
                  </div>
                  <span className="text-[15px] font-bold text-[#1E293B]">Total to Still Spend</span>
                </div>
                <div className="text-[22px] font-bold text-[#1E293B] font-manrope">€ 540</div>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-300 rounded-full">
                    <Image src="/TotalUsed.png" alt="Total Used" width={20} height={10} className="w-10 h-10 object-contain" />
                  </div>
                  <span className="text-[15px] font-bold text-[#1E293B]">Total Used</span>
                </div>
                <div className="text-[22px] font-bold text-[#1E293B] font-manrope">€ 1,440</div>
              </div>
            </div>

            {/* Gift Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((card) => (
                <div key={card} className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm relative group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[14px] font-bold text-[#1E293B]">€ 200</div>
                      <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">#002</div>
                    </div>
                    <button
                      onClick={() => setOpenGiftCardMenu(openGiftCardMenu === card ? null : card)}
                      className="text-[#94A3B8] hover:text-[#1E293B] transition-colors mt-0.5 relative z-20"
                    >
                      <MoreVertical className="w-[18px] h-[18px]" />
                    </button>
                    {/* Action Menu (Mock) */}
                    {openGiftCardMenu === card && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenGiftCardMenu(null)} />
                        <div className="absolute top-12 right-4 bg-white border border-[#F1F5F9] rounded-lg shadow-lg p-1 z-20 animate-in fade-in duration-200">
                          <Link href={`/dashboard/clients/${id}/gift-cards/view/${card}`} className="flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-[#635BFF] hover:bg-[#F8FAFC] rounded-lg transition-colors w-full text-left">
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </Link>
                          <button className="flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] rounded-lg transition-colors w-full text-left">
                            <FileText className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-[#F43F5E] hover:bg-[#FFE4E6] rounded-lg transition-colors w-full text-left">
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mb-5 flex-grow flex items-center justify-center">
                    {card === 1 ? (
                      <img src="/cards/c1.png" alt="Gift Card" className="w-full h-auto object-contain drop-shadow-lg" />
                    ) : (
                      <img src="/cards/c3.png" alt="Gift Card" className="w-full h-auto object-contain drop-shadow-lg" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    {card === 1 ? (
                      <span className="bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold px-3 py-1 rounded-full">Used</span>
                    ) : (
                      <>
                        <span className="bg-[#FEFCE8] text-[#EAB308] text-[10px] font-bold px-3 py-1 rounded-full">No-Used</span>
                        <span className="border border-[#10B981] text-[#10B981] bg-white text-[10px] font-bold px-3 py-1 rounded-full">Active</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Notes & Attachments" && (
        <div className="space-y-6 pb-20">
          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-5 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[14px] font-bold text-[#1E293B] font-manrope">Notes</h2>
              <button onClick={() => setIsAddNoteModalOpen(true)} className="flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors">
                <Plus className="w-4 h-4" />
                Add Note
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Notes</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#1E293B] font-manrope text-center w-[180px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((item) => (
                    <tr key={item} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors last:border-b-0">
                      <td className="px-6 py-4 border-r border-[#E2E8F0]">
                        <h4 className="text-[13px] font-bold text-[#1E293B] mb-2">Title</h4>
                        <p className="text-[12px] font-medium text-[#94A3B8] mb-3 leading-[1.6] max-w-4xl">
                          Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#94A3B8]">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>1</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setSelectedNote(item); setIsViewNoteModalOpen(true); }} className="w-[34px] h-[34px] rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors shadow-sm">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="w-[34px] h-[34px] rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center hover:bg-[#DCFCE7] transition-colors shadow-sm">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="w-[34px] h-[34px] rounded-lg bg-[#FFF1F2] text-[#F43F5E] flex items-center justify-center hover:bg-[#FFE4E6] transition-colors shadow-sm">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-[18px] font-bold text-[#1E293B] font-manrope">Media</h2>
              <button onClick={() => setIsUploadMediaModalOpen(true)} className="flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors w-full sm:w-auto justify-center">
                <Plus className="w-4 h-4" />
                Upload Media
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-8">
              <div>
                <span className="block text-[11px] font-medium text-[#94A3B8] mb-2.5">File Type</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {["All type", "Photo", "Video"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveMediaFilter(type)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors ${activeMediaFilter === type ? 'bg-[#EEF2FF] text-[#635BFF] border border-[#635BFF]' : 'bg-transparent text-[#64748B] hover:bg-[#F1F5F9] border border-transparent'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-[11px] font-medium text-[#94A3B8] mb-2.5">Date</span>
                <div className="relative">
                  <button
                    onClick={() => setIsMediaDateDropdownOpen(!isMediaDateDropdownOpen)}
                    className="flex items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[12px] font-bold text-[#334155] shadow-sm hover:border-[#CBD5E1] transition-colors min-w-[140px]"
                  >
                    <span>{selectedMediaDateFilter}</span>
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  </button>
                  {isMediaDateDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full min-w-[140px] bg-white border border-[#F1F5F9] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {mediaDateOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSelectedMediaDateFilter(opt); setIsMediaDateDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((media) => (
                  <div key={media.id} className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-[14px] font-bold text-[#1E293B]">{media.fileName}</h4>
                        <p className="text-[11px] font-medium text-[#94A3B8] mt-1">Uploaded at {media.date}</p>
                      </div>
                      <button className="text-[#94A3B8] hover:text-[#1E293B] p-1 -mr-1 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {media.type === "Photo" ? (
                      <div className="w-full h-[220px] rounded-lg overflow-hidden bg-[#F1F5F9]">
                        <img src={media.url} alt="Media" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-[220px] rounded-lg overflow-hidden bg-black relative group-hover:shadow-md transition-all flex items-center justify-center">
                        <video
                          src={media.url}
                          poster={media.thumbnail}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                    <Search className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  <h3 className="text-[14px] font-bold text-[#1E293B]">No Media Found</h3>
                  <p className="text-[12px] font-medium text-[#94A3B8] mt-1">Try selecting a different file type or date range.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Medical Section */}
      {activeTab === "Medical" && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-5 sm:p-7 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-[16px] font-bold text-[#1E293B] font-manrope">Medical / Personal Notes</h2>
            <button onClick={() => setIsAddAllergieModalOpen(true)} className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[12px] font-bold transition-colors flex items-center gap-1.5 shadow-sm">
              <Plus className="w-4 h-4" /> Add Allergie
            </button>
          </div>

          <div className="space-y-4">
            {/* Mild Card */}
            <div className="bg-[#F8F9FE] border border-[#A5B4FC] rounded-lg p-5 shadow-sm relative group">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[14px] font-bold text-[#1E293B]">Fragrances Allergie</h4>
                <button className="text-[#94A3B8] hover:text-[#1E293B] p-1 -mr-1 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[12px] text-[#94A3B8] font-medium leading-relaxed mb-4 max-w-[90%]">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <span className="inline-block bg-[#635BFF] text-white px-3 py-1.5 rounded-full text-[10px] font-bold">
                Mild
              </span>
            </div>

            {/* Moderate Card */}
            <div className="bg-[#FEFCE8] border border-[#FDE047] rounded-lg p-5 shadow-sm relative group">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[14px] font-bold text-[#1E293B]">Fragrances Allergie</h4>
                <button className="text-[#94A3B8] hover:text-[#1E293B] p-1 -mr-1 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[12px] text-[#94A3B8] font-medium leading-relaxed mb-4 max-w-[90%]">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <span className="inline-block bg-[#FACC15] text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm">
                Moderate
              </span>
            </div>

            {/* Severe Card */}
            <div className="bg-[#FFF1F2] border border-[#FDA4AF] rounded-lg p-5 shadow-sm relative group">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[14px] font-bold text-[#1E293B]">Fragrances Allergie</h4>
                <button className="text-[#94A3B8] hover:text-[#1E293B] p-1 -mr-1 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[12px] text-[#94A3B8] font-medium leading-relaxed mb-4 max-w-[90%]">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <span className="inline-block bg-[#FB7185] text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm">
                Severe
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Communication Log Section */}
      {activeTab === "Communication Log" && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-[16px] font-bold text-[#1E293B] font-manrope">Communication Log</h2>
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#94A3B8]">
              <span>Last time contacted:</span>
              <span className="bg-[#EEF2FF] text-[#635BFF] px-3 py-1 rounded-full font-bold">07/08/2025 (via WhatsApp, by Maria)</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 mb-6">
            <div>
              <span className="block text-[11px] font-medium text-[#94A3B8] mb-2">Channel</span>
              <div className="relative">
                <select
                  value={activeCommChannelFilter}
                  onChange={(e) => setActiveCommChannelFilter(e.target.value)}
                  className="appearance-none bg-transparent border border-[#E2E8F0] rounded-lg px-4 py-1.5 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] focus:outline-none focus:border-[#635BFF] transition-colors w-[130px] pr-8"
                >
                  <option value="All">All</option>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="block text-[11px] font-medium text-[#94A3B8] mb-2">Status</span>
                <div className="relative">
                  <select
                    value={activeCommStatusFilter}
                    onChange={(e) => setActiveCommStatusFilter(e.target.value)}
                    className="appearance-none bg-transparent border border-[#E2E8F0] rounded-lg px-4 py-1.5 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] focus:outline-none focus:border-[#635BFF] transition-colors w-[130px] pr-8"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Sent">Sent</option>
                    <option value="Read">Read</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-[#94A3B8] mb-2">Date Range</span>
                <div className="relative">
                  <select
                    value={activeCommDateFilter}
                    onChange={(e) => setActiveCommDateFilter(e.target.value)}
                    className="appearance-none bg-transparent border border-[#E2E8F0] rounded-lg px-4 py-1.5 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] focus:outline-none focus:border-[#635BFF] transition-colors w-[130px] pr-8"
                  >
                    <option value="All Time">All Time</option>
                    <option value="07/08/2025">07/08/2025</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg overflow-x-auto mb-6">
            <div className="flex flex-col min-w-[700px]">
              {commLogsPaginated.map((log, index) => (
                <div key={log.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 ${index !== commLogsPaginated.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
                  <div className="flex items-start md:items-center gap-4">
                    <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 ${log.channel === "WhatsApp" ? "bg-[#DCFCE7] text-[#16A34A]" :
                      log.channel === "Email" ? "bg-[#EEF2FF] text-[#635BFF]" :
                        "bg-[#FEFCE8] text-[#EAB308]"
                      }`}>
                      {log.channel === "WhatsApp" && <MessageCircle className="w-4 h-4" />}
                      {log.channel === "Email" && <Mail className="w-4 h-4" />}
                      {log.channel === "SMS" && <MessageSquare className="w-4 h-4" />}
                    </div>

                    <div>
                      <h4 className="text-[13px] font-bold text-[#1E293B] mb-1.5">{log.title}</h4>
                      <div className="flex items-center gap-3 text-[11px] font-medium text-[#94A3B8]">
                        {log.employee !== "System" ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full overflow-hidden">
                              <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[#64748B]">{log.employee}</span>
                          </div>
                        ) : (
                          <span className="text-[#64748B]">System</span>
                        )}
                        <span>{log.date}</span>
                        <span>{log.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${log.status === "Delivered" ? "bg-[#EEF2FF] text-[#635BFF]" :
                      log.status === "Sent" ? "bg-[#CCFBF1] text-[#14B8A6]" :
                        log.status === "Read" ? "bg-[#DCFCE7] text-[#16A34A]" :
                          "bg-[#FFE4E6] text-[#F43F5E]"
                      }`}>
                      {log.status}
                    </span>

                    {/* Source Badge */}
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-bold ${log.source === "Staff Member" ? "border-[#635BFF] text-[#635BFF]" :
                      "border-[#14B8A6] text-[#14B8A6]"
                      }`}>
                      {log.source}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedCommLog(log); setIsCommLogModalOpen(true); }} className="w-[30px] h-[30px] rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors shadow-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                      {log.status === "Sent" && (
                        <button className="w-[30px] h-[30px] rounded-lg border border-[#E2E8F0] text-[#635BFF] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors shadow-sm">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Pagination
              currentPage={currentCommLogPage}
              totalPages={commLogsTotalPages}
              totalItems={commLogsTotalItems}
              itemsPerPage={COMM_LOGS_PER_PAGE}
              itemName="logs"
              onPageChange={setCurrentCommLogPage}
            />
          </div>
        </div>
      )}

      {/* Receipt Print Modal */}
      {isPrintModalOpen && selectedReceipt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[400px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Print Receipt</h3>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#EEF2FF] text-[#635BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Printer className="w-8 h-8" />
              </div>
              <h4 className="text-[16px] font-bold text-[#1E293B] mb-1">Receipt {selectedReceipt.id}</h4>
              <p className="text-[13px] font-medium text-[#64748B]">Ready to print receipt for {selectedReceipt.price}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsPrintModalOpen(false)} className="flex-1 bg-white border border-[#E2E8F0] text-[#1E293B] py-3 rounded-lg text-[14px] font-bold hover:bg-[#F8FAFC] transition-colors shadow-sm">
                Cancel
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#635BFF] text-white py-3 rounded-lg text-[14px] font-bold hover:bg-[#524be0] transition-colors shadow-sm">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Download Modal */}
      {isDownloadModalOpen && selectedReceipt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[400px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Download Receipt</h3>
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F0FDF4] text-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="text-[16px] font-bold text-[#1E293B] mb-1">Receipt {selectedReceipt.id}</h4>
              <p className="text-[13px] font-medium text-[#64748B]">Download PDF receipt for {selectedReceipt.price}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsDownloadModalOpen(false)} className="flex-1 bg-white border border-[#E2E8F0] text-[#1E293B] py-3 rounded-lg text-[14px] font-bold hover:bg-[#F8FAFC] transition-colors shadow-sm">
                Cancel
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#16A34A] text-white py-3 rounded-lg text-[14px] font-bold hover:bg-[#15803d] transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Add Note</h3>
              <button onClick={() => setIsAddNoteModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Title *</label>
                <input type="text" placeholder="Enter title" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all" />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Description *</label>
                <textarea rows={4} placeholder="Enter note" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all resize-none"></textarea>
              </div>

              <div className="border border-dashed border-[#635BFF] bg-[#F8F9FE] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#EEF2FF] transition-colors group">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm text-[#635BFF] group-hover:scale-105 transition-transform border border-[#E2E8F0]">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-[13px] font-bold text-[#635BFF]">Drop here or click to browse</p>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setIsAddNoteModalOpen(false)} className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors shadow-sm">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Note Modal */}
      {isViewNoteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">View Note</h3>
              <button onClick={() => setIsViewNoteModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Title</label>
                <p className="text-[13px] font-medium text-[#94A3B8]">Title here</p>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Description</label>
                <p className="text-[13px] font-medium text-[#94A3B8] leading-[1.6]">
                  Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-3">Attachments</label>
                <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#635BFF] border border-[#E2E8F0] shadow-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#635BFF]">originalname.pdf</h4>
                      <p className="text-[11px] font-medium text-[#94A3B8]">4.2 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] text-[#635BFF] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] text-[#635BFF] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Media Modal */}
      {isUploadMediaModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Upload Media</h3>
              <button onClick={() => setIsUploadMediaModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Title *</label>
                <input type="text" placeholder="Enter title" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all" />
              </div>

              <div className="border border-dashed border-[#635BFF] bg-[#F8F9FE] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#EEF2FF] transition-colors group">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm text-[#635BFF] group-hover:scale-105 transition-transform border border-[#E2E8F0]">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-[13px] font-bold text-[#635BFF]">Drop here or click to browse</p>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setIsUploadMediaModalOpen(false)} className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors shadow-sm">
                  Save Media
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Log Modal */}
      {isCommLogModalOpen && selectedCommLog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Communication Log</h3>
              <button onClick={() => setIsCommLogModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
              {/* Header Info */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedCommLog.channel === "WhatsApp" ? "bg-[#DCFCE7] text-[#16A34A]" :
                  selectedCommLog.channel === "Email" ? "bg-[#EEF2FF] text-[#635BFF]" :
                    "bg-[#FEFCE8] text-[#EAB308]"
                  }`}>
                  {selectedCommLog.channel === "WhatsApp" && <MessageCircle className="w-5 h-5" />}
                  {selectedCommLog.channel === "Email" && <Mail className="w-5 h-5" />}
                  {selectedCommLog.channel === "SMS" && <MessageSquare className="w-5 h-5" />}
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B] leading-tight">{selectedCommLog.title}</h4>
              </div>

              {/* Informations Block */}
              <div>
                <h5 className="text-[12px] font-bold text-[#1E293B] mb-4">Informations</h5>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  <div>
                    <span className="block text-[11px] font-medium text-[#94A3B8] mb-1">Sent by</span>
                    <div className="flex items-center gap-2">
                      {selectedCommLog.employee !== "System" && (
                        <div className="w-5 h-5 rounded-full overflow-hidden">
                          <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <span className="text-[12px] font-bold text-[#1E293B]">{selectedCommLog.employee}</span>
                      <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${selectedCommLog.source === "Staff Member" ? "border-[#635BFF] text-[#635BFF]" :
                        "border-[#14B8A6] text-[#14B8A6]"
                        }`}>
                        {selectedCommLog.source}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#94A3B8] mb-1">Time</span>
                    <span className="text-[13px] font-medium text-[#1E293B]">{selectedCommLog.time}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#94A3B8] mb-1">Date</span>
                    <span className="text-[13px] font-medium text-[#1E293B]">{selectedCommLog.date}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#94A3B8] mb-1">Status</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block mt-0.5 ${selectedCommLog.status === "Delivered" ? "bg-[#EEF2FF] text-[#635BFF]" :
                      selectedCommLog.status === "Sent" ? "bg-[#CCFBF1] text-[#14B8A6]" :
                        selectedCommLog.status === "Read" ? "bg-[#DCFCE7] text-[#16A34A]" :
                          "bg-[#FFE4E6] text-[#F43F5E]"
                      }`}>
                      {selectedCommLog.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Block */}
              <div>
                <h5 className="text-[12px] font-bold text-[#1E293B] mb-4">Content</h5>

                {selectedCommLog.channel === "WhatsApp" || selectedCommLog.channel === "SMS" ? (
                  <div className="space-y-4 pt-2">
                    {/* Client Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#E2E8F0]">
                        <img src="https://i.pravatar.cc/150?img=32" alt="Client" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94A3B8] font-medium mb-1">Maria, 2 hours ago</div>
                        <div className="bg-[#F1F5F9] text-[#334155] text-[13px] px-4 py-2.5 rounded-lg rounded-tl-sm inline-block">
                          If I don't like something, I'll stay away from it.
                        </div>
                      </div>
                    </div>
                    {/* Staff Message */}
                    <div className="flex gap-3 flex-row-reverse text-right">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#E2E8F0]">
                        <img src="https://i.pravatar.cc/150?img=47" alt="Staff" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94A3B8] font-medium mb-1">Staff, 1 hour ago</div>
                        <div className="bg-[#EEF2FF] text-[#635BFF] text-[13px] px-4 py-2.5 rounded-lg rounded-tr-sm inline-block text-left">
                          I sent more detailed information.
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F8F9FE] border border-[#E2E8F0] rounded-lg p-5">
                    <h6 className="text-[13px] font-bold text-[#1E293B] mb-2">Title</h6>
                    <p className="text-[13px] text-[#64748B] leading-[1.6]">
                      Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-6 mt-2 border-t border-[#F1F5F9] shrink-0">
              <button onClick={() => setIsCommLogModalOpen(false)} className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors">
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Allergie Modal */}
      {isAddAllergieModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Add Allergie</h3>
              <button onClick={() => setIsAddAllergieModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Title *</label>
                <input type="text" placeholder="e.g. Fragrances Allergie" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all" />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Description *</label>
                <textarea rows={4} placeholder="Enter allergie details..." className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all resize-none"></textarea>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Severity *</label>
                <div className="relative">
                  <select defaultValue="" className="appearance-none w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white pr-10">
                    <option value="" disabled>Select severity...</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setIsAddAllergieModalOpen(false)} className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors shadow-sm">
                  Save Allergie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

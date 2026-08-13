"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
  EllipsisVertical,
  Eye,
  Pencil,
  Ban,
  Download,
  Printer,
} from "lucide-react";

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type Method = "Cash" | "Card Terminal" | "Gift Card" | "Online Payment";
type Status = "Issued" | "Draft" | "Canceled";

interface Receipt {
  id: string;
  date: string;
  clientName: string;
  clientEmail: string;
  amount: string;
  methods: Method[];
  status: Status;
}

// â”€â”€ Static Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const allReceipts: Receipt[] = [
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Cash"],
    status: "Issued",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Card Terminal"],
    status: "Issued",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Gift Card"],
    status: "Draft",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Online Payment"],
    status: "Canceled",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Online Payment"],
    status: "Canceled",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Cash"],
    status: "Draft",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Gift Card", "Cash"],
    status: "Issued",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Card Terminal"],
    status: "Issued",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Card Terminal"],
    status: "Issued",
  },
  {
    id: "#000",
    date: "5 Aug 2025, 12:30",
    clientName: "Maria Rodriguez",
    clientEmail: "maria@beautywellness.com",
    amount: "â‚¬ 2,300",
    methods: ["Cash"],
    status: "Issued",
  },
];

// â”€â”€ Method Badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const methodStyles: Record<Method, string> = {
  Cash: "bg-[#E6FAF0] text-[#36C76C]",
  "Card Terminal": "bg-[#E0FAFA] text-[#16CDC7]",
  "Gift Card": "bg-[#EDE9FF] text-[#9B8AFB]",
  "Online Payment": "bg-[#FFF3E0] text-[#FFA726]",
};

function MethodBadge({ method }: { method: Method }) {
  return (
    <span
      className={`inline-block w-fit text-xs font-manrope font-medium px-2.5 py-1 rounded-[8px] ${methodStyles[method]}`}
    >
      {method}
    </span>
  );
}

// â”€â”€ Status Badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const statusStyles: Record<Status, string> = {
  Issued: "bg-[#635BFF] text-white",
  Draft: "bg-[#FFD648] text-white",
  Canceled: "bg-[#FF6692] text-white",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block text-xs font-manrope font-semibold px-3 py-1 rounded-[8px] w-fit ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// â”€â”€ Actions Dropdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ActionsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const items = [
    {
      icon: <Eye size={15} className="text-[#635BFF]" />,
      label: "View Receipt",
    },
    { icon: <Pencil size={15} className="text-[#526B7A]" />, label: "Edit" },
    { icon: <Ban size={15} className="text-[#FF6692]" />, label: "Cancel" },
    {
      icon: <Download size={15} className="text-[#526B7A]" />,
      label: "Download",
    },
    {
      icon: <Printer size={15} className="text-[#526B7A]" />,
      label: "Print Receipt",
    },
  ];

  return (
    <div className="relative flex justify-center" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
      >
        <EllipsisVertical size={16} className="text-[#526B7A]" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 bg-white rounded-xl shadow-lg border border-[#EFF4FA] py-1.5 w-44">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€ Mobile Receipt Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MobileReceiptCard({ row }: { row: Receipt }) {
  return (
    <div className="bg-white border border-[#E0E6EB] rounded-xl p-4 space-y-3">
      {/* Top row: ID + Status + Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-manrope text-[#635BFF]">
            {row.id}
          </span>
          <span className="text-xs font-manrope text-[#98A4AE]">
            {row.date}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={row.status} />
          <ActionsDropdown />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#EFF4FA]" />

      {/* Client */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-manrope text-[#98A4AE] mb-0.5">Client</p>
          <p className="text-sm font-semibold font-manrope text-[#29343D]">
            {row.clientName}
          </p>
          <p className="text-xs font-manrope text-[#98A4AE]">
            {row.clientEmail}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-manrope text-[#98A4AE] mb-0.5">Amount</p>
          <p className="text-sm font-semibold font-manrope text-[#29343D]">
            {row.amount}
          </p>
        </div>
      </div>

      {/* Methods */}
      <div>
        <p className="text-xs font-manrope text-[#98A4AE] mb-1.5">Method</p>
        <div className="flex flex-wrap gap-1.5">
          {row.methods.map((m) => (
            <MethodBadge key={m} method={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

// â”€â”€ Filter Methods â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const filterMethods = [
  "All",
  "Cash",
  "Card Terminal",
  "Gift Card",
  "Online P.",
];

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function ReceiptContent() {
  const [activeMethod, setActiveMethod] = useState("All");
  const [search, setSearch] = useState("");
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allReceipts.filter((r) => {
    const matchMethod =
      activeMethod === "All" ||
      r.methods.some((m) =>
        m.toLowerCase().includes(activeMethod.toLowerCase().replace(".", "")),
      );
    const matchSearch =
      r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.clientEmail.toLowerCase().includes(search.toLowerCase());
    return matchMethod && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope space-y-4 p-3 sm:p-4 lg:p-0">
      {/* â”€â”€ Header Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-white rounded-xl py-4 px-4 sm:px-6 border border-[#EFF4FA]">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h1 className="text-lg font-bold font-manrope text-[#29343D]">
            Receipts
          </h1>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hide "Import Receipts" text on very small screens, show icon only */}
            <button className="hidden sm:flex px-4 py-2 border border-[#E0E6EB] rounded-[8px] text-sm font-medium font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
              Import Receipts
            </button>
            <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope rounded-[8px] cursor-pointer">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Receipt</span>
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
          {/* Method filter â€” scrollable on mobile */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-manrope text-[#98A4AE] mb-2">Method</p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filterMethods.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setActiveMethod(m);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 text-sm font-manrope font-medium rounded-[6px] border transition-all cursor-pointer ${
                    activeMethod === m
                      ? "border-[#635BFF] text-[#635BFF] bg-white"
                      : "border-[#E0E6EB] text-[#526B7A] hover:border-[#635BFF] hover:text-[#635BFF]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="">
            <p className="text-xs font-manrope text-[#98A4AE] mb-2">
              Data Range
            </p>
            <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-[8px] px-3 py-1.5 cursor-pointer hover:border-[#635BFF] transition-colors w-fit">
              <span className="text-sm font-manrope text-[#29343D]">
                All Time
              </span>
              <ChevronDown size={14} className="text-[#98A4AE]" />
            </div>
          </div>
        </div>
      </div>

      {/* â”€â”€ Table / Cards Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden p-4 sm:p-6 lg:p-[30px]">
        {/* Search */}
        <div className="mb-4">
          <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-xl px-4 py-2.5 w-full sm:w-72">
            <Search size={15} className="text-[#98A4AE]" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 text-sm font-manrope text-[#29343D] outline-none placeholder:text-[#98A4AE]"
            />
          </div>
        </div>

        {/* â”€â”€ DESKTOP TABLE (md+) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="hidden md:block border border-[#E0E6EB] rounded-[12px] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
                {[
                  "ID",
                  "Date",
                  "Client",
                  "Ammount",
                  "Method",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-3.5 py-5 border-r border-[#E0E6EB] last:border-r-0 text-sm font-semibold font-manrope text-[#29343D] ${
                      h === "Actions" ? "text-center" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#E0E6EB] last:border-b-0 hover:bg-[#FAFBFF] transition-colors"
                >
                  <td className="px-3.5 py-5 border-r border-[#E0E6EB]">
                    <span className="text-sm font-semibold font-manrope text-[#635BFF]">
                      {row.id}
                    </span>
                  </td>
                  <td className="px-3.5 py-5 border-r border-[#E0E6EB]">
                    <span className="text-sm font-manrope text-[#526B7A]">
                      {row.date}
                    </span>
                  </td>
                  <td className="px-3.5 py-5 border-r border-[#E0E6EB]">
                    <p className="text-sm font-semibold font-manrope text-[#29343D]">
                      {row.clientName}
                    </p>
                    <p className="text-xs font-manrope text-[#98A4AE]">
                      {row.clientEmail}
                    </p>
                  </td>
                  <td className="px-3.5 py-5 border-r border-[#E0E6EB]">
                    <span className="text-sm font-manrope text-[#29343D]">
                      {row.amount}
                    </span>
                  </td>
                  <td className="px-3.5 py-5 border-r border-[#E0E6EB]">
                    <div className="flex flex-col gap-1">
                      {row.methods.map((m) => (
                        <MethodBadge key={m} method={m} />
                      ))}
                    </div>
                  </td>
                  <td className="px-3.5 py-5 border-r border-[#E0E6EB]">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-3.5 py-5 text-center">
                    <ActionsDropdown />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* â”€â”€ MOBILE CARDS (< md) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="md:hidden space-y-3">
          {paginated.map((row, i) => (
            <MobileReceiptCard key={i} row={row} />
          ))}
        </div>

        {/* â”€â”€ Pagination â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-8 px-1 py-3.5 mt-2">
          <div className="flex items-center gap-2 text-sm font-manrope text-[#526B7A]">
            <span className="hidden sm:inline">Items per page:</span>
            <div className="flex items-center gap-1 border border-[#E0E6EB] rounded-[6px] px-2.5 py-1 cursor-pointer">
              <span>{itemsPerPage}</span>
              <ChevronDown size={12} className="text-[#98A4AE]" />
            </div>
          </div>
          <span className="text-sm font-manrope text-[#526B7A]">
            {(currentPage - 1) * itemsPerPage + 1}â€“
            {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronFirst size={24} className="text-[#526B7A]" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} className="text-[#526B7A]" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronRight size={24} className="text-[#526B7A]" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronLast size={24} className="text-[#526B7A]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

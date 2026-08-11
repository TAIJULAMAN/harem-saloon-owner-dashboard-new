"use client";

import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Download,
  Plus,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddStockModal from "@/components/saloonOwner/inventory/stock/AddStockModal";
import EditStockModal from "@/components/saloonOwner/inventory/stock/EditStockModal";
import DeleteStockModal from "@/components/saloonOwner/inventory/stock/DeleteStockModal";
import { inventoryStatCardsData } from "./data";
import TopSellingRetailChart from "@/components/saloonOwner/dashboard/Charts/TopSellingRetailChart";
import DeadStockTable from "@/components/saloonOwner/dashboard/Charts/DeadStockTable";

interface StockMovement {
  id: string;
  date: string;
  type: "In" | "Out";
  sku: string;
  productName: string;
  quantity: number;
  status: "In Stock" | "Out of Stock";
  price: number;
}

const MOCK_STOCKS: StockMovement[] = [
  { id: "1", date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 10, status: "In Stock", price: 270 },
  { id: "2", date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Body Lotion", quantity: 1, status: "Out of Stock", price: 270 },
  { id: "3", date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 1, status: "In Stock", price: 270 },
  { id: "4", date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 4, status: "In Stock", price: 270 },
  { id: "5", date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 0, status: "Out of Stock", price: 270 },
  { id: "6", date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 6, status: "In Stock", price: 270 },
  { id: "7", date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 7, status: "In Stock", price: 270 },
  { id: "8", date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Body Lotion", quantity: 2, status: "In Stock", price: 270 },
  { id: "9", date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", quantity: 1, status: "In Stock", price: 270 },
];

const ActionMenu = ({
  stock,
  onView,
  onEdit,
  onDelete,
}: {
  stock: StockMovement;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors flex items-center justify-center"
      >
        <MoreVertical className="w-5 h-5 text-[#64748B]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0] z-50 overflow-hidden py-1">
          <button
            onClick={() => { setIsOpen(false); onView(); }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
          >
            <Eye className="w-4 h-4 text-[#635BFF]" />
            View Details
          </button>
          <button
            onClick={() => { setIsOpen(false); onEdit(); }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
          >
            <Edit2 className="w-4 h-4 text-[#38BDF8]" />
            Edit
          </button>
          <button
            onClick={() => { setIsOpen(false); onDelete(); }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
          >
            <Trash2 className="w-4 h-4 text-[#FB7185]" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default function StockPage() {
  const router = useRouter();
  const [stocks, setStocks] = useState<StockMovement[]>(MOCK_STOCKS);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeStock, setActiveStock] = useState<StockMovement | null>(null);

  const handleAddStock = (data: any) => {
    setStocks([data, ...stocks]);
  };

  const handleEditStock = (data: any) => {
    setStocks(stocks.map(s => s.id === data.id ? data : s));
  };

  const handleDeleteStock = () => {
    if (activeStock) {
      setStocks(stocks.filter(s => s.id !== activeStock.id));
      setActiveStock(null);
    }
    setIsDeleteModalOpen(false);
  };

  const [activeMovement, setActiveMovement] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredStocks = stocks.filter((stock) => {
    const matchesMovement = activeMovement === "All" || (activeMovement === "Stock In" && stock.type === "In") || (activeMovement === "Stock Out" && stock.type === "Out");
    const matchesStatus = activeStatus === "All" || stock.status === activeStatus;
    // Mock category matching since it's not in the data schema
    const matchesCategory = activeCategory === "All";
    return matchesMovement && matchesStatus && matchesCategory;
  });

  const totalItems = filteredStocks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStocks = filteredStocks.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeMovement, activeCategory, activeStatus, itemsPerPage]);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-[#E2E8F0] space-y-8">

        {/* Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Stock In / Stock Out</h1>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#475569] outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#475569] outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <option value="All">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <button className="w-full md:w-auto justify-center bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Movement
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Overview Section */}
      <div className="mb-8 mt-2">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">Analytics Overview</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {inventoryStatCardsData.map((card) => (
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
          <TopSellingRetailChart />
          <DeadStockTable />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">Date</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">Type</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">SKU</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">Product Name</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">Quantity</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">Price</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStocks.map((stock) => (
                <tr key={stock.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[#1E293B] font-semibold text-[13px] whitespace-nowrap">{stock.date}</span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-2">
                      {stock.type === "In" ? (
                        <>
                          <ArrowDown className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span className="text-[#1E293B] font-medium text-[13px]">In</span>
                        </>
                      ) : (
                        <>
                          <ArrowUp className="w-3.5 h-3.5 text-[#F43F5E]" />
                          <span className="text-[#1E293B] font-medium text-[13px]">Out</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[#64748B] font-semibold text-[13px] whitespace-nowrap">{stock.sku}</span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                      <span className="text-[#1E293B] font-bold text-[13px] whitespace-nowrap">{stock.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[#64748B] font-semibold text-[13px]">{stock.quantity}</span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    {stock.status === "In Stock" ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#16A34A] whitespace-nowrap">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FFE4E6] text-[#E11D48] whitespace-nowrap">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="text-[#1E293B] font-medium text-[13px] whitespace-nowrap">€ {stock.price}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ActionMenu
                      stock={stock}
                      onView={() => router.push(`/dashboard/inventory/stock/${stock.id}`)}
                      onEdit={() => { setActiveStock(stock); setIsEditModalOpen(true); }}
                      onDelete={() => { setActiveStock(stock); setIsDeleteModalOpen(true); }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemName="stock records"
          onPageChange={setCurrentPage}
        />
      </div>

      <AddStockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddStock}
      />
      <EditStockModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditStock}
        initialData={activeStock}
      />
      <DeleteStockModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteStock}
      />
    </div>
  );
}

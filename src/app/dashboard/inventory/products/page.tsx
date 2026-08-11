"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  Download,
  Plus,
  Search,
  MoreVertical
} from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddProductModal from "@/components/saloonOwner/inventory/products/AddProductModal";
import ViewProductModal from "@/components/saloonOwner/inventory/products/ViewProductModal";
import EditProductModal from "@/components/saloonOwner/inventory/products/EditProductModal";
import DeleteProductModal from "@/components/saloonOwner/inventory/products/DeleteProductModal";

interface Product {
  id: string;
  name: string;
  category: string;
  stockAmount: number;
  priority: "Low" | "Medium" | "High";
  status: "In Stock" | "Out of Stock";
  price: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Curology Face wash", category: "Category 1", stockAmount: 10, priority: "Low", status: "In Stock", price: 270 },
  { id: "2", name: "Body Lotion", category: "Category 2", stockAmount: 0, priority: "High", status: "Out of Stock", price: 270 },
  { id: "3", name: "Curology Face wash", category: "Category 3", stockAmount: 1, priority: "Medium", status: "In Stock", price: 270 },
  { id: "4", name: "Curology Face wash", category: "Category 3", stockAmount: 4, priority: "Medium", status: "In Stock", price: 270 },
  { id: "5", name: "Curology Face wash", category: "Category 4", stockAmount: 0, priority: "Medium", status: "Out of Stock", price: 270 },
  { id: "6", name: "Curology Face wash", category: "Category 3", stockAmount: 6, priority: "Medium", status: "In Stock", price: 270 },
  { id: "7", name: "Curology Face wash", category: "Category 3", stockAmount: 7, priority: "High", status: "In Stock", price: 270 },
  { id: "8", name: "Body Lotion", category: "Category 2", stockAmount: 2, priority: "High", status: "In Stock", price: 270 },
  { id: "9", name: "Curology Face wash", category: "Category 1", stockAmount: 1, priority: "High", status: "In Stock", price: 270 },
];

const ActionMenu = ({
  onView,
  onEdit,
  onDelete
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border border-[#E2E8F0] z-50 overflow-hidden">
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onView();
              }}
              className="w-full px-4 py-2 text-left text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4 text-[#635BFF]" />
              View Details
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onEdit();
              }}
              className="w-full px-4 py-2 text-left text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] flex items-center gap-2 transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#38BDF8]" />
              Edit
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onDelete();
              }}
              className="w-full px-4 py-2 text-left text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-[#F43F5E]" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const handleAddProduct = (data: any) => {
    setProducts([data, ...products]);
  };

  const handleEditProduct = (data: any) => {
    setProducts(products.map(p => p.id === data.id ? data : p));
  };

  const handleDeleteProduct = () => {
    if (activeProduct) {
      setProducts(products.filter(p => p.id !== activeProduct.id));
      setActiveProduct(null);
    }
    setIsDeleteModalOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriority, setActivePriority] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesPriority = activePriority === "All" || product.priority === activePriority;
    const matchesStatus = activeStatus === "All" || product.status === activeStatus;
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, activePriority, activeStatus, itemsPerPage]);

  const getPriorityStyle = (priority: Product["priority"]) => {
    switch (priority) {
      case "Low": return "bg-[#22C55E] text-white";
      case "Medium": return "bg-[#FBBF24] text-white";
      case "High": return "bg-[#F43F5E] text-white";
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-[#E2E8F0] space-y-8">

        {/* Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Products</h1>
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
              <option value="Category 4">Category 4</option>
            </select>
            <select
              value={activePriority}
              onChange={(e) => setActivePriority(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#475569] outline-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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

            <button onClick={() => router.push('/dashboard/inventory/products/import')} className="w-full md:w-auto justify-center bg-white border border-[#635BFF] hover:bg-[#F8FAFF] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center transition-colors whitespace-nowrap">
              Import Products
            </button>
            <button className="w-full md:w-auto justify-center bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">

        {/* Search Bar - Top of table container */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#94A3B8]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#635BFF] focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Product Name</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Category</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Stock Amount</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Priority</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Status</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] font-manrope">
                  Purchase Price <span className="text-[11px] font-medium text-[#64748B]">(VAT excluded)</span>
                </th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] text-center whitespace-nowrap font-manrope">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                      <span className="text-[#1E293B] font-bold text-[13px] whitespace-nowrap">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px] whitespace-nowrap">{product.category}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px]">{product.stockAmount}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${getPriorityStyle(product.priority)}`}>
                      {product.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    {product.status === "In Stock" ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] whitespace-nowrap">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFE4E6] text-[#E11D48] whitespace-nowrap">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#1E293B] font-medium text-[13px] whitespace-nowrap">€ {product.price}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ActionMenu
                      onView={() => router.push(`/dashboard/inventory/products/${product.id}`)}
                      onEdit={() => { setActiveProduct(product); setIsEditModalOpen(true); }}
                      onDelete={() => { setActiveProduct(product); setIsDeleteModalOpen(true); }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemName="products"
          onPageChange={setCurrentPage}
        />
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      />
      <ViewProductModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        productData={activeProduct}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProduct}
        initialData={activeProduct}
      />
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
}

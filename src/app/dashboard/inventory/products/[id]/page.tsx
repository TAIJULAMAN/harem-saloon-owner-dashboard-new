"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit2, Plus, Minus, Box } from "lucide-react";
import Modal from "@/components/saloonOwner/common/Modal";
import EditProductModal from "@/components/saloonOwner/inventory/products/EditProductModal";

export default function ViewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [stockAmount, setStockAmount] = useState(10);
  const [minStockAmount, setMinStockAmount] = useState(5);
  const [isAddBarcodeModalOpen, setIsAddBarcodeModalOpen] = useState(false);
  const [newBarcode, setNewBarcode] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const productData = {
    id: unwrappedParams.id,
    name: "Curology Face wash",
    category: "Category 1",
    priority: "Low",
    price: 300
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/inventory/products')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          View Products
        </button>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
          <Box className="w-4 h-4" /> / <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-lg font-semibold text-[11px]">Inventory</span>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side: Details */}
          <div className="rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-bold text-[#1E293B]">{productData.name}</h3>
              <button onClick={() => setIsEditModalOpen(true)} className="p-2 bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-8 gap-x-6">
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">SKU</p>
                <p className="text-[14px] font-bold text-[#1E293B]">PROD-2025-001</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Barcodes</p>
                <div className="flex items-center justify-between pr-2">
                  <p className="text-[14px] font-bold text-[#1E293B]">7891234567895</p>
                  <button onClick={() => setIsAddBarcodeModalOpen(true)} className="text-[13px] font-bold text-[#635BFF] flex items-center gap-1 hover:text-[#524be0] transition-colors">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Category</p>
                <p className="text-[14px] font-bold text-[#1E293B]">{productData.category}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Brand</p>
                <p className="text-[14px] font-bold text-[#1E293B]">Brand Name</p>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Stock Amount</p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center border border-[#E2E8F0] rounded-lg">
                    <button onClick={() => setStockAmount(Math.max(0, stockAmount - 1))} className="p-2 text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-[14px] font-bold text-[#1E293B]">{stockAmount}</span>
                    <button onClick={() => setStockAmount(stockAmount + 1)} className="p-2 text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {productData.priority === "Low" ? (
                    <span className="inline-block bg-[#22C55E] text-white px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
                      Priority: Low
                    </span>
                  ) : productData.priority === "Medium" ? (
                    <span className="inline-block bg-[#F59E0B] text-white px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
                      Priority: Medium
                    </span>
                  ) : (
                    <span className="inline-block bg-[#EF4444] text-white px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
                      Priority: High
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Minimum Stock Amount</p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center border border-[#E2E8F0] rounded-lg">
                    <button onClick={() => setMinStockAmount(Math.max(0, minStockAmount - 1))} className="p-2 text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-[14px] font-bold text-[#1E293B]">{minStockAmount}</span>
                    <button onClick={() => setMinStockAmount(minStockAmount + 1)} className="p-2 text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Mensuare</p>
                <p className="text-[14px] font-bold text-[#1E293B]">Milliliters (ml)</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Ammount</p>
                <p className="text-[14px] font-bold text-[#1E293B]">100 ml</p>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Purchase Price (VAT excluded)</p>
                <p className="text-[14px] font-bold text-[#1E293B]">€ 270</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Sale Price</p>
                <p className="text-[14px] font-bold text-[#1E293B]">€ {productData.price}</p>
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#94A3B8] mb-2">VAT</p>
                <p className="text-[14px] font-bold text-[#1E293B]">€ 30</p>
              </div>
            </div>

            <div className="pt-10">
              <button
                className="px-8 py-3 bg-[#E0E7FF] text-[#635BFF] text-[14px] font-bold rounded-lg transition-colors hover:bg-[#c7d2fe]"
              >
                Save
              </button>
            </div>
          </div>

          {/* Right Side: Photo */}
          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0] self-start">
            <h3 className="text-[16px] font-bold text-[#1E293B] mb-8">Product Photo</h3>
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Product" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddBarcodeModalOpen}
        onClose={() => setIsAddBarcodeModalOpen(false)}
        title="Add Barcodes"
        maxWidth="max-w-xl"
      >
        <div className="space-y-6 pt-2">
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Barcodes *</label>
            <input
              type="text"
              placeholder="Enter barcodes"
              value={newBarcode}
              onChange={(e) => setNewBarcode(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          <div className="flex justify-end pt-2 pb-2">
            <button
              onClick={() => {
                setIsAddBarcodeModalOpen(false);
                setNewBarcode("");
              }}
              className="px-8 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => console.log('Saved data:', data)}
        initialData={productData}
      />
    </div>
  );
}

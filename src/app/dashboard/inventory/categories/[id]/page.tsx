"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Home, ChevronRight, ChevronLeft as ChevronLeftIcon } from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";

export default function CategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const mockProducts = [
    { id: 1, name: "Product", status: "In Stock", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "Product", status: "Out of Stock", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, name: "Product", status: "In Stock", image: "https://images.unsplash.com/photo-1556228720-192a6af4e86e?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, name: "Product", status: "In Stock", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, name: "Product", status: "In Stock", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, name: "Product", status: "Out of Stock", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, name: "Product", status: "In Stock", image: "https://images.unsplash.com/photo-1556228720-192a6af4e86e?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, name: "Product", status: "In Stock", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop" },
  ];

  const totalItems = mockProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedProducts = mockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/inventory/categories')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          View Categories
        </button>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
          <Home className="w-4 h-4" /> / <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-lg font-semibold text-[11px]">Categories</span>
        </div>
      </div>

      <div className="py-5">
        <div className="">

          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
            <h1 className="text-[18px] font-bold text-[#1E293B] mb-8 font-manrope">Category {unwrappedParams.id}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="border border-[#E2E8F0] rounded-lg p-4 flex flex-col hover:border-[#635BFF]/30 transition-colors bg-white shadow-sm hover:shadow-md group cursor-pointer">
                  <div className="w-full aspect-square bg-[#F8FAFC] rounded-lg overflow-hidden mb-4 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="px-1">
                    <p className="text-[14px] font-bold text-[#1E293B] mb-2">{product.name}</p>
                    {product.status === "In Stock" ? (
                      <span className="inline-flex items-center bg-[#DCFCE7] text-[#16A34A] px-2.5 py-1 rounded-lg text-[11px] font-bold">
                        {product.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-[#FCE7F3] text-[#F43F5E] px-2.5 py-1 rounded-lg text-[11px] font-bold">
                        {product.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 border-t border-[#E2E8F0] pt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                itemName="products"
                onPageChange={setCurrentPage}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Home, FileText, Eye, Download, UploadCloud, Trash2, Check, X, ChevronRight, Play, Maximize, Volume2, MoreVertical } from "lucide-react";

export default function ImportProductsPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const mockImportedData = [
    { sku: "PROD-2025-001", name: "Curology Face wash", brand: "Curology", barcode: "7891234567895", purchase: 270, sale: 270, vat: 70 },
    { sku: "PROD-2025-001", name: "Curology Face wash", brand: "Curology", barcode: "7891234567895", purchase: 270, sale: 270, vat: 70 },
    { sku: "PROD-2025-001", name: "Curology Face wash", brand: "Curology", barcode: "7891234567895", purchase: 270, sale: 270, vat: 70 },
    { sku: "PROD-2025-001", name: "Curology Face wash", brand: "Curology", barcode: "7891234567895", purchase: 270, sale: 270, vat: 70 },
    { sku: "PROD-2025-001", name: "Curology Face wash", brand: "Curology", barcode: "7891234567895", purchase: 270, sale: 270, vat: 70 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/inventory/products')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          Import Products
        </button>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
          <Home className="w-4 h-4" /> / <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-lg font-semibold text-[11px]">Products</span>
        </div>
      </div>

      <div className="">
        <div className="py-6 space-y-6">

          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0] space-y-8">
            {/* Video Player */}
            <div className="w-full h-[240px] rounded-lg overflow-hidden relative shadow-sm bg-black">
              <video
                className="w-full h-full object-cover outline-none"
                controls
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Templates */}
            <div>
              <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center space-y-4 hover:border-[#635BFF]/30 transition-colors bg-white">
                  <div className="w-12 h-12 bg-[#F8FAFF] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#635BFF]" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-bold text-[#1E293B]">CSV Template</p>
                    <p className="text-[11px] font-semibold text-[#94A3B8]">CSV • 100 KB</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-[#F8FAFF] hover:bg-[#E0E7FF] text-[#635BFF] rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-[#F8FAFF] hover:bg-[#E0E7FF] text-[#635BFF] rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center space-y-4 hover:border-[#635BFF]/30 transition-colors bg-white">
                  <div className="w-12 h-12 bg-[#F8FAFF] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#635BFF]" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-bold text-[#1E293B]">Filled CSV Example</p>
                    <p className="text-[11px] font-semibold text-[#94A3B8]">CSV • 100 KB</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-[#F8FAFF] hover:bg-[#E0E7FF] text-[#635BFF] rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-[#F8FAFF] hover:bg-[#E0E7FF] text-[#635BFF] rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Import File */}
            <div>
              <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Import File</h3>

              {!file ? (
                <label className="border border-dashed border-[#818CF8] rounded-lg bg-white flex flex-col items-center justify-center py-10 cursor-pointer transition-colors hover:bg-[#F8FAFF] block w-full">
                  <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                  <div className="w-14 h-14 bg-[#F8FAFF] rounded-lg shadow-sm border border-[#E0E7FF] flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6 text-[#635BFF]" />
                  </div>
                  <p className="text-[13px] font-bold text-[#635BFF]">Drop here or click to browse</p>
                </label>
              ) : (
                <div className="space-y-4">
                  <label className="border border-dashed border-[#818CF8] rounded-lg bg-white flex flex-col items-center justify-center py-10 cursor-pointer transition-colors hover:bg-[#F8FAFF] block w-full">
                    <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                    <div className="w-14 h-14 bg-[#F8FAFF] rounded-lg shadow-sm border border-[#E0E7FF] flex items-center justify-center mb-3">
                      <UploadCloud className="w-6 h-6 text-[#635BFF]" />
                    </div>
                    <p className="text-[13px] font-bold text-[#635BFF]">Drop here or click to browse</p>
                  </label>

                  <div className="border border-[#FEE2E2] bg-white rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#F8FAFF] rounded-lg flex items-center justify-center text-[#635BFF] shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#635BFF]">{file.name}</p>
                        <p className="text-[11px] font-semibold text-[#94A3B8]">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-[#F43F5E] p-2 hover:bg-[#FEE2E2] rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Imported List Section */}
          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[14px] font-bold text-[#1E293B]">Imported List</h3>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#F43F5E] text-[12px] font-bold rounded-lg transition-colors">
                  Delete imported list
                </button>
                <button className="px-4 py-2 bg-[#2DD4BF] hover:bg-[#14B8A6] text-white text-[12px] font-bold rounded-lg transition-colors shadow-sm shadow-[#2DD4BF]/20">
                  Save the list
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border border-[#E2E8F0]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <th className="p-4 w-12"><input type="checkbox" className="rounded border-[#CBD5E1] text-[#635BFF] cursor-pointer" /></th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">sku</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">name</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">brand</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">barcode</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">purchase_price</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">sale_price</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase">vat</th>
                    <th className="p-4 text-[12px] font-bold text-[#64748B] uppercase text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {mockImportedData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="p-4"><input type="checkbox" className="rounded border-[#CBD5E1] text-[#635BFF] cursor-pointer" /></td>
                      <td className="p-4">
                        <span className="text-[13px] font-bold text-[#635BFF] bg-[#E0E7FF] px-2 py-1 rounded-lg whitespace-nowrap">{item.sku}</span>
                      </td>
                      <td className="p-4 text-[13px] font-semibold text-[#1E293B] whitespace-nowrap">{item.name}</td>
                      <td className="p-4 text-[13px] font-semibold text-[#64748B] whitespace-nowrap">{item.brand}</td>
                      <td className="p-4 text-[13px] font-semibold text-[#64748B] whitespace-nowrap">{item.barcode}</td>
                      <td className="p-4 text-[13px] font-semibold text-[#64748B] whitespace-nowrap">€ {item.purchase}</td>
                      <td className="p-4 text-[13px] font-semibold text-[#64748B] whitespace-nowrap">€ {item.sale}</td>
                      <td className="p-4 text-[13px] font-semibold text-[#64748B] whitespace-nowrap">€ {item.vat}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#F43F5E] rounded-lg transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 bg-[#CCFBF1] hover:bg-[#99F6E4] text-[#14B8A6] rounded-lg transition-colors">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6">
              <div className="text-[12px] font-semibold text-[#94A3B8]">
                Rows per page:
                <select className="ml-2 border border-[#E2E8F0] rounded p-1 outline-none text-[#1E293B]">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
              <div className="flex items-center gap-4 text-[12px] font-semibold text-[#94A3B8]">
                <span>1-5 of 10</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:text-[#1E293B] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-[#1E293B] transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => router.push('/dashboard/inventory/products')}
              className="px-8 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

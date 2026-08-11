import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { Search, ChevronRight, Check, Box, Plus, ArrowDown, ArrowUp, ChevronDown } from "lucide-react";

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const MOCK_RESULTS = [
  { id: "1", name: "Curology Face wash", sku: "PROD-2025-001", barcode: "7891024387895", stock: 45 },
  { id: "2", name: "Curology Face wash", sku: "PROD-2025-002", barcode: "7891024387896", stock: 46 },
  { id: "3", name: "Curology Face wash", sku: "PROD-2025-003", barcode: "7891024387897", stock: 45 },
  { id: "4", name: "Curology Face wash", sku: "PROD-2025-004", barcode: "7891024387898", stock: 46 },
];

export default function AddStockModal({ isOpen, onClose, onSave }: AddStockModalProps) {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssociating, setIsAssociating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [originalBarcode, setOriginalBarcode] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    type: "In",
    sku: "",
    productName: "",
    quantity: 1,
    status: "In Stock",
    price: 0
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSearchQuery("");
      setIsAssociating(false);
      setShowSuccess(false);
      setOriginalBarcode("");
      setFormData({
        date: "",
        type: "In",
        sku: "",
        productName: "",
        quantity: 1,
        status: "In Stock",
        price: 0
      });
    }
  }, [isOpen]);

  const handleProductSelect = (product: any) => {
    if (isAssociating) {
      setIsAssociating(false);
      setFormData({ ...formData, productName: product.name, sku: product.sku });
      setStep(2);
    } else {
      setFormData({ ...formData, productName: product.name, sku: product.sku });
      setStep(2);
    }
  };

  const handleSave = () => {
    setShowSuccess(true);
  };

  const handleFinalSuccess = () => {
    onSave({ ...formData, id: Date.now().toString() });
    onClose();
  };

  const hasResults = searchQuery.toLowerCase().includes("curology");
  const showEmptyState = searchQuery.length > 0 && !hasResults;

  if (showSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
        <div className="flex flex-col items-center justify-center pt-2 pb-6 text-center">
          <div className="w-16 h-16 bg-[#E0F2FE] rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-[#0EA5E9]" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Success!</h2>
          <p className="text-[#64748B] text-[13px] mb-8">Product has been added successfully.</p>
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-[#E2E8F0] text-[#475569] text-[13px] font-bold rounded-lg transition-colors hover:bg-[#F1F5F9]"
            >
              Close
            </button>
            <button
              onClick={handleFinalSuccess}
              className="px-6 py-2.5 bg-[#E0E7FF] text-[#635BFF] text-[13px] font-bold rounded-lg transition-colors hover:bg-[#c7d2fe]"
            >
              Create Movement for this Product
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  if (isAssociating) {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsAssociating(false)} title="Associate Barcode" maxWidth="max-w-2xl">
        <div className="space-y-6 pt-2 pb-4">
          <p className="text-[#64748B] text-[13px]">
            Select an existing product to associate with barcode <span className="font-semibold">'{originalBarcode}'</span>
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-lg pl-10 pr-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          {hasResults && (
            <div className="space-y-3">
              <h3 className="text-[13px] font-bold text-[#1E293B]">Search Results</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {MOCK_RESULTS.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg hover:border-[#635BFF] cursor-pointer transition-all bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <div className="w-full h-full bg-[#E2E8F0]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1E293B]">{product.name}</h4>
                        <p className="text-[11px] font-medium text-[#64748B] mt-0.5">
                          SKU: {product.sku} | Barcode: {product.barcode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-[#94A3B8] uppercase">Current Stock</p>
                        <p className="text-[14px] font-bold text-[#635BFF]">{product.stock}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#635BFF]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Movement" maxWidth="max-w-2xl">
      <div className="pt-4 pb-2">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex flex-col items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${step === 1 ? 'bg-[#635BFF] text-white' : 'bg-[#635BFF] text-white'}`}>1</div>
            <span className={`absolute top-10 whitespace-nowrap text-[11px] font-bold ${step === 1 ? 'text-[#635BFF]' : 'text-[#94A3B8]'}`}>Search by Barcode</span>
          </div>
          <div className="w-24 h-[1px] bg-[#E2E8F0] mx-2"></div>
          <div className="flex flex-col items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${step === 2 ? 'bg-[#635BFF] text-white' : 'bg-[#475569] text-white'}`}>2</div>
            <span className={`absolute top-10 whitespace-nowrap text-[11px] font-bold ${step === 2 ? 'text-[#635BFF]' : 'text-[#94A3B8]'}`}>Add Movement</span>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search order barcode, name or SKU"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-lg pl-10 pr-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
              />
            </div>

            {hasResults && (
              <div className="space-y-3">
                <h3 className="text-[13px] font-bold text-[#1E293B]">Search Results</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {MOCK_RESULTS.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg hover:border-[#635BFF] cursor-pointer transition-all bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden flex-shrink-0 relative">
                          <div className="w-full h-full bg-[#E2E8F0]" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#1E293B]">{product.name}</h4>
                          <p className="text-[11px] font-medium text-[#64748B] mt-0.5">
                            SKU: {product.sku} | Barcode: {product.barcode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-[#94A3B8] uppercase">Current Stock</p>
                          <p className="text-[14px] font-bold text-[#635BFF]">{product.stock}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#635BFF]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showEmptyState && (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <Box className="w-12 h-12 text-[#0F172A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-[#1E293B] mb-2">No Results Found</h3>
                <p className="text-[13px] text-[#64748B] mb-6 text-center max-w-xs">
                  Would you like to add a new product or associate with an existing one?
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 bg-[#DCFCE7] text-[#16A34A] text-[13px] font-bold rounded-lg transition-colors hover:bg-[#bbf7d0] flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                  <button
                    onClick={() => { setIsAssociating(true); setOriginalBarcode(searchQuery); setSearchQuery(""); }}
                    className="px-5 py-2.5 bg-[#E0E7FF] text-[#635BFF] text-[13px] font-bold rounded-lg transition-colors hover:bg-[#c7d2fe]"
                  >
                    Associate to Existing
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 pt-2">

            {/* Product Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F8FAFF] border border-[#E2E8F0] p-4 rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-200" />
              <div>
                <h4 className="text-[14px] font-bold text-[#1E293B] mb-1">{formData.productName || "Curology Face wash"}</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-[#64748B]">
                  <span>SKU: <span className="font-bold text-[#475569]">{formData.sku || "PSKUROD-2025-001"}</span></span>
                  <span>Barcode: <span className="font-bold text-[#475569]">7891234567895</span></span>
                  <span>Brand: <span className="font-bold text-[#475569]">Curology</span></span>
                </div>
              </div>
            </div>

            {/* Stock Preview */}
            <div className="flex items-center justify-center gap-8 py-6 border border-[#E2E8F0] rounded-lg bg-[#FAFAFA]">
              <div className="text-center">
                <p className="text-[11px] font-bold text-[#94A3B8] mb-1">Current Stock</p>
                <p className="text-3xl font-bold text-[#1E293B]">45</p>
              </div>
              <div className="text-[#E2E8F0]">
                <ChevronRight className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-[#94A3B8] mb-1">
                  New Stock <span className={formData.type === "In" ? "text-[#10B981] ml-1" : "text-[#F43F5E] ml-1"}>
                    {formData.type === "In" ? "+" : "-"}{formData.quantity || 0}
                  </span>
                </p>
                <p className="text-3xl font-bold text-[#635BFF]">
                  {formData.type === "In" ? 45 + (formData.quantity || 0) : 45 - (formData.quantity || 0)}
                </p>
              </div>
            </div>

            {/* Type Toggle */}
            <div className="flex items-center gap-4 py-2">
              <div
                onClick={() => setFormData({ ...formData, type: "In" })}
                className={`flex-1 p-6 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${formData.type === "In" ? "bg-[#F0FDF4] border-[#22C55E]" : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${formData.type === "In" ? "bg-[#22C55E]" : "bg-[#94A3B8]"
                  }`}>
                  <ArrowDown className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[13px] font-bold ${formData.type === "In" ? "text-[#22C55E]" : "text-[#94A3B8]"
                  }`}>Stock In</span>
              </div>

              <div
                onClick={() => setFormData({ ...formData, type: "Out" })}
                className={`flex-1 p-6 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${formData.type === "Out" ? "bg-[#FFF1F2] border-[#F43F5E]" : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${formData.type === "Out" ? "bg-[#F43F5E]" : "bg-[#94A3B8]"
                  }`}>
                  <ArrowUp className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[13px] font-bold ${formData.type === "Out" ? "text-[#F43F5E]" : "text-[#94A3B8]"
                  }`}>Stock Out</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Quantity *</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={formData.quantity || ''}
                  onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Responsible user *</label>
                <div className="relative">
                  <select
                    className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-3 text-[13px] text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select staff</option>
                    <option value="1">Maria Rodriguez</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Note (Optional)</label>
                <textarea
                  placeholder="Enter a note"
                  rows={3}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 pb-2">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-bold rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors"
              >
                Save Movement
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

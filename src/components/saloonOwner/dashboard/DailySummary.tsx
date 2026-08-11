"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MoreVertical, Plus, List, X, Settings, Download, Play } from "lucide-react";
import ExportReportModal from "./ExportReportModal";
import CashRegisterSettingsModal from "./CashRegisterSettingsModal";
import NewReceiptModal from "./NewReceiptModal";
import ReceiptSuccessModal from "./ReceiptSuccessModal";
import CloseCashRegisterModal from "./CloseCashRegisterModal";
import CloseRegisterSuccessModal from "./CloseRegisterSuccessModal";
import OpenCashRegisterModal from "./OpenCashRegisterModal";
import OpenRegisterSuccessModal from "./OpenRegisterSuccessModal";

export default function DailySummary() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNewReceiptModalOpen, setIsNewReceiptModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const [isCloseRegisterModalOpen, setIsCloseRegisterModalOpen] = useState(false);
  const [isCloseSuccessModalOpen, setIsCloseSuccessModalOpen] = useState(false);
  const [isOpenRegisterModalOpen, setIsOpenRegisterModalOpen] = useState(false);
  const [isOpenSuccessModalOpen, setIsOpenSuccessModalOpen] = useState(false);
  
  const [isRegisterOpen, setIsRegisterOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("receiptSuccess") === "true") {
      setIsSuccessModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-6 ">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Daily Summary</h2>
        <div className="flex justify-between md:justify-end items-center w-full gap-2">
          {isRegisterOpen ? (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wide">Cash Register Open</span>
            </div>
          ) : (
            <div className="bg-[#FFE4E6] px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]"></div>
              <span className="text-[10px] font-bold text-[#F43F5E] uppercase tracking-wide">Cash Register Closed</span>
            </div>
          )}

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors text-[#64748B]"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-2">
                <button
                  onClick={() => {
                    setIsSettingsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                >
                  <Settings className="w-4 h-4 text-[#94A3B8]" />
                  Cash register settings
                </button>
                <button
                  onClick={() => {
                    setIsExportModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                >
                  <Download className="w-4 h-4 text-[#94A3B8]" />
                  Export Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border border-[#E2E8F0] rounded-lg">
          <div className="text-[20px] font-bold text-[#1E293B] mb-1">€ 2,300</div>
          <div className="text-[11px] font-bold text-[#635BFF]">Total received</div>
        </div>
        <div className="p-4 border border-[#E2E8F0] rounded-lg">
          <div className="text-[20px] font-bold text-[#1E293B] mb-1">12</div>
          <div className="text-[11px] font-bold text-[#10B981]">Receipts issued</div>
        </div>
        <div className="p-4 border border-[#E2E8F0] rounded-lg">
          <div className="text-[20px] font-bold text-[#1E293B] mb-1">#R...</div>
          <div className="text-[11px] font-bold text-[#14B8A6]">Last receipt</div>
        </div>
      </div>

      {/* Purple Action Panel */}
      <div className="bg-[#635BFF] p-4 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Box 1 */}
        <div
          onClick={() => setIsNewReceiptModalOpen(true)}
          className="bg-white rounded-lg p-4 flex flex-col justify-center cursor-pointer shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-full bg-[#635BFF] flex items-center justify-center mb-3">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-[13px] font-bold text-[#1E293B] mb-0.5">New Receipt</h4>
          <p className="text-[11px] text-[#94A3B8]">Create a new receipt</p>
        </div>

        {/* Box 2 */}
        <div className="bg-white/10 hover:bg-white/20 rounded-lg p-4 flex flex-col justify-center cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
            <List className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-[13px] font-bold text-white mb-0.5">Receipt History</h4>
          <p className="text-[10px] font-medium text-white/70">See receipt history</p>
        </div>

        {/* Box 3 */}
        <div
          onClick={() => {
            if (isRegisterOpen) {
              setIsCloseRegisterModalOpen(true);
            } else {
              setIsOpenRegisterModalOpen(true);
            }
          }}
          className="bg-white/10 hover:bg-white/20 rounded-lg p-4 flex flex-col justify-center cursor-pointer transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
            {isRegisterOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </div>
          <h4 className="text-[13px] font-bold text-white mb-0.5 leading-snug">
            {isRegisterOpen ? (
              <>Close Cash<br />Register</>
            ) : (
              <>Open New Cash<br />Register</>
            )}
          </h4>
        </div>

      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <CashRegisterSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDisconnect={() => {
          setIsRegisterOpen(false);
          setIsSettingsModalOpen(false);
        }}
      />

      <NewReceiptModal
        isOpen={isNewReceiptModalOpen}
        onClose={() => setIsNewReceiptModalOpen(false)}
      />

      <ReceiptSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
        }}
      />

      <CloseCashRegisterModal
        isOpen={isCloseRegisterModalOpen}
        onClose={() => setIsCloseRegisterModalOpen(false)}
        onConfirm={() => {
          setIsCloseRegisterModalOpen(false);
          setIsRegisterOpen(false);
          setIsCloseSuccessModalOpen(true);
        }}
      />

      <CloseRegisterSuccessModal
        isOpen={isCloseSuccessModalOpen}
        onClose={() => setIsCloseSuccessModalOpen(false)}
        onExport={() => {
          setIsCloseSuccessModalOpen(false);
          setIsExportModalOpen(true);
        }}
        onViewDashboard={() => setIsCloseSuccessModalOpen(false)}
      />

      <OpenCashRegisterModal
        isOpen={isOpenRegisterModalOpen}
        onClose={() => setIsOpenRegisterModalOpen(false)}
        onConfirm={() => {
          setIsOpenRegisterModalOpen(false);
          setIsRegisterOpen(true);
          setIsOpenSuccessModalOpen(true);
        }}
      />

      <OpenRegisterSuccessModal
        isOpen={isOpenSuccessModalOpen}
        onClose={() => setIsOpenSuccessModalOpen(false)}
        onCreateReceipt={() => {
          setIsOpenSuccessModalOpen(false);
          setIsNewReceiptModalOpen(true);
        }}
        onViewDashboard={() => setIsOpenSuccessModalOpen(false)}
      />
    </div>
  );
}

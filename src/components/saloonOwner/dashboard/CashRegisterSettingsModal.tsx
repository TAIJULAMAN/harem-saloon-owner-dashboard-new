"use client";

import React, { useState, useEffect } from "react";
import { X, Wallet, Monitor, Download, Search, ChevronRight, Check, AlertCircle, Printer, RefreshCw } from "lucide-react";

interface CashRegisterSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDisconnect?: () => void;
}

type ViewState =
  | "DISCONNECTED"
  | "CHECKING"
  | "NOT_FOUND"
  | "SEARCHING"
  | "SELECT_DEVICE"
  | "CONFIG_SUCCESS"
  | "CONFIG_ERROR"
  | "CONNECTED";

export default function CashRegisterSettingsModal({ isOpen, onClose, onDisconnect }: CashRegisterSettingsModalProps) {
  const [viewState, setViewState] = useState<ViewState>("DISCONNECTED");
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setViewState("DISCONNECTED");
    }
  }, [isOpen]);

  // Simulate progress for checking and searching states
  useEffect(() => {
    if (viewState === "CHECKING" || viewState === "SEARCHING") {
      setLoadingProgress(10);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Move to next state automatically for demo purposes
            if (viewState === "CHECKING") setViewState("SEARCHING");
            if (viewState === "SEARCHING") setViewState("SELECT_DEVICE");
            return 100;
          }
          return prev + 15;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [viewState]);

  if (!isOpen) return null;

  const renderSteps = (activeStep: number) => (
    <div className="flex items-center justify-between mb-10 mt-2 max-w-lg mx-auto relative px-4">
      <div className="absolute top-[14px] left-[15%] right-[15%] h-[1px] bg-[#E2E8F0] -z-10"></div>

      {[1, 2, 3, 4].map((step) => {
        const isActive = step === activeStep;
        const isPast = step < activeStep;
        const bgColor = isActive || isPast ? "bg-[#635BFF]" : "bg-[#64748B]";

        const labels = ["Agent Verification", "Search Devices", "Select Cash Register", "Configuration"];

        return (
          <div key={step} className="flex flex-col items-center gap-2 bg-white relative z-0 px-2">
            <div className={`w-7 h-7 rounded-full ${bgColor} text-white flex items-center justify-center text-[12px] font-bold`}>
              {step}
            </div>
            <span className={`text-[11px] font-medium hidden sm:block ${isActive ? "text-[#1E293B]" : "text-[#94A3B8]"}`}>
              {labels[step - 1]}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[600px] shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200 mx-4 max-h-[90vh] overflow-y-auto">

        {/* Header - shown for most states except CONNECTED */}
        {viewState !== "CONNECTED" && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[18px] font-bold text-[#1E293B]">Cash Register Settings</h2>
            <button onClick={onClose} className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* State: DISCONNECTED */}
        {viewState === "DISCONNECTED" && (
          <div className="border border-[#E2E8F0] rounded-lg p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border-2 border-[#1E293B] flex items-center justify-center mb-6">
              <Wallet className="w-8 h-8 text-[#1E293B]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#1E293B] mb-2">No cash register connected</h3>
            <p className="text-[13px] text-[#94A3B8] font-medium mb-8">Connect your cash register easily.</p>
            <button
              onClick={() => setViewState("CHECKING")}
              className="bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
            >
              Connect Cash Register
            </button>
          </div>
        )}

        {/* State: CHECKING (Step 1) */}
        {viewState === "CHECKING" && (
          <div className="py-4">
            {renderSteps(1)}
            <div className="flex flex-col items-center justify-center py-10">
              <div className="relative w-20 h-20 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="stroke-[#E2E8F0]" strokeWidth="4" fill="none" />
                  <circle
                    cx="50" cy="50" r="45"
                    className="stroke-[#635BFF] transition-all duration-300"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * loadingProgress) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[14px] font-bold text-white">{loadingProgress}%</span>
                </div>
              </div>
              <p className="text-[14px] font-bold text-[#1E293B]">Checking if the local agent is active...</p>

              {/* Dev shortcut to test NOT FOUND state */}
              <button onClick={() => setViewState("NOT_FOUND")} className="mt-8 text-[10px] text-gray-300 hover:text-gray-500">Test Not Found State</button>
            </div>
          </div>
        )}

        {/* State: NOT FOUND (Step 1 Error) */}
        {viewState === "NOT_FOUND" && (
          <div className="py-4">
            {renderSteps(1)}
            <div className="border border-[#E2E8F0] rounded-lg p-10 flex flex-col items-center text-center mt-6">
              <div className="w-16 h-16 flex items-center justify-center mb-4">
                <Monitor className="w-12 h-12 text-[#1E293B]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-3">Agent not found</h3>
              <p className="text-[13px] text-[#94A3B8] font-medium max-w-[340px] mb-8">
                The agent was not found on your computer. Download and install the software to connect cash registers.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-6 py-2.5 rounded-lg font-bold text-[12px] transition-colors">
                  <Download className="w-4 h-4" />
                  Download for Windows
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#2DD4BF] px-6 py-2.5 rounded-lg font-bold text-[12px] transition-colors">
                  <Download className="w-4 h-4" />
                  Download for Mac
                </button>
              </div>

              <button
                onClick={() => setViewState("SEARCHING")}
                className="text-[13px] font-semibold text-[#635BFF] hover:underline"
              >
                I've already installed the agent, try again
              </button>
            </div>
          </div>
        )}

        {/* State: SEARCHING (Step 2) */}
        {viewState === "SEARCHING" && (
          <div className="py-4">
            {renderSteps(2)}
            <div className="border border-[#E2E8F0] rounded-lg p-10 flex flex-col items-center text-center mt-6">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-[#1E293B]" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-bold text-[#1E293B] mb-6">Searching for connected cash registers...</p>

              {/* Progress Bar */}
              <div className="w-full max-w-[300px] h-3 bg-[#F1F5F9] rounded-full overflow-hidden relative mb-4">
                <div
                  className="absolute top-0 left-0 bottom-0 bg-[#635BFF] transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-[#635BFF] mix-blend-difference">
                  {loadingProgress}%
                </div>
              </div>

              <p className="text-[12px] font-semibold text-[#10B981]">Found: Epson FP-81 II</p>
            </div>
          </div>
        )}

        {/* State: SELECT DEVICE (Step 3) */}
        {viewState === "SELECT_DEVICE" && (
          <div className="py-4">
            {renderSteps(3)}

            <div className="mt-8">
              <h3 className="text-[13px] font-bold text-[#1E293B] mb-4">Select the cash register to configure</h3>

              <div className="space-y-3 mb-8 max-h-[220px] overflow-y-auto pr-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border border-[#E2E8F0] hover:border-[#635BFF] rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors bg-white">
                    <div>
                      <div className="text-[14px] font-bold text-[#1E293B] mb-1">Epson FP-81 II</div>
                      <div className="text-[11px] text-[#94A3B8] font-medium">Serial: EP12345678</div>
                      <div className="text-[11px] text-[#94A3B8] font-medium">IP: 192.168.1.100</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#635BFF]" />
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Or enter the IP manually</label>
                <input
                  type="text"
                  placeholder="E.g. 192.168.1.100"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#635BFF] transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setViewState("CONFIG_ERROR")}
                  className="w-full sm:w-auto bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
                >
                  Rescan
                </button>
                <button
                  onClick={() => setViewState("CONFIG_SUCCESS")}
                  className="w-full sm:w-auto bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
                >
                  Configure Device
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State: CONFIG SUCCESS */}
        {viewState === "CONFIG_SUCCESS" && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-[#10B981]" strokeWidth={3} />
            </div>

            <h2 className="text-[20px] font-bold text-[#1E293B] mb-2">Configuration completed!</h2>
            <p className="text-[13px] text-[#94A3B8] font-medium mb-8">The cash register has been successfully configured.</p>

            <div className="w-full bg-[#F8FAFC] rounded-lg p-6 text-left mb-2 relative overflow-hidden">
              <h4 className="text-[14px] font-bold text-[#1E293B] mb-6">Cash Register Details</h4>

              <div className="grid grid-cols-2 gap-y-6 mb-16">
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Brand</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Epson</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Model</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">FP-81 II</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Serial</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">EP12345678</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Alias</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Register 1</div>
                </div>
              </div>

              {/* Positioned at bottom right of the card */}
              <button
                onClick={() => setViewState("CONNECTED")}
                className="sm:absolute sm:bottom-6 sm:right-6 mt-4 sm:mt-0 flex items-center justify-center gap-2 w-full sm:w-auto bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2 rounded-lg font-bold text-[13px] transition-colors"
              >
                <Printer className="w-4 h-4" />
                Test print
              </button>
            </div>
          </div>
        )}

        {/* State: CONFIG ERROR */}
        {viewState === "CONFIG_ERROR" && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-20 h-20 rounded-full bg-[#FFE4E6] flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-[#F43F5E]" strokeWidth={2} />
            </div>

            <h2 className="text-[20px] font-bold text-[#1E293B] mb-3">An error occurred during configuration.</h2>
            <p className="text-[13px] text-[#94A3B8] font-medium max-w-[340px] mb-8 leading-relaxed">
              The device is not responding or the connection was interrupted.<br />
              Verify that the cash register is turned on and properly connected.
            </p>

            <button
              onClick={() => setViewState("SELECT_DEVICE")}
              className="flex items-center gap-2 bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Test print
            </button>
          </div>
        )}

        {/* State: CONNECTED (Final state) */}
        {viewState === "CONNECTED" && (
          <div className="flex flex-col items-center text-center mt-2">
            <button onClick={onClose} className="absolute top-6 right-6 p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-[#E0E7FF] flex items-center justify-center mb-6">
              <Wallet className="w-10 h-10 text-[#635BFF]" />
            </div>
            <h2 className="text-[20px] font-bold text-[#1E293B] mb-2">Cash Register Settings</h2>
            <p className="text-[13px] text-[#94A3B8] font-medium mb-8">Check and update your cash register information easily.</p>

            <div className="w-full bg-[#F8FAFC] rounded-lg p-6 text-left mb-8">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-[14px] font-bold text-[#1E293B]">Cash Register Connected</h4>
                <div className="w-10 h-6 bg-[#E0E7FF] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-[#635BFF] rounded-full absolute top-1 right-1 shadow-sm"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Brand</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Epson</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Model</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">FP-81 II</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Serial</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">EP12345678</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#94A3B8] mb-1">Alias</div>
                  <div className="text-[13px] font-bold text-[#1E293B]">Register 1</div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (onDisconnect) {
                    onDisconnect();
                  } else {
                    setViewState("DISCONNECTED");
                  }
                }}
                className="w-full sm:w-auto bg-[#F43F5E] hover:bg-[#E11D48] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
              >
                Disconnect Cash Register
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

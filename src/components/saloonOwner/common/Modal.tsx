import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md", showCloseButton = true }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-[2px] p-4 transition-all duration-300">
      <div
        className={`bg-white rounded-lg shadow-2xl w-full ${maxWidth} border border-[#E2E8F0] overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]`}
      >
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-white flex-shrink-0">
            <h2 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="p-6 bg-white overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

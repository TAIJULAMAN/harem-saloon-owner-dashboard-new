import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

export interface ActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onAttach?: () => void;
  onDelete: () => void;
  buttonClassName?: string;
  menuClassName?: string;
}

export function ActionMenu({
  onView,
  onEdit,
  onAttach,
  onDelete,
  buttonClassName = "w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors",
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
      }
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    }

    function handleScroll() {
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 192;
      const menuHeight = 170;

      // Horizontal positioning
      let leftPos = rect.left - menuWidth - 8;
      if (leftPos < 10) {
        leftPos = rect.right + 8;
      }

      // Vertical positioning
      let topPos = rect.top;
      if (topPos + menuHeight > window.innerHeight) {
        topPos = rect.bottom - menuHeight;
      }

      setMenuPos({
        top: topPos,
        left: leftPos,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className={buttonClassName}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          ref={menuRef}
          className="fixed w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-xl z-[9999] overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); onView(); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
          >
            <Eye className="w-4 h-4 text-[#635BFF]" />
            View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
          >
            <Edit className="w-4 h-4 text-[#635BFF]" />
            Edit
          </button>
          {onAttach && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); onAttach(); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors text-left"
            >
              <img src="/upload.svg" alt="Attach" className="w-4 h-4" />
              Attach receipts/invoices
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); onDelete(); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-[#FB7185] hover:bg-[#FFF1F2] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

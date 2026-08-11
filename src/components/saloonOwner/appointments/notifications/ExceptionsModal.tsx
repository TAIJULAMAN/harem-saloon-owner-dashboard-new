"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, Trash2 } from "lucide-react";
import { ExceptionClient, mockExceptionClients } from "@/data/data";

interface ExceptionsModalProps {
  onClose: () => void;
  exceptions: ExceptionClient[];
  onAddException: (client: ExceptionClient) => void;
  onRemoveException: (id: string) => void;
}

export default function ExceptionsModal({
  onClose,
  exceptions,
  onAddException,
  onRemoveException,
}: ExceptionsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockExceptionClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  );

  return (
    <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-[580px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold text-[#1E293B] font-manrope">
            Exceptions to default
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Added List Status */}
        <div className="text-[12px] font-semibold text-[#64748B]">
          {exceptions.length === 0
            ? "No clients added"
            : `${exceptions.length} exception${exceptions.length > 1 ? "s" : ""} added`}
        </div>

        {/* Added List Grid */}
        {exceptions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[135px] overflow-y-auto pr-1">
            {exceptions.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3.5 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full overflow-hidden relative flex items-center justify-center border ${client.avatarBg}`}
                  >
                    <Image
                      src={client.avatarEmoji}
                      alt={client.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[12.5px] font-bold text-[#1E293B]">
                      {client.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#64748B]">
                      {client.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveException(client.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>

        {/* Search Suggestion Grid (Cards) */}
        <div className="space-y-2">
          <div className="text-[11.5px] font-bold text-[#475569] uppercase tracking-wider">
            Select Client to Add
          </div>
          <div className="grid grid-cols-3 gap-3">
            {filteredClients.map((client) => {
              const isAdded = exceptions.some((e) => e.id === client.id);
              return (
                <button
                  key={client.id}
                  disabled={isAdded}
                  onClick={() => onAddException(client)}
                  className={`flex flex-col items-center justify-center p-3.5 bg-white border rounded-2xl transition-all text-center shadow-sm group ${
                    isAdded
                      ? "opacity-40 cursor-not-allowed border-[#E2E8F0]"
                      : "border-[#E2E8F0] hover:border-[#635BFF] hover:bg-[#F8FAFC] cursor-pointer"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full overflow-hidden relative flex items-center justify-center mb-2 border transition-transform ${
                      !isAdded && "group-hover:scale-105"
                    } ${client.avatarBg}`}
                  >
                    <Image
                      src={client.avatarEmoji}
                      alt={client.name}
                      width={44}
                      height={44}
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-[11.5px] font-bold text-[#1E293B] leading-tight truncate w-full">
                    {client.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-[#64748B] mt-0.5 truncate w-full">
                    {client.phone}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save List Action Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-xl font-bold text-[12.5px] transition-colors shadow-md shadow-[#635BFF]/15"
          >
            Save List
          </button>
        </div>
      </div>
    </div>
  );
}

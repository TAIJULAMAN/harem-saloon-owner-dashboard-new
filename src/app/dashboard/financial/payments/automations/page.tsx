"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Home, Upload, X, Search, Check } from "lucide-react";

/* ══════════════════ Exceptions Modal ══════════════════ */
const ALL_CLIENTS = [
  { id: "1", name: "Maria Fernandez", role: "Regular Client", initials: "MF", color: "bg-[#F43F5E]" },
  { id: "2", name: "Vega Button", role: "VIP Client", initials: "VB", color: "bg-[#8B5CF6]" },
  { id: "3", name: "Leo Gregory", role: "New Client", initials: "LG", color: "bg-[#F59E0B]" },
  { id: "4", name: "Mia Fernandez", role: "Regular Client", initials: "MF", color: "bg-[#10B981]" },
  { id: "5", name: "Sophie Martin", role: "VIP Client", initials: "SM", color: "bg-[#635BFF]" },
];

function ExceptionsModal({
  isOpen,
  onClose,
  selected,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: string[];
  onSave: (ids: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(selected);

  const filtered = useMemo(
    () => ALL_CLIENTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const toggle = (id: string) =>
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-[440px] max-h-[90vh] flex flex-col overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <h3 className="text-[15px] font-bold text-[#1E293B]">Exceptions to default</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-[#475569]" />
          </button>
        </div>
        {/* Search */}
        <div className="px-6 py-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2 bg-[#F8F9FE] border border-[#E2E8F0] rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="flex-1 bg-transparent text-[12px] text-[#475569] outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </div>
        {/* Client List */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-1">
          {filtered.map((client) => {
            const isChecked = localSelected.includes(client.id);
            return (
              <button
                key={client.id}
                onClick={() => toggle(client.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8F9FE] transition-colors text-left"
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full ${client.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-[11px] font-bold">{client.initials}</span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[#1E293B]">{client.name}</div>
                  <div className="text-[11px] text-[#94A3B8]">{client.role}</div>
                </div>
                {/* Checkbox */}
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${isChecked ? "bg-[#635BFF] border-[#635BFF]" : "border-[#E2E8F0] bg-white"
                  }`}>
                  {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-[12px] text-[#94A3B8]">No clients found</div>
          )}
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={() => { onSave(localSelected); onClose(); }}
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors"
          >
            Save list
          </button>
        </div>
      </div>
    </div>
  );
}

type PaymentTab = "Cash Payment" | "Card Payments" | "Online Payments";
type PersonalizeType = "whatsapp" | "email" | "phone" | null;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 items-center rounded-lg transition-colors shrink-0 ${enabled ? "bg-[#635BFF]" : "bg-[#E2E8F0]"}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-lg bg-white shadow-sm transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const whatsappTemplate = `Hello, [Name] 👋\n\nWe confirm the receipt of your payment for the service provided at our Salon 💈\n\nYour receipt is attached.\n\nThank you for choosing us! We look forward to welcoming you again soon for more moments of care and beauty. 💜\n\n[Salon Name] Team`;

const emailTemplate = `Hello, [Name] 👋\n\nWe confirm the receipt of your payment for the service provided at our Salon 💈\n\nYour receipt is attached.\n\nThank you for choosing us! We look forward to welcoming you again soon for more moments of care and beauty. 💜\n\n[Salon Name] Team`;

const phoneTemplate = `Hello, [Name] 👋\n\nWe confirm the receipt of your payment for the service provided at our Salon 💈\n\nYour receipt is delivered.\n\nThank you for choosing us! We look forward to welcoming you again soon for more moments of care and beauty. 💜\n\n[Salon Name] Team`;

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<PaymentTab>("Cash Payment");
  const [personalize, setPersonalize] = useState<PersonalizeType>(null);
  const [toggles, setToggles] = useState({ whatsapp: false, email: false, phone: false });
  const [defaultAll, setDefaultAll] = useState({ whatsapp: false, email: true, phone: true });
  const [ctaEnabled, setCtaEnabled] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [emailSubject, setEmailSubject] = useState("Your Receipt Is Ready");
  const [exceptionsOpen, setExceptionsOpen] = useState(false);
  const [exceptions, setExceptions] = useState<{ whatsapp: string[]; email: string[]; phone: string[] }>({ whatsapp: [], email: [], phone: [] });
  const [activeExceptionType, setActiveExceptionType] = useState<"whatsapp" | "email" | "phone">("whatsapp");

  const openExceptions = (type: "whatsapp" | "email" | "phone") => {
    setActiveExceptionType(type);
    setExceptionsOpen(true);
  };
  const saveExceptions = (ids: string[]) => {
    setExceptions(prev => ({ ...prev, [activeExceptionType]: ids }));
  };

  const tabs: PaymentTab[] = ["Cash Payment", "Card Payments", "Online Payments"];

  const cards = [
    { id: "whatsapp" as PersonalizeType, icon: <WhatsAppIcon />, iconBg: "bg-[#25D366]", title: "Send whatsapp message with receipt", label: "Personalize Whatsapp Message" },
    { id: "email" as PersonalizeType, icon: <EmailIcon />, iconBg: "bg-[#635BFF]", title: "Send email with receipt", label: "Personalize Email" },
    { id: "phone" as PersonalizeType, icon: <PhoneIcon />, iconBg: "bg-[#F59E0B]", title: "Send phone message with receipt", label: "Personalize Phone Message" },
  ];

  const toggleCard = (id: "whatsapp" | "email" | "phone") => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4 pb-20">

      {/* Top Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg px-5 py-3.5 flex items-center justify-between shadow-sm">
        <Link href="/dashboard/financial/payments" className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors">
          <ChevronLeft className="w-4 h-4 text-[#635BFF]" />
          <span className="text-[14px] font-bold text-[#1E293B]">Set Automations</span>
        </Link>
        <div className="flex items-center gap-2 text-[#94A3B8] text-[12px]">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="bg-[#EEF2FF] text-[#635BFF] px-3 py-1 rounded-full text-[12px] font-semibold">Payments</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">

        {/* Tabs */}
        <div className="px-6 pt-5 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] font-bold transition-colors relative ${activeTab === tab ? "text-[#635BFF]" : "text-[#1E293B] hover:text-[#635BFF]"}`}
              >
                {tab}
                {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF] rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card) => (
              <div key={card.id}
                className={`bg-[#F0F2F8] border rounded-lg p-5 flex flex-col gap-4 transition-all ${personalize === card.id ? "border-[#635BFF] shadow-sm" : "border-[#E8EAF2]"}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                    {card.icon}
                  </div>
                  <Toggle enabled={toggles[card.id as keyof typeof toggles]} onToggle={() => toggleCard(card.id as "whatsapp" | "email" | "phone")} />
                </div>
                <div className="text-[13px] font-medium text-[#1E293B] leading-5">{card.title}</div>
                <button
                  onClick={() => setPersonalize(personalize === card.id ? null : card.id)}
                  className={`self-start text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${personalize === card.id ? "bg-[#635BFF] text-white" : "bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#635BFF]"}`}
                >
                  {card.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ────────────── WhatsApp Personalize Panel ────────────── */}
        {personalize === "whatsapp" && (
          <div className="border-t border-[#E2E8F0] px-6 pb-6">
            <h3 className="text-[14px] font-bold text-[#1E293B] py-5">Personalize Whatsapp Message</h3>
            <div className="grid grid-cols-[1fr_340px] gap-8">
              {/* Left Form */}
              <div className="space-y-5">
                <div>
                  <label className="text-[12px] font-semibold text-[#475569] block mb-1.5">Content</label>
                  <textarea
                    defaultValue={whatsappTemplate}
                    rows={9}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[12px] text-[#475569] resize-none outline-none focus:border-[#635BFF] transition-colors"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#1E293B]">Default for all clients <span className="text-[#F43F5E]">*</span></span>
                  <Toggle enabled={defaultAll.whatsapp} onToggle={() => setDefaultAll(p => ({ ...p, whatsapp: !p.whatsapp }))} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#475569]">
                    Exceptions to default
                    {exceptions.whatsapp.length > 0 && (
                      <span className="ml-1.5 text-[11px] text-[#635BFF] font-semibold">({exceptions.whatsapp.length})</span>
                    )}
                  </span>
                  <button onClick={() => openExceptions("whatsapp")} className="text-[12px] font-semibold text-[#635BFF] hover:underline">See list</button>
                </div>
              </div>
              {/* Right — Phone Preview */}
              <WhatsAppPreview />
            </div>
          </div>
        )}

        {personalize === "email" && (
          <div className="border-t border-[#E2E8F0] px-6 pb-6">
            <h3 className="text-[14px] font-bold text-[#1E293B] py-5">Personalize Email</h3>
            <div className="grid grid-cols-[1fr_340px] gap-8">
              {/* Left Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-[#1E293B] block mb-1.5">Subject <span className="text-[#F43F5E]">*</span></label>
                  <input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[12px] text-[#475569] outline-none focus:border-[#635BFF] transition-colors" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#1E293B] block mb-1.5">Title <span className="text-[#F43F5E]">*</span></label>
                  <input defaultValue="Your Receipt Is Ready"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[12px] text-[#475569] outline-none focus:border-[#635BFF] transition-colors" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#1E293B] block mb-1.5">Content</label>
                  <textarea defaultValue={emailTemplate} rows={8}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[12px] text-[#475569] resize-none outline-none focus:border-[#635BFF] transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#1E293B]">Call To Action Button Content <span className="text-[#F43F5E]">*</span></span>
                  <Toggle enabled={ctaEnabled} onToggle={() => setCtaEnabled(p => !p)} />
                </div>
                {ctaEnabled && (
                  <input defaultValue="View Receipt"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[12px] text-[#475569] outline-none focus:border-[#635BFF] transition-colors" />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#1E293B]">Show Image <span className="text-[#F43F5E]">*</span></span>
                  <Toggle enabled={showImage} onToggle={() => setShowImage(p => !p)} />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#1E293B] block mb-1.5">Attaches <span className="text-[#F43F5E]">*</span></label>
                  <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#635BFF] transition-colors bg-[#FAFBFF]">
                    <div className="w-10 h-10 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-[#635BFF]" />
                    </div>
                    <span className="text-[11px] text-[#635BFF] font-medium">Drop here or click to browse</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#1E293B]">Default for all clients <span className="text-[#F43F5E]">*</span></span>
                  <Toggle enabled={defaultAll.email} onToggle={() => setDefaultAll(p => ({ ...p, email: !p.email }))} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#475569]">
                    Exceptions to default
                    {exceptions.email.length > 0 && (
                      <span className="ml-1.5 text-[11px] text-[#635BFF] font-semibold">({exceptions.email.length})</span>
                    )}
                  </span>
                  <button onClick={() => openExceptions("email")} className="text-[12px] font-semibold text-[#635BFF] hover:underline">See list</button>
                </div>
              </div>
              {/* Right — Email Preview */}
              <EmailPreview subject={emailSubject} />
            </div>
          </div>
        )}

        {/* ────────────── Phone/SMS Personalize Panel ────────────── */}
        {personalize === "phone" && (
          <div className="border-t border-[#E2E8F0] px-6 pb-6">
            <h3 className="text-[14px] font-bold text-[#1E293B] py-5">Personalize Phone Message</h3>
            <div className="grid grid-cols-[1fr_340px] gap-8">
              {/* Left Form */}
              <div className="space-y-5">
                <div>
                  <label className="text-[12px] font-semibold text-[#475569] block mb-1.5">Content</label>
                  <textarea defaultValue={phoneTemplate} rows={9}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[12px] text-[#475569] resize-none outline-none focus:border-[#635BFF] transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#1E293B]">Default for all clients <span className="text-[#F43F5E]">*</span></span>
                  <Toggle enabled={defaultAll.phone} onToggle={() => setDefaultAll(p => ({ ...p, phone: !p.phone }))} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#475569]">
                    Exceptions to default
                    {exceptions.phone.length > 0 && (
                      <span className="ml-1.5 text-[11px] text-[#635BFF] font-semibold">({exceptions.phone.length})</span>
                    )}
                  </span>
                  <button onClick={() => openExceptions("phone")} className="text-[12px] font-semibold text-[#635BFF] hover:underline">See list</button>
                </div>
              </div>
              {/* Right — SMS Preview */}
              <SmsPreview />
            </div>
          </div>
        )}

      </div>

      {/* Save Settings — sticky bottom right */}
      {personalize && (
        <div className="flex justify-end">
          <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors">
            Save Settings
          </button>
        </div>
      )}

      {/* The Exceptions Modal */}
      <ExceptionsModal
        isOpen={exceptionsOpen}
        onClose={() => setExceptionsOpen(false)}
        selected={exceptions[activeExceptionType]}
        onSave={saveExceptions}
      />
    </div>
  );
}

/* ──────────────────── WhatsApp Preview ──────────────────── */
function WhatsAppPreview() {
  return (
    <div className="flex justify-center">
      <div className="w-[220px] bg-[#1A1A2E] rounded-[32px] p-2 shadow-xl">
        <div className="bg-white rounded-[24px] overflow-hidden">
          {/* Status bar */}
          <div className="bg-[#25D366] px-4 py-2 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-white" />
            <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">C</span>
            </div>
            <div>
              <div className="text-white text-[10px] font-bold">Client</div>
              <div className="text-white/70 text-[8px]">Online</div>
            </div>
          </div>
          {/* Chat */}
          <div className="bg-[#ECE5DD] p-3 min-h-[280px] space-y-2">
            <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm">
              <p className="text-[8px] text-[#303030] leading-4">
                Hello, [Name] 👋<br /><br />
                We confirm the receipt of your payment for the service provided at our Salon 💈<br /><br />
                Your receipt is attached.<br /><br />
                Thank you for choosing us! We look forward to welcoming you again soon for more moments of care and beauty. 💜<br /><br />
                [Salon Name] Team
              </p>
              <div className="mt-1.5 bg-[#F0F0F0] rounded-lg p-1.5 flex items-center gap-1">
                <div className="w-6 h-8 bg-[#635BFF] rounded flex items-center justify-center">
                  <span className="text-white text-[6px]">PDF</span>
                </div>
                <span className="text-[7px] text-[#475569]">receipt.pdf</span>
              </div>
              <div className="text-right text-[7px] text-[#94A3B8] mt-0.5">14:32 ✓✓</div>
            </div>
          </div>
          {/* Input */}
          <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2 border-t border-[#E2E8F0]">
            <div className="flex-1 bg-white rounded-full px-3 py-1">
              <span className="text-[8px] text-[#94A3B8]">Message</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Email Preview ──────────────────── */
function EmailPreview({ subject }: { subject: string }) {
  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[300px] border border-[#E2E8F0] rounded-lg overflow-hidden shadow-md bg-white">
        {/* Header */}
        <div className="bg-[#635BFF] px-5 pt-6 pb-5 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="#635BFF" />
              </svg>
            </div>
            <span className="text-white text-[13px] font-bold">Your logo</span>
          </div>
          <div className="bg-[#7C75FF] rounded-lg px-4 py-3">
            <div className="text-white text-[14px] font-bold">{subject}</div>
          </div>
        </div>
        {/* Body */}
        <div className="p-5">
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-[9px] text-[#475569] leading-4">
                Hello, [Name]!<br /><br />
                We confirm the receipt of your payment for the service provided at our salon 💈<br /><br />
                Your receipt is attached.<br /><br />
                Thank you for choosing us! We look forward to welcoming you again soon for more moments of care and beauty. 💜<br /><br />
              </p>
            </div>
            {/* Receipt illustration */}
            <div className="shrink-0 relative">
              <div className="w-16 h-16 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                <div className="w-10 h-12 bg-white rounded shadow-sm border border-[#E2E8F0] flex flex-col items-center justify-center gap-0.5 p-1">
                  <div className="w-full h-0.5 bg-[#E2E8F0] rounded" />
                  <div className="w-full h-0.5 bg-[#E2E8F0] rounded" />
                  <div className="w-3/4 h-0.5 bg-[#E2E8F0] rounded" />
                  <div className="text-[5px] text-[#635BFF] font-bold mt-0.5">REC</div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#F59E0B] rounded-full flex items-center justify-center">
                <span className="text-white text-[8px]">$</span>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-[#475569] leading-4 mt-1">[Salon Name] Team</p>
          <button className="w-full mt-3 bg-[#635BFF] text-white text-[10px] font-bold py-2 rounded-lg">
            View Receipt
          </button>
        </div>
        {/* Footer */}
        <div className="bg-[#F0F2FF] px-4 py-3 flex items-center justify-center gap-3">
          {/* Instagram */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          {/* X / Twitter */}
          <div className="w-6 h-6 rounded-full bg-[#000000] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          {/* YouTube */}
          <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── SMS Preview ──────────────────── */
function SmsPreview() {
  return (
    <div className="flex justify-center">
      <div className="w-[220px] bg-[#1A1A2E] rounded-[32px] p-2 shadow-xl">
        <div className="bg-white rounded-[24px] overflow-hidden">
          {/* Status bar */}
          <div className="bg-[#F1F5F9] px-4 py-2 flex items-center gap-2 border-b border-[#E2E8F0]">
            <ChevronLeft className="w-4 h-4 text-[#475569]" />
            <div className="w-7 h-7 rounded-full bg-[#635BFF] flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">C</span>
            </div>
            <div className="text-[10px] font-bold text-[#1E293B]">Client</div>
          </div>
          {/* Messages */}
          <div className="bg-white p-3 min-h-[280px] space-y-2">
            <div className="bg-[#F1F5F9] rounded-lg rounded-tl-none p-2.5 max-w-[85%]">
              <p className="text-[8px] text-[#303030] leading-4">
                Hello, [Name] 👋<br /><br />
                We confirm the receipt of your payment for the service provided at our Salon 💈<br /><br />
                Your receipt is delivered.<br /><br />
                Thank you for choosing us! We look forward to welcoming you again soon for more moments of care and beauty. 💜<br /><br />
                [Salon Name] Team
              </p>
              <div className="mt-1.5 bg-white rounded-lg p-1.5 flex items-center gap-1 border border-[#E2E8F0]">
                <div className="w-6 h-8 bg-[#635BFF] rounded flex items-center justify-center">
                  <span className="text-white text-[6px]">PDF</span>
                </div>
                <div>
                  <div className="text-[7px] text-[#475569] font-medium">receipt.pdf</div>
                  <div className="text-[6px] text-[#94A3B8]">245 KB · PDF Document</div>
                </div>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="bg-[#F8F9FE] px-3 py-2 flex items-center gap-2 border-t border-[#E2E8F0]">
            <div className="flex-1 bg-white border border-[#E2E8F0] rounded-full px-3 py-1">
              <span className="text-[8px] text-[#94A3B8]">iMessage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

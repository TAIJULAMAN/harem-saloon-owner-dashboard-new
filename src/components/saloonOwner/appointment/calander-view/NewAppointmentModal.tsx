import { useState } from "react";
import Image from "next/image";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import {
  X,
  Ticket,
  UserPlus,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Camera,
} from "lucide-react";

const DUMMY_CLIENTS = [
  {
    id: "1",
    name: "Sofia Rossi",
    email: "sofia@beauty.com",
    phone: "+39 345 678 9123",
    photo: "",
    notes: "Promised 10% discount on next haircut. Check before payment.",
    giftCards: 1,
    giftCardDetails: {
      dateOfIssue: "02/09/2025",
      dateOfExpiration: "06/20/2026",
      amount: "€ 50",
      usageLimit: "1",
      eligibleServices: ["Haircut", "Blowdry"],
      receiverName: "Sofia Rossi",
      gifterName: "Marco Rossi",
      personalMessage: "Happy birthday my love!",
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@beauty.com",
    phone: "+39 345 678 9124",
    photo: "",
    notes: "",
    giftCards: 0,
    giftCardDetails: null,
  },
];

const DUMMY_SERVICES = [
  { id: "s1", name: "Haircut", duration: "30m", price: "€ 30" },
  { id: "s2", name: "Blowdry", duration: "30m", price: "€ 25" },
  { id: "s3", name: "Coloring", duration: "90m", price: "€ 80" },
  { id: "s4", name: "Haircut & Blowdry", duration: "60m", price: "€ 50" },
  { id: "s5", name: "Highlights", duration: "100m", price: "€ 120" },
];

const statusOptions: AppStatus[] = ["Booked", "Confirmed"];

export default function NewAppointmentModal({
  memberId,
  date,
  teamMembers,
  onClose,
  onConfirm,
}: {
  memberId: string;
  startTime: string;
  endTime: string;
  date: Date;
  teamMembers: { id: string; name: string; avatar: string }[];
  onClose: () => void;
  onConfirm: (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">,
  ) => void;
}) {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientPhoto, setNewClientPhoto] = useState<string | null>(null);
  const [clientSearch, setClientSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [bookingOrder, setBookingOrder] = useState<
    Array<{ serviceId: string; employeeId: string }>
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<AppStatus>("Booked");

  const [showGiftDetails, setShowGiftDetails] = useState(false);
  const [showNoteDetails, setShowNoteDetails] = useState(true);

  const selectedClient = DUMMY_CLIENTS.find((c) => c.id === selectedClientId);

  const totalDurationMins = selectedServiceIds.reduce((acc, id) => {
    const srv = DUMMY_SERVICES.find((s) => s.id === id);
    if (!srv) return acc;
    const mins = parseInt(srv.duration.replace("m", "")) || 0;
    return acc + mins;
  }, 0);

  const formattedTotalDuration =
    totalDurationMins > 0
      ? `${Math.floor(totalDurationMins / 60)}h ${totalDurationMins % 60}min`
      : "0 min";

  const handleServiceToggle = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds((prev) => prev.filter((sid) => sid !== id));
      setBookingOrder((prev) => prev.filter((item) => item.serviceId !== id));
    } else {
      setSelectedServiceIds((prev) => [...prev, id]);
      setBookingOrder((prev) => [
        ...prev,
        { serviceId: id, employeeId: memberId },
      ]);
    }
  };

  const updateServiceEmployee = (serviceId: string, empId: string) => {
    setBookingOrder((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, employeeId: empId } : item,
      ),
    );
  };

  const isValid =
    (selectedClientId || (isAddingNewClient && newClientName)) &&
    selectedServiceIds.length > 0;

  const [currentStep, setCurrentStep] = useState(1);
  const isStep1Valid = Boolean(
    selectedClientId || (isAddingNewClient && newClientName),
  );
  const isStep2Valid = selectedServiceIds.length > 0;
  const isStep3Valid = Boolean(selectedStatus);

  const handleConfirm = () => {
    if (!isValid || !isStep3Valid) return;
    setCurrentStep(4);
  };

  const handleFinalize = () => {
    const clientName = isAddingNewClient
      ? newClientName
      : selectedClient?.name || "";
    onConfirm({
      clientName,
      service:
        DUMMY_SERVICES.find((s) => s.id === bookingOrder[0]?.serviceId)?.name ||
        "",
      employeeId: bookingOrder[0]?.employeeId || memberId,
      employeeName:
        teamMembers.find(
          (m) => m.id === (bookingOrder[0]?.employeeId || memberId),
        )?.name || "",
      status: selectedStatus,
      duration: formattedTotalDuration,
      price:
        DUMMY_SERVICES.find((s) => s.id === bookingOrder[0]?.serviceId)
          ?.price || "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#29343D]/60 backdrop-blur-sm p-4 font-manrope"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] shadow-2xl w-full max-w-[700px] min-h-[600px] max-h-[94vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none px-8 py-6 flex items-start justify-between border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-[20px] font-bold text-[#29343D]">
              {currentStep === 4 ? "Success" : "New Appointment"}{" "}
              {currentStep < 4 && (
                <span className="text-[#999] text-[14px] font-normal ml-2">
                  Step {currentStep} of 3
                </span>
              )}
            </h2>
            {currentStep < 4 && (
              <p className="text-[14px] text-[#999] font-medium mt-0.5">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <button
            onClick={currentStep === 4 ? handleFinalize : onClose}
            className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-[#29343D]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Client Selection */}
          {currentStep === 1 && (
            <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-bold text-[#999]">
                  Client Name *
                </label>
                <button
                  onClick={() => setIsAddingNewClient(!isAddingNewClient)}
                  className="text-[12px] font-bold text-[#635BFF] hover:underline"
                >
                  {isAddingNewClient ? "Select existing" : "+ Add new client"}
                </button>
              </div>

              {!isAddingNewClient ? (
                <div className="relative">
                  {selectedClient && !isClientDropdownOpen ? (
                    <div
                      onClick={() => setIsClientDropdownOpen(true)}
                      className="w-full flex items-center justify-between pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-[4px] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            selectedClient.photo ||
                            `/avatar/icon${((parseInt(selectedClient.id.replace(/\D/g, "")) || 1) % 3) + 1}.png`
                          }
                          alt={selectedClient.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex flex-col items-start">
                          <span className="font-bold text-[14px] text-[#29343D] leading-none mb-1">
                            {selectedClient.name}
                          </span>
                          <span className="text-[11px] text-[#999] leading-none">
                            {selectedClient.email} • {selectedClient.phone}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClientId("");
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#29343D]"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Search by name..."
                        autoFocus={isClientDropdownOpen}
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                        onFocus={() => setIsClientDropdownOpen(true)}
                        className={`w-full pl-10 pr-10 py-3 bg-white border ${isClientDropdownOpen ? "border-[#635BFF]" : "border-slate-200"} rounded-[4px] text-[15px] text-[#29343D] outline-none`}
                      />
                      {isClientDropdownOpen && (
                        <button
                          onClick={() => {
                            setIsClientDropdownOpen(false);
                            setClientSearch("");
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#29343D]"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  )}

                  {isClientDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-[8px] shadow-lg p-2 animate-in fade-in zoom-in-95">
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-3 px-2">
                          SELECT CLIENT TO ADD
                        </p>
                        <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                          {DUMMY_CLIENTS.filter((c) =>
                            c.name
                              .toLowerCase()
                              .includes(clientSearch.toLowerCase()),
                          ).map((client, i) => (
                            <div
                              key={client.id}
                              onClick={() => {
                                setSelectedClientId(client.id);
                                setShowGiftDetails(false);
                                setIsClientDropdownOpen(false);
                                setClientSearch("");
                              }}
                              className={`flex flex-col items-center justify-center text-center p-3 border rounded-[12px] cursor-pointer transition-colors ${
                                selectedClientId === client.id
                                  ? "border-[#635BFF] bg-indigo-50/30"
                                  : "border-slate-200 hover:border-[#635BFF] hover:bg-slate-50 text-[#29343D]"
                              }`}
                            >
                              <Image
                                src={
                                  client.photo ||
                                  `/avatar/icon${(i % 3) + 1}.png`
                                }
                                alt={client.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover mb-2"
                              />
                              <p className="font-bold text-[12px] text-[#29343D] leading-tight mb-1 truncate w-full">
                                {client.name}
                              </p>
                              {client.email && (
                                <p className="text-[10px] text-[#999] truncate w-full">
                                  {client.email}
                                </p>
                              )}
                              {client.phone && (
                                <p className="text-[10px] text-[#999] truncate w-full">
                                  {client.phone}
                                </p>
                              )}
                            </div>
                          ))}
                          {DUMMY_CLIENTS.filter((c) =>
                            c.name
                              .toLowerCase()
                              .includes(clientSearch.toLowerCase()),
                          ).length === 0 && (
                            <p className="text-center text-xs text-[#999] py-4 col-span-3">
                              No clients found
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center mb-4">
                    <label className="relative group cursor-pointer w-20 h-20 rounded-full bg-slate-50 flex flex-col items-center justify-center border border-dashed border-slate-300 hover:border-[#635BFF] hover:bg-indigo-50/30 transition-colors overflow-hidden">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (e) =>
                              setNewClientPhoto(e.target?.result as string);
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                      />
                      {newClientPhoto ? (
                        <Image
                          src={newClientPhoto}
                          alt="New client"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-[#999] group-hover:text-[#635BFF]">
                          <Camera size={24} />
                          <span className="text-[10px] mt-1 font-medium">
                            Add Photo
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="relative">
                    <UserPlus
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635BFF]"
                      size={18}
                    />
                    <input
                      autoFocus
                      placeholder="Enter full name..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                        size={18}
                      />
                      <input
                        placeholder="Email address..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none"
                        value={newClientEmail}
                        onChange={(e) => setNewClientEmail(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                        size={18}
                      />
                      <input
                        placeholder="Phone number..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none"
                        value={newClientPhone}
                        onChange={(e) => setNewClientPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (newClientName) {
                          const newId = "new-" + Date.now();
                          DUMMY_CLIENTS.push({
                            id: newId,
                            name: newClientName,
                            email: newClientEmail,
                            phone: newClientPhone,
                            photo: newClientPhoto || "",
                            notes: "",
                            giftCards: 0,
                            giftCardDetails: null,
                          });
                          setSelectedClientId(newId);
                          setIsAddingNewClient(false);
                          setNewClientName("");
                          setNewClientEmail("");
                          setNewClientPhone("");
                        }
                      }}
                      disabled={!newClientName}
                      className="px-6 py-2.5 bg-[#635BFF] text-white text-[14px] font-bold rounded-[6px] hover:bg-[#5249db] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Client
                    </button>
                  </div>
                </div>
              )}

              {selectedClient &&
                (selectedClient.notes || selectedClient.giftCards > 0) && (
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-[8px] overflow-hidden">
                    {/* Notes Section - Only if notes exist */}
                    {selectedClient.notes && (
                      <div
                        className={`${selectedClient.giftCards > 0 ? "border-b border-slate-200" : ""}`}
                      >
                        <button
                          onClick={() => setShowNoteDetails(!showNoteDetails)}
                          className="w-full px-4 py-3 flex items-center justify-between text-[14px] font-bold text-[#29343D] hover:bg-slate-50"
                        >
                          <span>Client notes</span>
                          {showNoteDetails ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                        {showNoteDetails && (
                          <div className="px-4 pb-4 animate-in slide-in-from-top-1">
                            <div className="bg-white border border-slate-200 p-3 rounded-[4px] text-[13px] text-[#29343D]">
                              {selectedClient.notes}
                            </div>
                            <button className="text-[12px] font-bold text-[#635BFF] mt-2 flex items-center gap-1">
                              Show all notes (3) <ChevronDown size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Gift Card Section - Only if cards > 0 */}
                    {selectedClient.giftCards > 0 && (
                      <div>
                        <button
                          onClick={() => setShowGiftDetails(!showGiftDetails)}
                          className="w-full px-4 py-3 flex items-center justify-between text-[14px] font-bold text-[#29343D] hover:bg-slate-50"
                        >
                          <span>Active gift cards</span>
                          {showGiftDetails ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                        {showGiftDetails && selectedClient.giftCardDetails && (
                          <div className="px-4 pb-4 animate-in slide-in-from-top-1">
                            <div className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-sm cursor-default">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-slate-50 rounded-[4px] border border-slate-100">
                                    <Ticket size={16} className="text-[#999]" />
                                  </div>
                                  <div>
                                    <p className="text-[16px] font-bold text-[#29343D]">
                                      {selectedClient.giftCardDetails.amount}
                                    </p>
                                    <p className="text-[12px] text-[#999]">
                                      Expires{" "}
                                      {
                                        selectedClient.giftCardDetails
                                          .dateOfExpiration
                                      }
                                    </p>
                                  </div>
                                </div>
                                <span className="text-[12px] text-[#999]">
                                  {selectedClient.giftCardDetails.eligibleServices.join(
                                    "•",
                                  )}
                                </span>
                              </div>

                              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-y-6">
                                <div>
                                  <p className="text-[11px] text-[#999] font-bold uppercase mb-1">
                                    Date of Issue
                                  </p>
                                  <p className="text-[14px] font-bold text-[#29343D]">
                                    {selectedClient.giftCardDetails.dateOfIssue}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] text-[#999] font-bold uppercase mb-1">
                                    Date of Expiration
                                  </p>
                                  <p className="text-[14px] font-bold text-[#29343D]">
                                    {
                                      selectedClient.giftCardDetails
                                        .dateOfExpiration
                                    }
                                  </p>
                                </div>
                                <div className="border-t border-slate-50 pt-4">
                                  <p className="text-[11px] text-[#999] font-bold uppercase mb-1">
                                    Amount
                                  </p>
                                  <p className="text-[16px] font-bold text-[#29343D]">
                                    {selectedClient.giftCardDetails.amount}
                                  </p>
                                </div>
                                <div className="border-t border-slate-50 pt-4">
                                  <p className="text-[11px] text-[#999] font-bold uppercase mb-1">
                                    Usage Limit
                                  </p>
                                  <p className="text-[16px] font-bold text-[#29343D]">
                                    {selectedClient.giftCardDetails.usageLimit}
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-[11px] text-[#999] font-bold uppercase mb-2">
                                    Eligible Services
                                  </p>
                                  <div className="flex gap-2">
                                    {selectedClient.giftCardDetails.eligibleServices.map(
                                      (s) => (
                                        <span
                                          key={s}
                                          className="bg-[#635BFF]/10 text-[#635BFF] px-3 py-1 rounded-full text-[12px] font-bold"
                                        >
                                          {s}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-2 pt-4 border-t border-slate-50">
                                  <p className="text-[11px] text-[#999] font-bold uppercase mb-2">
                                    Personal Message
                                  </p>
                                  <div className="bg-slate-50 p-3 rounded-[4px] italic text-[13px] text-[#29343D]">
                                    {
                                      selectedClient.giftCardDetails
                                        .personalMessage
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
            </section>
          )}

          {/* Services Section */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <section className="space-y-3">
                <label className="text-[12px] font-bold text-[#999]">
                  Services *
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-[8px] text-[15px] text-[#29343D] outline-none focus:border-[#635BFF] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
                  {DUMMY_SERVICES.filter((s) =>
                    s.name.toLowerCase().includes(serviceSearch.toLowerCase()),
                  ).map((s) => {
                    const isSelected = selectedServiceIds.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleServiceToggle(s.id)}
                        className={`flex items-center justify-between p-4 border rounded-[8px] cursor-pointer transition-colors ${
                          isSelected
                            ? "border-[#635BFF] bg-indigo-50/10"
                            : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-[4px] border flex flex-none items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-[#635BFF] border-[#635BFF]"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-[#29343D]">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-[#999]">
                              {s.duration}
                            </p>
                          </div>
                        </div>
                        <span className="text-[14px] font-bold text-[#29343D]">
                          {s.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[13px] font-bold text-[#29343D] pt-2">
                  Total duration:{" "}
                  <span className="font-extrabold">
                    {formattedTotalDuration}
                  </span>
                </p>
              </section>

              {/* Booking Order Timeline */}
              {bookingOrder.length > 0 && (
                <section className="space-y-6">
                  <label className="text-[12px] font-bold text-[#999]">
                    Booking Order
                  </label>
                  <div className="bg-[#F8FAFC] p-8 rounded-[12px] border border-slate-200 relative">
                    {/* Connecting Line - ONLY IF MORE THAN 1 ORDER */}
                    {bookingOrder.length > 1 && (
                      <div className="absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-slate-200 z-0" />
                    )}

                    <div className="flex items-start justify-center gap-8 relative z-10">
                      {bookingOrder.map((item, index) => {
                        const srv = DUMMY_SERVICES.find(
                          (s) => s.id === item.serviceId,
                        );
                        return (
                          <div
                            key={item.serviceId}
                            className="flex flex-col items-center text-center w-1/3 space-y-2"
                          >
                            <div className="w-9 h-9 rounded-full bg-[#29343D] text-white flex items-center justify-center text-[15px] font-bold shadow-sm">
                              {index + 1}
                            </div>
                            <span className="bg-[#635BFF]/10 text-[#635BFF] text-[10px] font-extrabold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                              To Do
                            </span>
                            <div className="space-y-0.5">
                              <p className="text-[11px] text-[#999] font-bold">
                                23:17-23:47
                              </p>
                              <p className="text-[13px] font-bold text-[#29343D] leading-tight px-1">
                                {srv?.name}
                              </p>
                            </div>
                            <select
                              value={item.employeeId}
                              onChange={(e) =>
                                updateServiceEmployee(
                                  item.serviceId,
                                  e.target.value,
                                )
                              }
                              className="mt-1 text-[12px] font-bold text-[#29343D] bg-white border border-slate-200 rounded-[12px] px-3 py-1 outline-none cursor-pointer hover:border-[#635BFF]"
                            >
                              {teamMembers.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Status Section */}
          {currentStep === 3 && (
            <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <label className="text-[12px] font-bold text-[#999]">
                Status
              </label>
              <div className="flex gap-4">
                {statusOptions.map((status) => {
                  const isSelected = selectedStatus === status;
                  const color = status === "Booked" ? "#635BFF" : "#10B981";
                  return (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`flex-1 flex items-center gap-3 p-4 rounded-[4px] border text-[14px] font-bold transition-all ${isSelected ? "bg-slate-50" : "bg-white border-slate-200 text-[#999]"}`}
                      style={{
                        borderColor: isSelected ? color : undefined,
                        color: isSelected ? "#29343D" : undefined,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      {status}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Success Section */}
          {currentStep === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="text-[24px] font-bold text-[#29343D] mb-3">
                Appointment Created!
              </h2>
              <p className="text-[15px] text-[#999] max-w-sm mx-auto leading-relaxed">
                Your new appointment has been successfully booked and added to
                the calendar.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep < 4 ? (
          <div className="flex-none p-8 border-t border-slate-100 flex gap-4 bg-white">
            {currentStep === 1 ? (
              <button
                onClick={onClose}
                className="w-[30%] py-4 rounded-[12px] text-[15px] font-bold bg-[#F8FAFC] text-[#29343D] hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-[30%] py-4 rounded-[12px] text-[15px] font-bold bg-[#F8FAFC] text-[#29343D] hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                className="w-[70%] py-4 rounded-[12px] bg-[#635BFF] text-white text-[15px] font-bold hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-[#635BFF]/20 cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={!isValid || !isStep3Valid}
                className="w-[70%] py-4 rounded-[12px] bg-[#635BFF] text-white text-[15px] font-bold hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-[#635BFF]/20 cursor-pointer"
              >
                Create Appointment
              </button>
            )}
          </div>
        ) : (
          <div className="flex-none p-8 border-t border-slate-100 flex justify-center bg-white">
            <button
              onClick={handleFinalize}
              className="w-full py-4 rounded-[12px] bg-[#635BFF] text-white text-[15px] font-bold hover:opacity-90 transition-all shadow-lg shadow-[#635BFF]/20 cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

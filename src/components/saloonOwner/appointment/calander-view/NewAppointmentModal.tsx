import { useState } from "react";
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
} from "lucide-react";

const DUMMY_CLIENTS = [
  {
    id: "1",
    name: "Sofia Rossi",
    notes: "Promised 10% discount on next haircut. Check before payment.",
    giftCards: 1,
    giftCardDetails: {
      dateOfIssue: "02/09/2025",
      dateOfExpiration: "06/20/2026",
      amount: "â‚¬50",
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
    notes: "", 
    giftCards: 0,
    giftCardDetails: null,
  },
];

const DUMMY_SERVICES = [
  { id: "s1", name: "Haircut", duration: "30m", price: "â‚¬30" },
  { id: "s2", name: "Blowdry", duration: "30m", price: "â‚¬25" },
  { id: "s3", name: "Coloring", duration: "90m", price: "â‚¬80" },
  { id: "s4", name: "Haircut & Blowdry", duration: "60m", price: "â‚¬50" },
  { id: "s5", name: "Highlights", duration: "100m", price: "â‚¬120" },
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

  const handleConfirm = () => {
    if (!isValid) return;
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
        className="bg-white rounded-[12px] shadow-2xl w-full max-w-[620px] max-h-[94vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none px-8 py-6 flex items-start justify-between border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-[20px] font-bold text-[#29343D]">
              New Appointment
            </h2>
            <p className="text-[14px] text-[#999] font-medium mt-0.5">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-[#29343D]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Client Selection */}
          <section className="space-y-4">
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
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                  size={18}
                />
                <select
                  value={selectedClientId}
                  onChange={(e) => {
                    setSelectedClientId(e.target.value);
                    setShowGiftDetails(false);
                  }}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none appearance-none cursor-pointer"
                >
                  <option value="">Search or select client...</option>
                  {DUMMY_CLIENTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                  size={18}
                />
              </div>
            ) : (
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
                                  " â€¢ ",
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

          {/* Services Section */}
          <section className="space-y-3">
            <label className="text-[12px] font-bold text-[#999]">
              Services *
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) handleServiceToggle(e.target.value);
                  e.target.value = "";
                }}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none appearance-none cursor-pointer"
              >
                <option value="">Search or select a service...</option>
                {DUMMY_SERVICES.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                    disabled={selectedServiceIds.includes(s.id)}
                  >
                    {s.name} ({s.duration}) â€” {s.price}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                size={18}
              />
            </div>

            {selectedServiceIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedServiceIds.map((id) => {
                  const srv = DUMMY_SERVICES.find((s) => s.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-[#635BFF]/10 text-[#635BFF] px-3 py-1.5 rounded-[4px] text-[13px] font-bold border border-[#635BFF]/20"
                    >
                      {srv?.name} {srv?.duration}
                      <button
                        onClick={() => handleServiceToggle(id)}
                        className="hover:text-[#29343D] cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="text-[13px] font-bold text-[#29343D] pt-2">
              Total duration:{" "}
              <span className="font-extrabold">{formattedTotalDuration}</span>
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

          {/* Status Section */}
          <section className="space-y-4">
            <label className="text-[12px] font-bold text-[#999]">Status</label>
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
        </div>

        {/* Footer */}
        <div className="flex-none p-8 border-t border-slate-100 flex gap-4 bg-white">
          <button
            onClick={onClose}
            className="w-[30%] py-4 rounded-[12px] text-[15px] font-bold bg-[#F8FAFC] text-[#29343D] hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="w-[70%] py-4 rounded-[12px] bg-[#635BFF] text-white text-[15px] font-bold hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-[#635BFF]/20 cursor-pointer"
          >
            Create Appointment
          </button>
        </div>
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

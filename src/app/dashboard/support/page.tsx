"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  LifeBuoy,
  MessageSquare,
  Send,
  Paperclip,
  Search,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageCircle,
  User,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  sender: "User" | "Admin";
  text: string;
  time: string;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Pending Admin" | "Replied" | "Closed";
  date: string;
  description: string;
  attachmentName?: string;
  messages: Message[];
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TCK-8921",
    subject: "Payout delayed for last weekend's bookings",
    category: "Billing & Subscriptions",
    priority: "High",
    status: "Replied",
    date: "2026-06-14",
    description: "My payout for June 12-13 has not arrived in my bank account yet. Usually, payouts clear by Monday morning. Please check on this.",
    attachmentName: "payout_history.pdf",
    messages: [
      {
        id: "m1",
        sender: "User",
        text: "My payout for June 12-13 has not arrived in my bank account yet. Usually, payouts clear by Monday morning. Please check on this.",
        time: "10:15 AM, Jun 14",
      },
      {
        id: "m2",
        sender: "Admin",
        text: "Hi Felix, we experienced a minor delay with our payment gateway partner processor over the weekend. All pending transactions have been processed and should clear in your bank account within the next 24 hours. Sorry for the inconvenience!",
        time: "02:30 PM, Jun 14",
      },
      {
        id: "m3",
        sender: "User",
        text: "Perfect, thank you! I will keep an eye out for it tomorrow.",
        time: "03:10 PM, Jun 14",
      },
    ],
  },
  {
    id: "TCK-8740",
    subject: "Stylist calendar sync error with Google Calendar",
    category: "Technical Issue",
    priority: "Medium",
    status: "Closed",
    date: "2026-06-10",
    description: "One of my stylists (Sarah) is not seeing client bookings sync to her Google Calendar. The sync has been working fine for others.",
    messages: [
      {
        id: "m4",
        sender: "User",
        text: "One of my stylists (Sarah) is not seeing client bookings sync to her Google Calendar. The sync has been working fine for others.",
        time: "09:00 AM, Jun 10",
      },
      {
        id: "m5",
        sender: "Admin",
        text: "Hello, please try disconnected Sarah's profile from the Google Calendar integration panel and reconnecting it. This will reset the OAuth token. Let us know if that doesn't fix it.",
        time: "11:45 AM, Jun 10",
      },
      {
        id: "m6",
        sender: "User",
        text: "That worked perfectly. Thank you for the quick support!",
        time: "01:20 PM, Jun 10",
      },
    ],
  },
];

const FAQS = [
  {
    question: "How do I change my subscription plan?",
    answer: "You can change your subscription plan at any time by going to Dashboard > Settings > Subscription & Plans. From there, select your desired tier and your billing cycle will automatically adjust on the next statement.",
  },
  {
    question: "How do I set custom working hours for individual stylists?",
    answer: "Go to Dashboard > Team, select the stylist's profile, and click on 'Working Hours'. You can set different start/end times, custom break intervals, and assign specific days off for each team member.",
  },
  {
    question: "Why is my client's payment showing as pending?",
    answer: "A pending status usually means the bank is authorizing the client's credit card or the payout system is verifying the transaction. This usually resolves within 1-2 hours. If it takes longer than 24 hours, please submit a billing ticket above.",
  },
  {
    question: "Can I import my client database from another software?",
    answer: "Yes! We support CSV and Excel spreadsheet uploads. Go to Dashboard > Clients and click the 'Import Clients' button on the top right. We provide a downloadable template to map your fields correctly.",
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Form State
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Technical Issue");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Chat message state
  const [chatMessage, setChatMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when active ticket updates or new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket?.messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);

    // Simulate API Request
    setTimeout(() => {
      const newTicket: Ticket = {
        id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: subject,
        category: category,
        priority: priority,
        status: "Pending Admin",
        date: new Date().toISOString().split("T")[0],
        description: description,
        attachmentName: attachment ? attachment.name : undefined,
        messages: [
          {
            id: `m-init-${Date.now()}`,
            sender: "User",
            text: description,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + `, Today`,
          },
        ],
      };

      setTickets([newTicket, ...tickets]);
      setIsSubmitting(false);
      setSuccessMessage(true);

      // Reset form
      setSubject("");
      setDescription("");
      setPriority("Medium");
      setAttachment(null);

      // Hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(false), 5000);
    }, 1200);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !activeTicket) return;

    const userMessage: Message = {
      id: `m-user-${Date.now()}`,
      sender: "User",
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + `, Today`,
    };

    const updatedTicket: Ticket = {
      ...activeTicket,
      status: "Pending Admin",
      messages: [...activeTicket.messages, userMessage],
    };

    // Update both local storage/state list and active ticket details
    setTickets(tickets.map((t) => (t.id === activeTicket.id ? updatedTicket : t)));
    setActiveTicket(updatedTicket);
    setChatMessage("");

    // Simulate Admin Auto-Response after 2 seconds
    setTimeout(() => {
      const adminMessage: Message = {
        id: `m-admin-${Date.now()}`,
        sender: "Admin",
        text: `Thanks for the update. Our support team has received your message and is looking into this issue (Ticket: ${activeTicket.id}). We will reply shortly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + `, Today`,
      };

      const adminRepliedTicket: Ticket = {
        ...updatedTicket,
        status: "Replied",
        messages: [...updatedTicket.messages, adminMessage],
      };

      setTickets((prevTickets) =>
        prevTickets.map((t) => (t.id === activeTicket.id ? adminRepliedTicket : t))
      );
      // Only update active ticket if the user is still viewing it
      setActiveTicket((currentActive) =>
        currentActive && currentActive.id === activeTicket.id ? adminRepliedTicket : currentActive
      );
    }, 2000);
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityStyle = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Medium":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Low":
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getStatusStyle = (status: Ticket["status"]) => {
    switch (status) {
      case "Pending Admin":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Replied":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Closed":
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#635BFF] via-[#7B74FF] to-[#8F89FF] rounded-lg p-8 text-white shadow-xl shadow-[#635BFF]/10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none">
          <LifeBuoy className="w-96 h-96" />
        </div>
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4 border border-white/10 uppercase tracking-wider">
            <LifeBuoy className="w-3.5 h-3.5" /> Support Center
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-manrope tracking-tight leading-tight mb-3">
            How can we help you today?
          </h1>
          <p className="text-white/95 text-base font-medium font-manrope leading-relaxed">
            Submit a support request to the platform admin, chat with support staff, or read through the quick troubleshooting guide below.
          </p>
        </div>

        {/* Support Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20 max-w-xl">
          <div>
            <div className="text-2xl font-bold font-manrope">10 min</div>
            <div className="text-xs text-white/80">Avg. Response Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-manrope">24/7</div>
            <div className="text-xs text-white/80">Admin Availability</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold font-manrope">
              {tickets.filter((t) => t.status !== "Closed").length} Active
            </div>
            <div className="text-xs text-white/80">Support Requests</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left Column: Form & Direct Contact */}
        <div className="lg:col-span-2 space-y-6">

          {/* Support Ticket Submission Form */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center rounded-lg">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1E293B] font-manrope">Contact Admin Support</h2>
                <p className="text-xs text-[#64748B]">Fill out this form to initiate a support thread with our platform administrator.</p>
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Support Ticket Submitted!</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your request was received successfully. You can monitor the ticket and chat with the admin in the ticket panel.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:bg-white transition-all font-medium"
                >
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Billing & Subscriptions">Billing & Subscriptions</option>
                  <option value="Account Settings">Account Settings</option>
                  <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                  <option value="Other">Other / Custom Request</option>
                </select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Styling menu not loading on mobile view"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Describe the Issue</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Provide as much detail as possible. If it is a technical issue, include the steps to reproduce it."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:bg-white transition-all font-medium resize-none"
                ></textarea>
              </div>

              {/* Attachment */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Screenshot or Documents (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-[#E2E8F0] hover:bg-[#F1F5F9] rounded-lg text-sm font-semibold text-[#475569] transition-colors">
                    <Paperclip className="w-4 h-4 text-[#64748B]" />
                    <span>Upload file</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,application/pdf,.doc,.docx"
                    />
                  </label>
                  {attachment ? (
                    <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg py-1 px-3 text-xs font-medium text-[#475569] animate-fadeIn">
                      <span className="truncate max-w-[200px]">{attachment.name}</span>
                      <button
                        type="button"
                        onClick={removeAttachment}
                        className="text-[#EF4444] hover:text-red-700 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-[#94A3B8]">Supports PNG, JPG, PDF up to 5MB</span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#635BFF] hover:bg-[#4F46E5] text-white font-bold rounded-lg text-sm transition-all shadow-md shadow-[#635BFF]/10 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending support request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick FAQ / Help Section */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#1E293B] font-manrope">Frequently Asked Questions</h2>
                <p className="text-xs text-[#64748B]">Quick self-help guides to resolve issues immediately without waiting.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:bg-white transition-all placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#F1F5F9] rounded-lg hover:border-[#E2E8F0] transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between text-left p-4 focus:outline-none"
                      >
                        <span className="font-bold text-sm text-[#334155] font-manrope">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#64748B] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 text-xs text-[#64748B] leading-relaxed border-t border-[#F8FAFC] pt-3 bg-[#F8FAFC]/50 rounded-b-xl animate-slideDown">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-[#94A3B8] text-xs">
                  No FAQ answers match your search term. Use the form above to submit a support request.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Tickets & Contact Channels */}
        <div className="space-y-6">
          {/* Alternative Direct Channels */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-[#1E293B] font-manrope">Direct Contact Details</h3>
            <p className="text-xs text-[#64748B]">Need instant help? Connect with the administrator using these channels.</p>

            <div className="space-y-3.5 pt-2">
              <a
                href="mailto:admin@harem-beauty.com"
                className="flex items-center gap-3 p-3 rounded-lg border border-[#F1F5F9] hover:bg-slate-50 transition-colors"
              >
                <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-bold text-[#334155] uppercase tracking-wider">Email Us</div>
                  <div className="text-xs text-[#64748B] truncate">admin@harem-beauty.com</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] ml-auto shrink-0" />
              </a>

              <a
                href="tel:+18005553289"
                className="flex items-center gap-3 p-3 rounded-lg border border-[#F1F5F9] hover:bg-slate-50 transition-colors"
              >
                <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-bold text-[#334155] uppercase tracking-wider">Phone Support</div>
                  <div className="text-xs text-[#64748B] truncate">+1 (800) 555-3289</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] ml-auto shrink-0" />
              </a>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#F1F5F9] bg-[#F8FAFC]">
                <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#334155] uppercase tracking-wider">Support Hours</div>
                  <div className="text-xs text-[#64748B]">Mon - Fri: 8 AM - 8 PM EST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Chat Drawer (Right-aligned Slide Panel overlay) */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn">
          {/* Backdrop click closer */}
          <div className="absolute inset-0" onClick={() => setActiveTicket(null)} />

          {/* Drawer container */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">

            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTicket.status === "Closed" ? "bg-slate-200 text-slate-600" : "bg-[#635BFF]/10 text-[#635BFF]"
                  }`}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#1E293B] font-manrope">
                      Ticket Conversation
                    </h3>
                    <span className="text-[10px] font-extrabold text-[#94A3B8] uppercase">
                      {activeTicket.id}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-[#64748B] max-w-[260px] truncate">
                    Subject: {activeTicket.subject}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(activeTicket.status)}`}>
                  {activeTicket.status}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  className="p-1 text-[#64748B] hover:text-[#1E293B] rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Ticket context metadata panel */}
            <div className="px-6 py-4 bg-slate-100/50 border-b border-[#E2E8F0] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">Category:</span>
                <span className="font-semibold text-[#334155]">{activeTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">Priority:</span>
                <span className="font-semibold text-[#334155] flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeTicket.priority === "Urgent" ? "bg-rose-500" :
                    activeTicket.priority === "High" ? "bg-amber-500" :
                      activeTicket.priority === "Medium" ? "bg-blue-500" : "bg-slate-400"
                    }`} />
                  {activeTicket.priority} Priority
                </span>
              </div>
              {activeTicket.attachmentName && (
                <div className="flex justify-between">
                  <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">Attachment:</span>
                  <span className="font-semibold text-[#635BFF] flex items-center gap-1">
                    <Paperclip className="w-3 h-3" />
                    {activeTicket.attachmentName}
                  </span>
                </div>
              )}
            </div>

            {/* Messages body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">

              {/* First original report */}
              <div className="bg-slate-100/80 border border-[#E2E8F0] rounded-lg p-4 text-xs text-[#475569] leading-relaxed mb-6 text-left">
                <div className="font-bold text-[#1E293B] mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#635BFF]" />
                  <span>Original Submission Detail:</span>
                </div>
                {activeTicket.description}
              </div>

              {/* Message History */}
              {activeTicket.messages.map((m) => {
                const isAdmin = m.sender === "Admin";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] ${isAdmin ? "self-start items-start text-left" : "self-end items-end ml-auto text-right"
                      }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {isAdmin ? (
                        <>
                          <div className="w-5 h-5 bg-[#635BFF] text-white rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                          <span className="text-[10px] font-bold text-[#475569]">System Admin</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] font-bold text-[#475569]">You (Saloon Owner)</span>
                          <div className="w-5 h-5 bg-slate-200 text-[#475569] rounded-full flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-xs leading-relaxed ${isAdmin
                        ? "bg-white text-[#334155] rounded-tl-none border border-[#E2E8F0] shadow-xs"
                        : "bg-[#635BFF] text-white rounded-tr-none shadow-xs shadow-[#635BFF]/10"
                        }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-[#94A3B8] mt-1 px-1">
                      {m.time}
                    </span>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Message input footer */}
            <div className="p-4 border-t border-[#E2E8F0] bg-white">
              {activeTicket.status === "Closed" ? (
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-center text-xs text-[#64748B] font-medium">
                  This support ticket is closed. If you have any further questions, please submit a new ticket.
                </div>
              ) : (
                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your response to the admin..."
                    className="flex-1 px-4 py-2.5 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 bg-[#635BFF] hover:bg-[#4F46E5] text-white rounded-lg flex items-center justify-center shadow-md shadow-[#635BFF]/10 shrink-0 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Bell, Check, Calendar, AlertCircle, ShoppingBag, CheckCircle2 } from "lucide-react";

interface Notification {
  id: string;
  type: "appointment" | "system" | "sale" | "alert";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "New Appointment",
    message: "Maria Fernandez booked a Haircut for tomorrow at 11:00 AM.",
    time: "10 mins ago",
    isRead: false,
  },
  {
    id: "2",
    type: "sale",
    title: "Product Sold",
    message: "Moroccanoil Treatment 100ml was sold. 4 items remaining in stock.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "3",
    type: "alert",
    title: "Low Stock Alert",
    message: "Olaplex No.4 Bond Maintenance Shampoo is running low (2 left).",
    time: "5 hours ago",
    isRead: true,
  },
  {
    id: "4",
    type: "system",
    title: "System Update",
    message: "The platform will undergo scheduled maintenance on Sunday at 2:00 AM.",
    time: "1 day ago",
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment": return <Calendar className="w-5 h-5 text-[#635BFF]" />;
      case "sale": return <ShoppingBag className="w-5 h-5 text-[#10B981]" />;
      case "alert": return <AlertCircle className="w-5 h-5 text-[#EF4444]" />;
      case "system": return <Bell className="w-5 h-5 text-[#64748B]" />;
      default: return <Bell className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "appointment": return "bg-[#E0E7FF]";
      case "sale": return "bg-[#D1FAE5]";
      case "alert": return "bg-[#FEE2E2]";
      case "system": return "bg-[#F1F5F9]";
      default: return "bg-[#F1F5F9]";
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-[#EF4444] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Stay updated with appointments, sales, and alerts.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#E2E8F0]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-[#E2E8F0]">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 sm:p-8 transition-colors flex items-start gap-4 sm:gap-6 relative group ${notification.isRead ? 'bg-white hover:bg-slate-50/50' : 'bg-[#F8F9FE]'}`}
              >
                {!notification.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#635BFF]"></div>
                )}

                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <h3 className={`text-[15px] font-manrope truncate ${notification.isRead ? 'font-semibold text-[#1E293B]' : 'font-bold text-[#1E293B]'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-[12px] font-medium text-[#94A3B8] shrink-0 whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed max-w-3xl ${notification.isRead ? 'text-[#64748B] font-medium' : 'text-[#475569] font-bold'}`}>
                    {notification.message}
                  </p>
                </div>

                {!notification.isRead && (
                  <div className="shrink-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1.5 text-[#94A3B8] hover:text-[#10B981] hover:bg-[#D1FAE5] rounded-full transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E2E8F0]">
              <Bell className="w-8 h-8 text-[#94A3B8]" />
            </div>
            <h3 className="text-[16px] font-bold text-[#1E293B] font-manrope mb-1">No notifications yet</h3>
            <p className="text-[13px] text-[#64748B] font-medium">You're all caught up! New alerts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

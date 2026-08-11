import React from "react";
import { CalendarManagement } from "@/components/saloonOwner/social/calendar/CalendarManagement";

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <CalendarManagement />
    </div>
  );
}

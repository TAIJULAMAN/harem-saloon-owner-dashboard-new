"use client";

import React, { Suspense } from "react";
import SettingsPageContent from "@/components/saloonOwner/appointments/SettingsPageContent";

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-5 text-center text-[#64748B]">
          Loading settings...
        </div>
      }
    >
      <SettingsPageContent />
    </Suspense>
  );
}

"use client";

import { Suspense } from "react";
import AppoinmentContentInner from "./AppoinmentContentInner";

export default function AppoinmentContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F6FA]"></div>}>
      <AppoinmentContentInner />
    </Suspense>
  );
}

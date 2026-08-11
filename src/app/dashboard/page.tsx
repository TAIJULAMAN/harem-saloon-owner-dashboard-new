"use client";

import React, { Suspense } from "react";
import StatCards from "@/components/saloonOwner/Statistics/StatCards";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import DashboardHeaderActions from "@/components/saloonOwner/dashboard/DashboardHeaderActions";
import ClientsGrowthChart from "@/components/saloonOwner/dashboard/ClientsGrowthChart";
import RevenueTrendChart from "@/components/saloonOwner/dashboard/RevenueTrendChart";
import AppointmentsChart from "@/components/saloonOwner/dashboard/AppointmentsChart";
import DailySummary from "@/components/saloonOwner/dashboard/DailySummary";
import OnlinePayment from "@/components/saloonOwner/dashboard/OnlinePayment";
import AgendaAppointments from "@/components/saloonOwner/dashboard/AgendaAppointments";
import PeakHoursHeatmap from "@/components/saloonOwner/dashboard/Charts/PeakHoursHeatmap";
import RevenueSplitChart from "@/components/saloonOwner/dashboard/Charts/RevenueSplitChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#64748B]">Loading dashboard data...</div>}>
      <div className="space-y-5 pb-5">
        <DashboardHeaderActions />
        <StatCards />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <DailySummary />
          <ClientsGrowthChart />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <RevenueTrendChart />
          <OnlinePayment />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <AppointmentsChart />
          <AgendaAppointments appointments={[
            {
              id: "1",
              photo: "/avatar/icon1.png",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            },
            {
              id: "2",
              photo: "/avatar/icon2.png",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            },
            {
              id: "3",
              photo: "/avatar/icon1.png",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            },
            {
              id: "4",
              photo: "/avatar/icon1.png",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            },
            {
              id: "5",
              photo: "/avatar/icon1.png",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            }
          ]} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <PeakHoursHeatmap />
          <RevenueSplitChart />
        </div>
      </div>
    </Suspense>
  );
}

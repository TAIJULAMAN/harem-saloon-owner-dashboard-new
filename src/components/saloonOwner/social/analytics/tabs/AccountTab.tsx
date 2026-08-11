"use client";

import React, { useState } from "react";
import { MetricCard } from "../components/MetricCard";
import {
  MOCK_ANALYTICS_METRICS,
  MOCK_AUDIENCE_GENDER_AGE,
  MOCK_AUDIENCE_CITY,
  MOCK_FOLLOWERS_ACTIVE
} from "../../data";
import { CustomSelect } from "../../../../common/CustomSelect";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function AccountTab() {
  const [audienceFilter, setAudienceFilter] = useState("City");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const barThickness = isMobile ? 18 : 50;
  const genderAgeData = {
    labels: MOCK_AUDIENCE_GENDER_AGE.map(d => d.ageGroup),
    datasets: [
      {
        label: "Man (50%)",
        data: MOCK_AUDIENCE_GENDER_AGE.map(d => d.man),
        backgroundColor: "#635BFF",
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 6,
      },
      {
        label: "Woman (30%)",
        data: MOCK_AUDIENCE_GENDER_AGE.map(d => d.woman),
        backgroundColor: "#F472B6",
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 6,
      },
      {
        label: "Unspecified (20%)",
        data: MOCK_AUDIENCE_GENDER_AGE.map(d => d.unspecified),
        backgroundColor: "#FBBF24",
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 6,
      }
    ]
  };

  const genderAgeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          color: '#64748B',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#64748B",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 12 }, padding: 10 }
      },
      y: {
        grid: { color: "#F1F5F9", drawBorder: false },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 12 }, padding: 10 }
      }
    }
  };

  const followersActiveData = {
    labels: MOCK_FOLLOWERS_ACTIVE.map(d => isMobile ? d.day.slice(0, 3) : d.day),
    datasets: [
      {
        label: "Background",
        data: MOCK_FOLLOWERS_ACTIVE.map(() => 21),
        backgroundColor: "#F8FAFC",
        borderRadius: 8,
        borderSkipped: false,
        barThickness: barThickness,
        grouped: false,
        order: 2,
      },
      {
        label: "Active Hours",
        data: MOCK_FOLLOWERS_ACTIVE.map(d => d.value),
        backgroundColor: "#635BFF",
        borderRadius: 8,
        borderSkipped: false,
        barThickness: barThickness,
        grouped: false,
        order: 1,
      }
    ]
  };

  const followersActiveOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#1E293B",
        bodyFont: { weight: 'bold' as const },
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        boxPadding: 8,
        filter: (tooltipItem: any) => tooltipItem.dataset.label !== 'Background',
        callbacks: {
          title: () => null as any,
          label: (context: any) => `${context.raw}h`,
          afterLabel: () => `Total      100` // Mock matching design
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 11 }, padding: 10 }
      },
      y: {
        grid: { color: "#F8FAFC", drawBorder: false },
        border: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { size: 11 },
          padding: 15,
          callback: (value: any) => `${value}h`,
          stepSize: 3
        },
        min: 0,
        max: 21
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {MOCK_ANALYTICS_METRICS.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-5">
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-6">Audience by Gender/Age</h3>
          <div className="h-[220px] w-full">
            <Bar data={genderAgeData} options={genderAgeOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[14px] font-bold text-[#1E293B]">Audience by City</h3>
            <div className="w-28">
              <CustomSelect
                value={audienceFilter}
                onChange={setAudienceFilter}
                options={["City", "Country", "Locale"]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1 justify-center">
            {MOCK_AUDIENCE_CITY.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-24 text-[12px] text-[#94A3B8] font-medium">{item.city}</div>
                <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#635BFF] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-10 text-right text-[14px] font-bold text-[#1E293B]">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 sm:p-6">
        <h3 className="text-[14px] font-bold text-[#1E293B] mb-6">Followers Active by Hour/Day</h3>
        <div className="h-[250px] w-full mt-4 relative">
          <div className="relative h-full w-full">
            <Bar data={followersActiveData} options={followersActiveOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

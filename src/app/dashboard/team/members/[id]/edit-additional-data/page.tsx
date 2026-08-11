"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Trash2, ChevronDown, FileText } from "lucide-react";

export default function EditAdditionalDataPage() {
  const params = useParams();
  const id = params.id;

  const [certifications, setCertifications] = useState([
    "Professional Hairdresser",
    "Business Management"
  ]);

  const [courses, setCourses] = useState([
    "Leadership Management",
    "Customer Service Excellence"
  ]);

  const [languages, setLanguages] = useState([
    { language: "Italian", level: "Native" },
    { language: "English", level: "Advanced" },
    { language: "Spanish", level: "Intermediate" }
  ]);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between">
        <Link
          href={`/dashboard/team/members/${id}`}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors font-bold text-[14px]"
        >
          <ChevronLeft className="w-4 h-4" />
          Edit Additional Data
        </Link>
        <div className="flex items-center gap-3">
          <FileText className="w-[18px] h-[18px] text-[#94A3B8]" />
          <span className="text-[#94A3B8]">/</span>
          <button className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#C7D2FE] transition-colors">
            Waiver Templates
          </button>
        </div>
      </div>

      {/* Certifications Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-6">Certifications</h3>

        <div className="space-y-5">
          {certifications.map((cert, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-bold text-[#1E293B]">Certification Name</label>
                <button
                  onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                  className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={cert}
                onChange={(e) => {
                  const newCerts = [...certifications];
                  newCerts[idx] = e.target.value;
                  setCertifications(newCerts);
                }}
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all"
              />
            </div>
          ))}

          <button
            onClick={() => setCertifications([...certifications, ""])}
            className="bg-[#E0E7FF] text-[#635BFF] text-[13px] font-bold px-4 py-2 rounded-lg hover:bg-[#C7D2FE] transition-colors mt-2 inline-block"
          >
            Add New Certification
          </button>
        </div>
      </div>

      {/* Completed Courses Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-6">Completed Courses</h3>

        <div className="space-y-5">
          {courses.map((course, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-bold text-[#1E293B]">Course Name</label>
                <button
                  onClick={() => setCourses(courses.filter((_, i) => i !== idx))}
                  className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={course}
                onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[idx] = e.target.value;
                  setCourses(newCourses);
                }}
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all"
              />
            </div>
          ))}

          <button
            onClick={() => setCourses([...courses, ""])}
            className="bg-[#E0E7FF] text-[#635BFF] text-[13px] font-bold px-4 py-2 rounded-lg hover:bg-[#C7D2FE] transition-colors mt-2 inline-block"
          >
            Add New Course
          </button>
        </div>
      </div>

      {/* Languages Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-6">Languages</h3>

        <div className="space-y-6">
          {languages.map((lang, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Language *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => {
                      const newLangs = [...languages];
                      newLangs[idx].language = e.target.value;
                      setLanguages(newLangs);
                    }}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all pr-10"
                  />
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="relative">
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Level *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={lang.level}
                    onChange={(e) => {
                      const newLangs = [...languages];
                      newLangs[idx].level = e.target.value;
                      setLanguages(newLangs);
                    }}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all pr-10"
                  />
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setLanguages([...languages, { language: "", level: "" }])}
            className="bg-[#E0E7FF] text-[#635BFF] text-[13px] font-bold px-4 py-2 rounded-lg hover:bg-[#C7D2FE] transition-colors mt-2 inline-block"
          >
            Add Language
          </button>
        </div>
      </div>

      {/* Direct Manager Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-6">Direct Manger</h3>

        <div>
          <label className="block text-[13px] font-bold text-[#1E293B] mb-2">User *</label>
          <div className="relative md:w-1/2">
            <input
              type="text"
              placeholder="Select user"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all pr-10"
            />
            <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-4">
        <button className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-3 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm">
          Save Template
        </button>
      </div>

    </div>
  );
}

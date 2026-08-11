"use client";

import React, { useState } from "react";
import { Search, Instagram } from "lucide-react";
import { AnalyticsPostRow } from "../../data";
import { ViewPostModal } from "../components/ViewPostModal";
import Pagination from "@/components/saloonOwner/common/Pagination";

const MOCK_REELS: AnalyticsPostRow[] = Array.from({ length: 15 }).map((_, i) => {
  return {
    id: `reel-${i}`,
    thumbnail: "/holographic_sphere.png",
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Wed, 12 Oct at 11:01",
    type: "Video",
    views: i % 2 === 0 ? "1.5k" : "1.3k",
    accountsReached: i % 2 === 0 ? "1.5k" : "1.3k",
    totalInteractions: i % 2 === 0 ? "1.5k" : "1.3k",
    likes: i % 2 === 0 ? "1.5k" : "1.3k",
    comments: i % 2 === 0 ? "1.3k" : "1.8k",
    saves: i % 3 === 0 ? "1.5k" : "1.3k",
    shares: "1.3k",
    videoViews: i % 2 === 0 ? "1.5k" : "1.3k",
    watchTime: "20 seconds", // Average watch time
    engagementCarousel: "-",
    reachCarousel: "-",
    swipesForward: "-",
    swipesBackward: "1.3k", // Total watch time or swaps backward
  };
});

export function ReelsTab() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReel, setSelectedReel] = useState<AnalyticsPostRow | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filter reels based on search query
  const filteredReels = MOCK_REELS.filter((reel) =>
    reel.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredReels.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReels = filteredReels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg flex flex-col mt-2 h-full min-h-0 p-3 sm:p-5">
      {/* Controls */}
      <div className="pb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shrink-0">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] transition-colors text-sm text-[#1E293B]"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-auto flex-1 min-h-0 border border-[#E2E8F0] rounded-xl custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1100px] sm:min-w-[1300px]">
          <thead>
            <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
              <th className="sm:sticky sm:left-0 bg-[#F8F9FE] sm:z-10 px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[220px] min-w-[220px] sm:w-[360px] sm:min-w-[360px]">
                Posts
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Views
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Accounts reached
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Likes
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Comments
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Saves
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Shares
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Total interactions
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Average watch time
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope whitespace-nowrap">
                Total watch time
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedReels.map((reel) => (
              <tr
                key={reel.id}
                onClick={() => {
                  setSelectedReel(reel);
                  setIsViewModalOpen(true);
                }}
                className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <td className="sm:sticky sm:left-0 bg-white sm:z-10 px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] w-[220px] min-w-[220px] sm:w-[360px] sm:min-w-[360px]">
                  <div className="flex gap-3 sm:gap-4 items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-tr from-[#635BFF] to-[#F472B6] shrink-0 flex items-center justify-center text-white overflow-hidden">
                      <img src="/holographic_sphere.png" alt="Reel Thumbnail" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#1E293B] line-clamp-2 leading-tight">
                        {reel.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[11px] text-[#94A3B8] font-medium">
                          {reel.date}
                        </p>
                        <div className="w-5 h-5 rounded-full border border-[#635BFF] flex items-center justify-center text-[#635BFF] shrink-0">
                          <Instagram className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.views}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.accountsReached}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.likes}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.comments}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.saves}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.shares}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.totalInteractions}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {reel.watchTime}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] text-[#64748B] font-semibold">
                  {reel.swipesBackward}
                </td>
              </tr>
            ))}
            {paginatedReels.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 sm:px-6 py-10 text-center text-sm text-[#94A3B8]">
                  No reels found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* View Post/Reel Modal */}
      <ViewPostModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        post={selectedReel}
      />
    </div>
  );
}

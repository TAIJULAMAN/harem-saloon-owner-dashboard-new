"use client";

import React, { useState } from "react";
import { Search, Instagram } from "lucide-react";
import { AnalyticsPostRow } from "../../data";
import { ViewPostModal } from "../components/ViewPostModal";
import Pagination from "@/components/saloonOwner/common/Pagination";
import Image from "next/image";

const MOCK_STORIES: AnalyticsPostRow[] = Array.from({ length: 15 }).map(
  (_, i) => {
    return {
      id: `story-${i}`,
      thumbnail: "/holographic_sphere.png",
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "Wed, 12 Oct at 11:01",
      type: "Photo",
      views: "1.3k", // Impressions
      accountsReached: "1.3k",
      totalInteractions: "1.3k",
      likes: "1.3k", // Forward Taps
      comments: "1.3k", // Replies
      saves: "1.3k", // Back Taps
      shares: "1.3k", // Exits
      videoViews: "-",
      watchTime: "-",
      engagementCarousel: "-",
      reachCarousel: "-",
      swipesForward: "-",
      swipesBackward: "-",
    };
  },
);

export function StoryTab() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStory, setSelectedStory] = useState<AnalyticsPostRow | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filter stories based on search query
  const filteredStories = MOCK_STORIES.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination logic
  const totalItems = filteredStories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStories = filteredStories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
        <table className="w-full text-left border-collapse min-w-[850px] sm:min-w-[1000px]">
          <thead>
            <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
              <th className="sm:sticky sm:left-0 bg-[#F8F9FE] sm:z-10 px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[220px] min-w-[220px] sm:w-[360px] sm:min-w-[360px]">
                Posts
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Accounts reached
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Impressions
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Forward Taps
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Back Taps
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Replies
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope whitespace-nowrap">
                Exits
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedStories.map((story) => (
              <tr
                key={story.id}
                onClick={() => {
                  setSelectedStory(story);
                  setIsViewModalOpen(true);
                }}
                className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <td className="sm:sticky sm:left-0 bg-white sm:z-10 px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] w-[220px] min-w-[220px] sm:w-[360px] sm:min-w-[360px]">
                  <div className="flex gap-3 sm:gap-4 items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-tr from-[#635BFF] to-[#F472B6] shrink-0 flex items-center justify-center text-white overflow-hidden">
                      <Image
                        width={48}
                        height={60}
                        src="/holographic_sphere.png"
                        alt="Story Thumbnail"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#1E293B] line-clamp-2 leading-tight">
                        {story.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[11px] text-[#94A3B8] font-medium">
                          {story.date}
                        </p>
                        <div className="w-5 h-5 rounded-full border border-[#635BFF] flex items-center justify-center text-[#635BFF] shrink-0">
                          <Instagram className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {story.accountsReached}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {story.views}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {story.likes}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {story.saves}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-semibold">
                  {story.comments}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] text-[#64748B] font-semibold">
                  {story.shares}
                </td>
              </tr>
            ))}
            {paginatedStories.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 sm:px-6 py-10 text-center text-sm text-[#94A3B8]"
                >
                  No stories found matching your search.
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

      {/* View Story Modal */}
      <ViewPostModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        post={selectedStory}
      />
    </div>
  );
}

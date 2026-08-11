"use client";

import React, { useState } from "react";
import { Search, Instagram } from "lucide-react";
import { MOCK_ANALYTICS_POSTS, AnalyticsPostRow } from "../../data";
import { CustomSelect } from "../../../../common/CustomSelect";
import Pagination from "@/components/saloonOwner/common/Pagination";
import { ViewPostModal } from "../components/ViewPostModal";
import Image from "next/image";

export function PostsTab() {
  const [postType, setPostType] = useState("All Post Types");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<AnalyticsPostRow | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const itemsPerPage = 10;

  const getTypePill = (type: string) => {
    switch (type) {
      case "Link":
        return (
          <span className="px-3 py-1 bg-[#E0F2FE] text-[#0284C7] rounded-full text-xs font-bold">
            Link
          </span>
        );
      case "Photo":
        return (
          <span className="px-3 py-1 bg-[#FEF9C3] text-[#CA8A04] rounded-full text-xs font-bold">
            Photo
          </span>
        );
      case "Gif":
        return (
          <span className="px-3 py-1 bg-[#F1F5F9] text-[#475569] rounded-full text-xs font-bold">
            Gif
          </span>
        );
      case "Carousel":
        return (
          <span className="px-3 py-1 bg-[#E0E7FF] text-[#635BFF] rounded-full text-xs font-bold">
            Carousel
          </span>
        );
      case "Video":
        return (
          <span className="px-3 py-1 bg-[#CCFBF1] text-[#0D9488] rounded-full text-xs font-bold">
            Video
          </span>
        );
      default:
        return null;
    }
  };

  // Filter posts based on type and search query
  const filteredPosts = MOCK_ANALYTICS_POSTS.filter((post) => {
    const matchesType = postType === "All Post Types" || post.type === postType;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Pagination logic
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg flex flex-col mt-2 h-full min-h-0 p-3 sm:p-5">
      {/* Controls */}
      <div className="pb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 shrink-0">
        <div className="w-full sm:w-48 flex-shrink-0">
          <CustomSelect
            value={postType}
            onChange={(val) => {
              setPostType(val);
              setCurrentPage(1);
            }}
            options={[
              "All Post Types",
              "Link",
              "Photo",
              "Gif",
              "Carousel",
              "Video",
            ]}
            className="w-full"
            buttonClassName="w-full h-10 justify-between sm:justify-start"
          />
        </div>

        <div className="relative w-full sm:max-w-[256px]">
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

      {/* Table Container (Scrollable) */}
      <div className="overflow-auto flex-1 min-h-0 border border-[#E2E8F0] rounded-xl custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px] sm:min-w-[1400px]">
          <thead>
            <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
              <th className="sm:sticky sm:left-0 bg-[#F8F9FE] sm:z-10 px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[220px] min-w-[220px] sm:w-[360px] sm:min-w-[360px]">
                Posts
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Type
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Views
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Accounts reached
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] min-w-[200px]">
                Total interactions
                <div className="text-[10px] text-[#64748B] font-normal leading-tight mt-0.5">
                  (likes + comments + saves
                  <br />+ shares where available)
                </div>
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
                Video Views
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] whitespace-nowrap">
                Total watch time
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] min-w-[120px]">
                Engagement on
                <br />a carousel
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] min-w-[100px]">
                Reach of
                <br />
                carousel
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] min-w-[100px]">
                Swipes forward
                <br />
                (carousel)
              </th>
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] font-bold text-[#1E293B] font-manrope min-w-[100px]">
                Swipes backward
                <br />
                (carousel)
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post) => (
              <tr
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  setIsViewModalOpen(true);
                }}
                className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <td className="sm:sticky sm:left-0 bg-white sm:z-10 px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] w-[220px] min-w-[220px] sm:w-[360px] sm:min-w-[360px]">
                  <div className="flex gap-3 sm:gap-4 items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-tr from-[#635BFF] to-[#F472B6] shrink-0 flex items-center justify-center text-white overflow-hidden">
                      <Image
                        src="/holographic_sphere.png"
                        alt="Post Thumbnail"
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#1E293B] line-clamp-2 leading-tight">
                        {post.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[11px] text-[#94A3B8] font-medium">
                          {post.date}
                        </p>
                        <div className="w-5 h-5 rounded-full border border-[#635BFF] flex items-center justify-center text-[#635BFF] shrink-0">
                          <Instagram className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0]">
                  {getTypePill(post.type)}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.views}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.accountsReached}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.totalInteractions}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.likes}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.comments}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.saves}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.shares}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.videoViews}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.watchTime}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.engagementCarousel}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.reachCarousel}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 border-r border-[#E2E8F0] text-[13px] text-[#64748B] font-medium">
                  {post.swipesForward}
                </td>
                <td className="px-3 sm:px-6 py-4 sm:py-5 text-[13px] text-[#64748B] font-medium">
                  {post.swipesBackward}
                </td>
              </tr>
            ))}
            {paginatedPosts.length === 0 && (
              <tr>
                <td colSpan={15} className="px-3 sm:px-6 py-10 text-center text-sm text-[#94A3B8]">
                  No posts found matching your criteria.
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

      {/* View Post Modal */}
      <ViewPostModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        post={selectedPost}
      />
    </div>
  );
}

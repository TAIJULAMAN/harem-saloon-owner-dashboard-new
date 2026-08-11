"use client";

import React from "react";
import { X, ThumbsUp, MessageSquare, Repeat2, Send, Heart } from "lucide-react";
import { AnalyticsPostRow } from "../../data";

interface ViewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: AnalyticsPostRow | null;
}

export function ViewPostModal({ isOpen, onClose, post }: ViewPostModalProps) {
  if (!isOpen || !post) return null;

  // Render mock or dynamic stats
  const stats = {
    peopleEngaged: post.totalInteractions || "2.5k",
    totalConsumption: post.views || "2.3k",
    uniqueConsumption: post.accountsReached || "2.1k",
    storiesAboutPost: "2.3k",
    allReactions: post.totalInteractions || "2.5k",
    likes: post.likes || "1k",
    love: "2.3k",
    wow: "2.3k",
    haha: "2.3k",
    sad: "2.3k",
    angry: "2.3k",
  };

  return (
    <div className="fixed inset-0 bg-[#1E293B]/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-[850px] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F1F5F9]">
          <h2 className="text-base font-bold text-[#1E293B] font-manrope">View Post</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors text-[#64748B] hover:text-[#1E293B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col md:flex-row gap-6 overflow-y-auto min-h-0">
          
          {/* Left Column: Post Preview */}
          <div className="flex-1 flex flex-col border border-[#E2E8F0] rounded-2xl p-5 bg-white">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gradient-to-tr from-[#635BFF] to-[#F472B6] p-[2px]">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Roberto"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Roberto Marini</h4>
                <p className="text-xs text-[#94A3B8]">Posted on Instagram • {post.date}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[13px] text-[#334155] leading-relaxed mt-4 mb-4 font-medium">
              {post.title}
            </p>

            {/* Media Image */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
              <img
                src="/holographic_sphere.png"
                alt="Post media preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Action Buttons */}
            <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-4 text-[#64748B] text-xs font-bold">
              <button className="flex items-center gap-1.5 hover:text-[#635BFF] transition-colors cursor-pointer">
                <ThumbsUp className="w-4 h-4" /> Like
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#635BFF] transition-colors cursor-pointer">
                <MessageSquare className="w-4 h-4" /> Comment
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#635BFF] transition-colors cursor-pointer">
                <Repeat2 className="w-4 h-4" /> Repost
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#635BFF] transition-colors cursor-pointer">
                <Send className="w-4 h-4" /> Send
              </button>
            </div>
          </div>

          {/* Right Column: Analytics */}
          <div className="w-full md:w-[380px] shrink-0 border border-[#E2E8F0] rounded-2xl p-5 bg-[#FAFAFE]/60 flex flex-col">
            <h3 className="text-sm font-bold text-[#1E293B] mb-5 font-manrope">Post Analytics</h3>
            
            {/* Analytics Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">People engaged</p>
                <p className="text-sm font-extrabold text-[#1E293B] mt-1">{stats.peopleEngaged}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Total post consumption</p>
                <p className="text-sm font-extrabold text-[#1E293B] mt-1">{stats.totalConsumption}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Unique post consumption</p>
                <p className="text-sm font-extrabold text-[#1E293B] mt-1">{stats.uniqueConsumption}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Stories about the post</p>
                <p className="text-sm font-extrabold text-[#1E293B] mt-1">{stats.storiesAboutPost}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">All reactions by type</p>
                <p className="text-sm font-extrabold text-[#1E293B] mt-1">{stats.allReactions}</p>
              </div>
            </div>

            {/* Reactions breakdown */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 flex-1">
              {/* Likes */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center text-white">
                  <ThumbsUp className="w-3.5 h-3.5 fill-white" />
                </div>
                <div className="text-[12px] font-semibold text-[#64748B]">
                  Likes <span className="font-bold text-[#1E293B] ml-1">{stats.likes}</span>
                </div>
              </div>

              {/* Love */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center text-white">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
                <div className="text-[12px] font-semibold text-[#64748B]">
                  Love <span className="font-bold text-[#1E293B] ml-1">{stats.love}</span>
                </div>
              </div>

              {/* Wow */}
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">😮</span>
                <div className="text-[12px] font-semibold text-[#64748B]">
                  Wow <span className="font-bold text-[#1E293B] ml-1">{stats.wow}</span>
                </div>
              </div>

              {/* Haha */}
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">😆</span>
                <div className="text-[12px] font-semibold text-[#64748B]">
                  Haha <span className="font-bold text-[#1E293B] ml-1">{stats.haha}</span>
                </div>
              </div>

              {/* Sad/Sorry */}
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">😢</span>
                <div className="text-[12px] font-semibold text-[#64748B]">
                  Sad/Sorry <span className="font-bold text-[#1E293B] ml-1">{stats.sad}</span>
                </div>
              </div>

              {/* Angry */}
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">😡</span>
                <div className="text-[12px] font-semibold text-[#64748B]">
                  Angry <span className="font-bold text-[#1E293B] ml-1">{stats.angry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end p-4 border-t border-[#F1F5F9] bg-white">
          <button className="px-4 py-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] font-bold text-xs rounded-lg transition-colors cursor-pointer">
            Edit Post
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronDown,
  Smile,
  Hash,
  Image as ImageIcon,
  Plus,
  Maximize2,
  Tag,
  Wand2,
  Info,
  Heart,
  MessageCircle,
  Share,
  BarChart2,
  Bookmark,
} from "lucide-react";
import Image from "next/image";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: () => void;
}

const ACCOUNTS = [
  {
    id: "tw",
    name: "X (Twitter)",
    platform: "tw",
    bg: "bg-white",
    iconColor: "text-black",
    icon: "𝕏",
  },
  {
    id: "fb",
    name: "Facebook",
    platform: "fb",
    bg: "bg-[#1877F2]",
    iconColor: "text-white",
    icon: "f",
  },
  {
    id: "ig",
    name: "Instagram",
    platform: "ig",
    bg: "bg-gradient-to-tr from-[#FFD600] via-[#FF0100] to-[#D500BA]",
    iconColor: "text-white",
    icon: "📷",
  },
  {
    id: "in",
    name: "LinkedIn",
    platform: "in",
    bg: "bg-[#0A66C2]",
    iconColor: "text-white",
    icon: "in",
  },
  {
    id: "tk",
    name: "TikTok",
    platform: "tk",
    bg: "bg-[#696969]",
    iconColor: "text-white",
    icon: "🎵",
  },
  {
    id: "yt",
    name: "YouTube",
    platform: "yt",
    bg: "bg-[#696969]",
    iconColor: "text-white",
    icon: "▶️",
  },
];

const EMOJIS = ["😀", "😂", "🥰", "😎", "🤔", "🙌", "🔥", "✨", "🎉", "💅"];

export function AddPostModal({
  isOpen,
  onClose,
  onSchedule,
}: AddPostModalProps) {
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([
    "tw",
    "fb",
    "ig",
    "in",
  ]);
  const [description, setDescription] = useState("");
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setDescription("");
    setUploadedMediaUrl(null);
    setShowEmojiPicker(false);
    setSelectedAccountIds(["tw", "fb", "ig", "in"]);
    onClose();
  };

  const toggleAccount = (id: string) => {
    setSelectedAccountIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((a) => a !== id);
      }
      return [...prev, id];
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedMediaUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    setDescription(
      text.substring(0, start) + textToInsert + text.substring(end),
    );
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + textToInsert.length,
        start + textToInsert.length,
      );
    }, 0);
  };

  // Determine active channel for the main composer
  const activeChannel =
    selectedAccountIds.length > 0
      ? ACCOUNTS.find((a) => a.id === selectedAccountIds[0])
      : null;
  const linkedChannels = selectedAccountIds
    .slice(1)
    .map((id) => ACCOUNTS.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1A1A1A] rounded-[12px] w-full max-w-[1100px] max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden font-sans border border-[#333]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2C2C2C] bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-bold text-white">Create Post</h2>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-[13px] font-medium text-gray-300 border border-[#333] rounded-[6px] hover:bg-[#2C2C2C] transition-colors">
              <Tag className="w-3.5 h-3.5" />
              Tags
              <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold text-[#1A1A1A] bg-[#91E3A9] rounded-[6px] hover:bg-[#7ED896] transition-colors">
              <ImageIcon className="w-4 h-4" />
              Preview
            </button>
            <button className="text-gray-400 hover:text-white transition-colors ml-2">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: 2 Columns */}
        <div className="flex flex-1 overflow-hidden min-h-[600px]">
          {/* Left Column - Composer */}
          <div className="w-[60%] flex flex-col border-r border-[#2C2C2C] p-6 overflow-y-auto bg-[#222222]">
            {/* Account Avatars */}
            <div className="flex items-center gap-2 mb-6">
              {ACCOUNTS.map((account) => {
                const isSelected = selectedAccountIds.includes(account.id);
                return (
                  <button
                    key={account.id}
                    onClick={() => toggleAccount(account.id)}
                    className="relative focus:outline-none shrink-0 group"
                    title={account.name}
                  >
                    <div
                      className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-all ${isSelected ? account.bg : "bg-[#333] hover:bg-[#444]"} ${isSelected ? "" : "grayscale opacity-60 hover:grayscale-0 hover:opacity-100"}`}
                    >
                      <span
                        className={`text-[18px] font-bold ${isSelected ? account.iconColor : "text-gray-400"}`}
                      >
                        {account.icon}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Composer Box */}
            {activeChannel && (
              <div className="flex flex-col bg-[#2C2C2C] border border-[#3A3A3A] rounded-[10px] p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0 ${activeChannel.bg}`}
                  >
                    <span
                      className={`text-[12px] font-bold ${activeChannel.iconColor}`}
                    >
                      {activeChannel.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-transparent resize-none text-[15px] text-white placeholder:text-gray-500 focus:outline-none min-h-[140px]"
                      placeholder={
                        activeChannel.id === "tw"
                          ? "Start writing or get inspired with Templates"
                          : "What would you like to share?"
                      }
                    />

                    {/* Media Upload Area */}
                    <div className="mt-2 mb-4">
                      {uploadedMediaUrl ? (
                        <div className="relative w-48 h-48 rounded-[8px] overflow-hidden border border-[#444] group">
                          <Image
                            src={uploadedMediaUrl}
                            alt="Upload"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => setUploadedMediaUrl(null)}
                              className="bg-white/20 hover:bg-red-500 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-[140px] h-[140px] rounded-[12px] border border-dashed border-[#555] flex flex-col items-center justify-center gap-3 hover:bg-[#333] transition-colors cursor-pointer"
                        >
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                          <span className="text-[13px] font-medium text-[#7ED896] text-center leading-tight">
                            Drag & drop or
                            <br />
                            select a file
                          </span>
                        </button>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*"
                      />
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center justify-between border-t border-[#3A3A3A] pt-3">
                      <div className="flex items-center gap-1.5">
                        <button className="flex items-center gap-1 px-2 py-1 text-gray-400 hover:text-white rounded hover:bg-[#3A3A3A] transition-colors">
                          <Plus className="w-4 h-4" />
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        <div className="relative" ref={emojiPickerRef}>
                          <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#3A3A3A] transition-colors"
                          >
                            <Smile className="w-[18px] h-[18px]" />
                          </button>
                          {showEmojiPicker && (
                            <div className="absolute bottom-full left-0 mb-2 w-[240px] bg-[#2C2C2C] border border-[#3A3A3A] rounded-[8px] shadow-lg p-2 grid grid-cols-5 gap-1 z-20">
                              {EMOJIS.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => {
                                    insertAtCursor(emoji);
                                    setShowEmojiPicker(false);
                                  }}
                                  className="text-lg hover:bg-[#3A3A3A] p-1.5 rounded-[4px]"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => insertAtCursor("#")}
                          className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#3A3A3A] transition-colors"
                        >
                          <Hash className="w-[18px] h-[18px]" />
                        </button>

                        <button className="p-1.5 ml-1 text-green-900 bg-[#7ED896] rounded-[6px] hover:bg-[#92E3A9] transition-colors">
                          <Wand2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-[12px] font-medium text-gray-500 bg-[#1A1A1A] px-2 py-0.5 rounded-[4px] border border-[#333]">
                          {280 - description.length}
                        </div>
                        <button className="flex items-center gap-1.5 text-[14px] font-bold text-gray-300 hover:text-white transition-colors">
                          <Plus className="w-4 h-4" />
                          Start Thread
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Toggle */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#3A3A3A]">
                  <span className="text-[12px] font-bold text-gray-400 flex items-center gap-1">
                    AI-Generated <Info className="w-3 h-3" />
                  </span>
                  <button
                    onClick={() => setAiGenerated(!aiGenerated)}
                    className={`w-8 h-4 rounded-full relative transition-colors ${aiGenerated ? "bg-green-500" : "bg-gray-600"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${aiGenerated ? "right-0.5" : "left-0.5"}`}
                    ></div>
                  </button>
                </div>
              </div>
            )}

            {/* Linked Channels inputs */}
            {linkedChannels.map((channel) => channel && (
              <div
                key={channel.id}
                className="bg-[#2A2A2A] border border-[#333] rounded-[8px] p-3 mb-2 flex items-center gap-3"
              >
                <div className="relative">
                  <div
                    className={`w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0 ${channel.bg}`}
                  >
                    <span
                      className={`text-[12px] font-bold ${channel.iconColor}`}
                    >
                      {channel.icon}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFD600] border-2 border-[#2A2A2A] rounded-full"></div>
                </div>
                <span className="text-[14px] text-gray-400 flex-1 cursor-text">
                  What would you like to share?
                </span>
              </div>
            ))}
          </div>

          {/* Right Column - Previews */}
          <div className="w-[40%] bg-[#1A1A1A] flex flex-col">
            <div className="p-6 border-b border-[#2C2C2C] flex items-center gap-2 shrink-0">
              <h3 className="text-[14px] font-bold text-gray-300">
                Twitter / X Preview
              </h3>
              <Info className="w-3.5 h-3.5 text-gray-500" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
              {/* Preview Container */}
              <div className="w-full max-w-[360px] bg-[#111] border border-[#333] rounded-[12px] p-4 font-sans">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-white font-bold">
                    B
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[14px] font-bold text-white">
                        Buffer
                      </span>
                      <span className="text-[14px] text-gray-500">@buffer</span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-[14px] text-white whitespace-pre-wrap mb-3 leading-relaxed">
                  {description ||
                    "Start writing or get inspired with Templates"}
                </div>

                {/* Image */}
                {uploadedMediaUrl && (
                  <div className="w-full rounded-[14px] overflow-hidden border border-[#333] mb-3">
                    <Image
                      src={uploadedMediaUrl}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Action Icons */}
                <div className="flex items-center justify-between text-gray-500 mt-2 px-1">
                  <button className="hover:text-blue-400 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="hover:text-green-400 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 12h3M21 12h-3M12 3v3M12 21v-3M5.636 5.636l2.122 2.122M18.364 18.364l-2.122-2.122M5.636 18.364l2.122-2.122M18.364 5.636l-2.122 2.122" />
                    </svg>
                  </button>
                  <button className="hover:text-pink-500 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="hover:text-blue-400 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-4">
                    <button className="hover:text-blue-400">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="hover:text-blue-400">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {!description && !uploadedMediaUrl && (
                <div className="mt-8 flex flex-col items-center opacity-40">
                  <div className="w-32 h-32 bg-[#222] rounded-[8px] flex flex-col p-4 gap-2 mb-4 border border-[#333] relative">
                    <div className="absolute -top-3 -right-3 text-white text-xl">
                      ✨
                    </div>
                    <div className="absolute -bottom-2 -left-2 text-white text-xl">
                      ✨
                    </div>
                    <div className="flex gap-2 items-center mb-2">
                      <div className="w-4 h-4 rounded-full bg-[#444]"></div>
                      <div className="h-2 w-16 bg-[#444] rounded"></div>
                    </div>
                    <div className="flex-1 bg-[#444] rounded"></div>
                  </div>
                  <p className="text-[13px] text-gray-400 font-medium">
                    See your post preview here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 border-t border-[#2C2C2C] bg-[#1A1A1A] flex items-center justify-end z-10">
          <button
            onClick={() => onSchedule()}
            className="px-5 py-2.5 bg-[#91E3A9] hover:bg-[#7ED896] text-[#1A1A1A] text-[14px] font-bold rounded-[6px] transition-colors"
          >
            Connect Channels to Post
          </button>
        </div>
      </div>
    </div>
  );
}

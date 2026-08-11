import React from "react";
import { Instagram, Facebook, Twitter, Plus } from "lucide-react";
import { SocialPost } from "../../data";

interface WeekViewProps {
  currentDate: Date;
  posts: SocialPost[];
  onAddPost?: (date: string, time: string) => void;
}

export function WeekView({ currentDate, posts, onAddPost }: WeekViewProps) {
  // Get start of the week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    weekDays.push(d);
  }

  const hours = Array.from({ length: 24 }, (_, i) => {
    const ampm = i >= 12 ? 'PM' : 'AM';
    const hour12 = i % 12 || 12;
    return {
      label: `${hour12}:00 ${ampm}`,
      hour24: i
    };
  });

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDayHeader = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return `${d} ${dayName}`;
  };

  const parseTime = (timeString: string) => {
    // "12:30" -> 12.5
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + (minutes / 60);
  };

  const formatTimeLabel = (timeString: string) => {
    const [h, m] = timeString.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  const ROW_HEIGHT = 80;

  return (
    <div className="overflow-x-auto custom-scrollbar h-full w-full flex flex-col">
      <div className="flex flex-col bg-white border border-[#E2E8F0] rounded-lg overflow-hidden min-w-[800px] flex-1">
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr] border-b border-[#E2E8F0] bg-white">
        <div className="border-r border-[#E2E8F0]"></div>
        <div className="grid grid-cols-7">
          {weekDays.map((day, idx) => (
            <div key={idx} className={`py-4 text-center text-[12px] font-bold text-[#1E293B] ${idx < 6 ? 'border-r border-[#E2E8F0]' : ''}`}>
              {formatDayHeader(day)}
            </div>
          ))}
        </div>
      </div>

      {/* Body with scrolling */}
      <div className="overflow-y-auto max-h-[700px] relative">
        <div className="grid grid-cols-[80px_1fr]">
          {/* Time Sidebar */}
          <div className="border-r border-[#E2E8F0] bg-white">
            {hours.map((hour) => (
              <div key={hour.hour24} className="text-[11px] font-medium text-[#94A3B8] text-right pr-3 -mt-2" style={{ height: `${ROW_HEIGHT}px` }}>
                {hour.label}
              </div>
            ))}
          </div>

          {/* Grid lines and Posts Container */}
          <div className="grid grid-cols-7 relative">
            {/* Horizontal Grid lines (underneath everything) */}
            <div className="absolute inset-0 pointer-events-none">
              {hours.map((hour) => (
                <div key={hour.hour24} className="border-t border-[#F1F5F9]" style={{ height: `${ROW_HEIGHT}px` }}></div>
              ))}
            </div>

            {/* Columns and Posts */}
            {weekDays.map((day, colIdx) => {
              const formattedDate = formatDate(day);
              const dayPosts = posts.filter(p => p.date === formattedDate);

              return (
                <div key={colIdx} className={`relative group ${colIdx < 6 ? 'border-r border-[#F1F5F9]' : ''}`}>

                  {/* Hover slot functionality across each hour */}
                  {hours.map((hour) => (
                    <div
                      key={`hover-${hour.hour24}`}
                      className="absolute w-full opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center z-10"
                      style={{ top: `${hour.hour24 * ROW_HEIGHT}px`, height: `${ROW_HEIGHT}px` }}
                      onClick={() => onAddPost?.(formattedDate, `${String(hour.hour24).padStart(2, '0')}:00`)}
                    >
                      <div className="w-full h-8 border border-dashed border-[#635BFF] bg-[#E0E7FF]/50 rounded-lg mx-2 flex items-center justify-center text-[#635BFF]">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  ))}

                  {/* Render Posts */}
                  {dayPosts.map(post => {
                    const startPos = parseTime(post.startTime) * ROW_HEIGHT;
                    const endPos = parseTime(post.endTime) * ROW_HEIGHT;
                    const height = Math.max(endPos - startPos, 28); // minimum height

                    return (
                      <div
                        key={post.id}
                        className="absolute left-1 right-1 bg-[#C7D2FE] text-[#3730A3] rounded-lg px-2 py-1 flex items-center justify-between shadow-sm border border-[#A5B4FC] z-20 cursor-pointer hover:bg-[#A5B4FC] transition-colors overflow-hidden"
                        style={{ top: `${startPos}px`, height: `${height}px` }}
                      >
                        <span className="text-[11px] font-semibold truncate">
                          {post.title} - {formatTimeLabel(post.startTime)}
                        </span>
                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          {post.platforms.includes('instagram') && <Instagram className="w-3 h-3" />}
                          {post.platforms.includes('facebook') && <Facebook className="w-3 h-3" />}
                          {post.platforms.includes('twitter') && <Twitter className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

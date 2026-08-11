import React from "react";
import { Instagram, Facebook, Twitter, Plus } from "lucide-react";
import { SocialPost } from "../../data";

interface DayViewProps {
  currentDate: Date;
  posts: SocialPost[];
  onAddPost?: (date: string, time: string) => void;
}

export function DayView({ currentDate, posts, onAddPost }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const ampm = i >= 12 ? 'PM' : 'AM';
    const hour12 = i % 12 || 12;
    return {
      hour24: i,
      label: `${hour12}:00 ${ampm}`
    };
  });

  const formatDate = (date: Date) => {
    // Format locally to avoid timezone shifts
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const parseTime = (timeString: string) => {
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
  
  const formattedDate = formatDate(currentDate);
  const dayPosts = posts.filter(p => p.date === formattedDate);

  return (
    <div className="flex flex-col bg-white rounded-lg h-full overflow-hidden">
      {/* Body with scrolling */}
      <div className="overflow-y-auto h-full relative custom-scrollbar">
        <div className="grid grid-cols-[80px_1fr]">
          {/* Time Sidebar */}
          <div className="border-r border-[#E2E8F0] bg-white pt-6">
            {hours.map((hour) => (
              <div key={hour.hour24} className="text-[11px] font-medium text-[#94A3B8] text-right pr-3 -mt-2" style={{ height: `${ROW_HEIGHT}px` }}>
                {hour.label}
              </div>
            ))}
          </div>

          {/* Grid lines and Posts Container */}
          <div className="relative pt-6">
            {/* Horizontal Grid lines (underneath everything) */}
            <div className="absolute inset-0 pointer-events-none mt-6">
              {hours.map((hour) => (
                <div key={hour.hour24} className="border-t border-[#F1F5F9]" style={{ height: `${ROW_HEIGHT}px` }}></div>
              ))}
            </div>

            {/* Hover slot functionality across each hour */}
            <div className="relative w-full h-full">
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
                    className="absolute left-2 right-2 bg-[#E0E7FF] text-[#635BFF] border-l-4 border-l-[#635BFF] rounded-r-lg rounded-l-[4px] px-3 py-1.5 flex items-center justify-between shadow-sm z-20 cursor-pointer hover:bg-[#C7D2FE] transition-colors overflow-hidden"
                    style={{ top: `${startPos}px`, height: `${height}px` }}
                  >
                    <span className="text-[12px] font-bold truncate">
                      {post.title} - {formatTimeLabel(post.startTime)}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      {post.platforms.includes('instagram') && <Instagram className="w-3.5 h-3.5" />}
                      {post.platforms.includes('facebook') && <Facebook className="w-3.5 h-3.5" />}
                      {post.platforms.includes('twitter') && <Twitter className="w-3.5 h-3.5" />}
                    </div>
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

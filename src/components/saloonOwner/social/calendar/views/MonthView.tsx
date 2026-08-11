import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react"; // Import missing icons later if needed, assuming Lucide has them, or we can use custom SVG. Lucide has Facebook, Instagram, Twitter.
import { SocialPost } from "../../data";

interface MonthViewProps {
  currentDate: Date;
  posts: SocialPost[];
}

export function MonthView({ currentDate, posts }: MonthViewProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper to get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to build the calendar grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month leading days (to fill 35 or 42 slots)
  const remainingSlots = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }
  
  // Format YYYY-MM-DD for matching
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="overflow-auto custom-scrollbar h-full w-full flex flex-col">
      <div className="flex flex-col h-full bg-white border border-[#E2E8F0] rounded-lg min-w-[800px] flex-1">
      {/* Header */}
      <div className="grid grid-cols-7 border-b border-[#E2E8F0] bg-white">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-4 text-center text-[12px] font-bold text-[#64748B]">
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 flex-1 min-h-[600px]">
        {days.map((dayObj, index) => {
          const formattedDate = formatDate(dayObj.date);
          const dayPosts = posts.filter(p => p.date === formattedDate);
          const isToday = formattedDate === formatDate(new Date());

          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-b border-r border-[#E2E8F0] ${index % 7 === 6 ? 'border-r-0' : ''} ${!dayObj.isCurrentMonth ? 'bg-[#F8FAFC]/50' : 'bg-white'}`}
            >
              <div className="flex justify-end mb-2">
                <span className={`text-[12px] ${isToday ? 'w-6 h-6 flex items-center justify-center bg-[#635BFF] text-white rounded-full font-bold' : (dayObj.isCurrentMonth ? 'text-[#94A3B8]' : 'text-[#CBD5E1]')}`}>
                  {dayObj.date.getDate()}
                </span>
              </div>
              
              <div className="space-y-1">
                {dayPosts.map(post => (
                  <div key={post.id} className="bg-[#A5B4FC] text-[#312E81] rounded text-[11px] font-semibold px-2 py-1 flex items-center justify-between cursor-pointer hover:bg-[#818CF8] transition-colors">
                    <span className="truncate">{post.startTime} - {post.title}</span>
                    <div className="flex items-center gap-1 shrink-0 ml-1 text-[#4338CA]">
                      {post.platforms.includes('instagram') && <Instagram className="w-3 h-3" />}
                      {post.platforms.includes('facebook') && <Facebook className="w-3 h-3" />}
                      {post.platforms.includes('twitter') && <Twitter className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  );
}

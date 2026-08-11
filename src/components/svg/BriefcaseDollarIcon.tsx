import React from "react";

export default function BriefcaseDollarIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="7" width="18" height="14" rx="4" />
      <path d="M8 7V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
      <path d="M12 11v6" />
      <path d="M10 12.5h2.5a1.5 1.5 0 0 1 0 3H11a1.5 1.5 0 0 0 0 3h2.5" />
    </svg>
  );
}

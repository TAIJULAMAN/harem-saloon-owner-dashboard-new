"use client";

import { useState, useRef, useEffect } from "react";
import {
    MoreVertical,
    Download,
    Globe,
    Trash2,
    Play,
    Volume2,
    Maximize,
    MoreHorizontal,
    Eye,
    X
} from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
interface MediaItem {
    id: string;
    fileName: string;
    type: "photo" | "video";
    uploadedBy: string;
    uploadedAt: string;
    published: boolean;
    src: string;
    videoUrl?: string;
}

interface MediaCardProps {
    item: MediaItem;
    selected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
}

//  Checkbox 
const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
        role="checkbox"
        aria-checked={checked}
        onClick={(e) => { e.stopPropagation(); onChange(); }}
        className={`flex items-center justify-center w-[18px] h-[18px] rounded-[5px] transition-all duration-150 cursor-pointer
            ${checked
                ? "bg-[#635BFF] border-0"
                : "bg-white border-[1.5px] border-gray-300"
            }`}
    >
        {checked && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <polyline
                    points="1.5,6 4.5,9 10.5,3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
    </div>
);

// ─── Dropdown 
interface DropdownProps {
    onClose: () => void;
    onDelete: () => void;
}

const Dropdown = ({ onClose, onDelete }: DropdownProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClose]);

    return (
        <div
            ref={ref}
            className="absolute right-0 top-8 z-50 w-[148px] bg-white rounded-[10px] border border-gray-100 py-1.5 font-manrope shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
        >
            <button className="flex items-center gap-2.5 w-full px-4 py-[9px] text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={14} className="text-gray-400" />
                Download
            </button>
            <button className="flex items-center gap-2.5 w-full px-4 py-[9px] text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                <Globe size={14} className="text-[#635BFF]" />
                Use media
            </button>
            <div className="mx-3 my-1 border-t border-gray-100" />
            <button
                onClick={() => { onDelete(); onClose(); }}
                className="flex items-center gap-2.5 w-full px-4 py-[9px] text-[13px] text-red-500 hover:bg-red-50 transition-colors"
            >
                <Trash2 size={14} />
                Delete
            </button>
        </div>
    );
};

// ─── MediaCard 
export const MediaCard = ({ item, selected, onSelect, onDelete }: MediaCardProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <>
        <div className="bg-white overflow-hidden transition-all duration-200 rounded-[14px] border border-[#E0E6EB] p-[15px] md:p-[30px]">

            {/* ── Header ── */}
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-[10px]">
                    <Checkbox checked={selected} onChange={() => onSelect(item.id)} />
                    <span className="font-manrope font-semibold text-[13.5px] text-gray-800 truncate max-w-[180px]">
                        {item.fileName}
                    </span>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                    >
                        <MoreVertical size={18} color="#000" />
                    </button>
                    {menuOpen && (
                        <Dropdown
                            onClose={() => setMenuOpen(false)}
                            onDelete={() => onDelete(item.id)}
                        />
                    )}
                </div>
            </div>

            {/* ── Thumbnail ── */}
            <div className="relative overflow-hidden h-[195px] rounded-[8px] bg-gray-100 mb-6 group">
                {item.type === 'video' && (item.src.startsWith('blob:') || item.src.match(/\.(mp4|webm|ogg)$/i)) ? (
                    <video src={`${item.src}#t=0.001`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" preload="metadata" muted playsInline />
                ) : (
                    <Image
                        src={item.src}
                        alt={item.fileName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={500}
                        height={500}
                    />
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center z-20">
                    <div className="absolute top-3 right-3">
                        <div 
                            onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}
                            className={`w-5 h-5 rounded-[4px] border-2 cursor-pointer flex items-center justify-center transition-colors ${selected ? 'bg-white border-white' : 'border-white bg-transparent'}`}
                        >
                            {selected && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#0A2540]">
                                    <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                        <button onClick={() => setLightboxOpen(true)} className="w-10 h-10 rounded-full bg-white text-[#0A2540] flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm">
                            <Eye size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => alert("Downloading " + item.fileName)} className="w-10 h-10 rounded-full bg-white text-[#0A2540] flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm">
                            <Download size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Video overlay (only if not hovering to avoid clutter, or keep it under the hover) */}
                {item.type === "video" && (
                    <div className="absolute inset-0 flex flex-col justify-between z-10 pointer-events-none group-hover:opacity-0 transition-opacity">
                        {/* Center play button */}
                        <div className="flex-1 flex items-center justify-center" />

                        {/* Controls bar */}
                        <div className="backdrop-blur-md px-3 pt-[7px] pb-[9px]">
                            {/* Progress bar */}
                            <div className="w-full h-[3px] rounded-full bg-white/[0.28] mb-[7px]">
                                <div className="h-full w-0 rounded-full bg-white" />
                            </div>
                            {/* Controls row */}
                            <div className="flex items-center justify-between">
                                <Play size={12} fill="white" className="text-white" />
                                <div className="flex items-center gap-[10px]">
                                    <Volume2 size={13} className="text-white" />
                                    <Maximize size={13} className="text-white" />
                                    <MoreHorizontal size={13} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between flex-wrap gap-y-1">
                <div className="flex items-center gap-[6px]">
                    <span className="font-manrope font-medium text-[11px] px-[9px] py-[3px] rounded-lg border border-[#635BFF]/30 text-[#635BFF] bg-[#635BFF]/5">
                        Uploaded by: {item.uploadedBy}
                    </span>
                    {item.published ? (
                        <span className="font-manrope font-medium text-[11px] px-[9px] py-[3px] rounded-lg text-[#36C76C] bg-[#EBFAF0]">
                            Published
                        </span>
                    ) : (
                        <span className="font-manrope font-medium text-[11px] px-[9px] py-[3px] rounded-lg text-orange-500 bg-orange-50">
                            Not published
                        </span>
                    )}
                </div>
                <span className="font-manrope text-[11px] text-gray-400 whitespace-nowrap">
                    Uploaded at {item.uploadedAt}
                </span>
            </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && typeof window !== 'undefined' && createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-md">
                <button 
                    onClick={() => setLightboxOpen(false)}
                    className="absolute top-6 right-6 text-white/70 hover:text-white flex flex-col items-center gap-1 transition-colors z-50"
                >
                    <X size={24} />
                    <span className="text-[10px] font-manrope font-semibold">Close [ESC]</span>
                </button>

                <div className="w-full max-w-5xl h-[80vh] relative flex items-center justify-center">
                    {item.type === "video" ? (
                        item.videoUrl && item.videoUrl.includes("youtube") ? (
                            <iframe 
                                src={item.videoUrl} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen 
                                className="w-full h-full max-h-[80vh] aspect-video rounded-xl shadow-2xl bg-black border-none"
                            />
                        ) : (
                            <video 
                                src={item.videoUrl || item.src} 
                                controls 
                                autoPlay 
                                className="max-w-full max-h-full rounded-xl shadow-2xl bg-black"
                            />
                        )
                    ) : (
                        <Image
                            src={item.src}
                            alt={item.fileName}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            width={1200}
                            height={800}
                            unoptimized
                        />
                    )}
                </div>
            </div>,
            document.body
        )}
        </>
    );
};

// ─── Demo Wrapper ─────────────────────────────────────────────────────────────
const DEMO_ITEMS: MediaItem[] = [
    {
        id: "1",
        fileName: "FileName.jpeg",
        type: "photo",
        uploadedBy: "Maria",
        uploadedAt: "08/08/2025 5:06 PM",
        published: true,
        src: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&q=80",
    },
    {
        id: "2",
        fileName: "FileName.jpeg",
        type: "video",
        uploadedBy: "Maria",
        uploadedAt: "08/08/2025 5:06 PM",
        published: false,
        src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f7b8?w=600&q=80",
    },
];

export default function MediaCardDemo() {
    const [items, setItems] = useState(DEMO_ITEMS);
    const [selected, setSelected] = useState<string[]>(["1", "2"]);

    const allSelected = selected.length === items.length && items.length > 0;

    const toggleSelect = (id: string) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );

    const toggleAll = () =>
        setSelected(allSelected ? [] : items.map((i) => i.id));

    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setSelected((prev) => prev.filter((i) => i !== id));
    };

    return (
        <div className="min-h-screen font-manrope p-6 bg-[#F0F2F8]">
            <div className="w-full bg-white rounded-xl p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">

                {/* ── Top action bar ── */}
                <div className="flex items-center justify-between mb-5">
                    {/* Left: select / unselect all — <div> wrapper avoids nested <button> error */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={toggleAll}
                        onKeyDown={(e) => e.key === "Enter" && toggleAll()}
                        className="flex items-center gap-2 font-manrope font-semibold text-[13.5px] text-[#635BFF] hover:opacity-75 transition-opacity cursor-pointer"
                    >
                        <Checkbox checked={allSelected} onChange={toggleAll} />
                        {allSelected ? "Unselect All Salons" : "Select All Salons"}
                    </div>

                    {/* Right: action buttons */}
                    {selected.length > 0 && (
                        <div className="flex items-center gap-3">
                            <button className="font-manrope font-semibold text-[13px] px-[18px] py-2 rounded-lg border-[1.5px] border-red-300 text-red-500 bg-transparent hover:bg-red-50 transition-colors">
                                Mass Deletion
                            </button>
                            <button className="font-manrope font-semibold text-[13px] px-5 py-2 rounded-lg bg-[#16CDC7] text-white hover:opacity-90 transition-opacity">
                                Use Media
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <MediaCard
                            key={item.id}
                            item={item}
                            selected={selected.includes(item.id)}
                            onSelect={toggleSelect}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
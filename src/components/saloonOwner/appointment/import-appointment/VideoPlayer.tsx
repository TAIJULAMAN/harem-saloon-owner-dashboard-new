import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoSrc =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleLoaded = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * v.duration;
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[290px] w-full rounded-[14px] overflow-hidden bg-black md:h-[495px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* Actual video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={() => {
          setPlaying(false);
          setShowControls(true);
        }}
        onClick={togglePlay} // click video to play/pause
        style={{ cursor: "pointer" }}
      />

      {/* Thumbnail overlay — only when paused/not started */}
      {!playing && (
        <>
          <div className="absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              src="/images/thumbline.jpg"
              alt="Thumbnail"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
          showControls || !playing ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Seekbar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-[3px] bg-white/30 cursor-pointer group/bar hover:h-[5px] transition-all"
        >
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-t from-black/55 to-transparent">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="cursor-pointer hover:opacity-75 transition-opacity"
            >
              {playing ? (
                <Pause size={16} fill="white" className="text-white" />
              ) : (
                <Play size={16} fill="white" className="text-white" />
              )}
            </button>
            <span className="text-white text-xs font-manrope select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="cursor-pointer hover:opacity-75 transition-opacity"
            >
              {muted ? (
                <VolumeX size={16} className="text-white" />
              ) : (
                <Volume2 size={16} className="text-white" />
              )}
            </button>
            <button
              onClick={handleFullscreen}
              className="cursor-pointer hover:opacity-75 transition-opacity"
            >
              <Maximize size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

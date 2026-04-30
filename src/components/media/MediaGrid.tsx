"use client";

import { useState } from "react";
import { Image, Video, FileAudio, Download, Trash2, Copy } from "lucide-react";
import { cn, formatFileSize, formatRelativeTime } from "@/lib/utils";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  tags: string[];
  createdAt: Date;
}

const sampleMedia: MediaItem[] = [
  { id: "1", filename: "bosque-verde-fachada.jpg", url: "", mimeType: "image/jpeg", size: 2457600, width: 1920, height: 1080, tags: ["bosque-verde", "fachada"], createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "2", filename: "bosque-verde-sala.jpg", url: "", mimeType: "image/jpeg", size: 1843200, width: 1920, height: 1080, tags: ["bosque-verde", "interiores"], createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  { id: "3", filename: "torre-ametista-tour.mp4", url: "", mimeType: "video/mp4", size: 52428800, duration: 45, tags: ["torre-ametista", "tour"], createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: "4", filename: "parque-sul-area-lazer.jpg", url: "", mimeType: "image/jpeg", size: 3145728, width: 2560, height: 1440, tags: ["parque-sul", "lazer"], createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) },
  { id: "5", filename: "bosque-verde-quartos.jpg", url: "", mimeType: "image/jpeg", size: 1638400, width: 1920, height: 1080, tags: ["bosque-verde", "interiores"], createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  { id: "6", filename: "parque-sul-promo.mp4", url: "", mimeType: "video/mp4", size: 104857600, duration: 90, tags: ["parque-sul", "promo"], createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { id: "7", filename: "torre-ametista-planta.jpg", url: "", mimeType: "image/jpeg", size: 921600, width: 1200, height: 900, tags: ["torre-ametista", "planta"], createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { id: "8", filename: "bosque-verde-piscina.jpg", url: "", mimeType: "image/jpeg", size: 2097152, width: 1920, height: 1280, tags: ["bosque-verde", "lazer"], createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
];

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return Image;
  if (mimeType.startsWith("video/")) return Video;
  if (mimeType.startsWith("audio/")) return FileAudio;
  return Image;
}

interface MediaGridProps {
  onSelect?: (media: MediaItem) => void;
  selectable?: boolean;
}

export function MediaGrid({ onSelect, selectable }: MediaGridProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    if (selectable) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    } else {
      const item = sampleMedia.find((m) => m.id === id);
      if (item) onSelect?.(item);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {sampleMedia.map((item) => {
        const Icon = getFileIcon(item.mimeType);
        const isSelected = selected.includes(item.id);
        const isVideo = item.mimeType.startsWith("video/");

        return (
          <div
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "group relative rounded-xl overflow-hidden border cursor-pointer transition-all",
              isSelected
                ? "border-[#d4a574] ring-2 ring-[#d4a574]/30"
                : "border-[#1f1f1f] hover:border-[#2a2a2a]"
            )}
          >
            {/* Thumbnail */}
            <div className="aspect-square bg-[#111111] flex items-center justify-center relative">
              {item.url ? (
                <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    isVideo ? "bg-purple-900/30" : "bg-[#1f1f1f]"
                  )}>
                    <Icon className={cn("h-5 w-5", isVideo ? "text-purple-400" : "text-zinc-500")} />
                  </div>
                  {isVideo && item.duration && (
                    <span className="text-xs text-zinc-500">{Math.floor(item.duration)}s</span>
                  )}
                </div>
              )}

              {/* Overlay on hover */}
              {hoveredId === item.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title="Copiar URL"
                  >
                    <Copy className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition-colors"
                    title="Deletar"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              )}

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[#d4a574] flex items-center justify-center">
                  <svg className="h-3 w-3 text-[#0a0a0a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2 bg-[#111111]">
              <p className="text-xs text-white truncate">{item.filename}</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-zinc-600">{formatFileSize(item.size)}</span>
                {item.width && item.height && (
                  <span className="text-xs text-zinc-600">{item.width}×{item.height}</span>
                )}
              </div>
              <p className="text-xs text-zinc-700 mt-0.5">{formatRelativeTime(item.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

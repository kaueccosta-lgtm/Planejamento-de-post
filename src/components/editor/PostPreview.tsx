"use client";

import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostPreviewProps {
  caption: string;
  mediaUrl?: string;
  accountName?: string;
  platform?: string;
}

export function PostPreview({
  caption,
  mediaUrl,
  accountName = "@sua_empresa",
  platform = "INSTAGRAM",
}: PostPreviewProps) {
  if (platform === "INSTAGRAM") {
    return (
      <div className="mx-auto w-full max-w-[375px]">
        <div className="rounded-2xl border border-[#1f1f1f] bg-white overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">O</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 leading-tight">
                  {accountName}
                </p>
                <p className="text-[10px] text-gray-400">Patrocinado</p>
              </div>
            </div>
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </div>

          {/* Media */}
          <div className="aspect-square bg-gray-100 relative">
            {mediaUrl ? (
              <img
                src={mediaUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4a574]/30 to-[#b8864a]/30 flex items-center justify-center mb-2">
                    <span className="text-[#b8864a] text-lg font-serif font-bold">O</span>
                  </div>
                  <p className="text-xs text-zinc-400">Prévia de mídia</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-gray-800" />
                <MessageCircle className="h-6 w-6 text-gray-800" />
                <Send className="h-6 w-6 text-gray-800" />
              </div>
              <Bookmark className="h-6 w-6 text-gray-800" />
            </div>

            <p className="text-xs font-semibold text-gray-900 mb-1">
              1.234 curtidas
            </p>

            {/* Caption */}
            <div className="text-xs text-gray-800 leading-relaxed">
              <span className="font-semibold mr-1">{accountName}</span>
              {caption ? (
                <span className="whitespace-pre-wrap">{caption.slice(0, 150)}{caption.length > 150 ? "... mais" : ""}</span>
              ) : (
                <span className="text-gray-400 italic">Sua legenda aparecerá aqui...</span>
              )}
            </div>

            <p className="text-[10px] text-gray-400 mt-1">HÁ 2 HORAS</p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-2">
          Prévia — Instagram Feed
        </p>
      </div>
    );
  }

  // Generic preview for other platforms
  return (
    <div className="mx-auto w-full max-w-[375px]">
      <div className="rounded-2xl border border-[#1f1f1f] bg-[#111111] overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
              <span className="text-[#d4a574] text-sm font-bold">O</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{accountName}</p>
              <p className="text-xs text-zinc-500">Agora</p>
            </div>
          </div>

          {caption ? (
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {caption.slice(0, 300)}{caption.length > 300 ? "..." : ""}
            </p>
          ) : (
            <p className="text-sm text-zinc-600 italic">Sua legenda aparecerá aqui...</p>
          )}
        </div>

        {mediaUrl && (
          <div className="aspect-video">
            <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <p className="text-center text-xs text-zinc-600 mt-2">
        Prévia — {platform.charAt(0) + platform.slice(1).toLowerCase()}
      </p>
    </div>
  );
}

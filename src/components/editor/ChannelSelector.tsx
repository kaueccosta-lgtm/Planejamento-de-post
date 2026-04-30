"use client";

import { useState } from "react";
import { Instagram, Facebook, Linkedin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  platform: "INSTAGRAM" | "FACEBOOK" | "LINKEDIN" | "TIKTOK";
  name: string;
  avatar?: string;
  followers: number;
}

const channels: Channel[] = [
  { id: "1", platform: "INSTAGRAM", name: "@bosqueverdeoficial", followers: 12400 },
  { id: "2", platform: "FACEBOOK", name: "Bosque Verde", followers: 8900 },
  { id: "3", platform: "LINKEDIN", name: "Oikos Incorporadora", followers: 3200 },
  { id: "4", platform: "INSTAGRAM", name: "@torreametista", followers: 6700 },
];

const platformIcons = {
  INSTAGRAM: { icon: Instagram, color: "#E1306C" },
  FACEBOOK: { icon: Facebook, color: "#1877F2" },
  LINKEDIN: { icon: Linkedin, color: "#0A66C2" },
  TIKTOK: { icon: () => <span className="text-xs font-bold">TT</span>, color: "#000" },
};

interface ChannelSelectorProps {
  selectedChannels: string[];
  onChange: (channels: string[]) => void;
}

export function ChannelSelector({ selectedChannels, onChange }: ChannelSelectorProps) {
  const toggle = (id: string) => {
    if (selectedChannels.includes(id)) {
      onChange(selectedChannels.filter((c) => c !== id));
    } else {
      onChange([...selectedChannels, id]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        Canais de publicação
      </p>
      <div className="space-y-2">
        {channels.map((channel) => {
          const { icon: Icon, color } = platformIcons[channel.platform];
          const isSelected = selectedChannels.includes(channel.id);

          return (
            <button
              key={channel.id}
              onClick={() => toggle(channel.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all",
                isSelected
                  ? "border-[#d4a574]/40 bg-[#d4a574]/5"
                  : "border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#2a2a2a]"
              )}
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {channel.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {channel.followers.toLocaleString("pt-BR")} seguidores
                </p>
              </div>
              <div
                className={cn(
                  "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                  isSelected
                    ? "border-[#d4a574] bg-[#d4a574]"
                    : "border-[#1f1f1f]"
                )}
              >
                {isSelected && <Check className="h-3 w-3 text-[#0a0a0a]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

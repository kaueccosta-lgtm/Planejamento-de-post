"use client";

import { cn, formatRelativeTime, platformColor } from "@/lib/utils";
import { Search } from "lucide-react";

interface ConversationItem {
  id: string;
  participantName: string;
  participantAvatar?: string;
  platform: string;
  lastMessage: string;
  lastMessageAt: Date;
  isRead: boolean;
  unreadCount: number;
}

const conversations: ConversationItem[] = [
  { id: "1", participantName: "João Silva", platform: "INSTAGRAM", lastMessage: "Olá! Tenho interesse no Bosque Verde, podem me enviar mais informações?", lastMessageAt: new Date(Date.now() - 5 * 60 * 1000), isRead: false, unreadCount: 3 },
  { id: "2", participantName: "Maria Fernanda", platform: "FACEBOOK", lastMessage: "Qual o valor do m² na Torre Ametista?", lastMessageAt: new Date(Date.now() - 15 * 60 * 1000), isRead: false, unreadCount: 1 },
  { id: "3", participantName: "Carlos Roberto", platform: "INSTAGRAM", lastMessage: "Obrigado pelas informações! Vou conversar com minha família.", lastMessageAt: new Date(Date.now() - 45 * 60 * 1000), isRead: true, unreadCount: 0 },
  { id: "4", participantName: "Ana Paula Lima", platform: "INSTAGRAM", lastMessage: "Ainda há unidades disponíveis no Parque Sul?", lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000), isRead: false, unreadCount: 2 },
  { id: "5", participantName: "Pedro Henrique", platform: "FACEBOOK", lastMessage: "Quando será a próxima feira de imóveis?", lastMessageAt: new Date(Date.now() - 3 * 60 * 60 * 1000), isRead: true, unreadCount: 0 },
  { id: "6", participantName: "Beatriz Costa", platform: "INSTAGRAM", lastMessage: "As plantas do Parque Sul são incríveis!", lastMessageAt: new Date(Date.now() - 5 * 60 * 60 * 1000), isRead: true, unreadCount: 0 },
];

const platformLabels: Record<string, string> = {
  INSTAGRAM: "IG",
  FACEBOOK: "FB",
  LINKEDIN: "LI",
};

interface ConversationListProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-[#1f1f1f]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar conversas..."
            className="w-full h-9 rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#d4a574]"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1f1f1f]">
        <button className="flex-1 py-2 text-xs font-medium text-[#d4a574] border-b-2 border-[#d4a574]">
          Todas (6)
        </button>
        <button className="flex-1 py-2 text-xs text-zinc-500 hover:text-white transition-colors">
          Não lidas (6)
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full flex items-start gap-3 p-3 text-left transition-colors border-b border-[#1f1f1f]/50",
              selectedId === conv.id
                ? "bg-[#d4a574]/10"
                : "hover:bg-[#111111]",
              !conv.isRead && "bg-[#0f0f0f]"
            )}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-[#1f1f1f] flex items-center justify-center">
                <span className="text-sm font-semibold text-zinc-400">
                  {conv.participantName.charAt(0).toUpperCase()}
                </span>
              </div>
              {/* Platform badge */}
              <div
                className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#0a0a0a]"
                style={{ backgroundColor: platformColor(conv.platform) }}
              >
                {platformLabels[conv.platform]}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className={cn("text-sm truncate", !conv.isRead ? "font-semibold text-white" : "text-zinc-300")}>
                  {conv.participantName}
                </p>
                <span className="text-xs text-zinc-600 flex-shrink-0">
                  {formatRelativeTime(conv.lastMessageAt)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5 gap-1">
                <p className={cn("text-xs truncate", !conv.isRead ? "text-zinc-300" : "text-zinc-600")}>
                  {conv.lastMessage}
                </p>
                {conv.unreadCount > 0 && (
                  <span className="flex-shrink-0 h-4 min-w-4 rounded-full bg-[#d4a574] flex items-center justify-center text-[10px] font-bold text-[#0a0a0a] px-1">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

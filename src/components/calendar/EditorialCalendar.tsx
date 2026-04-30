"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";

type ViewMode = "month" | "week" | "list";

interface CalendarPost {
  id: string;
  title: string;
  platform: "INSTAGRAM" | "FACEBOOK" | "LINKEDIN";
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED";
  obraColor: string;
  time: string;
}

interface CalendarDay {
  date: Date;
  posts: CalendarPost[];
}

// Dummy data
const samplePosts: Record<string, CalendarPost[]> = {
  "2026-04-28": [
    { id: "1", title: "Bosque Verde — Vista aérea", platform: "INSTAGRAM", status: "PUBLISHED", obraColor: "#22c55e", time: "09:00" },
  ],
  "2026-04-29": [
    { id: "2", title: "Torre Ametista — Perspectiva", platform: "FACEBOOK", status: "PUBLISHED", obraColor: "#8b5cf6", time: "14:00" },
    { id: "3", title: "Parque Sul — Planta", platform: "INSTAGRAM", status: "PUBLISHED", obraColor: "#f59e0b", time: "18:00" },
  ],
  "2026-04-30": [
    { id: "4", title: "Bosque Verde — Tour virtual", platform: "INSTAGRAM", status: "SCHEDULED", obraColor: "#22c55e", time: "10:00" },
    { id: "5", title: "Torre Ametista — Lançamento", platform: "FACEBOOK", status: "SCHEDULED", obraColor: "#8b5cf6", time: "16:00" },
  ],
  "2026-05-01": [
    { id: "6", title: "Dia do Trabalho — Mensagem", platform: "INSTAGRAM", status: "SCHEDULED", obraColor: "#d4a574", time: "08:00" },
  ],
  "2026-05-05": [
    { id: "7", title: "Parque Sul — Área de lazer", platform: "INSTAGRAM", status: "DRAFT", obraColor: "#f59e0b", time: "11:00" },
    { id: "8", title: "Parque Sul — Área de lazer", platform: "FACEBOOK", status: "DRAFT", obraColor: "#f59e0b", time: "11:00" },
  ],
};

const platformIcons: Record<string, React.ReactNode> = {
  INSTAGRAM: <Instagram className="h-3 w-3" />,
  FACEBOOK: <Facebook className="h-3 w-3" />,
  LINKEDIN: <span className="text-[10px] font-bold">in</span>,
};

const statusColors: Record<string, string> = {
  DRAFT: "opacity-50",
  SCHEDULED: "",
  PUBLISHED: "opacity-70",
};

export function EditorialCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 30)); // April 2026
  const [view, setView] = useState<ViewMode>("month");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: ptBR });
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getPostsForDay = (date: Date): CalendarPost[] => {
    const key = format(date, "yyyy-MM-dd");
    return samplePosts[key] || [];
  };

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="space-y-4">
      {/* Calendar controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-serif font-semibold text-white capitalize min-w-[180px] text-center">
            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Hoje
          </Button>
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg border border-[#1f1f1f] overflow-hidden">
          {(["month", "week", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-4 py-1.5 text-sm capitalize transition-colors",
                view === v
                  ? "bg-[#d4a574] text-[#0a0a0a] font-medium"
                  : "text-zinc-400 hover:text-white hover:bg-[#111111]"
              )}
            >
              {v === "month" ? "Mês" : v === "week" ? "Semana" : "Lista"}
            </button>
          ))}
        </div>
      </div>

      {view === "month" && (
        <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] overflow-hidden">
          {/* Week day headers */}
          <div className="grid grid-cols-7 border-b border-[#1f1f1f]">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-medium text-zinc-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const posts = getPostsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = selectedDay && isSameDay(day, selectedDay);
              const dayIsToday = isToday(day);

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "min-h-[100px] p-2 border-b border-r border-[#1f1f1f] cursor-pointer transition-colors",
                    !isCurrentMonth && "bg-[#0a0a0a] opacity-50",
                    isSelected && "bg-[#d4a574]/10",
                    isCurrentMonth && !isSelected && "hover:bg-[#161616]"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                        dayIsToday
                          ? "bg-[#d4a574] text-[#0a0a0a] font-bold"
                          : isCurrentMonth
                          ? "text-white"
                          : "text-zinc-600"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    {posts.length > 0 && (
                      <span className="text-xs text-zinc-500">{posts.length}</span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    {posts.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        className={cn(
                          "flex items-center gap-1 rounded px-1 py-0.5 text-xs",
                          statusColors[post.status]
                        )}
                        style={{ backgroundColor: `${post.obraColor}20`, borderLeft: `2px solid ${post.obraColor}` }}
                      >
                        <span style={{ color: post.obraColor }}>
                          {platformIcons[post.platform]}
                        </span>
                        <span className="truncate text-white/80 leading-tight">
                          {post.time}
                        </span>
                      </div>
                    ))}
                    {posts.length > 3 && (
                      <p className="text-xs text-zinc-500 pl-1">+{posts.length - 3} mais</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "list" && (
        <div className="space-y-2">
          {Object.entries(samplePosts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([dateKey, posts]) => (
              <div key={dateKey} className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-4">
                <p className="text-sm font-semibold text-zinc-400 mb-3 capitalize">
                  {format(new Date(dateKey + "T12:00:00"), "EEEE, d 'de' MMMM", { locale: ptBR })}
                </p>
                <div className="space-y-2">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center gap-3 rounded-lg bg-[#0a0a0a] p-3">
                      <div
                        className="h-2 w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: post.obraColor }}
                      />
                      <span className="text-sm text-zinc-400 w-12 flex-shrink-0">{post.time}</span>
                      <span className="text-white/80 text-zinc-400 flex-shrink-0">
                        {platformIcons[post.platform]}
                      </span>
                      <p className="text-sm text-white flex-1 truncate">{post.title}</p>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        post.status === "PUBLISHED" ? "bg-emerald-900/50 text-emerald-400" :
                        post.status === "SCHEDULED" ? "bg-blue-900/50 text-blue-400" :
                        "bg-zinc-800 text-zinc-400"
                      )}>
                        {post.status === "PUBLISHED" ? "Publicado" : post.status === "SCHEDULED" ? "Agendado" : "Rascunho"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {view === "week" && (
        <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-4">
          <p className="text-zinc-500 text-sm text-center py-8">
            Visualização semanal em desenvolvimento
          </p>
        </div>
      )}
    </div>
  );
}

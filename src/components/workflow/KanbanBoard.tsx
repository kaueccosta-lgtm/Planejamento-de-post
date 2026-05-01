"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { KanbanCard } from "./KanbanCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Demand, DemandStatus } from "@/types";

interface KanbanColumn {
  id: DemandStatus;
  label: string;
  color: string;
  bgColor: string;
}

const columns: KanbanColumn[] = [
  { id: "BRIEFING", label: "Briefing", color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: "DESIGN", label: "Design", color: "text-pink-600", bgColor: "bg-pink-100" },
  { id: "COPY", label: "Copy", color: "text-orange-600", bgColor: "bg-orange-100" },
  { id: "REVIEW", label: "Revisão", color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { id: "APPROVAL", label: "Aprovação", color: "text-amber-700", bgColor: "bg-amber-100" },
  { id: "SCHEDULED", label: "Agendado", color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "PUBLISHED", label: "Publicado", color: "text-emerald-700", bgColor: "bg-emerald-100" },
];

type ExtendedDemand = Demand & {
  _count?: { posts?: number };
  daysUntilDue?: number;
};

const sampleDemands: ExtendedDemand[] = [
  {
    id: "1", title: "Lançamento Bosque Verde — Pack de conteúdo",
    description: "10 posts + 3 reels para lançamento", format: "Feed + Reels",
    status: "BRIEFING", priority: "URGENT", dueDate: new Date("2026-05-03"),
    obraId: "1", createdById: "1", assignedToId: "2", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "1", name: "Bosque Verde", color: "#22c55e", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "2", name: "Ana Lima", email: "ana@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
    _count: { posts: 2 },
  },
  {
    id: "2", title: "Stories Tour Virtual — Torre Ametista",
    description: "Sequência de 8 stories com narração", format: "Stories",
    status: "BRIEFING", priority: "HIGH", dueDate: new Date("2026-05-05"),
    obraId: "2", createdById: "1", assignedToId: "3", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "2", name: "Torre Ametista", color: "#8b5cf6", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "3", name: "Carlos Mendes", email: "carlos@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: "3", title: "Reels apresentação Parque Sul",
    description: "Vídeo 60s com drone e UGC", format: "Reels",
    status: "DESIGN", priority: "HIGH", dueDate: new Date("2026-05-02"),
    obraId: "3", createdById: "1", assignedToId: "2", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "3", name: "Parque Sul", color: "#f59e0b", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "2", name: "Ana Lima", email: "ana@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
    _count: { posts: 1 },
  },
  {
    id: "4", title: "Post informativo — MCMV Faixa 2",
    description: "Carrossel educativo 6 slides", format: "Carrossel",
    status: "COPY", priority: "MEDIUM", dueDate: new Date("2026-05-06"),
    obraId: null, createdById: "1", assignedToId: "4", createdAt: new Date(), updatedAt: new Date(),
    assignedTo: { id: "4", name: "Beatriz Costa", email: "bea@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: "5", title: "Campanha Dia das Mães — 3 posts",
    description: "Feed Instagram + Facebook", format: "Feed",
    status: "REVIEW", priority: "URGENT", dueDate: new Date("2026-05-01"),
    obraId: "1", createdById: "1", assignedToId: "2", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "1", name: "Bosque Verde", color: "#22c55e", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "2", name: "Ana Lima", email: "ana@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
    _count: { posts: 3 },
  },
  {
    id: "6", title: "Depoimento cliente — Bosque Verde",
    description: "Vídeo depoimento + post carrossel", format: "Vídeo + Feed",
    status: "APPROVAL", priority: "MEDIUM", dueDate: new Date("2026-05-04"),
    obraId: "1", createdById: "1", assignedToId: "3", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "1", name: "Bosque Verde", color: "#22c55e", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "3", name: "Carlos Mendes", email: "carlos@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: "7", title: "Posts semana — Torre Ametista",
    description: "5 posts para semana 18/05", format: "Feed",
    status: "SCHEDULED", priority: "LOW", dueDate: new Date("2026-05-12"),
    obraId: "2", createdById: "1", assignedToId: "2", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "2", name: "Torre Ametista", color: "#8b5cf6", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "2", name: "Ana Lima", email: "ana@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
    _count: { posts: 5 },
  },
  {
    id: "8", title: "Campanha Páscoa — publicada",
    description: "Publicada com sucesso", format: "Feed + Stories",
    status: "PUBLISHED", priority: "MEDIUM", dueDate: new Date("2026-04-20"),
    obraId: "3", createdById: "1", assignedToId: "4", createdAt: new Date(), updatedAt: new Date(),
    obra: { id: "3", name: "Parque Sul", color: "#f59e0b", isActive: true, description: null, client: null, createdAt: new Date(), updatedAt: new Date() },
    assignedTo: { id: "4", name: "Beatriz Costa", email: "bea@oikos.com", emailVerified: null, image: null, role: "EDITOR", createdAt: new Date(), updatedAt: new Date() },
    _count: { posts: 4 },
  },
];

export function KanbanBoard() {
  const [demands] = useState<ExtendedDemand[]>(sampleDemands);

  const getColumnDemands = (status: DemandStatus) =>
    demands.filter((d) => d.status === status);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
      {columns.map((col) => {
        const colDemands = getColumnDemands(col.id);

        return (
          <div
            key={col.id}
            className="flex-shrink-0 w-64 flex flex-col rounded-xl border border-[#D5C9BC] bg-[#F0EDE8] shadow-sm"
          >
            {/* Column header */}
            <div className="flex items-center justify-between p-3 border-b border-[#D5C9BC]">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                    col.bgColor,
                    col.color
                  )}
                >
                  {colDemands.length}
                </span>
                <h3 className={cn("text-sm font-semibold", col.color)}>
                  {col.label}
                </h3>
              </div>
              <button className="text-[#A89585] hover:text-[#7A6559] transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Cards */}
            <ScrollArea className="flex-1 max-h-[calc(100vh-280px)]">
              <div className="p-2 space-y-2">
                {colDemands.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-[#D5C9BC] p-4 text-center">
                    <p className="text-xs text-[#A89585]">Nenhuma demanda</p>
                  </div>
                ) : (
                  colDemands.map((demand) => (
                    <KanbanCard key={demand.id} demand={demand} />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}

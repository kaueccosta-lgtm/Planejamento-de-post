"use client";

import { useState } from "react";
import { Plus, Search, Lightbulb, Tag, ArrowUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn, priorityColor, priorityLabel } from "@/lib/utils";

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "NEW" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  tags: string[];
  obra?: string;
  createdAt: string;
}

const ideas: Idea[] = [
  {
    id: "1",
    title: "Série 'Por dentro do Bosque Verde'",
    description: "Sequência de posts mostrando cada ambiente do empreendimento com depoimentos dos moradores",
    category: "Conteúdo Orgânico",
    status: "NEW",
    priority: "HIGH",
    tags: ["série", "depoimento", "UGC"],
    obra: "Bosque Verde",
    createdAt: "2026-04-28",
  },
  {
    id: "2",
    title: "Reel: 'Do projeto ao sonho realizado'",
    description: "Transformação time-lapse da obra com trilha emotiva, mostrando da fundação à entrega das chaves",
    category: "Vídeo",
    status: "IN_PROGRESS",
    priority: "HIGH",
    tags: ["reel", "transformação", "emocional"],
    obra: "Torre Ametista",
    createdAt: "2026-04-25",
  },
  {
    id: "3",
    title: "Post informativo: Financiamento MCMV",
    description: "Guia completo sobre o programa Minha Casa Minha Vida para o público-alvo",
    category: "Educacional",
    status: "APPROVED",
    priority: "MEDIUM",
    tags: ["educacional", "financiamento", "MCMV"],
    createdAt: "2026-04-22",
  },
  {
    id: "4",
    title: "Stories interativos: Poll de plantas",
    description: "Enquete nos stories perguntando qual planta o público prefere — aberta ou integrada",
    category: "Engajamento",
    status: "NEW",
    priority: "LOW",
    tags: ["stories", "enquete", "engajamento"],
    createdAt: "2026-04-20",
  },
  {
    id: "5",
    title: "Campanha Dia das Mães",
    description: "Série especial para o Dia das Mães conectando o sonho da casa própria ao amor materno",
    category: "Sazonalidade",
    status: "APPROVED",
    priority: "URGENT",
    tags: ["dia das mães", "campanha", "emocional"],
    createdAt: "2026-04-18",
  },
  {
    id: "6",
    title: "LinkedIn: Tendências do mercado imobiliário 2026",
    description: "Artigo sobre as principais tendências para publicar no LinkedIn e gerar autoridade",
    category: "LinkedIn",
    status: "NEW",
    priority: "MEDIUM",
    tags: ["linkedin", "tendências", "B2B"],
    createdAt: "2026-04-15",
  },
];

const statusConfig = {
  NEW: { label: "Nova", color: "bg-zinc-700 text-zinc-300" },
  IN_PROGRESS: { label: "Em andamento", color: "bg-blue-900 text-blue-300" },
  APPROVED: { label: "Aprovada", color: "bg-green-900 text-green-300" },
  REJECTED: { label: "Rejeitada", color: "bg-red-900 text-red-300" },
};

export default function BancoDeIdeisPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = ideas.filter((idea) => {
    const matchesSearch =
      !search ||
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || idea.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Banco de Ideias
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {ideas.length} ideias registradas
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nova Ideia
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar ideias..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "NEW", "IN_PROGRESS", "APPROVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-colors",
                filterStatus === s
                  ? "bg-[#d4a574] text-[#0a0a0a] font-medium"
                  : "bg-[#111111] border border-[#1f1f1f] text-zinc-400 hover:text-white"
              )}
            >
              {s === "all" ? "Todas" : statusConfig[s as keyof typeof statusConfig]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas list */}
      <div className="grid gap-3">
        {filtered.map((idea) => (
          <div
            key={idea.id}
            className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5 hover:border-[#2a2a2a] transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#d4a574]/10">
                <Lightbulb className="h-5 w-5 text-[#d4a574]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#d4a574] transition-colors">
                      {idea.title}
                    </h3>
                    {idea.obra && (
                      <p className="text-xs text-[#d4a574] mt-0.5">{idea.obra}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn("text-xs font-medium", priorityColor(idea.priority))}>
                      <ArrowUp className="inline h-3 w-3 mr-0.5" />
                      {priorityLabel(idea.priority)}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs", statusConfig[idea.status].color)}>
                      {statusConfig[idea.status].label}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                  {idea.description}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Tag className="h-3 w-3" />
                    <span>{idea.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock className="h-3 w-3" />
                    {idea.createdAt}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs py-0">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-12 text-center">
            <Lightbulb className="mx-auto h-10 w-10 text-zinc-700 mb-3" />
            <p className="text-zinc-500">Nenhuma ideia encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}

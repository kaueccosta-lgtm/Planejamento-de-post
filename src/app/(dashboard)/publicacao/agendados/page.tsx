"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Edit2,
  Pause,
  Trash2,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type PostStatus = "Agendado" | "Pausado" | "Falhou" | "Publicado" | "Rascunho";

interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  channels: string[];
  scheduledAt: string;
  status: PostStatus;
  thumbnail?: string;
}

const mockPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "Antes e Depois — Banheiro Suite Master",
    caption: "Transformação completa do banheiro suite master! 🛁 Do azulejo antigo ao mármore branco...",
    channels: ["INSTAGRAM", "FACEBOOK"],
    scheduledAt: "2026-05-01T09:00:00",
    status: "Agendado",
  },
  {
    id: "2",
    title: "Tour pela obra — Cozinha Americana",
    caption: "Cozinha americana integrada com sala de estar. Veja como ficou o resultado final 🏠",
    channels: ["INSTAGRAM"],
    scheduledAt: "2026-05-01T14:00:00",
    status: "Agendado",
  },
  {
    id: "3",
    title: "Dicas de Reforma: Piso Porcelanato",
    caption: "5 dicas essenciais antes de escolher o porcelanato para sua reforma. Salve esse post!",
    channels: ["INSTAGRAM", "LINKEDIN"],
    scheduledAt: "2026-05-02T10:30:00",
    status: "Pausado",
  },
  {
    id: "4",
    title: "Depoimento Cliente — Ap Moema",
    caption: "\"A Oikos transformou completamente nosso apartamento. Superou todas as expectativas!\" 💛",
    channels: ["INSTAGRAM", "FACEBOOK", "YOUTUBE"],
    scheduledAt: "2026-05-02T16:00:00",
    status: "Falhou",
  },
  {
    id: "5",
    title: "Reforma de Escritório Corporativo",
    caption: "Espaços corporativos modernos aumentam a produtividade. Veja nossa transformação em escritório!",
    channels: ["LINKEDIN"],
    scheduledAt: "2026-05-03T08:00:00",
    status: "Agendado",
  },
  {
    id: "6",
    title: "Reel — Processo de Reforma em 60s",
    caption: "Do concreto ao acabamento em 60 segundos! ⚡ A magia de uma reforma completa pela Oikos",
    channels: ["INSTAGRAM"],
    scheduledAt: "2026-05-04T12:00:00",
    status: "Pausado",
  },
  {
    id: "7",
    title: "Lavabo de Luxo — Projeto Jardins SP",
    caption: "Lavabo minimalista com detalhes em cobre. Projeto exclusivo para residência nos Jardins, SP.",
    channels: ["INSTAGRAM", "FACEBOOK"],
    scheduledAt: "2026-05-05T11:00:00",
    status: "Agendado",
  },
  {
    id: "8",
    title: "Guia: Quanto Custa uma Reforma?",
    caption: "Guia completo com estimativas de custo por tipo de reforma. Salve e compartilhe!",
    channels: ["INSTAGRAM", "FACEBOOK", "LINKEDIN"],
    scheduledAt: "2026-05-06T09:00:00",
    status: "Falhou",
  },
];

const channelIcons: Record<string, React.ReactNode> = {
  INSTAGRAM: <Instagram className="h-3.5 w-3.5" style={{ color: "#E1306C" }} />,
  FACEBOOK: <Facebook className="h-3.5 w-3.5" style={{ color: "#1877F2" }} />,
  LINKEDIN: <Linkedin className="h-3.5 w-3.5" style={{ color: "#0A66C2" }} />,
  YOUTUBE: <Youtube className="h-3.5 w-3.5" style={{ color: "#FF0000" }} />,
};

const channelLabels: Record<string, string> = {
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  LINKEDIN: "LinkedIn",
  YOUTUBE: "YouTube",
};

const statusConfig: Record<PostStatus, { label: string; color: string; icon: React.ReactNode }> = {
  Agendado: {
    label: "Agendado",
    color: "bg-green-900/40 text-green-400 border-green-800/50",
    icon: <Clock className="h-3 w-3" />,
  },
  Pausado: {
    label: "Pausado",
    color: "bg-zinc-800/60 text-zinc-400 border-zinc-700/50",
    icon: <PauseCircle className="h-3 w-3" />,
  },
  Falhou: {
    label: "Falhou",
    color: "bg-red-900/40 text-red-400 border-red-800/50",
    icon: <AlertCircle className="h-3 w-3" />,
  },
  Publicado: {
    label: "Publicado",
    color: "bg-blue-900/40 text-blue-400 border-blue-800/50",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  Rascunho: {
    label: "Rascunho",
    color: "bg-zinc-800/40 text-zinc-500 border-zinc-700/30",
    icon: null,
  },
};

export default function AgendadosPage() {
  const [search, setSearch] = useState("");
  const [filterChannel, setFilterChannel] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");

  const filtered = mockPosts.filter((post) => {
    const matchSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.caption.toLowerCase().includes(search.toLowerCase());

    const matchChannel =
      filterChannel === "todos" ||
      post.channels.includes(filterChannel.toUpperCase());

    const matchStatus =
      filterStatus === "todos" ||
      post.status === filterStatus;

    return matchSearch && matchChannel && matchStatus;
  });

  function formatDateTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Posts Agendados</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {mockPosts.length} posts nos próximos dias
          </p>
        </div>
        <Button asChild>
          <Link href="/producao/editor">
            <Plus className="h-4 w-4" />
            Novo Post
          </Link>
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar posts..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterChannel} onValueChange={setFilterChannel}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os canais</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="Agendado">Agendado</SelectItem>
            <SelectItem value="Pausado">Pausado</SelectItem>
            <SelectItem value="Falhou">Falhou</SelectItem>
            <SelectItem value="Publicado">Publicado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[64px_1fr_160px_180px_120px_100px] gap-4 px-4 py-3 border-b border-[#1f1f1f] text-xs font-medium text-zinc-500 uppercase tracking-wide">
          <span>Thumb</span>
          <span>Título</span>
          <span>Canais</span>
          <span>Agendado para</span>
          <span>Status</span>
          <span className="text-right">Ações</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            Nenhum post encontrado.
          </div>
        ) : (
          filtered.map((post) => {
            const sc = statusConfig[post.status];
            return (
              <div
                key={post.id}
                className="grid grid-cols-[64px_1fr_160px_180px_120px_100px] gap-4 px-4 py-4 items-center border-b border-[#1a1a1a] hover:bg-[#161616] transition-colors group last:border-0"
              >
                {/* Thumbnail */}
                <div className="h-12 w-14 rounded-lg bg-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                  <div className="w-5 h-5 rounded bg-[#2a2a2a]" />
                </div>

                {/* Title + caption */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-[#d4a574] transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">{post.caption}</p>
                </div>

                {/* Channels */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.channels.map((ch) => (
                    <span
                      key={ch}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1f1f1f] text-xs text-zinc-400"
                      title={channelLabels[ch]}
                    >
                      {channelIcons[ch]}
                      <span className="hidden sm:inline">{channelLabels[ch]}</span>
                    </span>
                  ))}
                </div>

                {/* Scheduled at */}
                <div className="text-sm text-zinc-300 whitespace-nowrap">
                  {formatDateTime(post.scheduledAt)}
                </div>

                {/* Status */}
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border",
                      sc.color
                    )}
                  >
                    {sc.icon}
                    {sc.label}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-md text-zinc-500 hover:text-[#d4a574] hover:bg-[#1f1f1f] transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-md text-zinc-500 hover:text-yellow-400 hover:bg-[#1f1f1f] transition-colors">
                    <Pause className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-[#1f1f1f] transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer count */}
      <p className="text-xs text-zinc-600 text-right">
        Exibindo {filtered.length} de {mockPosts.length} posts
      </p>
    </div>
  );
}

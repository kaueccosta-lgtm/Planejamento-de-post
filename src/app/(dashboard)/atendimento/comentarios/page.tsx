"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, Instagram, Facebook, Send, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatRelativeTime } from "@/lib/utils";

interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  platform: "INSTAGRAM" | "FACEBOOK";
  content: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  isResolved: boolean;
  replyContent?: string;
  createdAt: Date;
  postTitle: string;
}

const comments: CommentItem[] = [
  { id: "1", authorName: "Maria Clara", platform: "INSTAGRAM", content: "Que projeto lindo! Adorei a área de lazer 😍 Estou muito interessada", sentiment: "POSITIVE", isResolved: false, createdAt: new Date(Date.now() - 5 * 60 * 1000), postTitle: "Bosque Verde — Área de lazer" },
  { id: "2", authorName: "Roberto Nunes", platform: "FACEBOOK", content: "Quando vai ter feira de imóveis? Preciso de mais informações sobre o financiamento", sentiment: "NEUTRAL", isResolved: false, createdAt: new Date(Date.now() - 18 * 60 * 1000), postTitle: "Torre Ametista — Lançamento" },
  { id: "3", authorName: "Fernanda Lima", platform: "INSTAGRAM", content: "Melhor empreendimento que já vi! Comprei minha unidade e não me arrependo!", sentiment: "POSITIVE", isResolved: true, replyContent: "Que notícia maravilhosa, Fernanda! Seja bem-vinda à família Bosque Verde! 🏡💛", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), postTitle: "Bosque Verde — Entrega de chaves" },
  { id: "4", authorName: "Paulo Melo", platform: "INSTAGRAM", content: "Tô há 3 dias tentando falar com o atendimento e ninguém responde! Péssimo!", sentiment: "NEGATIVE", isResolved: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), postTitle: "Parque Sul — Área de lazer" },
  { id: "5", authorName: "Juliana Reis", platform: "FACEBOOK", content: "Qual o prazo de entrega do Parque Sul?", sentiment: "NEUTRAL", isResolved: false, createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), postTitle: "Parque Sul — Apresentação" },
];

const platformIcons = {
  INSTAGRAM: <Instagram className="h-3.5 w-3.5" />,
  FACEBOOK: <Facebook className="h-3.5 w-3.5" />,
};

const sentimentConfig = {
  POSITIVE: { label: "Positivo", color: "text-emerald-400 bg-emerald-900/30" },
  NEUTRAL: { label: "Neutro", color: "text-zinc-400 bg-zinc-800" },
  NEGATIVE: { label: "Negativo", color: "text-red-400 bg-red-900/30" },
};

export default function ComentariosPage() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? comments : filter === "unresolved" ? comments.filter((c) => !c.isResolved) : comments.filter((c) => c.sentiment === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Comentários</h1>
          <p className="text-zinc-500 text-sm mt-1">{comments.filter((c) => !c.isResolved).length} comentários aguardando resposta</p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "all", label: `Todos (${comments.length})` },
          { key: "unresolved", label: `Sem resposta (${comments.filter((c) => !c.isResolved).length})` },
          { key: "POSITIVE", label: "Positivos" },
          { key: "NEGATIVE", label: "Negativos" },
          { key: "NEUTRAL", label: "Neutros" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm transition-colors",
              filter === f.key
                ? "bg-[#d4a574] text-[#0a0a0a] font-medium"
                : "bg-[#111111] border border-[#1f1f1f] text-zinc-400 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Comments list */}
      <div className="space-y-3">
        {filtered.map((comment) => {
          const sc = sentimentConfig[comment.sentiment];
          const isReplying = replyingTo === comment.id;

          return (
            <div key={comment.id} className={cn("rounded-xl border bg-[#111111] p-4 transition-colors", comment.isResolved ? "border-[#1a1a1a] opacity-70" : "border-[#1f1f1f]")}>
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="h-9 w-9 rounded-full bg-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-zinc-400">{comment.authorName.charAt(0)}</span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{comment.authorName}</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <span style={{ color: comment.platform === "INSTAGRAM" ? "#E1306C" : "#1877F2" }}>
                        {platformIcons[comment.platform]}
                      </span>
                      {comment.platform}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs", sc.color)}>
                      {sc.label}
                    </span>
                    {comment.isResolved && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Respondido
                      </span>
                    )}
                    <span className="text-xs text-zinc-600 ml-auto">{formatRelativeTime(comment.createdAt)}</span>
                  </div>

                  {/* Post title */}
                  <p className="text-xs text-[#d4a574] mt-0.5">{comment.postTitle}</p>

                  {/* Comment */}
                  <p className="text-sm text-zinc-300 mt-2">{comment.content}</p>

                  {/* Existing reply */}
                  {comment.replyContent && (
                    <div className="mt-3 ml-4 border-l-2 border-[#d4a574]/30 pl-3">
                      <p className="text-xs text-zinc-500 mb-1">Resposta da equipe:</p>
                      <p className="text-sm text-zinc-400">{comment.replyContent}</p>
                    </div>
                  )}

                  {/* Reply input */}
                  {isReplying && (
                    <div className="mt-3 flex gap-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escreva sua resposta..."
                        rows={2}
                        className="flex-1 rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#d4a574] resize-none"
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => { setReplyingTo(null); setReplyText(""); }}
                          className="px-3 py-1.5 rounded-lg text-xs bg-[#1f1f1f] text-zinc-400 hover:text-white transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-[#d4a574] text-[#0a0a0a] font-medium hover:bg-[#e8c9a0] transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          Enviar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {!comment.isResolved && !isReplying && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#1f1f1f] text-zinc-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
                      >
                        <MessageSquare className="h-3 w-3" />
                        Responder
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/40 transition-colors">
                        <CheckCircle2 className="h-3 w-3" />
                        Marcar como resolvido
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

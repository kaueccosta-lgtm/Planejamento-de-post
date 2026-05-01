"use client";

import { useState } from "react";
import { CheckCircle2, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PostCard {
  id: string;
  caption: string;
  channels: string[];
  scheduledFor: string;
}

const posts: PostCard[] = [
  {
    id: "1",
    caption:
      "Mais uma transformação incrível entregue pela equipe Oikos! 🏠✨ Esse banheiro ganhou uma cara totalmente nova com revestimento bouclê branco, box de vidro temperado e bancada em mármore sintético. Obra concluída em apenas 7 dias. Quer saber mais? Chama a gente no WhatsApp! #reformasp #antesedepois #oikos",
    channels: ["Instagram", "LinkedIn"],
    scheduledFor: "05/05 às 09:00",
  },
  {
    id: "2",
    caption:
      "A cozinha que a cliente sempre sonhou — entregue com excelência e no prazo! 🍳 Integramos a cozinha com a sala de jantar, abrimos espaço para uma ilha central e instalamos iluminação planejada em LED quente. O resultado ficou incrível! Orçamento sem compromisso pelo link da bio. #cozinha #reformacozinha #oikosreformas",
    channels: ["Instagram"],
    scheduledFor: "07/05 às 10:30",
  },
  {
    id: "3",
    caption:
      "Bastidores da nossa obra na Vila Mariana! 🔨👷 Acompanhe como trabalhamos com cuidado, organização e limpeza em cada etapa. Nossa equipe cuida do começo ao fim para que você aproveite o processo sem estresse. Saiba mais sobre nosso método: link na bio. #obra #reformas #bastidores",
    channels: ["Instagram", "LinkedIn"],
    scheduledFor: "09/05 às 08:00",
  },
];

function CaptionToggle({ caption }: { caption: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = caption.slice(0, 120);
  const hasMore = caption.length > 120;

  return (
    <div className="text-sm text-[#7A6559] leading-relaxed">
      <span>{expanded ? caption : preview}</span>
      {hasMore && !expanded && <span>...</span>}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-1 text-[#C46B3F] text-xs font-medium inline-flex items-center gap-0.5"
        >
          {expanded ? (
            <>
              ver menos <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              ver mais <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function AprovacaoPage() {
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [adjustDialogId, setAdjustDialogId] = useState<string | null>(null);
  const [adjustText, setAdjustText] = useState("");

  const allApproved = approved.size === posts.length;

  function handleApprove(id: string) {
    setApproved((prev) => new Set([...prev, id]));
  }

  function handleApproveAll() {
    setApproved(new Set(posts.map((p) => p.id)));
  }

  return (
    <div className="min-h-screen bg-[#E8E4DF] px-4 py-8 pb-28">
      {/* Top logo + greeting */}
      <div className="text-center mb-8">
        <p className="text-[#C46B3F] font-serif text-2xl font-bold tracking-wide">OIKOS</p>
        <p className="text-[#7A6559] text-base mt-1">Olá, Pedro 👋</p>
        <p className="text-[#A89585] text-sm mt-0.5">
          {allApproved
            ? "Todas as publicações foram aprovadas."
            : `${posts.length - approved.size} publicação${posts.length - approved.size !== 1 ? "ões" : ""} aguardando sua aprovação`}
        </p>
      </div>

      {/* Success state */}
      {allApproved ? (
        <div className="max-w-sm mx-auto flex flex-col items-center text-center py-12">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A1209]">Tudo aprovado!</h2>
          <p className="text-[#7A6559] text-sm mt-3 leading-relaxed">
            Obrigado pela sua avaliação. A equipe Oikos foi notificada.
          </p>
        </div>
      ) : (
        /* Post cards */
        <div className="max-w-sm mx-auto space-y-6">
          {posts.map((post) => {
            const isApproved = approved.has(post.id);
            return (
              <div
                key={post.id}
                className={`bg-[#F0EDE8] border rounded-xl shadow-sm overflow-hidden transition-opacity ${
                  isApproved ? "border-green-200 opacity-70" : "border-[#D5C9BC]"
                }`}
              >
                {/* Approved overlay badge */}
                {isApproved && (
                  <div className="bg-green-50 border-b border-green-200 px-4 py-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Aprovado</span>
                  </div>
                )}

                {/* Post preview placeholder */}
                <div className="w-full aspect-square max-w-xs mx-auto bg-[#D5C9BC] rounded-none flex items-center justify-center">
                  <span className="text-[#A89585] text-sm">Prévia do post</span>
                </div>

                <div className="p-4 space-y-3">
                  {/* Caption */}
                  <CaptionToggle caption={post.caption} />

                  {/* Channel badges */}
                  <div className="flex gap-2 flex-wrap">
                    {post.channels.map((ch) => (
                      <span
                        key={ch}
                        className="text-xs bg-[#C46B3F]/10 text-[#C46B3F] px-2.5 py-1 rounded-full border border-[#C46B3F]/20 font-medium"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>

                  {/* Schedule */}
                  <p className="text-xs text-[#A89585]">
                    Agendado para {post.scheduledFor}
                  </p>

                  {/* Action buttons */}
                  {!isApproved && (
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="w-full py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        ✓ Aprovar
                      </button>
                      <button
                        onClick={() => {
                          setAdjustDialogId(post.id);
                          setAdjustText("");
                        }}
                        className="w-full py-2.5 rounded-lg bg-[#C46B3F] text-white text-sm font-semibold hover:bg-[#A85A30] transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        ✗ Solicitar Ajuste
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating "Approve All" button */}
      {!allApproved && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#E8E4DF] border-t border-[#D5C9BC] shadow-lg">
          <button
            onClick={handleApproveAll}
            className="w-full max-w-sm mx-auto block py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors"
          >
            ✓ Aprovar Todos ({posts.length - approved.size})
          </button>
        </div>
      )}

      {/* Adjustment dialog */}
      <Dialog
        open={!!adjustDialogId}
        onOpenChange={(open) => {
          if (!open) setAdjustDialogId(null);
        }}
      >
        <DialogContent className="bg-[#F0EDE8] border-[#D5C9BC] text-[#1A1209]">
          <DialogHeader>
            <DialogTitle className="text-[#1A1209]">Solicitar Ajuste</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <p className="text-sm text-[#7A6559]">
              Descreva o que precisa ser ajustado nesta publicação:
            </p>
            <Textarea
              value={adjustText}
              onChange={(e) => setAdjustText(e.target.value)}
              placeholder="Ex: A foto está muito escura, por favor usar a versão com mais luz natural..."
              rows={4}
              className="bg-white border-[#D5C9BC] text-[#1A1209] placeholder:text-[#A89585]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAdjustDialogId(null)}
              className="border-[#D5C9BC] text-[#7A6559]"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
              onClick={() => setAdjustDialogId(null)}
            >
              Enviar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

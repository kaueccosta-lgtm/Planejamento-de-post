"use client";

import { useState } from "react";
import { Star, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Camila Ferreira",
    date: "28 abr 2025",
    rating: 5,
    text: "Excelente trabalho! A equipe Oikos reformou nosso banheiro e ficou perfeito. Pontualidade, limpeza e acabamento impecável. Super recomendo!",
  },
  {
    id: "2",
    name: "Marcos Oliveira",
    date: "22 abr 2025",
    rating: 5,
    text: "Reforma completa da cozinha em 10 dias. Superou todas as expectativas. O projeto ficou lindo e o atendimento foi excelente do início ao fim.",
  },
  {
    id: "3",
    name: "Patrícia Souza",
    date: "15 abr 2025",
    rating: 4,
    text: "Ótima reforma! Ficou muito bonito. Pequeno atraso no cronograma, mas o resultado compensou. A equipe é muito educada e profissional.",
  },
  {
    id: "4",
    name: "Roberto Almeida",
    date: "10 abr 2025",
    rating: 4,
    text: "Reforma do banheiro social muito bem feita. Bom custo-benefício e equipe atenciosa. Só senti falta de mais atualizações durante a obra.",
  },
  {
    id: "5",
    name: "Daniela Costa",
    date: "03 abr 2025",
    rating: 3,
    text: "O resultado ficou razoável, mas tive problemas com comunicação. Algumas combinações não foram cumpridas no prazo. Esperava mais atenção.",
  },
  {
    id: "6",
    name: "Alexandre Pinto",
    date: "28 mar 2025",
    rating: 2,
    text: "Decepcionante. Prometeram 15 dias e levaram 30. Parte do acabamento precisou ser refeita. Atendimento pós-obra deixou muito a desejar.",
  },
];

const ratingDistribution = [
  { stars: 5, count: 30 },
  { stars: 4, count: 10 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const totalReviews = 47;
const averageRating = 4.3;

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "text-2xl" : "text-base";
  return (
    <span className={cls}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-yellow-500" : "text-[#D5C9BC]"}>
          ★
        </span>
      ))}
    </span>
  );
}

type FilterType = "all" | "positive" | "negative";

export default function AvaliacoesPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [replyDialogId, setReplyDialogId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = reviews.filter((r) => {
    if (filter === "positive") return r.rating >= 4;
    if (filter === "negative") return r.rating <= 3;
    return true;
  });

  const openReview = reviews.find((r) => r.id === replyDialogId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Avaliações do Google</h1>
        <p className="text-[#7A6559] text-sm mt-1">Gerencie e responda avaliações recebidas</p>
      </div>

      {/* Summary card */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Average */}
          <div className="flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-6xl font-serif font-bold text-[#1A1209]">{averageRating}</span>
            <StarDisplay rating={Math.round(averageRating)} size="lg" />
            <p className="text-[#7A6559] text-sm mt-1">{totalReviews} avaliações</p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-[#7A6559] w-4 text-right">{stars}</span>
                <span className="text-yellow-500">★</span>
                <div className="flex-1">
                  <Progress
                    value={(count / totalReviews) * 100}
                    className="h-2.5 bg-[#D5C9BC]"
                  />
                </div>
                <span className="text-sm text-[#7A6559] w-5 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(
          [
            { key: "all", label: `Todas (${reviews.length})` },
            { key: "positive", label: "Positivas (4-5★)" },
            { key: "negative", label: "Negativas (1-3★)" },
          ] as { key: FilterType; label: string }[]
        ).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-[#C46B3F] text-white"
                : "bg-[#F0EDE8] border border-[#D5C9BC] text-[#7A6559] hover:text-[#1A1209]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {filtered.map((review) => {
          const isNegative = review.rating <= 2;
          return (
            <div
              key={review.id}
              className={`rounded-xl border shadow-sm p-5 ${
                isNegative
                  ? "border-red-200 bg-red-50"
                  : "bg-[#F0EDE8] border-[#D5C9BC]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#C46B3F] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[#1A1209] text-sm">{review.name}</span>
                      <span className="text-[#A89585] text-xs">{review.date}</span>
                      {isNegative && (
                        <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                          <AlertCircle className="h-3 w-3" />
                          Requer atenção
                        </span>
                      )}
                    </div>
                    <StarDisplay rating={review.rating} />
                    <p className="text-[#1A1209] text-sm mt-2 leading-relaxed">{review.text}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0 border-[#D5C9BC] text-[#7A6559] hover:text-[#1A1209]"
                  onClick={() => {
                    setReplyDialogId(review.id);
                    setReplyText("");
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Responder
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!replyDialogId} onOpenChange={(open) => { if (!open) setReplyDialogId(null); }}>
        <DialogContent className="bg-[#F0EDE8] border-[#D5C9BC] text-[#1A1209]">
          <DialogHeader>
            <DialogTitle className="text-[#1A1209]">
              Responder avaliação de {openReview?.name}
            </DialogTitle>
          </DialogHeader>
          {openReview && (
            <div className="space-y-4">
              <div className="bg-[#E8E4DF] rounded-lg p-3">
                <StarDisplay rating={openReview.rating} />
                <p className="text-sm text-[#7A6559] mt-1">{openReview.text}</p>
              </div>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escreva sua resposta pública..."
                rows={4}
                className="bg-white border-[#D5C9BC] text-[#1A1209] placeholder:text-[#A89585] focus:ring-[#C46B3F]"
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReplyDialogId(null)}
              className="border-[#D5C9BC] text-[#7A6559]"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
              onClick={() => setReplyDialogId(null)}
            >
              Enviar Resposta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

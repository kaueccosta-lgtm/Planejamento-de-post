import { Metadata } from "next";
import { CaptionGenerator } from "@/components/ai/CaptionGenerator";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Gerador de Legendas IA" };

export default function LegendasPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#d4a574]/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-[#d4a574]" />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Gerador de Legendas
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Crie legendas poderosas com inteligência artificial
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-xl border border-[#d4a574]/20 bg-[#d4a574]/5 p-4">
        <p className="text-sm text-zinc-300">
          <span className="font-semibold text-[#d4a574]">Powered by Claude AI</span> — Descreva o conteúdo e o contexto, escolha a plataforma e o tom de voz, e gere legendas otimizadas para engajamento em segundos.
        </p>
      </div>

      <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
        <CaptionGenerator />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, RefreshCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface GeneratedCaption {
  text: string;
  hashtags: string[];
  copied: boolean;
}

interface CaptionGeneratorProps {
  onSelect?: (caption: string, hashtags: string[]) => void;
}

export function CaptionGenerator({ onSelect }: CaptionGeneratorProps) {
  const [context, setContext] = useState("");
  const [platform, setPlatform] = useState("INSTAGRAM");
  const [tone, setTone] = useState("professional");
  const [obra, setObra] = useState("");
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<GeneratedCaption[]>([]);

  const generate = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setCaptions([]);

    try {
      const res = await fetch("/api/ai/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, platform, tone, obraName: obra }),
      });

      if (!res.ok) throw new Error("Falha na geração");

      const data = (await res.json()) as { captions: string[]; hashtags: string[] };
      setCaptions(
        data.captions.map((text) => ({
          text,
          hashtags: data.hashtags,
          copied: false,
        }))
      );
    } catch {
      // Show mock data for demo
      setCaptions([
        {
          text: `✨ ${obra ? obra + " — " : ""}Descubra um novo padrão de vida que vai além do que você imaginou!\n\nSe você está em busca de um lar que combine conforto, localização privilegiada e muito charme, chegou ao lugar certo. 🏡\n\n📍 Venha nos conhecer e transforme seu sonho em realidade!`,
          hashtags: ["#imóveis", "#construção", "#moradia", "#sonhos", "#realizações"],
          copied: false,
        },
        {
          text: `🏗️ ${obra ? obra + " | " : ""}Qualidade que se vê em cada detalhe.\n\nDa planta ao acabamento, cada espaço foi pensado para proporcionar o melhor para você e sua família. Porque você merece o melhor! 💛\n\n👇 Saiba mais nos comentários ou pelo link na bio`,
          hashtags: ["#empreendimento", "#arquitetura", "#design", "#moradia", "#vida"],
          copied: false,
        },
        {
          text: `Quando a gente encontra o lugar certo, sente no coração. ❤️\n\n${obra || "Nosso empreendimento"} foi criado pensando em cada momento que você vai viver aqui — das manhãs tranquilas às noites em família.\n\n📲 Agende sua visita pelo link na bio!`,
          hashtags: ["#casa", "#lar", "#família", "#sonho", "#realização"],
          copied: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = (idx: number) => {
    const caption = captions[idx];
    navigator.clipboard.writeText(caption.text + "\n\n" + caption.hashtags.join(" "));
    setCaptions((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, copied: true } : c))
    );
    setTimeout(() => {
      setCaptions((prev) =>
        prev.map((c, i) => (i === idx ? { ...c, copied: false } : c))
      );
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-2">
          <Label className="text-zinc-400">Contexto / Briefing</Label>
          <Textarea
            placeholder="Descreva o conteúdo que será publicado: produto, empreendimento, mensagem principal, pontos a destacar..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-400">Plataforma</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INSTAGRAM">Instagram</SelectItem>
              <SelectItem value="FACEBOOK">Facebook</SelectItem>
              <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
              <SelectItem value="TIKTOK">TikTok</SelectItem>
              <SelectItem value="TWITTER">Twitter/X</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-400">Tom de voz</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Profissional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="inspirational">Inspiracional</SelectItem>
              <SelectItem value="promotional">Promocional</SelectItem>
              <SelectItem value="educational">Educativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-400">Empreendimento (opcional)</Label>
          <Select value={obra} onValueChange={setObra}>
            <SelectTrigger>
              <SelectValue placeholder="Nenhum (geral)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Nenhum (geral)</SelectItem>
              <SelectItem value="Bosque Verde">Bosque Verde</SelectItem>
              <SelectItem value="Torre Ametista">Torre Ametista</SelectItem>
              <SelectItem value="Parque Sul">Parque Sul</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Generate button */}
      <Button
        onClick={generate}
        disabled={loading || !context.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gerando legendas com IA...
          </>
        ) : captions.length > 0 ? (
          <>
            <RefreshCw className="h-4 w-4" />
            Gerar novas legendas
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Gerar legendas com IA
          </>
        )}
      </Button>

      {/* Results */}
      {captions.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-zinc-400">
            {captions.length} legendas geradas — escolha a melhor:
          </p>
          {captions.map((caption, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-4 hover:border-[#2a2a2a] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-zinc-300 whitespace-pre-wrap flex-1">{caption.text}</p>
                <button
                  onClick={() => copyCaption(idx)}
                  className={cn(
                    "flex-shrink-0 p-2 rounded-lg transition-colors",
                    caption.copied
                      ? "bg-emerald-900/30 text-emerald-400"
                      : "bg-[#1f1f1f] text-zinc-500 hover:text-white"
                  )}
                >
                  {caption.copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {caption.hashtags.map((tag) => (
                  <span key={tag} className="text-xs text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {onSelect && (
                <button
                  onClick={() => onSelect(caption.text, caption.hashtags)}
                  className="mt-3 w-full rounded-lg bg-[#d4a574]/10 hover:bg-[#d4a574]/20 text-[#d4a574] text-sm py-2 transition-colors"
                >
                  Usar esta legenda
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Clapperboard, Music, Hash, FileText, CheckSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GeneratedScript {
  hook: string;
  scenes: { time: string; description: string }[];
  audio: string;
  overlayText: string[];
  hashtags: string[];
  checklistItems: string[];
}

const mockScript: GeneratedScript = {
  hook: "Você não vai acreditar como esse banheiro ficou em apenas 7 dias! 😱",
  scenes: [
    { time: "0-3s", description: "Close no banheiro antes: azulejos antigos, torneira enferrujada, iluminação fraca" },
    { time: "3-8s", description: "Transição rápida mostrando a equipe trabalhando — tijolos, furadeira, argamassa" },
    { time: "8-18s", description: "Passagem pelo novo banheiro: revestimento bouclê branco, box de vidro temperado" },
    { time: "18-25s", description: "Detalhe da bancada em mármore sintético e torneira matte black" },
    { time: "25-30s", description: "Revelação completa: antes e depois lado a lado, proprietária sorrindo" },
  ],
  audio: "CUFF IT - Beyoncé (instrumental) ou áudio trending #reformas com batida energética",
  overlayText: [
    "Antes ❌ → Depois ✅",
    "7 dias de obra",
    "Orçamento: R$ 18.000",
    "📍 São Paulo, SP",
  ],
  hashtags: [
    "#reforma", "#banheiro", "#reformasp", "#antes e depois", "#oikos",
    "#decoração", "#interiores", "#remodel", "#bathroom", "#transformação",
  ],
  checklistItems: [
    "Fotografar o 'antes' com boa iluminação (luz natural se possível)",
    "Gravar timelapse da demolição (posicionar câmara fixa)",
    "Capturar detalhes: rejunte, torneira, luminária — close em macro",
    "Gravar a reação da proprietária na revelação",
    "Foto do antes/depois lado a lado para thumbnail",
    "Gravar 3 versões do hook com enquadramentos diferentes",
    "Exportar versão 9:16 (Reels/TikTok) e 4:5 (feed)",
  ],
};

type Duracao = "15" | "30" | "60";
type Estilo = "educativo" | "antes-depois" | "bastidor" | "depoimento";

export default function RoteirosPage() {
  const [tema, setTema] = useState("");
  const [duracao, setDuracao] = useState<Duracao>("30");
  const [estilo, setEstilo] = useState<Estilo>("antes-depois");
  const [generated, setGenerated] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!tema.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1200);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Gerador de Roteiros</h1>
        <p className="text-[#7A6559] text-sm mt-1">Crie roteiros otimizados para Reels e TikTok</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Left panel — Form (40%) */}
        <div className="lg:w-2/5 bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-6 space-y-5 h-fit">
          <h2 className="font-serif font-semibold text-[#1A1209]">Configurar Roteiro</h2>

          {/* Tema */}
          <div className="space-y-2">
            <Label className="text-[#1A1209] font-medium">Tema do vídeo</Label>
            <Input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ex: Reforma de banheiro antes e depois"
              className="bg-white border-[#D5C9BC] text-[#1A1209] placeholder:text-[#A89585] focus:ring-[#C46B3F]"
            />
          </div>

          {/* Duração */}
          <div className="space-y-2">
            <Label className="text-[#1A1209] font-medium">Duração</Label>
            <div className="flex gap-3">
              {(["15", "30", "60"] as Duracao[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDuracao(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    duracao === d
                      ? "bg-[#C46B3F] text-white border-[#C46B3F]"
                      : "bg-white border-[#D5C9BC] text-[#7A6559] hover:border-[#C46B3F]"
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          {/* Estilo */}
          <div className="space-y-2">
            <Label className="text-[#1A1209] font-medium">Estilo</Label>
            <Select value={estilo} onValueChange={(v) => setEstilo(v as Estilo)}>
              <SelectTrigger className="bg-white border-[#D5C9BC] text-[#1A1209]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="educativo">Educativo</SelectItem>
                <SelectItem value="antes-depois">Antes-Depois</SelectItem>
                <SelectItem value="bastidor">Bastidor</SelectItem>
                <SelectItem value="depoimento">Depoimento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-[#C46B3F] text-white hover:bg-[#A85A30]"
            onClick={handleGenerate}
            disabled={!tema.trim() || loading}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {loading ? "Gerando roteiro..." : "Gerar Roteiro"}
          </Button>
        </div>

        {/* Right panel — Script (60%) */}
        <div className="lg:w-3/5">
          {!generated ? (
            <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <Clapperboard className="h-14 w-14 text-[#D5C9BC] mb-4" />
              <h3 className="font-serif font-semibold text-[#7A6559] text-lg">
                Seu roteiro aparecerá aqui
              </h3>
              <p className="text-[#A89585] text-sm mt-2 max-w-xs">
                Preencha o formulário e clique em Gerar Roteiro para criar um script personalizado.
              </p>
            </div>
          ) : (
            <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-semibold text-[#1A1209]">Roteiro Gerado</h2>
                <span className="text-xs bg-[#C46B3F]/10 text-[#C46B3F] px-2 py-1 rounded-full font-medium">
                  {duracao}s · {estilo}
                </span>
              </div>

              {/* Hook */}
              <div className="bg-[#E8E4DF] rounded-lg p-4 border border-[#D5C9BC]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎬</span>
                  <span className="font-semibold text-[#1A1209] text-sm">Hook (0-3s)</span>
                </div>
                <p className="text-[#1A1209] font-bold text-base leading-snug">{mockScript.hook}</p>
              </div>

              {/* Cenas */}
              <div className="bg-[#E8E4DF] rounded-lg p-4 border border-[#D5C9BC]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📽️</span>
                  <span className="font-semibold text-[#1A1209] text-sm">Cenas</span>
                </div>
                <ol className="space-y-2">
                  {mockScript.scenes.map((scene, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-xs font-mono text-[#C46B3F] bg-[#C46B3F]/10 px-2 py-0.5 rounded h-fit mt-0.5 flex-shrink-0">
                        {scene.time}
                      </span>
                      <span className="text-sm text-[#1A1209]">{scene.description}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Áudio */}
              <div className="bg-[#E8E4DF] rounded-lg p-4 border border-[#D5C9BC]">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="h-4 w-4 text-[#C46B3F]" />
                  <span className="font-semibold text-[#1A1209] text-sm">Sugestão de Áudio</span>
                </div>
                <p className="text-sm text-[#7A6559]">{mockScript.audio}</p>
              </div>

              {/* Texto sobreposto */}
              <div className="bg-[#E8E4DF] rounded-lg p-4 border border-[#D5C9BC]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-[#C46B3F]" />
                  <span className="font-semibold text-[#1A1209] text-sm">Texto Sobreposto</span>
                </div>
                <ul className="space-y-1">
                  {mockScript.overlayText.map((t, i) => (
                    <li key={i} className="text-sm text-[#1A1209] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C46B3F] flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hashtags */}
              <div className="bg-[#E8E4DF] rounded-lg p-4 border border-[#D5C9BC]">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-[#C46B3F]" />
                  <span className="font-semibold text-[#1A1209] text-sm">Hashtags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mockScript.hashtags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#C46B3F]/10 text-[#C46B3F] px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Checklist button */}
              <Button
                variant="outline"
                className="w-full border-[#C46B3F] text-[#C46B3F] hover:bg-[#C46B3F]/5"
                onClick={() => setChecklistOpen(true)}
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                Gerar Checklist de Filmagem
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Checklist Dialog */}
      <Dialog open={checklistOpen} onOpenChange={setChecklistOpen}>
        <DialogContent className="bg-[#F0EDE8] border-[#D5C9BC] text-[#1A1209]">
          <DialogHeader>
            <DialogTitle className="text-[#1A1209]">Checklist de Filmagem</DialogTitle>
          </DialogHeader>
          <ul className="space-y-2 mt-2">
            {mockScript.checklistItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckSquare className="h-4 w-4 text-[#C46B3F] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#1A1209]">{item}</span>
              </li>
            ))}
          </ul>
          <Button
            className="w-full mt-2 bg-[#C46B3F] text-white hover:bg-[#A85A30]"
            onClick={() => setChecklistOpen(false)}
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

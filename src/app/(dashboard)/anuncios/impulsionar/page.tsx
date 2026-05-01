"use client";

import { useState } from "react";
import { Zap, Target, Users, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Objective = "alcance" | "engajamento" | "cliques" | "mensagens";

interface ActiveBoost {
  id: string;
  post: string;
  objective: string;
  budget: string;
  period: string;
  status: "Ativo" | "Pausado" | "Concluído";
}

const publishedPosts = [
  { id: "1", title: "Reforma banheiro — Antes e Depois" },
  { id: "2", title: "Cozinha integrada — Projeto completo" },
  { id: "3", title: "Área de serviço moderna — 5 dias" },
  { id: "4", title: "Sala de estar — Paleta neutra" },
];

const activeBoosts: ActiveBoost[] = [
  {
    id: "b1",
    post: "Reforma banheiro — Antes e Depois",
    objective: "Alcance",
    budget: "R$ 50/dia · R$ 350 total",
    period: "25 abr – 01 mai",
    status: "Ativo",
  },
  {
    id: "b2",
    post: "Cozinha integrada — Projeto completo",
    objective: "Engajamento",
    budget: "R$ 30/dia · R$ 210 total",
    period: "20 abr – 27 abr",
    status: "Concluído",
  },
  {
    id: "b3",
    post: "Sala de estar — Paleta neutra",
    objective: "Cliques no Site",
    budget: "R$ 40/dia · R$ 280 total",
    period: "28 abr – 04 mai",
    status: "Pausado",
  },
];

const objectiveOptions: { value: Objective; label: string; icon: React.ReactNode }[] = [
  { value: "alcance", label: "Alcance", icon: <Eye className="h-4 w-4" /> },
  { value: "engajamento", label: "Engajamento", icon: <Target className="h-4 w-4" /> },
  { value: "cliques", label: "Cliques no Site", icon: <Zap className="h-4 w-4" /> },
  { value: "mensagens", label: "Mensagens", icon: <Users className="h-4 w-4" /> },
];

const statusColors: Record<string, string> = {
  Ativo: "bg-green-100 text-green-700 border-green-200",
  Pausado: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Concluído: "bg-[#D5C9BC] text-[#7A6559] border-[#D5C9BC]",
};

export default function ImpulsionarPage() {
  const [selectedPost, setSelectedPost] = useState("");
  const [objective, setObjective] = useState<Objective>("alcance");
  const [dailyBudget, setDailyBudget] = useState("50");
  const [duration, setDuration] = useState("7");
  const [ageMin, setAgeMin] = useState("25");
  const [ageMax, setAgeMax] = useState("55");
  const [location, setLocation] = useState("São Paulo, SP");

  const totalBudget = Number(dailyBudget) * Number(duration);
  const selectedPostTitle = publishedPosts.find((p) => p.id === selectedPost)?.title;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Impulsionar Post</h1>
        <p className="text-[#7A6559] text-sm mt-1">Configure e gerencie posts pagos</p>
      </div>

      {/* Main two-column layout */}
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Left — Form (45%) */}
        <div className="lg:w-[45%] space-y-5 bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-6">
          <h2 className="font-serif font-semibold text-[#1A1209]">Configurar Impulsionamento</h2>

          {/* Post select */}
          <div className="space-y-2">
            <Label className="text-[#1A1209] font-medium">Post a impulsionar</Label>
            <Select value={selectedPost} onValueChange={setSelectedPost}>
              <SelectTrigger className="bg-white border-[#D5C9BC] text-[#1A1209]">
                <SelectValue placeholder="Selecione um post publicado" />
              </SelectTrigger>
              <SelectContent>
                {publishedPosts.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Objective */}
          <div className="space-y-2">
            <Label className="text-[#1A1209] font-medium">Objetivo</Label>
            <div className="grid grid-cols-2 gap-2">
              {objectiveOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setObjective(opt.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm border transition-colors ${
                    objective === opt.value
                      ? "bg-[#C46B3F] text-white border-[#C46B3F]"
                      : "bg-white border-[#D5C9BC] text-[#7A6559] hover:border-[#C46B3F]"
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="text-[#1A1209] font-medium">Orçamento</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-[#A89585]">Valor diário</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A89585] text-sm">R$</span>
                  <Input
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    type="number"
                    className="pl-9 bg-white border-[#D5C9BC] text-[#1A1209]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#A89585]">Duração (dias)</p>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  type="number"
                  min="1"
                  className="bg-white border-[#D5C9BC] text-[#1A1209]"
                />
              </div>
            </div>
            {dailyBudget && duration && (
              <p className="text-xs text-[#7A6559] flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Total estimado: <span className="font-semibold text-[#1A1209]">R$ {totalBudget.toLocaleString("pt-BR")}</span>
              </p>
            )}
          </div>

          {/* Audience */}
          <div className="space-y-3">
            <Label className="text-[#1A1209] font-medium">Público-alvo</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-[#A89585]">Idade mínima</p>
                <Input
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  type="number"
                  className="bg-white border-[#D5C9BC] text-[#1A1209]"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#A89585]">Idade máxima</p>
                <Input
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  type="number"
                  className="bg-white border-[#D5C9BC] text-[#1A1209]"
                />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#A89585]">Localização</p>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white border-[#D5C9BC] text-[#1A1209]"
              />
            </div>
          </div>

          <Button className="w-full bg-[#C46B3F] text-white hover:bg-[#A85A30]">
            <Zap className="h-4 w-4 mr-2" />
            Impulsionar Post
          </Button>
        </div>

        {/* Right — Preview (55%) */}
        <div className="lg:w-[55%] space-y-4">
          <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-6">
            <h2 className="font-serif font-semibold text-[#1A1209] mb-4">Preview do Post</h2>

            {/* Thumbnail placeholder */}
            <div className="w-full aspect-square max-w-xs mx-auto bg-[#D5C9BC] rounded-xl flex items-center justify-center mb-4">
              <span className="text-[#A89585] text-sm">Visualização do post</span>
            </div>

            {/* Caption preview */}
            <div className="bg-[#E8E4DF] rounded-lg p-3 mb-4">
              <p className="text-sm text-[#7A6559] line-clamp-3">
                {selectedPostTitle
                  ? `📌 ${selectedPostTitle} — Confira essa incrível transformação! Nossa equipe entregou mais um projeto com excelência e atenção aos detalhes. #oikosreformas #reformasp`
                  : "Selecione um post para visualizar a legenda..."}
              </p>
            </div>

            {/* Estimated reach badge */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 bg-[#C46B3F]/10 border border-[#C46B3F]/30 rounded-full px-4 py-2">
                <Eye className="h-4 w-4 text-[#C46B3F]" />
                <span className="text-sm font-semibold text-[#C46B3F]">
                  Alcance estimado: 2.000 – 5.000 pessoas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active boosts table */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#D5C9BC]">
          <h2 className="font-serif font-semibold text-[#1A1209]">Impulsionamentos Ativos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E8E4DF] border-b border-[#D5C9BC]">
                {["Post", "Objetivo", "Orçamento", "Período", "Status", "Ações"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeBoosts.map((boost) => (
                <tr key={boost.id} className="border-b border-[#D5C9BC] last:border-0 hover:bg-[#E8E4DF] transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-[#1A1209] line-clamp-1 max-w-[180px] block">
                      {boost.post}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#7A6559]">{boost.objective}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#7A6559]">{boost.budget}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#7A6559]">{boost.period}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[boost.status]}`}>
                      {boost.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#C46B3F] hover:underline">Editar</button>
                      <button className="text-xs text-[#A89585] hover:text-red-500">Pausar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

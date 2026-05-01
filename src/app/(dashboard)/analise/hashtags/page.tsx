"use client";

import { useState } from "react";
import { Plus, Search, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface HashtagGroup {
  id: string;
  name: string;
  tags: string[];
}

const groups: HashtagGroup[] = [
  {
    id: "reforma-sp",
    name: "Reforma SP",
    tags: ["#reformasp", "#reformasaopaulo", "#obrareforma", "#construcaosp", "#reformeisso", "#housegoals"],
  },
  {
    id: "banheiros",
    name: "Banheiros",
    tags: ["#banheiro", "#bathroom", "#reformabanheiro", "#boxbanheiro", "#bancadabanheiro", "#rejunte"],
  },
  {
    id: "antes-depois",
    name: "Antes-Depois",
    tags: ["#antesedepois", "#beforeandafter", "#transformação", "#glow up", "#revamp", "#hometransformation"],
  },
  {
    id: "cozinhas",
    name: "Cozinhas",
    tags: ["#cozinha", "#kitchen", "#reformacozinha", "#cozinhaplanejada", "#cozinhamoderna", "#kitchendesign"],
  },
];

interface HashtagRow {
  tag: string;
  uses: number;
  avgEng: string;
  trend: "up" | "down";
}

const hashtagTable: HashtagRow[] = [
  { tag: "#reformasp", uses: 284, avgEng: "6.2%", trend: "up" },
  { tag: "#antesedepois", uses: 512, avgEng: "8.4%", trend: "up" },
  { tag: "#reformabanheiro", uses: 196, avgEng: "5.9%", trend: "up" },
  { tag: "#cozinhaplanejada", uses: 143, avgEng: "7.1%", trend: "up" },
  { tag: "#oikosreformas", uses: 89, avgEng: "9.3%", trend: "up" },
  { tag: "#bathroom", uses: 78, avgEng: "4.8%", trend: "down" },
  { tag: "#transformação", uses: 324, avgEng: "7.8%", trend: "up" },
  { tag: "#construcaosp", uses: 67, avgEng: "4.1%", trend: "down" },
  { tag: "#housegoals", uses: 211, avgEng: "5.4%", trend: "up" },
  { tag: "#remodel", uses: 44, avgEng: "3.7%", trend: "down" },
  { tag: "#boxbanheiro", uses: 38, avgEng: "5.0%", trend: "up" },
  { tag: "#kitchendesign", uses: 92, avgEng: "6.6%", trend: "up" },
  { tag: "#reformeisso", uses: 156, avgEng: "8.1%", trend: "up" },
  { tag: "#bancadabanheiro", uses: 29, avgEng: "4.4%", trend: "down" },
  { tag: "#cozinhamoderna", uses: 118, avgEng: "6.9%", trend: "up" },
];

export default function HashtagsPage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [newGroupOpen, setNewGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupTags, setNewGroupTags] = useState("");

  const activeGroup = groups.find((g) => g.id === selectedGroup);

  const filteredTable = hashtagTable.filter((h) =>
    h.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Hashtags</h1>
          <p className="text-[#7A6559] text-sm mt-1">Gerencie grupos e acompanhe performance</p>
        </div>
        <Button
          className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
          onClick={() => setNewGroupOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Grupo
        </Button>
      </div>

      {/* Hashtag groups as chips */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-5">
        <p className="text-sm font-medium text-[#7A6559] mb-3">Grupos salvos</p>
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGroup(selectedGroup === g.id ? null : g.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedGroup === g.id
                  ? "bg-[#C46B3F] text-white border-[#C46B3F]"
                  : "bg-[#E8E4DF] border-[#D5C9BC] text-[#7A6559] hover:border-[#C46B3F] hover:text-[#1A1209]"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {activeGroup && (
          <div className="mt-4 pt-4 border-t border-[#D5C9BC]">
            <p className="text-xs text-[#A89585] mb-2">Hashtags em {activeGroup.name}:</p>
            <div className="flex flex-wrap gap-1.5">
              {activeGroup.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#C46B3F]/10 text-[#C46B3F] px-2.5 py-1 rounded-full border border-[#C46B3F]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator className="bg-[#D5C9BC]" />

      {/* Hashtag table */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#D5C9BC] flex items-center gap-3">
          <Search className="h-4 w-4 text-[#A89585]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar hashtag..."
            className="border-0 bg-transparent text-[#1A1209] placeholder:text-[#A89585] focus:ring-0 p-0 h-auto shadow-none"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E8E4DF] border-b border-[#D5C9BC]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide">Hashtag</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide">Usos</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide">Eng. Médio</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((row, i) => (
                <tr
                  key={row.tag}
                  className={`border-b border-[#D5C9BC] last:border-0 hover:bg-[#E8E4DF] transition-colors ${
                    i % 2 === 0 ? "" : "bg-[#F0EDE8]/50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-[#C46B3F]">{row.tag}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-[#1A1209]">{row.uses}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-[#1A1209]">{row.avgEng}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.trend === "up" ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm font-semibold">
                        <TrendingUp className="h-3.5 w-3.5" />
                        ↑
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 text-sm font-semibold">
                        <TrendingDown className="h-3.5 w-3.5" />
                        ↓
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredTable.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-[#A89585] text-sm">
                    Nenhuma hashtag encontrada para "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New group dialog */}
      <Dialog open={newGroupOpen} onOpenChange={setNewGroupOpen}>
        <DialogContent className="bg-[#F0EDE8] border-[#D5C9BC] text-[#1A1209]">
          <DialogHeader>
            <DialogTitle className="text-[#1A1209]">Novo Grupo de Hashtags</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-[#1A1209]">Nome do grupo</Label>
              <Input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Ex: Salas de Estar"
                className="bg-white border-[#D5C9BC] text-[#1A1209] placeholder:text-[#A89585]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1A1209]">Hashtags (uma por linha ou separadas por espaço)</Label>
              <Textarea
                value={newGroupTags}
                onChange={(e) => setNewGroupTags(e.target.value)}
                placeholder="#sala #sala de estar #living #decoracao"
                rows={5}
                className="bg-white border-[#D5C9BC] text-[#1A1209] placeholder:text-[#A89585]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewGroupOpen(false)}
              className="border-[#D5C9BC] text-[#7A6559]"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
              onClick={() => setNewGroupOpen(false)}
            >
              Salvar Grupo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

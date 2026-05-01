"use client";

import { useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Competitor {
  id: string;
  name: string;
  initials: string;
  color: string;
  followers: string;
  engagement: string;
  postsPerWeek: number;
}

const competitors: Competitor[] = [
  {
    id: "oikos",
    name: "Oikos Reformas",
    initials: "OK",
    color: "#C46B3F",
    followers: "12.4K",
    engagement: "5.8%",
    postsPerWeek: 5,
  },
  {
    id: "reformar",
    name: "Reformar Eng SP",
    initials: "RE",
    color: "#7A6559",
    followers: "8.1K",
    engagement: "3.9%",
    postsPerWeek: 3,
  },
  {
    id: "apto",
    name: "APTO",
    initials: "AP",
    color: "#A89585",
    followers: "15.2K",
    engagement: "4.5%",
    postsPerWeek: 7,
  },
  {
    id: "pequenas",
    name: "Pequenas Reformas",
    initials: "PR",
    color: "#6B7280",
    followers: "5.6K",
    engagement: "6.1%",
    postsPerWeek: 4,
  },
  {
    id: "lar",
    name: "Lar Pontual",
    initials: "LP",
    color: "#9CA3AF",
    followers: "3.9K",
    engagement: "4.2%",
    postsPerWeek: 2,
  },
];

const months = ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr"];

const followersData = months.map((month, i) => ({
  month,
  Oikos: [9200, 9800, 10400, 11000, 11700, 12400][i],
  "Reformar Eng SP": [7500, 7600, 7700, 7800, 7950, 8100][i],
  APTO: [12800, 13200, 13700, 14100, 14700, 15200][i],
  "Pequenas Reformas": [5100, 5200, 5300, 5350, 5500, 5600][i],
  "Lar Pontual": [3600, 3650, 3700, 3750, 3820, 3900][i],
}));

const engagementData = months.map((month, i) => ({
  month,
  Oikos: [4.8, 5.0, 5.2, 5.5, 5.6, 5.8][i],
  "Reformar Eng SP": [3.4, 3.5, 3.6, 3.7, 3.8, 3.9][i],
  APTO: [4.0, 4.1, 4.2, 4.3, 4.4, 4.5][i],
  "Pequenas Reformas": [5.5, 5.7, 5.8, 5.9, 6.0, 6.1][i],
  "Lar Pontual": [3.9, 4.0, 4.0, 4.1, 4.1, 4.2][i],
}));

const postsData = months.map((month, i) => ({
  month,
  Oikos: [4, 4, 5, 5, 5, 5][i],
  "Reformar Eng SP": [3, 3, 3, 3, 3, 3][i],
  APTO: [6, 7, 7, 7, 7, 7][i],
  "Pequenas Reformas": [3, 4, 4, 4, 4, 4][i],
  "Lar Pontual": [2, 2, 2, 2, 2, 2][i],
}));

type MetricTab = "seguidores" | "engajamento" | "posts";

const lineColors: Record<string, string> = {
  Oikos: "#C46B3F",
  "Reformar Eng SP": "#7A6559",
  APTO: "#A89585",
  "Pequenas Reformas": "#6B7280",
  "Lar Pontual": "#9CA3AF",
};

export default function ConcorrentesPage() {
  const [activeTab, setActiveTab] = useState<MetricTab>("seguidores");

  const chartData =
    activeTab === "seguidores"
      ? followersData
      : activeTab === "engajamento"
      ? engagementData
      : postsData;

  const seriesKeys = ["Oikos", "Reformar Eng SP", "APTO", "Pequenas Reformas", "Lar Pontual"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Concorrentes</h1>
          <p className="text-[#7A6559] text-sm mt-1">Monitoramento de perfis do mercado</p>
        </div>
        <Button className="bg-[#C46B3F] text-white hover:bg-[#A85A30]">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Concorrente
        </Button>
      </div>

      {/* Competitor cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {competitors.slice(1).map((c) => (
          <div
            key={c.id}
            className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: c.color }}
              >
                <span className="text-white font-bold text-sm">{c.initials}</span>
              </div>
              <div>
                <p className="font-semibold text-[#1A1209] text-sm leading-tight">{c.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div>
                <p className="text-xs text-[#A89585]">Seguidores</p>
                <p className="text-sm font-bold text-[#1A1209]">{c.followers}</p>
              </div>
              <div>
                <p className="text-xs text-[#A89585]">Eng.</p>
                <p className="text-sm font-bold text-[#1A1209]">{c.engagement}</p>
              </div>
              <div>
                <p className="text-xs text-[#A89585]">Posts/sem</p>
                <p className="text-sm font-bold text-[#1A1209]">{c.postsPerWeek}</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs text-[#C46B3F] hover:underline">
              <ExternalLink className="h-3 w-3" />
              Ver detalhes
            </button>
          </div>
        ))}
      </div>

      {/* Chart section */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="font-serif font-semibold text-[#1A1209]">Evolução Comparativa</h2>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as MetricTab)}
          >
            <TabsList className="bg-[#E8E4DF]">
              <TabsTrigger value="seguidores" className="data-[state=active]:bg-[#C46B3F] data-[state=active]:text-white text-[#7A6559] text-xs">
                Seguidores
              </TabsTrigger>
              <TabsTrigger value="engajamento" className="data-[state=active]:bg-[#C46B3F] data-[state=active]:text-white text-[#7A6559] text-xs">
                Engajamento
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-[#C46B3F] data-[state=active]:text-white text-[#7A6559] text-xs">
                Posts por semana
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D5C9BC" />
            <XAxis dataKey="month" stroke="#A89585" fontSize={12} />
            <YAxis
              stroke="#A89585"
              fontSize={12}
              tickFormatter={(v) =>
                activeTab === "seguidores"
                  ? `${(v / 1000).toFixed(0)}K`
                  : activeTab === "engajamento"
                  ? `${v}%`
                  : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F0EDE8",
                border: "1px solid #D5C9BC",
                borderRadius: "8px",
                color: "#1A1209",
              }}
            />
            <Legend />
            {seriesKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={lineColors[key]}
                strokeWidth={key === "Oikos" ? 3 : 1.5}
                dot={false}
                strokeDasharray={key === "Oikos" ? undefined : "4 2"}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

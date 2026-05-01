import { Metadata } from "next";
import { BarChart2, Plus, Download, Instagram, Facebook, Linkedin, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Relatórios" };

const reports = [
  { id: "1", title: "Performance Abril 2026", type: "PERFORMANCE", period: "Abr 2026", platforms: ["INSTAGRAM", "FACEBOOK"], createdAt: "2026-04-30", status: "ready", highlights: { reach: "142K", engagementRate: "8.4%", growth: "+12%" } },
  { id: "2", title: "Análise de Engajamento — Q1 2026", type: "ENGAGEMENT", period: "Jan-Mar 2026", platforms: ["INSTAGRAM", "FACEBOOK", "LINKEDIN"], createdAt: "2026-04-02", status: "ready", highlights: { reach: "389K", engagementRate: "6.8%", growth: "+23%" } },
  { id: "3", title: "Relatório Competitivo — Março 2026", type: "COMPETITOR", period: "Mar 2026", platforms: ["INSTAGRAM"], createdAt: "2026-04-01", status: "ready", highlights: { reach: "95K", engagementRate: "5.2%", growth: "+8%" } },
  { id: "4", title: "Performance Fevereiro 2026", type: "PERFORMANCE", period: "Fev 2026", platforms: ["INSTAGRAM", "FACEBOOK"], createdAt: "2026-03-02", status: "ready", highlights: { reach: "128K", engagementRate: "7.1%", growth: "-3%" } },
];

const platformIcons: Record<string, React.ReactNode> = {
  INSTAGRAM: <Instagram className="h-4 w-4" style={{ color: "#E1306C" }} />,
  FACEBOOK: <Facebook className="h-4 w-4" style={{ color: "#1877F2" }} />,
  LINKEDIN: <Linkedin className="h-4 w-4" style={{ color: "#0A66C2" }} />,
};

const typeLabels: Record<string, string> = {
  PERFORMANCE: "Performance",
  ENGAGEMENT: "Engajamento",
  COMPETITOR: "Competitivo",
  REACH: "Alcance",
  CUSTOM: "Personalizado",
};

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Relatórios</h1>
          <p className="text-zinc-500 text-sm mt-1">Análise de desempenho das redes sociais</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      {/* Report cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => {
          const growthPositive = !report.highlights.growth.startsWith("-");
          return (
            <div key={report.id} className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5 hover:border-[#2a2a2a] transition-colors cursor-pointer group">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart2 className="h-4 w-4 text-[#d4a574]" />
                    <span className="text-xs text-[#d4a574]">{typeLabels[report.type]}</span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#d4a574] transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {report.period} · Gerado em {report.createdAt}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              {/* Platforms */}
              <div className="flex items-center gap-2 mb-4">
                {report.platforms.map((p) => (
                  <span key={p}>{platformIcons[p]}</span>
                ))}
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-[#0a0a0a] p-2.5 text-center">
                  <p className="text-lg font-bold font-serif text-white">{report.highlights.reach}</p>
                  <p className="text-xs text-zinc-500">Alcance</p>
                </div>
                <div className="rounded-lg bg-[#0a0a0a] p-2.5 text-center">
                  <p className="text-lg font-bold font-serif text-white">{report.highlights.engagementRate}</p>
                  <p className="text-xs text-zinc-500">Engajamento</p>
                </div>
                <div className="rounded-lg bg-[#0a0a0a] p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {growthPositive ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                    )}
                    <p className={cn("text-lg font-bold font-serif", growthPositive ? "text-emerald-400" : "text-red-400")}>
                      {report.highlights.growth}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">Crescimento</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Heart, MessageCircle, Eye } from "lucide-react";

const reachData = [
  { month: "Jan", instagram: 32000, facebook: 18000, linkedin: 8000 },
  { month: "Fev", instagram: 38000, facebook: 21000, linkedin: 9500 },
  { month: "Mar", instagram: 45000, facebook: 24000, linkedin: 11000 },
  { month: "Abr", instagram: 54000, facebook: 28000, linkedin: 14000 },
];

const engagementData = [
  { day: "Seg", rate: 6.2 },
  { day: "Ter", rate: 7.8 },
  { day: "Qua", rate: 8.4 },
  { day: "Qui", rate: 7.1 },
  { day: "Sex", rate: 9.2 },
  { day: "Sáb", rate: 11.5 },
  { day: "Dom", rate: 10.8 },
];

const contentTypeData = [
  { name: "Fotos", value: 45, color: "#d4a574" },
  { name: "Reels", value: 30, color: "#8b5cf6" },
  { name: "Stories", value: 20, color: "#22c55e" },
  { name: "Carrossel", value: 5, color: "#f59e0b" },
];

const obraPerformance = [
  { name: "Bosque Verde", posts: 18, reach: 67000, engagement: 9.2 },
  { name: "Torre Ametista", posts: 12, reach: 42000, engagement: 7.8 },
  { name: "Parque Sul", posts: 8, reach: 28000, engagement: 8.5 },
  { name: "Geral", posts: 5, reach: 15000, engagement: 6.3 },
];

export default function DashboardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Dashboards</h1>
        <p className="text-zinc-500 text-sm mt-1">Visualizações de desempenho em tempo real</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          { label: "Seguidores Totais", value: "32.4K", trend: "+1.2K", icon: Users, positive: true },
          { label: "Alcance Mensal", value: "142K", trend: "+18%", icon: Eye, positive: true },
          { label: "Curtidas", value: "8.9K", trend: "+24%", icon: Heart, positive: true },
          { label: "Comentários", value: "1.2K", trend: "+8%", icon: MessageCircle, positive: true },
          { label: "Taxa Engajamento", value: "8.4%", trend: "+1.2pp", icon: TrendingUp, positive: true },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-4">
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className="h-4 w-4 text-[#d4a574]" />
              <p className="text-xs text-zinc-500">{kpi.label}</p>
            </div>
            <p className="text-2xl font-bold font-serif text-white">{kpi.value}</p>
            <p className={`text-xs mt-1 ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}>
              {kpi.trend} vs mês anterior
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Reach chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
          <h3 className="font-serif font-semibold text-white mb-4">Alcance por Plataforma</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={reachData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
              <XAxis dataKey="month" stroke="#444" fontSize={12} />
              <YAxis stroke="#444" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111111", border: "1px solid #1f1f1f", borderRadius: "8px", color: "white" }}
                formatter={(value: number) => [`${(value / 1000).toFixed(1)}K`]}
              />
              <Bar dataKey="instagram" name="Instagram" fill="#E1306C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="facebook" name="Facebook" fill="#1877F2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="linkedin" name="LinkedIn" fill="#0A66C2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Content type pie */}
        <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
          <h3 className="font-serif font-semibold text-white mb-4">Tipos de Conteúdo</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={contentTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                {contentTypeData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#111111", border: "1px solid #1f1f1f", borderRadius: "8px", color: "white" }}
                formatter={(value: number) => [`${value}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {contentTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-zinc-400">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement + Obra performance */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Engagement line chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
          <h3 className="font-serif font-semibold text-white mb-4">Taxa de Engajamento por Dia da Semana</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
              <XAxis dataKey="day" stroke="#444" fontSize={12} />
              <YAxis stroke="#444" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111111", border: "1px solid #1f1f1f", borderRadius: "8px", color: "white" }}
                formatter={(value: number) => [`${value}%`, "Engajamento"]}
              />
              <Line type="monotone" dataKey="rate" stroke="#d4a574" strokeWidth={2} dot={{ fill: "#d4a574", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Obra performance */}
        <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
          <h3 className="font-serif font-semibold text-white mb-4">Performance por Obra</h3>
          <div className="space-y-3">
            {obraPerformance.map((obra) => (
              <div key={obra.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{obra.name}</span>
                  <span className="text-xs text-zinc-500">{obra.engagement}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1f1f1f] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#d4a574]"
                    style={{ width: `${(obra.engagement / 12) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-600">
                  {obra.posts} posts · {(obra.reach / 1000).toFixed(0)}K alcance
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

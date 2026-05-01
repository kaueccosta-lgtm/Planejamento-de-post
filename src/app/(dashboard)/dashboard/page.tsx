import { Metadata } from "next";
import {
  Calendar,
  CheckSquare,
  MessageCircle,
  MessageSquare,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const upcomingPosts = [
  { id: "1", title: "Residencial Bosque Verde — Tour Virtual", platform: "Instagram", time: "14:00", obra: "Bosque Verde" },
  { id: "2", title: "Torre Ametista — Lançamento", platform: "Facebook", time: "16:00", obra: "Torre Ametista" },
  { id: "3", title: "Parque Sul — Plantas disponíveis", platform: "LinkedIn", time: "18:30", obra: "Parque Sul" },
];

const pendingApprovals = [
  { id: "1", title: "Campanha de lançamento — 4 posts", client: "Construtora Vale Verde", dueIn: "2h" },
  { id: "2", title: "Reels de apresentação — 2 vídeos", client: "Imobiliária Central", dueIn: "4h" },
  { id: "3", title: "Stories de plantão — 6 slides", client: "MRV Engenharia", dueIn: "Amanhã" },
];

const alerts = [
  { id: "1", type: "warning", message: "Token de aprovação expirado — Post #247" },
  { id: "2", type: "error", message: "Falha ao publicar no Instagram — Post #251" },
  { id: "3", type: "info", message: "3 posts agendados para hoje ainda não foram aprovados" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Dashboard</h1>
        <p className="text-[#7A6559] text-sm mt-1">
          Bom dia! Aqui está o resumo de hoje, 30 de abril de 2026.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          title="Posts Hoje"
          value="3"
          subtitle="de 5 programados"
          icon={Clock}
          accent
        />
        <StatsCard
          title="Aprovações Pendentes"
          value="3"
          subtitle="aguardando cliente"
          icon={CheckSquare}
          trend={{ value: 2, label: "vs ontem", positive: false }}
        />
        <StatsCard
          title="DMs não lidos"
          value="18"
          subtitle="em 3 plataformas"
          icon={MessageCircle}
          trend={{ value: 5, label: "novas hoje" }}
        />
        <StatsCard
          title="Comentários"
          value="47"
          subtitle="aguardando resposta"
          icon={MessageSquare}
          trend={{ value: 12, label: "novas hoje" }}
        />
      </div>

      {/* Performance banner */}
      <div className="rounded-xl border border-[#C46B3F]/20 bg-[#C46B3F]/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-semibold text-[#1A1209]">Performance do Mês</h3>
            <p className="text-xs text-[#7A6559] mt-0.5">Abril 2026</p>
          </div>
          <Link
            href="/analise/dashboards"
            className="text-xs text-[#C46B3F] hover:text-[#A85A30] transition-colors"
          >
            Ver relatório completo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Alcance", value: "142K" },
            { label: "Impressões", value: "389K" },
            { label: "Engajamento", value: "8.4%" },
            { label: "Seguidores", value: "+1.2K" },
            { label: "Posts", value: "28" },
            { label: "Stories", value: "84" },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="text-xl font-bold font-serif text-[#C46B3F]">
                {metric.value}
              </p>
              <p className="text-xs text-[#7A6559] mt-0.5">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's posts */}
        <div className="rounded-xl border border-[#D5C9BC] bg-[#F0EDE8] p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-semibold text-[#1A1209]">Posts de Hoje</h3>
              <p className="text-xs text-[#7A6559] mt-0.5">Agendados para publicar</p>
            </div>
            <Link
              href="/publicacao/agendados"
              className="text-xs text-[#C46B3F] hover:text-[#A85A30]"
            >
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 rounded-lg bg-[#E8E4DF] p-3 hover:bg-[#D5C9BC]/40 transition-colors cursor-pointer"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#D5C9BC]">
                  <Calendar className="h-4 w-4 text-[#C46B3F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1209] truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-[#7A6559]">
                    {post.platform} · {post.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending approvals */}
        <div className="rounded-xl border border-[#D5C9BC] bg-[#F0EDE8] p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-semibold text-[#1A1209]">
                Aprovações Pendentes
              </h3>
              <p className="text-xs text-[#7A6559] mt-0.5">
                Aguardando feedback dos clientes
              </p>
            </div>
            <Link
              href="/producao/workflow"
              className="text-xs text-[#C46B3F] hover:text-[#A85A30]"
            >
              Ver workflow
            </Link>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg bg-[#E8E4DF] p-3 hover:bg-[#D5C9BC]/40 transition-colors cursor-pointer"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                  <CheckSquare className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1209]">{item.title}</p>
                  <p className="text-xs text-[#7A6559]">{item.client}</p>
                  <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                    Vence em {item.dueIn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-[#D5C9BC] bg-[#F0EDE8] p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-semibold text-[#1A1209]">Alertas</h3>
              <p className="text-xs text-[#7A6559] mt-0.5">
                Atenção requerida
              </p>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {alerts.length}
            </span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                  alert.type === "error"
                    ? "bg-red-50 hover:bg-red-100"
                    : alert.type === "warning"
                    ? "bg-yellow-50 hover:bg-yellow-100"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                    alert.type === "error"
                      ? "text-red-500"
                      : alert.type === "warning"
                      ? "text-yellow-600"
                      : "text-blue-500"
                  }`}
                />
                <p className="text-sm text-[#5A4035]">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <RecentActivity />
    </div>
  );
}

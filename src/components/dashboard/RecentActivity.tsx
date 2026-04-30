import { formatRelativeTime } from "@/lib/utils";
import { CheckCircle2, Clock, MessageCircle, FileEdit, AlertCircle, Upload } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "published" | "scheduled" | "comment" | "draft" | "alert" | "upload";
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
}

const activityIcons = {
  published: { icon: CheckCircle2, color: "text-emerald-400 bg-emerald-400/10" },
  scheduled: { icon: Clock, color: "text-blue-400 bg-blue-400/10" },
  comment: { icon: MessageCircle, color: "text-purple-400 bg-purple-400/10" },
  draft: { icon: FileEdit, color: "text-zinc-400 bg-zinc-400/10" },
  alert: { icon: AlertCircle, color: "text-red-400 bg-red-400/10" },
  upload: { icon: Upload, color: "text-[#d4a574] bg-[#d4a574]/10" },
};

const sampleActivities: ActivityItem[] = [
  {
    id: "1",
    type: "published",
    title: "Post publicado no Instagram",
    description: "Residencial Bosque Verde — Foto do living room",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    user: "Ana Lima",
  },
  {
    id: "2",
    type: "comment",
    title: "Novo comentário recebido",
    description: '"Incrível! Quanto é o m²?" — @joao.silva',
    timestamp: new Date(Date.now() - 42 * 60 * 1000),
    user: "Instagram",
  },
  {
    id: "3",
    type: "scheduled",
    title: "Post agendado para amanhã",
    description: "Torre Ametista — Vídeo de apresentação",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: "Carlos Mendes",
  },
  {
    id: "4",
    type: "draft",
    title: "Rascunho criado",
    description: "Roteiro de Reels — Empreendimento Parque Sul",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: "Beatriz Costa",
  },
  {
    id: "5",
    type: "alert",
    title: "Token de aprovação expirado",
    description: "Post #247 aguarda nova aprovação do cliente",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    user: "Sistema",
  },
  {
    id: "6",
    type: "upload",
    title: "8 mídias enviadas",
    description: "Empreendimento Vida Nova — Fotos externas",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    user: "Pedro Alves",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
      <div className="mb-4">
        <h3 className="font-serif font-semibold text-white">Atividade Recente</h3>
        <p className="text-xs text-zinc-500 mt-0.5">Últimas ações da equipe</p>
      </div>

      <div className="space-y-1">
        {sampleActivities.map((item, index) => {
          const { icon: Icon, color } = activityIcons[item.type];
          return (
            <div key={item.id} className="relative">
              {/* Timeline line */}
              {index < sampleActivities.length - 1 && (
                <div className="absolute left-[18px] top-10 h-full w-px bg-[#1f1f1f]" />
              )}

              <div className="flex gap-3 rounded-lg p-2 hover:bg-[#161616] transition-colors cursor-pointer">
                {/* Icon */}
                <div
                  className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.user && (
                      <span className="text-xs text-zinc-600">{item.user}</span>
                    )}
                    <span className="text-zinc-700">·</span>
                    <span className="text-xs text-zinc-600">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-3 w-full rounded-md py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors hover:bg-[#161616]">
        Ver toda a atividade
      </button>
    </div>
  );
}

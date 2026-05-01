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
  published: { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
  scheduled: { icon: Clock, color: "text-blue-600 bg-blue-100" },
  comment: { icon: MessageCircle, color: "text-purple-600 bg-purple-100" },
  draft: { icon: FileEdit, color: "text-[#7A6559] bg-[#D5C9BC]" },
  alert: { icon: AlertCircle, color: "text-red-500 bg-red-100" },
  upload: { icon: Upload, color: "text-[#C46B3F] bg-[#C46B3F]/10" },
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
    <div className="rounded-xl border border-[#D5C9BC] bg-[#F0EDE8] p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-serif font-semibold text-[#1A1209]">Atividade Recente</h3>
        <p className="text-xs text-[#7A6559] mt-0.5">Últimas ações da equipe</p>
      </div>

      <div className="space-y-1">
        {sampleActivities.map((item, index) => {
          const { icon: Icon, color } = activityIcons[item.type];
          return (
            <div key={item.id} className="relative">
              {/* Timeline line */}
              {index < sampleActivities.length - 1 && (
                <div className="absolute left-[18px] top-10 h-full w-px bg-[#D5C9BC]" />
              )}

              <div className="flex gap-3 rounded-lg p-2 hover:bg-[#E8E4DF] transition-colors cursor-pointer">
                {/* Icon */}
                <div
                  className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1209] leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#7A6559] mt-0.5 truncate">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.user && (
                      <span className="text-xs text-[#A89585]">{item.user}</span>
                    )}
                    <span className="text-[#C4B4A5]">·</span>
                    <span className="text-xs text-[#A89585]">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-3 w-full rounded-md py-2 text-xs text-[#7A6559] hover:text-[#1A1209] transition-colors hover:bg-[#E8E4DF]">
        Ver toda a atividade
      </button>
    </div>
  );
}

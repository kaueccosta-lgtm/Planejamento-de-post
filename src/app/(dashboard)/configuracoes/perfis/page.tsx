"use client";

import { AlertCircle, CheckCircle2, RefreshCw, Link2, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Platform {
  id: string;
  name: string;
  initial: string;
  color: string;
  accountName: string | null;
  status: "active" | "expired" | "disconnected";
}

const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram Business",
    initial: "I",
    color: "#E1306C",
    accountName: "@oikos.reformas",
    status: "active",
  },
  {
    id: "facebook",
    name: "Facebook Page",
    initial: "F",
    color: "#1877F2",
    accountName: null,
    status: "disconnected",
  },
  {
    id: "tiktok",
    name: "TikTok Business",
    initial: "T",
    color: "#010101",
    accountName: null,
    status: "disconnected",
  },
  {
    id: "linkedin",
    name: "LinkedIn Page",
    initial: "L",
    color: "#0A66C2",
    accountName: "Oikos Reformas Ltda.",
    status: "expired",
  },
  {
    id: "youtube",
    name: "YouTube",
    initial: "Y",
    color: "#FF0000",
    accountName: null,
    status: "disconnected",
  },
  {
    id: "google",
    name: "Google Meu Negócio",
    initial: "G",
    color: "#4285F4",
    accountName: null,
    status: "disconnected",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    initial: "W",
    color: "#25D366",
    accountName: null,
    status: "disconnected",
  },
];

const statusConfig = {
  active: {
    label: "Ativo",
    className: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  expired: {
    label: "Token Expirado",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <AlertCircle className="h-3 w-3" />,
  },
  disconnected: {
    label: "Não Conectado",
    className: "bg-[#D5C9BC] text-[#7A6559] border-[#D5C9BC]",
    icon: null,
  },
};

export default function PerfisPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Perfis Conectados</h1>
        <p className="text-[#7A6559] text-sm mt-1">
          Gerencie as plataformas conectadas ao Oikos Social
        </p>
      </div>

      {/* Alert box */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Atenção necessária</p>
          <p className="text-sm text-amber-700 mt-0.5">
            <span className="font-semibold">Instagram conectado</span> · LinkedIn precisa ser reconectado (token expirado)
          </p>
        </div>
      </div>

      {/* Platform list */}
      <div className="space-y-3">
        {platforms.map((platform) => {
          const sc = statusConfig[platform.status];
          return (
            <div
              key={platform.id}
              className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm p-4 flex items-center gap-4"
            >
              {/* Icon */}
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: platform.color }}
              >
                <span className="text-white font-bold text-lg">{platform.initial}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1A1209] text-sm">{platform.name}</p>
                <p className="text-[#A89585] text-xs mt-0.5">
                  {platform.accountName ?? "Não conectado"}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`hidden sm:flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${sc.className}`}
              >
                {sc.icon}
                {sc.label}
              </span>

              {/* Action button */}
              <div className="flex-shrink-0">
                {platform.status === "active" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Unlink className="h-3.5 w-3.5 mr-1" />
                    Desconectar
                  </Button>
                )}
                {platform.status === "expired" && (
                  <Button
                    size="sm"
                    className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Reconectar
                  </Button>
                )}
                {platform.status === "disconnected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#D5C9BC] text-[#7A6559] hover:text-[#1A1209]"
                  >
                    <Link2 className="h-3.5 w-3.5 mr-1" />
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, formatStr = "dd/MM/yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pt-BR");
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("pt-BR");
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "agora mesmo";
  if (diffMins < 60) return `há ${diffMins}min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays}d`;
  return formatDate(d);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function platformColor(platform: string): string {
  const colors: Record<string, string> = {
    INSTAGRAM: "#E1306C",
    FACEBOOK: "#1877F2",
    LINKEDIN: "#0A66C2",
    TIKTOK: "#000000",
    YOUTUBE: "#FF0000",
    TWITTER: "#1DA1F2",
  };
  return colors[platform] || "#888888";
}

export function platformLabel(platform: string): string {
  const labels: Record<string, string> = {
    INSTAGRAM: "Instagram",
    FACEBOOK: "Facebook",
    LINKEDIN: "LinkedIn",
    TIKTOK: "TikTok",
    YOUTUBE: "YouTube",
    TWITTER: "Twitter/X",
  };
  return labels[platform] || platform;
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    DRAFT: "Rascunho",
    IN_REVIEW: "Em revisão",
    APPROVED: "Aprovado",
    SCHEDULED: "Agendado",
    PUBLISHED: "Publicado",
    FAILED: "Falhou",
    CANCELLED: "Cancelado",
    BRIEFING: "Briefing",
    DESIGN: "Design",
    COPY: "Copy",
    REVIEW: "Revisão",
    APPROVAL: "Aprovação",
    NEW: "Novo",
    IN_PROGRESS: "Em andamento",
    REJECTED: "Rejeitado",
    ARCHIVED: "Arquivado",
  };
  return labels[status] || status;
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: "bg-zinc-700 text-zinc-300",
    IN_REVIEW: "bg-yellow-900 text-yellow-300",
    APPROVED: "bg-green-900 text-green-300",
    SCHEDULED: "bg-blue-900 text-blue-300",
    PUBLISHED: "bg-emerald-900 text-emerald-300",
    FAILED: "bg-red-900 text-red-300",
    CANCELLED: "bg-zinc-800 text-zinc-400",
    BRIEFING: "bg-purple-900 text-purple-300",
    DESIGN: "bg-pink-900 text-pink-300",
    COPY: "bg-orange-900 text-orange-300",
    REVIEW: "bg-yellow-900 text-yellow-300",
    APPROVAL: "bg-amber-900 text-amber-300",
    NEW: "bg-zinc-700 text-zinc-300",
    IN_PROGRESS: "bg-blue-900 text-blue-300",
    REJECTED: "bg-red-900 text-red-300",
    ARCHIVED: "bg-zinc-800 text-zinc-400",
  };
  return colors[status] || "bg-zinc-700 text-zinc-300";
}

export function priorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    LOW: "Baixa",
    MEDIUM: "Média",
    HIGH: "Alta",
    URGENT: "Urgente",
  };
  return labels[priority] || priority;
}

export function priorityColor(priority: string): string {
  const colors: Record<string, string> = {
    LOW: "text-zinc-400",
    MEDIUM: "text-yellow-400",
    HIGH: "text-orange-400",
    URGENT: "text-red-400",
  };
  return colors[priority] || "text-zinc-400";
}

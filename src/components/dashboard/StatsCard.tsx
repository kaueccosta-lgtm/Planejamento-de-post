import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  accent?: boolean;
  className?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent,
  className,
  onClick,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[#1f1f1f] bg-[#111111] p-5 transition-all",
        onClick && "cursor-pointer hover:border-[#d4a574]/30 hover:bg-[#161616]",
        accent && "border-[#d4a574]/30 bg-[#d4a574]/5",
        className
      )}
      onClick={onClick}
    >
      {/* Icon */}
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg",
          accent ? "bg-[#d4a574]/20" : "bg-[#1f1f1f]"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            accent ? "text-[#d4a574]" : "text-zinc-400"
          )}
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-sm text-zinc-500">{title}</p>
        <p
          className={cn(
            "mt-1 text-3xl font-bold font-serif",
            accent ? "text-[#d4a574]" : "text-white"
          )}
        >
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
        )}
      </div>

      {/* Trend */}
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive !== false ? "text-emerald-400" : "text-red-400"
            )}
          >
            {trend.positive !== false ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-xs text-zinc-600">{trend.label}</span>
        </div>
      )}

      {/* Accent corner decoration */}
      {accent && (
        <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#d4a574]/10" />
      )}
    </div>
  );
}

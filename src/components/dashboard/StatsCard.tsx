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
        "relative overflow-hidden rounded-xl border border-[#D5C9BC] bg-[#F0EDE8] p-5 shadow-sm transition-all",
        onClick && "cursor-pointer hover:border-[#C46B3F]/30 hover:bg-[#E8E4DF]",
        accent && "border-[#C46B3F]/30 bg-[#C46B3F]/5",
        className
      )}
      onClick={onClick}
    >
      {/* Icon */}
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg",
          accent ? "bg-[#C46B3F]/20" : "bg-[#D5C9BC]"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            accent ? "text-[#C46B3F]" : "text-[#7A6559]"
          )}
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-sm text-[#7A6559]">{title}</p>
        <p
          className={cn(
            "mt-1 text-3xl font-bold font-serif",
            accent ? "text-[#C46B3F]" : "text-[#1A1209]"
          )}
        >
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-[#7A6559]">{subtitle}</p>
        )}
      </div>

      {/* Trend */}
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive !== false ? "text-emerald-600" : "text-red-500"
            )}
          >
            {trend.positive !== false ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-xs text-[#A89585]">{trend.label}</span>
        </div>
      )}

      {/* Accent corner decoration */}
      {accent && (
        <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#C46B3F]/10" />
      )}
    </div>
  );
}

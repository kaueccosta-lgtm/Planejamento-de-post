"use client";

import { Calendar, User, Tag, MessageSquare } from "lucide-react";
import { cn, priorityColor, statusLabel } from "@/lib/utils";
import type { Demand } from "@/types";

interface KanbanCardProps {
  demand: Demand & {
    _count?: { posts?: number };
    daysUntilDue?: number;
  };
  onClick?: () => void;
}

export function KanbanCard({ demand, onClick }: KanbanCardProps) {
  const isOverdue = demand.dueDate && new Date(demand.dueDate) < new Date();
  const isDueSoon =
    demand.dueDate &&
    !isOverdue &&
    new Date(demand.dueDate).getTime() - Date.now() < 2 * 24 * 60 * 60 * 1000;

  return (
    <div
      onClick={onClick}
      className="group rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] p-3 cursor-pointer hover:border-[#d4a574]/30 hover:bg-[#111111] transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-medium text-white leading-snug line-clamp-2 group-hover:text-[#d4a574] transition-colors">
          {demand.title}
        </p>
        <span
          className={cn(
            "flex-shrink-0 h-2 w-2 rounded-full mt-1",
            demand.priority === "URGENT"
              ? "bg-red-400"
              : demand.priority === "HIGH"
              ? "bg-orange-400"
              : demand.priority === "MEDIUM"
              ? "bg-yellow-400"
              : "bg-zinc-500"
          )}
          title={demand.priority}
        />
      </div>

      {/* Obra */}
      {demand.obra && (
        <div className="flex items-center gap-1.5 mb-2">
          <div
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: demand.obra.color || "#d4a574" }}
          />
          <span className="text-xs text-zinc-500 truncate">{demand.obra.name}</span>
        </div>
      )}

      {/* Format */}
      {demand.format && (
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="h-3 w-3 text-zinc-600" />
          <span className="text-xs text-zinc-500">{demand.format}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#1f1f1f] mt-1">
        {/* Due date */}
        {demand.dueDate && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              isOverdue
                ? "text-red-400"
                : isDueSoon
                ? "text-yellow-400"
                : "text-zinc-600"
            )}
          >
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(demand.dueDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
        )}

        {/* Assignee */}
        {demand.assignedTo && (
          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <User className="h-3 w-3" />
            <span className="truncate max-w-[60px]">
              {demand.assignedTo.name?.split(" ")[0]}
            </span>
          </div>
        )}

        {/* Posts count */}
        {demand._count?.posts !== undefined && demand._count.posts > 0 && (
          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <MessageSquare className="h-3 w-3" />
            <span>{demand._count.posts}</span>
          </div>
        )}
      </div>
    </div>
  );
}

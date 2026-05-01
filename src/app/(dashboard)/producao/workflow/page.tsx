import { Metadata } from "next";
import { KanbanBoard } from "@/components/workflow/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Workflow de Produção",
};

export default function WorkflowPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1209]">
            Workflow de Produção
          </h1>
          <p className="text-[#7A6559] text-sm mt-1">
            Acompanhe o status de todas as demandas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Nova Demanda
          </Button>
        </div>
      </div>

      <KanbanBoard />
    </div>
  );
}

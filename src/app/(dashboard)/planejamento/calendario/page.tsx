import { Metadata } from "next";
import { EditorialCalendar } from "@/components/calendar/EditorialCalendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calendário Editorial",
};

export default function CalendarioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Calendário Editorial
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Planeje e visualize todos os posts por data
          </p>
        </div>
        <Button asChild>
          <Link href="/producao/editor">
            <Plus className="h-4 w-4" />
            Novo Post
          </Link>
        </Button>
      </div>

      <EditorialCalendar />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Lightbulb,
  Workflow,
  FileEdit,
  ImageIcon,
  Clock,
  MessageCircle,
  MessageSquare,
  Sparkles,
  BarChart2,
  PieChart,
  Megaphone,
  Users,
  Settings,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Planejamento",
    items: [
      {
        label: "Calendário Editorial",
        href: "/planejamento/calendario",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        label: "Banco de Ideias",
        href: "/planejamento/banco-de-ideias",
        icon: <Lightbulb className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Produção",
    items: [
      {
        label: "Workflow",
        href: "/producao/workflow",
        icon: <Workflow className="w-4 h-4" />,
      },
      {
        label: "Editor de Posts",
        href: "/producao/editor",
        icon: <FileEdit className="w-4 h-4" />,
      },
      {
        label: "Biblioteca de Mídia",
        href: "/producao/biblioteca",
        icon: <ImageIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Publicação",
    items: [
      {
        label: "Agendados",
        href: "/publicacao/agendados",
        icon: <Clock className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Atendimento",
    items: [
      {
        label: "Inbox",
        href: "/atendimento/inbox",
        icon: <MessageCircle className="w-4 h-4" />,
        badge: 5,
      },
      {
        label: "Comentários",
        href: "/atendimento/comentarios",
        icon: <MessageSquare className="w-4 h-4" />,
        badge: 12,
      },
    ],
  },
  {
    title: "Inteligência",
    items: [
      {
        label: "Gerador de Legendas",
        href: "/inteligencia/legendas",
        icon: <Sparkles className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Análise",
    items: [
      {
        label: "Relatórios",
        href: "/analise/relatorios",
        icon: <BarChart2 className="w-4 h-4" />,
      },
      {
        label: "Dashboards",
        href: "/analise/dashboards",
        icon: <PieChart className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Anúncios",
    items: [
      {
        label: "Campanhas",
        href: "/anuncios/campanhas",
        icon: <Megaphone className="w-4 h-4" />,
      },
      {
        label: "Performance",
        href: "/anuncios/performance",
        icon: <TrendingUp className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        label: "Perfis Conectados",
        href: "/configuracoes/perfis",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        label: "Usuários",
        href: "/configuracoes/usuarios",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
];

interface CollapsibleSectionProps {
  section: NavSection;
  pathname: string;
}

function CollapsibleSection({ section, pathname }: CollapsibleSectionProps) {
  const hasActive = section.items.some((item) => pathname.startsWith(item.href));
  const [isOpen, setIsOpen] = useState(hasActive || !section.title);

  if (!section.title) {
    return (
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#5A4035] hover:text-[#A89585] transition-colors"
      >
        <span>{section.title}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        />
      </button>
      {isOpen && (
        <div className="space-y-0.5 mt-1">
          {section.items.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-[#C46B3F] text-white"
          : "text-[#A89585] hover:bg-[#2E1A0E] hover:text-[#E8E4DF]"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={isActive ? "text-white" : "text-[#A89585]"}>
          {item.icon}
        </span>
        {item.label}
      </div>
      {item.badge !== undefined && item.badge > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C46B3F] text-[10px] font-bold text-white px-1">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#1C0F07] border-r border-[#3D2415] flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#3D2415] bg-[#2E1A0E]">
        <div className="w-8 h-8 rounded-lg bg-[#C46B3F] flex items-center justify-center">
          <span className="text-white font-bold text-sm font-serif">O</span>
        </div>
        <div>
          <h1 className="text-[#E8E4DF] font-serif font-semibold text-sm leading-none">
            Oikos Social
          </h1>
          <p className="text-[#A89585] text-xs mt-0.5">Gestão de Redes</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4 scrollbar-thin">
        {navSections.map((section, idx) => (
          <CollapsibleSection key={idx} section={section} pathname={pathname} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#2E1A0E] p-3">
        <p className="text-xs text-[#A89585] text-center">
          Oikos Social v0.1.0
        </p>
      </div>
    </aside>
  );
}

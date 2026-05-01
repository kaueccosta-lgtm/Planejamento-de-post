"use client";

import { useState } from "react";
import { UserPlus, Pencil, Trash2, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type Role = "Admin" | "Editor" | "Revisor" | "Atendente";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastAccess: string;
  avatarInitials: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Ana Souza",
    email: "ana@oikosreformas.com.br",
    role: "Admin",
    lastAccess: "Hoje, 09:32",
    avatarInitials: "AS",
  },
  {
    id: "2",
    name: "Bruno Carvalho",
    email: "bruno@oikosreformas.com.br",
    role: "Editor",
    lastAccess: "Hoje, 08:15",
    avatarInitials: "BC",
  },
  {
    id: "3",
    name: "Letícia Martins",
    email: "leticia@oikosreformas.com.br",
    role: "Revisor",
    lastAccess: "Ontem, 17:45",
    avatarInitials: "LM",
  },
  {
    id: "4",
    name: "Felipe Rocha",
    email: "felipe@oikosreformas.com.br",
    role: "Editor",
    lastAccess: "29 abr 2025",
    avatarInitials: "FR",
  },
  {
    id: "5",
    name: "Camila Torres",
    email: "camila@oikosreformas.com.br",
    role: "Atendente",
    lastAccess: "Hoje, 10:01",
    avatarInitials: "CT",
  },
];

const roleConfig: Record<Role, { className: string }> = {
  Admin: { className: "bg-purple-100 text-purple-700 border-purple-200" },
  Editor: { className: "bg-blue-100 text-blue-700 border-blue-200" },
  Revisor: { className: "bg-orange-100 text-orange-700 border-orange-200" },
  Atendente: { className: "bg-[#D5C9BC] text-[#7A6559] border-[#D5C9BC]" },
};

type Module = "Planejamento" | "Produção" | "Publicação" | "Atendimento" | "Análise" | "Configurações";

const modules: Module[] = ["Planejamento", "Produção", "Publicação", "Atendimento", "Análise", "Configurações"];

const permissions: Record<Role, Record<Module, boolean>> = {
  Admin: {
    Planejamento: true,
    Produção: true,
    Publicação: true,
    Atendimento: true,
    Análise: true,
    Configurações: true,
  },
  Editor: {
    Planejamento: true,
    Produção: true,
    Publicação: true,
    Atendimento: false,
    Análise: true,
    Configurações: false,
  },
  Revisor: {
    Planejamento: true,
    Produção: true,
    Publicação: false,
    Atendimento: false,
    Análise: false,
    Configurações: false,
  },
  Atendente: {
    Planejamento: false,
    Produção: false,
    Publicação: false,
    Atendimento: true,
    Análise: false,
    Configurações: false,
  },
};

const roles: Role[] = ["Admin", "Editor", "Revisor", "Atendente"];

export default function UsuariosPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Editor");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1209]">Usuários e Permissões</h1>
          <p className="text-[#7A6559] text-sm mt-1">Gerencie o acesso da equipe ao Oikos Social</p>
        </div>
        <Button
          className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
          onClick={() => setInviteOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Convidar Usuário
        </Button>
      </div>

      {/* Users table */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E8E4DF] border-b border-[#D5C9BC]">
                {["Usuário", "Perfil", "Último acesso", "Ações"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const rc = roleConfig[user.role];
                return (
                  <tr
                    key={user.id}
                    className="border-b border-[#D5C9BC] last:border-0 hover:bg-[#E8E4DF] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#C46B3F] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{user.avatarInitials}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1A1209]">{user.name}</p>
                          <p className="text-xs text-[#A89585]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${rc.className}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-[#7A6559]">{user.lastAccess}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-[#A89585] hover:text-[#1A1209] hover:bg-[#D5C9BC] transition-colors">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-[#A89585] hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Separator className="bg-[#D5C9BC]" />

      {/* Permissions matrix */}
      <div className="bg-[#F0EDE8] border border-[#D5C9BC] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#D5C9BC]">
          <h2 className="font-serif font-semibold text-[#1A1209]">Matriz de Permissões</h2>
          <p className="text-xs text-[#A89585] mt-1">
            Acesso de cada perfil aos módulos da plataforma
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E8E4DF] border-b border-[#D5C9BC]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide">
                  Módulo
                </th>
                {roles.map((role) => (
                  <th
                    key={role}
                    className="text-center px-4 py-3 text-xs font-semibold text-[#7A6559] uppercase tracking-wide"
                  >
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${roleConfig[role].className}`}>
                      {role}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((mod) => (
                <tr
                  key={mod}
                  className="border-b border-[#D5C9BC] last:border-0 hover:bg-[#E8E4DF] transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1209]">{mod}</td>
                  {roles.map((role) => {
                    const hasAccess = permissions[role][mod];
                    return (
                      <td key={role} className="px-4 py-3 text-center">
                        {hasAccess ? (
                          <span className="inline-flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center">
                            <Minus className="h-4 w-4 text-[#D5C9BC]" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="bg-[#F0EDE8] border-[#D5C9BC] text-[#1A1209]">
          <DialogHeader>
            <DialogTitle className="text-[#1A1209]">Convidar Usuário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-[#1A1209]">E-mail</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="nome@empresa.com.br"
                className="bg-white border-[#D5C9BC] text-[#1A1209] placeholder:text-[#A89585]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1A1209]">Perfil de acesso</Label>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as Role)}
              >
                <SelectTrigger className="bg-white border-[#D5C9BC] text-[#1A1209]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInviteOpen(false)}
              className="border-[#D5C9BC] text-[#7A6559]"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#C46B3F] text-white hover:bg-[#A85A30]"
              onClick={() => setInviteOpen(false)}
            >
              Enviar Convite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

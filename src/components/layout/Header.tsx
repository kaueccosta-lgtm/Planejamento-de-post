"use client";

import { Bell, Plus, Search, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#D5C9BC] bg-[#F0EDE8]/95 backdrop-blur px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {title && (
          <h2 className="text-base font-semibold text-[#1A1209] font-serif">{title}</h2>
        )}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-[#A89585]" />
          <input
            type="text"
            placeholder="Buscar posts, ideias, demandas..."
            className="h-9 w-72 rounded-md border border-[#D5C9BC] bg-[#F0EDE8] pl-9 pr-4 text-sm text-[#1A1209] placeholder:text-[#A89585] focus:outline-none focus:ring-1 focus:ring-[#C46B3F]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Quick Create */}
        <Button size="sm" className="hidden sm:flex gap-1.5" asChild>
          <Link href="/producao/editor">
            <Plus className="h-4 w-4" />
            Novo Post
          </Link>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4 text-[#7A6559]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C46B3F]" />
          <span className="sr-only">Notificações</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.png" alt="Usuário" />
                <AvatarFallback className="text-xs bg-[#D5C9BC] text-[#1A1209]">US</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#F0EDE8] border-[#D5C9BC]" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-[#1A1209]">
                  Administrador
                </p>
                <p className="text-xs leading-none text-[#7A6559]">
                  admin@oikossocial.com.br
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#D5C9BC]" />
            <DropdownMenuItem className="cursor-pointer text-[#1A1209] focus:bg-[#E8E4DF]">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-[#1A1209] focus:bg-[#E8E4DF]" asChild>
              <Link href="/configuracoes/perfis">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#D5C9BC]" />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-[#E8E4DF]">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Smile,
  Tag,
  UserCheck,
  CheckCheck,
  MoreHorizontal,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  fromContact: boolean;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  channel: "instagram" | "facebook" | "whatsapp";
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Ana Paula Mendes",
    avatar: "AP",
    lastMessage: "Olá! Gostaria de saber mais sobre os serviços de reforma.",
    timestamp: "14:32",
    unread: 3,
    channel: "instagram",
    messages: [
      { id: "m1", text: "Olá! Gostaria de saber mais sobre os serviços de reforma.", fromContact: true, time: "14:28" },
      { id: "m2", text: "Oi Ana Paula! Fico feliz em ajudar. Qual tipo de reforma você está pensando?", fromContact: false, time: "14:29" },
      { id: "m3", text: "Estou querendo reformar o banheiro e a cozinha do meu apartamento de 80m².", fromContact: true, time: "14:31" },
      { id: "m4", text: "Qual a localização do imóvel? Atendemos em São Paulo e Grande SP.", fromContact: false, time: "14:31" },
      { id: "m5", text: "Fica em Moema, São Paulo.", fromContact: true, time: "14:32" },
    ],
  },
  {
    id: "2",
    name: "Carlos Roberto Silva",
    avatar: "CS",
    lastMessage: "Quanto tempo leva uma reforma completa?",
    timestamp: "13:15",
    unread: 0,
    channel: "whatsapp",
    messages: [
      { id: "m1", text: "Boa tarde! Quanto tempo leva uma reforma completa de um apartamento?", fromContact: true, time: "13:10" },
      { id: "m2", text: "Boa tarde, Carlos! Depende do tamanho. Para apartamentos de 60-80m² geralmente entre 45 a 90 dias.", fromContact: false, time: "13:12" },
      { id: "m3", text: "Quanto tempo leva uma reforma completa?", fromContact: true, time: "13:15" },
    ],
  },
  {
    id: "3",
    name: "Fernanda Costa",
    avatar: "FC",
    lastMessage: "Perfeito! Posso agendar uma visita?",
    timestamp: "11:45",
    unread: 0,
    channel: "facebook",
    messages: [
      { id: "m1", text: "Olá, vi os trabalhos de vocês no Instagram e adorei!", fromContact: true, time: "11:30" },
      { id: "m2", text: "Obrigado pelo elogio, Fernanda! Ficamos felizes. 😊 Como podemos ajudar?", fromContact: false, time: "11:32" },
      { id: "m3", text: "Quero reformar minha sala de estar. Vocês fazem esse tipo de serviço?", fromContact: true, time: "11:38" },
      { id: "m4", text: "Sim! Fazemos salas, cozinhas, banheiros e reformas completas. Quer fazer um orçamento?", fromContact: false, time: "11:40" },
      { id: "m5", text: "Perfeito! Posso agendar uma visita?", fromContact: true, time: "11:45" },
    ],
  },
  {
    id: "4",
    name: "Ricardo Almeida",
    avatar: "RA",
    lastMessage: "Obrigado! Vou pensar e retorno em breve.",
    timestamp: "Ontem",
    unread: 0,
    channel: "instagram",
    messages: [
      { id: "m1", text: "Qual o valor médio por m² para reforma de banheiro?", fromContact: true, time: "09:20" },
      { id: "m2", text: "Para banheiro, nossos projetos variam de R$800 a R$2.500/m² dependendo dos materiais escolhidos.", fromContact: false, time: "09:25" },
      { id: "m3", text: "Obrigado! Vou pensar e retorno em breve.", fromContact: true, time: "09:30" },
    ],
  },
  {
    id: "5",
    name: "Mariana Souza",
    avatar: "MS",
    lastMessage: "Vocês têm portfólio de cozinhas pequenas?",
    timestamp: "Ontem",
    unread: 2,
    channel: "whatsapp",
    messages: [
      { id: "m1", text: "Oi! Vocês têm portfólio de cozinhas pequenas?", fromContact: true, time: "16:50" },
      { id: "m2", text: "Sim! Temos vários projetos de cozinhas compactas. Posso te enviar alguns exemplos.", fromContact: false, time: "16:52" },
      { id: "m3", text: "Ótimo! Por favor 🙏", fromContact: true, time: "16:55" },
      { id: "m4", text: "Vocês têm portfólio de cozinhas pequenas?", fromContact: true, time: "17:02" },
    ],
  },
];

const channelIcon: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-3 w-3" style={{ color: "#E1306C" }} />,
  facebook: <Facebook className="h-3 w-3" style={{ color: "#1877F2" }} />,
  whatsapp: <MessageCircle className="h-3 w-3" style={{ color: "#25D366" }} />,
};

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState("1");
  const [message, setMessage] = useState("");
  const [searchConv, setSearchConv] = useState("");

  const selected = conversations.find((c) => c.id === selectedId)!;

  const filteredConversations = conversations.filter((c) =>
    searchConv === "" ||
    c.name.toLowerCase().includes(searchConv.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchConv.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-120px)] -mt-6 -mx-6 flex border-t border-[#1f1f1f]">
      {/* Left panel - conversation list */}
      <div className="w-[30%] min-w-[260px] flex-shrink-0 border-r border-[#1f1f1f] bg-[#0a0a0a] flex flex-col">
        <div className="px-4 py-3 border-b border-[#1f1f1f]">
          <h1 className="text-base font-serif font-semibold text-white">Inbox</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {conversations.filter((c) => c.unread > 0).length} não lidas
          </p>
        </div>
        <div className="px-3 py-2 border-b border-[#1f1f1f]">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#d4a574]"
              placeholder="Buscar conversas..."
              value={searchConv}
              onChange={(e) => setSearchConv(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3 border-b border-[#111111] transition-colors text-left",
                selectedId === conv.id ? "bg-[#1a1a1a]" : "hover:bg-[#111111]"
              )}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#d4a574]">
                  {conv.avatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#111111] border border-[#0a0a0a]">
                  {channelIcon[conv.channel]}
                </span>
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm font-medium truncate", conv.unread > 0 ? "text-white" : "text-zinc-300")}>
                    {conv.name}
                  </span>
                  <span className="text-xs text-zinc-600 flex-shrink-0 ml-2">{conv.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-zinc-500 truncate pr-2">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="flex-shrink-0 h-5 min-w-[20px] flex items-center justify-center rounded-full bg-[#d4a574] text-[#0a0a0a] text-xs font-bold px-1.5">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel - message thread */}
      <div className="flex-1 flex flex-col bg-[#0d0d0d]">
        {/* Thread header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1f1f1f] bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#d4a574]">
              {selected.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{selected.name}</p>
              <div className="flex items-center gap-1.5">
                {channelIcon[selected.channel]}
                <span className="text-xs text-zinc-500 capitalize">{selected.channel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8">
              <Tag className="h-3.5 w-3.5" />
              Marcar
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <UserCheck className="h-3.5 w-3.5" />
              Atribuir
            </Button>
            <Button size="sm" className="text-xs h-8">
              <CheckCheck className="h-3.5 w-3.5" />
              Resolver
            </Button>
            <button className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-[#1f1f1f] transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {selected.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.fromContact ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5",
                  msg.fromContact
                    ? "bg-[#1f1f1f] text-white rounded-tl-sm"
                    : "bg-[#d4a574] text-[#0a0a0a] rounded-tr-sm"
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={cn(
                  "text-xs mt-1 text-right",
                  msg.fromContact ? "text-zinc-500" : "text-[#0a0a0a]/60"
                )}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#1f1f1f] bg-[#111111]">
          {/* Quick replies */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {["Obrigado pelo contato!", "Vou verificar e retorno em breve", "Pode me enviar mais detalhes?"].map((reply) => (
              <button
                key={reply}
                onClick={() => setMessage(reply)}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs border border-[#1f1f1f] text-zinc-400 hover:border-[#d4a574] hover:text-[#d4a574] transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <button className="p-2 text-zinc-500 hover:text-[#d4a574] transition-colors">
              <Smile className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite uma mensagem..."
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#d4a574] resize-none"
              />
            </div>
            <Button size="icon" className="h-10 w-10 flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

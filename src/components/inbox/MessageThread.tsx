"use client";

import { useState } from "react";
import { Send, Paperclip, Smile, MoreHorizontal } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";

interface MessageItem {
  id: string;
  content: string;
  isFromUs: boolean;
  createdAt: Date;
  senderName: string;
}

const dummyMessages: MessageItem[] = [
  { id: "1", content: "Olá! Tenho interesse no Bosque Verde, podem me enviar mais informações?", isFromUs: false, createdAt: new Date(Date.now() - 25 * 60 * 1000), senderName: "João Silva" },
  { id: "2", content: "Oi João! Fico muito feliz com seu interesse 😊 O Residencial Bosque Verde é um empreendimento incrível localizado no coração do bairro!", isFromUs: true, createdAt: new Date(Date.now() - 22 * 60 * 1000), senderName: "Equipe Oikos" },
  { id: "3", content: "Temos unidades de 2 e 3 dormitórios, com área de lazer completa, piscina, academia e muito mais!", isFromUs: true, createdAt: new Date(Date.now() - 22 * 60 * 1000), senderName: "Equipe Oikos" },
  { id: "4", content: "Que ótimo! Qual o valor das unidades? Tenho interesse em 3 dormitórios.", isFromUs: false, createdAt: new Date(Date.now() - 15 * 60 * 1000), senderName: "João Silva" },
  { id: "5", content: "Posso colocar em contato com nosso consultor para detalhes de valores e condições de pagamento?", isFromUs: false, createdAt: new Date(Date.now() - 12 * 60 * 1000), senderName: "João Silva" },
  { id: "6", content: "Claro! Vou enviar o contato do nosso consultor especializado. Qual o melhor horário para ele te ligar? 📞", isFromUs: true, createdAt: new Date(Date.now() - 8 * 60 * 1000), senderName: "Equipe Oikos" },
  { id: "7", content: "Pode ser hoje à tarde, a partir das 15h. Meu número é (11) 9XXXX-XXXX.", isFromUs: false, createdAt: new Date(Date.now() - 5 * 60 * 1000), senderName: "João Silva" },
];

interface MessageThreadProps {
  conversationId?: string;
}

export function MessageThread({ conversationId }: MessageThreadProps) {
  const [message, setMessage] = useState("");
  const [messages] = useState<MessageItem[]>(dummyMessages);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1f1f1f] flex items-center justify-center mb-4">
            <Send className="h-8 w-8 text-zinc-600" />
          </div>
          <p className="text-zinc-500">Selecione uma conversa para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#1f1f1f] flex items-center justify-center">
            <span className="text-sm font-semibold text-zinc-400">J</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">João Silva</p>
            <p className="text-xs text-zinc-500">Instagram · Ativo há 5 min</p>
          </div>
        </div>
        <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-[#1f1f1f] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          const showAvatar = !msg.isFromUs && (idx === 0 || messages[idx - 1].isFromUs);

          return (
            <div
              key={msg.id}
              className={cn("flex gap-2", msg.isFromUs ? "flex-row-reverse" : "flex-row")}
            >
              {/* Avatar */}
              {!msg.isFromUs && (
                <div className={cn("h-7 w-7 flex-shrink-0 rounded-full bg-[#1f1f1f] flex items-center justify-center mt-auto", !showAvatar && "invisible")}>
                  <span className="text-xs font-semibold text-zinc-400">J</span>
                </div>
              )}

              <div className={cn("max-w-[75%] space-y-1", msg.isFromUs ? "items-end" : "items-start", "flex flex-col")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    msg.isFromUs
                      ? "bg-[#d4a574] text-[#0a0a0a] rounded-tr-sm"
                      : "bg-[#1f1f1f] text-white rounded-tl-sm"
                  )}
                >
                  {msg.content}
                </div>
                <p className="text-[10px] text-zinc-600 px-1">
                  {formatRelativeTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#1f1f1f]">
        <div className="flex items-end gap-2 rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] px-3 py-2">
          <button className="flex-shrink-0 p-1 text-zinc-500 hover:text-zinc-300 transition-colors">
            <Paperclip className="h-4 w-4" />
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escreva uma mensagem..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 resize-none focus:outline-none max-h-24 scrollbar-thin"
          />
          <button className="flex-shrink-0 p-1 text-zinc-500 hover:text-zinc-300 transition-colors">
            <Smile className="h-4 w-4" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#d4a574] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e8c9a0] transition-colors"
          >
            <Send className="h-4 w-4 text-[#0a0a0a]" />
          </button>
        </div>
        <p className="text-xs text-zinc-700 mt-1 text-center">
          Enter para enviar · Shift+Enter para nova linha
        </p>
      </div>
    </div>
  );
}

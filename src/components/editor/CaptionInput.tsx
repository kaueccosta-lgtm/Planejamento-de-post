"use client";

import { useState, useRef } from "react";
import { Smile, Hash, Sparkles, Pen, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CaptionInputProps {
  value: string;
  onChange: (value: string) => void;
  platform?: string;
  maxLength?: number;
  onAIGenerate?: () => void;
}

const MAX_LENGTHS: Record<string, number> = {
  INSTAGRAM: 2200,
  FACEBOOK: 63206,
  LINKEDIN: 3000,
  TIKTOK: 2200,
  TWITTER: 280,
};

const SIGNATURE_TEMPLATES = [
  "\n\n📍 Venha conhecer! 🔑\n👉 Link na bio",
  "\n\n💬 Comente abaixo suas dúvidas!\n📲 WhatsApp no link da bio",
  "\n\n✨ Agende sua visita\n📞 (11) 9XXXX-XXXX",
];

export function CaptionInput({
  value,
  onChange,
  platform = "INSTAGRAM",
  onAIGenerate,
}: CaptionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLen = MAX_LENGTHS[platform] || 2200;
  const charCount = value.length;
  const isNearLimit = charCount > maxLen * 0.9;
  const isOverLimit = charCount > maxLen;

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + text);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.slice(0, start) + text + value.slice(end);
    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const addHashtag = () => {
    insertAtCursor(" #");
    textareaRef.current?.focus();
  };

  const addMention = () => {
    insertAtCursor(" @");
    textareaRef.current?.focus();
  };

  const addSignature = () => {
    const sig = SIGNATURE_TEMPLATES[0];
    insertAtCursor(sig);
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => insertAtCursor(" 😊")}
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-[#1f1f1f] hover:text-white transition-colors"
          title="Emoji"
        >
          <Smile className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={addHashtag}
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-[#1f1f1f] hover:text-white transition-colors"
          title="Hashtag"
        >
          <Hash className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={addMention}
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-[#1f1f1f] hover:text-white transition-colors"
          title="Mencionar"
        >
          <AtSign className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={addSignature}
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-[#1f1f1f] hover:text-white transition-colors"
          title="Assinatura"
        >
          <Pen className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-[#1f1f1f] mx-1" />

        {onAIGenerate && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAIGenerate}
            className="h-8 gap-1.5 text-[#d4a574] hover:text-[#e8c9a0] hover:bg-[#d4a574]/10 px-2"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-xs">IA</span>
          </Button>
        )}

        <div className="ml-auto">
          <span
            className={cn(
              "text-xs tabular-nums",
              isOverLimit
                ? "text-red-400"
                : isNearLimit
                ? "text-yellow-400"
                : "text-zinc-600"
            )}
          >
            {charCount}/{maxLen}
          </span>
        </div>
      </div>

      {/* Textarea */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva sua legenda aqui... Use IA para gerar automaticamente ✨"
        className="min-h-[160px] resize-none text-sm leading-relaxed"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Save, Send, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CaptionInput } from "./CaptionInput";
import { ChannelSelector } from "./ChannelSelector";
import { PostPreview } from "./PostPreview";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostEditorProps {
  onSave?: (data: PostFormData) => void;
  onPublish?: (data: PostFormData) => void;
}

export interface PostFormData {
  title: string;
  caption: string;
  selectedChannels: string[];
  scheduledFor: string;
  obraId: string;
  firstComment: string;
}

export function PostEditor({ onSave, onPublish }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [scheduledFor, setScheduledFor] = useState("");
  const [obraId, setObraId] = useState("");
  const [firstComment, setFirstComment] = useState("");
  const [activePreviewPlatform, setActivePreviewPlatform] = useState("INSTAGRAM");
  const [saving, setSaving] = useState(false);

  const formData: PostFormData = {
    title, caption, selectedChannels, scheduledFor, obraId, firstComment,
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    onSave?.(formData);
    setSaving(false);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-0 rounded-xl border border-[#D5C9BC] overflow-hidden shadow-sm">
      {/* Column 1: Settings */}
      <div className="w-72 flex-shrink-0 border-r border-[#D5C9BC] bg-[#F0EDE8]">
        <div className="border-b border-[#D5C9BC] px-4 py-3">
          <h3 className="text-sm font-semibold text-[#1A1209] font-serif">Configurações</h3>
        </div>
        <ScrollArea className="h-[calc(100%-52px)]">
          <div className="p-4 space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#7A6559]">Título interno</Label>
              <Input
                id="title"
                placeholder="Ex: Bosque Verde — Lançamento"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Obra */}
            <div className="space-y-2">
              <Label className="text-[#7A6559]">Empreendimento</Label>
              <Select value={obraId} onValueChange={setObraId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar obra..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Bosque Verde</SelectItem>
                  <SelectItem value="2">Torre Ametista</SelectItem>
                  <SelectItem value="3">Parque Sul</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <Label htmlFor="schedule" className="text-[#7A6559]">Data e horário</Label>
              <Input
                id="schedule"
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
              />
            </div>

            {/* Channels */}
            <ChannelSelector
              selectedChannels={selectedChannels}
              onChange={setSelectedChannels}
            />

            {/* First comment */}
            <div className="space-y-2">
              <Label htmlFor="first-comment" className="text-[#7A6559]">Primeiro comentário</Label>
              <Input
                id="first-comment"
                placeholder="Hashtags, links..."
                value={firstComment}
                onChange={(e) => setFirstComment(e.target.value)}
              />
              <p className="text-xs text-[#A89585]">
                Postado automaticamente após publicar
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Column 2: Content */}
      <div className="flex-1 flex flex-col bg-[#E8E4DF]">
        <div className="border-b border-[#D5C9BC] px-4 py-3 flex items-center justify-between bg-[#F0EDE8]">
          <h3 className="text-sm font-semibold text-[#1A1209] font-serif">Conteúdo</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Salvar
            </Button>
            <Button size="sm" variant="outline">
              <Clock className="h-3.5 w-3.5" />
              Agendar
            </Button>
            <Button size="sm">
              <Send className="h-3.5 w-3.5" />
              Publicar
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-5">
            {/* Media upload area */}
            <div>
              <Label className="text-[#7A6559] mb-2 block">Mídia</Label>
              <div className="rounded-xl border-2 border-dashed border-[#D5C9BC] bg-[#F0EDE8] p-8 text-center hover:border-[#C46B3F]/40 transition-colors cursor-pointer group">
                <div className="mx-auto h-10 w-10 rounded-xl bg-[#D5C9BC] flex items-center justify-center mb-3 group-hover:bg-[#C46B3F]/10 transition-colors">
                  <svg className="h-5 w-5 text-[#7A6559] group-hover:text-[#C46B3F] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm text-[#7A6559]">
                  Arraste mídias ou clique para enviar
                </p>
                <p className="text-xs text-[#A89585] mt-1">
                  JPG, PNG, MP4 até 100MB
                </p>
              </div>
            </div>

            {/* Caption */}
            <div>
              <Label className="text-[#7A6559] mb-2 block">Legenda</Label>
              <CaptionInput
                value={caption}
                onChange={setCaption}
                platform={activePreviewPlatform}
                onAIGenerate={() => {}}
              />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Column 3: Preview */}
      <div className="w-80 flex-shrink-0 border-l border-[#D5C9BC] bg-[#F0EDE8]">
        <div className="border-b border-[#D5C9BC] px-4 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#1A1209] font-serif">Prévia</h3>
          <div className="flex gap-1">
            {["INSTAGRAM", "FACEBOOK"].map((p) => (
              <button
                key={p}
                onClick={() => setActivePreviewPlatform(p)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  activePreviewPlatform === p
                    ? "bg-[#C46B3F]/20 text-[#C46B3F]"
                    : "text-[#7A6559] hover:text-[#1A1209]"
                }`}
              >
                {p === "INSTAGRAM" ? "IG" : p === "FACEBOOK" ? "FB" : p}
              </button>
            ))}
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-52px)] p-4">
          <PostPreview
            caption={caption}
            platform={activePreviewPlatform}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

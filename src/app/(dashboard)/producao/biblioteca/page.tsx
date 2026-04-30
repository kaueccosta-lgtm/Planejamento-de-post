"use client";

import { useState } from "react";
import { Search, Filter, Upload, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaGrid } from "@/components/media/MediaGrid";
import { MediaUpload } from "@/components/media/MediaUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BibliotecaPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Biblioteca de Mídia
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Gerencie fotos, vídeos e outros arquivos
          </p>
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <Upload className="h-4 w-4" />
          Enviar Mídia
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar por nome, tag..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {/* Media grid */}
      <MediaGrid />

      {/* Upload dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enviar Mídia</DialogTitle>
          </DialogHeader>
          <MediaUpload
            onUploadComplete={() => setShowUpload(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { Upload, X, Image, Video, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatFileSize } from "@/lib/utils";

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "done" | "error";
  url?: string;
}

interface MediaUploadProps {
  onUploadComplete?: (files: { name: string; url: string; type: string; size: number }[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
}

export function MediaUpload({
  onUploadComplete,
  accept = "image/*,video/*",
  multiple = true,
  maxSize = 100 * 1024 * 1024, // 100MB
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadingFile[]>([]);

  const handleFiles = async (fileList: FileList) => {
    const newFiles: UploadingFile[] = [];

    for (const file of Array.from(fileList)) {
      if (file.size > maxSize) {
        alert(`${file.name} é muito grande (máx. ${formatFileSize(maxSize)})`);
        continue;
      }

      const uploadFile: UploadingFile = {
        id: Math.random().toString(36).slice(2),
        file,
        progress: 0,
        status: "uploading",
      };
      newFiles.push(uploadFile);
    }

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload
    for (const uploadFile of newFiles) {
      for (let p = 0; p <= 100; p += 20) {
        await new Promise((r) => setTimeout(r, 200));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, progress: p } : f
          )
        );
      }
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: "done", url: URL.createObjectURL(f.file), progress: 100 }
            : f
        )
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all",
          isDragging
            ? "border-[#d4a574] bg-[#d4a574]/5"
            : "border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#d4a574]/30 hover:bg-[#111111]"
        )}
      >
        <div className="mx-auto h-12 w-12 rounded-2xl bg-[#1f1f1f] flex items-center justify-center mb-4">
          <Upload className={cn("h-6 w-6 transition-colors", isDragging ? "text-[#d4a574]" : "text-zinc-500")} />
        </div>
        <p className="text-sm font-medium text-white">
          {isDragging ? "Solte os arquivos aqui" : "Clique ou arraste para enviar"}
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Imagens e vídeos até {formatFileSize(maxSize)}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => {
            const isImage = f.file.type.startsWith("image/");
            return (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-lg border border-[#1f1f1f] bg-[#111111] p-3"
              >
                {/* Thumbnail */}
                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#1f1f1f] overflow-hidden flex items-center justify-center">
                  {f.url && isImage ? (
                    <img src={f.url} alt="" className="h-full w-full object-cover" />
                  ) : isImage ? (
                    <Image className="h-5 w-5 text-zinc-500" />
                  ) : (
                    <Video className="h-5 w-5 text-purple-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{f.file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-500">{formatFileSize(f.file.size)}</span>
                    {f.status === "uploading" && (
                      <div className="flex-1 max-w-24 h-1.5 rounded-full bg-[#1f1f1f] overflow-hidden">
                        <div
                          className="h-full bg-[#d4a574] transition-all"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  {f.status === "uploading" ? (
                    <Loader2 className="h-4 w-4 text-zinc-500 animate-spin" />
                  ) : f.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <X className="h-4 w-4 text-red-400" />
                  )}
                </div>

                <button
                  onClick={() => removeFile(f.id)}
                  className="flex-shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

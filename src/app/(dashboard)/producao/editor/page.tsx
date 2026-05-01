import { Metadata } from "next";
import { PostEditor } from "@/components/editor/PostEditor";

export const metadata: Metadata = {
  title: "Editor de Posts",
};

export default function EditorPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1209]">
          Editor de Posts
        </h1>
        <p className="text-[#7A6559] text-sm mt-1">
          Crie, edite e publique conteúdo em todas as plataformas
        </p>
      </div>
      <PostEditor />
    </div>
  );
}

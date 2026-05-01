import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#E8E4DF] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-60 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[#E8E4DF] scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}

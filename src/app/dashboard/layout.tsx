import Header from "@/components/saloonOwner/common/Header";
import Sidebar from "@/components/saloonOwner/common/Sidebar";
import { SidebarProvider } from "@/components/saloonOwner/common/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-[100dvh] bg-white font-manrope">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <Header />
          <main className="flex-1 overflow-y-auto p-5 bg-[#F4F7FB] rounded-tl-[30px]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

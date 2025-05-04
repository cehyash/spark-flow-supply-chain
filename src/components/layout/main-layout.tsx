
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "./main-sidebar";
import MainHeader from "./main-header";

interface MainLayoutProps {
  userRole?: "admin" | "customer" | "supplier";
}

export default function MainLayout({ userRole = "customer" }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar userRole={userRole} isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <MainHeader 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            userRole={userRole} 
          />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./SideBar";
import { AppSidebar } from "./SideBarApp";

export default function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <div className="flex bg-white">
        <AppSidebar />
      </div>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

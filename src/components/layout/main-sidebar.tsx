
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  Home, 
  ShoppingBag, 
  Package, 
  Clock, 
  Settings, 
  Users, 
  Database, 
  LayoutDashboard, 
  ShoppingCart
} from "lucide-react";

interface MainSidebarProps {
  userRole: "admin" | "customer" | "supplier";
  isOpen: boolean;
}

export default function MainSidebar({ userRole, isOpen }: MainSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const adminMenuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: "Products", path: "/admin/products", icon: <Package className="h-5 w-5" /> },
    { title: "Orders", path: "/admin/orders", icon: <ShoppingBag className="h-5 w-5" /> },
    { title: "Suppliers", path: "/admin/suppliers", icon: <Users className="h-5 w-5" /> },
    { title: "Customers", path: "/admin/customers", icon: <Users className="h-5 w-5" /> },
    { title: "Settings", path: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  const customerMenuItems = [
    { title: "Dashboard", path: "/customer/dashboard", icon: <Home className="h-5 w-5" /> },
    { title: "Products", path: "/customer/products", icon: <ShoppingBag className="h-5 w-5" /> },
    { title: "Cart", path: "/customer/cart", icon: <ShoppingCart className="h-5 w-5" /> },
    { title: "Orders", path: "/customer/orders", icon: <Clock className="h-5 w-5" /> },
    { title: "Settings", path: "/customer/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  const menuItems = userRole === "admin" ? adminMenuItems : customerMenuItems;

  return (
    <Sidebar className={`transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <SidebarHeader className="flex h-14 items-center border-b px-4 py-2">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">
            {isOpen ? "Master Elec" : "ME"}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                className="flex items-center py-3"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center">
                  {item.icon}
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          {isOpen ? "© 2025 Master Electricals" : "© ME"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

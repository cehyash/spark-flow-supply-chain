
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Bell, ShoppingCart, LogOut, User, Settings } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { useToast } from "@/components/ui/toast";

interface MainHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userRole?: "admin" | "customer" | "supplier";
}

export default function MainHeader({ sidebarOpen, setSidebarOpen, userRole = "customer" }: MainHeaderProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleLogout = () => {
    // In a real app, this would include API calls to log out the user
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <header className="border-b bg-card sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          
          {userRole === "customer" && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/customer/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
          )}
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userRole === "admin" ? "AD" : "CU"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/${userRole}/profile`)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/${userRole}/settings`)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

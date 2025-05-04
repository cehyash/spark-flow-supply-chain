
import { Toaster } from "@/components/ui/toast";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminSuppliers from "./pages/admin/Suppliers";

// Customer pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProducts from "./pages/customer/Products";
import CustomerCart from "./pages/customer/Cart";
import CustomerOrders from "./pages/customer/Orders";

// Layout
import MainLayout from "./components/layout/main-layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<MainLayout userRole="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
          </Route>
          
          {/* Customer routes */}
          <Route path="/customer" element={<MainLayout userRole="customer" />}>
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="products" element={<CustomerProducts />} />
            <Route path="cart" element={<CustomerCart />} />
            <Route path="orders" element={<CustomerOrders />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

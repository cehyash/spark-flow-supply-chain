
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SupplierLogin from "./pages/auth/SupplierLogin";
import SupplierRegister from "./pages/auth/SupplierRegister";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSuppliers from "./pages/admin/Suppliers";
import AdminCustomers from "./pages/admin/Customers";

// Customer pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProducts from "./pages/customer/Products";
import CustomerCart from "./pages/customer/Cart";
import CustomerOrders from "./pages/customer/Orders";

// Supplier pages
import SupplierDashboard from "./pages/supplier/Dashboard";

// Checkout pages
import Checkout from "./pages/checkout/Checkout";
import Confirmation from "./pages/checkout/Confirmation";

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
          
          {/* Supplier auth routes */}
          <Route path="/supplier/login" element={<SupplierLogin />} />
          <Route path="/supplier/register" element={<SupplierRegister />} />
          
          {/* Checkout routes */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<MainLayout userRole="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>
          
          {/* Customer routes */}
          <Route path="/customer" element={<MainLayout userRole="customer" />}>
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="products" element={<CustomerProducts />} />
            <Route path="cart" element={<CustomerCart />} />
            <Route path="orders" element={<CustomerOrders />} />
          </Route>
          
          {/* Supplier routes */}
          <Route path="/supplier" element={<MainLayout userRole="supplier" />}>
            <Route path="dashboard" element={<SupplierDashboard />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

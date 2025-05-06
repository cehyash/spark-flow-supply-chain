
import { useEffect, useState } from "react";
import { ShoppingBag, Package, Users, CreditCard, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/admin/dashboard/stats-card";
import RecentOrders from "@/components/admin/dashboard/recent-orders";
import { useNavigate } from "react-router-dom";

// Default mock orders if localStorage is empty
const defaultMockOrders = [
  { 
    id: "ORD001", 
    customer: "John Smith", 
    date: "2025-05-02", 
    amount: "$152.00", 
    status: "delivered" as const 
  },
  { 
    id: "ORD002", 
    customer: "Sarah Johnson", 
    date: "2025-05-03", 
    amount: "$89.99", 
    status: "processing" as const 
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      
      // Convert to format expected by RecentOrders component
      const formattedOrders = parsedOrders.map(order => ({
        id: order.id,
        customer: order.customerName,
        date: new Date(order.date).toLocaleDateString(),
        amount: `$${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}`,
        status: order.status === "pending" ? "pending" :
               order.status === "processing" ? "processing" :
               order.status === "shipped" ? "dispatched" : 
               order.status === "completed" ? "delivered" : "pending"
      }));
      
      // Combine with default orders if needed, but prioritize recent real orders
      const combinedOrders = [...formattedOrders, ...defaultMockOrders].slice(0, 4);
      setRecentOrders(combinedOrders);
    } else {
      setRecentOrders(defaultMockOrders);
    }
  }, []);

  const handleViewOrder = (orderId: string) => {
    navigate(`/admin/orders?id=${orderId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={() => navigate("/admin/orders")}>
          View All Orders <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Sales"
          value="$12,345"
          icon={<CreditCard className="h-5 w-5 text-muted-foreground" />}
          description="Last 30 days: "
          change={{ value: "15%", positive: true }}
        />
        <StatsCard 
          title="Products"
          value="247"
          icon={<Package className="h-5 w-5 text-muted-foreground" />}
          description="18 added this month"
        />
        <StatsCard 
          title="Orders"
          value={`${recentOrders.length || 0}`}
          icon={<ShoppingBag className="h-5 w-5 text-muted-foreground" />}
          description="New today"
        />
        <StatsCard 
          title="Active Customers"
          value="528"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          description="↑ 12% this month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrders orders={recentOrders} onViewOrder={handleViewOrder} />

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Pending Tasks</h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Orders Awaiting Assignment</p>
                    <p className="text-sm text-muted-foreground">3 orders need supplier assignment</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate("/admin/orders?status=pending")}>
                  Assign
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">5 products below threshold</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate("/admin/products?filter=low-stock")}>
                  Review
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`border rounded-lg shadow-sm bg-card ${className || ""}`}>
      {children}
    </div>
  );
}

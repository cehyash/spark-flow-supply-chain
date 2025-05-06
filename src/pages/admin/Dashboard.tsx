
import { ShoppingBag, Package, Users, CreditCard, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/admin/dashboard/stats-card";
import RecentOrders from "@/components/admin/dashboard/recent-orders";
import { useNavigate } from "react-router-dom";

const mockOrders = [
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
  },
  { 
    id: "ORD003", 
    customer: "Michael Brown", 
    date: "2025-05-03", 
    amount: "$243.50", 
    status: "pending" as const 
  },
  { 
    id: "ORD004", 
    customer: "Emily Davis", 
    date: "2025-05-04", 
    amount: "$65.75", 
    status: "dispatched" as const 
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

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
          value="35"
          icon={<ShoppingBag className="h-5 w-5 text-muted-foreground" />}
          description="12 new today"
        />
        <StatsCard 
          title="Active Customers"
          value="528"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          description="↑ 12% this month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrders orders={mockOrders} onViewOrder={handleViewOrder} />

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

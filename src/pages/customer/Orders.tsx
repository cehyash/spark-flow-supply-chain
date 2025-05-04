
import { useState } from "react";
import OrderCard from "@/components/customer/order-card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for orders
const mockOrders = [
  {
    id: "1001",
    date: "May 3, 2025",
    status: "delivered" as const,
    total: 78.99,
    items: [
      { name: "Premium Copper Wire", quantity: 2, price: 24.99 },
      { name: "Circuit Breaker", quantity: 2, price: 12.99 },
      { name: "Wall Socket", quantity: 1, price: 3.02 },
    ],
  },
  {
    id: "1002",
    date: "May 4, 2025",
    status: "processing" as const,
    total: 45.00,
    items: [
      { name: "Insulated Screwdriver Set", quantity: 1, price: 45.00 },
    ],
  },
  {
    id: "1003",
    date: "April 28, 2025",
    status: "delivered" as const,
    total: 34.50,
    items: [
      { name: "LED Panel Light", quantity: 1, price: 34.50 },
    ],
  },
  {
    id: "1004",
    date: "April 15, 2025",
    status: "delivered" as const,
    total: 135.85,
    items: [
      { name: "Safety Helmet", quantity: 2, price: 19.95 },
      { name: "Premium Copper Wire", quantity: 3, price: 24.99 },
      { name: "Cable Conduit", quantity: 1, price: 15.75 },
    ],
  },
];

export default function CustomerOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => 
    statusFilter === "all" || order.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">View and track all your orders</p>
      </div>

      <div className="flex justify-end">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="dispatched">Dispatched</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No orders found with the selected status.</p>
        </div>
      )}
    </div>
  );
}


import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Package, Search, Trash, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-1234",
    customerName: "John Smith",
    date: "2025-05-01",
    total: 249.99,
    status: "completed",
    items: [
      { id: "1", name: "Premium Copper Wire", quantity: 2, price: 24.99 },
      { id: "2", name: "LED Panel Light", quantity: 3, price: 34.50 },
      { id: "5", name: "Insulated Screwdriver Set", quantity: 1, price: 45.00 },
    ]
  },
  {
    id: "ORD-1235",
    customerName: "Sarah Johnson",
    date: "2025-05-02",
    total: 412.94,
    status: "processing",
    items: [
      { id: "3", name: "Circuit Breaker", quantity: 5, price: 12.99 },
      { id: "4", name: "Safety Helmet", quantity: 2, price: 19.95 },
      { id: "5", name: "Insulated Screwdriver Set", quantity: 3, price: 45.00 },
      { id: "2", name: "LED Panel Light", quantity: 4, price: 34.50 },
    ]
  },
  {
    id: "ORD-1236",
    customerName: "Michael Brown",
    date: "2025-05-02",
    total: 104.85,
    status: "shipped",
    items: [
      { id: "1", name: "Premium Copper Wire", quantity: 3, price: 24.99 },
      { id: "4", name: "Safety Helmet", quantity: 1, price: 19.95 },
    ]
  },
  {
    id: "ORD-1237",
    customerName: "Emma Wilson",
    date: "2025-05-03",
    total: 138.00,
    status: "pending",
    items: [
      { id: "2", name: "LED Panel Light", quantity: 4, price: 34.50 },
    ]
  },
  {
    id: "ORD-1238",
    customerName: "David Clark",
    date: "2025-05-03",
    total: 349.75,
    status: "cancelled",
    items: [
      { id: "1", name: "Premium Copper Wire", quantity: 5, price: 24.99 },
      { id: "3", name: "Circuit Breaker", quantity: 8, price: 12.99 },
      { id: "5", name: "Insulated Screwdriver Set", quantity: 2, price: 45.00 },
    ]
  },
];

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  const handleViewOrder = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order updated",
      description: `Order ${id} status changed to ${newStatus}.`,
    });
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders by ID or customer name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={`capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "processing")}>
                          <Edit className="mr-2 h-4 w-4" />
                          Mark Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "shipped")}>
                          <Package className="mr-2 h-4 w-4" />
                          Mark Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "completed")}>
                          <Edit className="mr-2 h-4 w-4" />
                          Mark Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleUpdateStatus(order.id, "cancelled")}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Mark Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No orders found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={`capitalize ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">${selectedOrder.total.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 
                    selectedOrder.status === "completed" ? "processing" : "completed"
                  )}
                >
                  {selectedOrder.status === "completed" ? "Reopen Order" : "Mark as Completed"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

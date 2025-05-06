
import { useState, useEffect } from "react";
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
  DialogDescription,
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
import { Edit, MoreHorizontal, Package, Search, Trash, Eye, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderSupplierAssignment from "@/components/admin/orders/order-supplier-assignment";
import { useSearchParams } from "react-router-dom";

// Mock data for suppliers - normally would come from API
const mockSuppliers = [
  { id: "SUP-001", name: "ElectroPro Supplies" },
  { id: "SUP-002", name: "Voltage Masters Inc." },
  { id: "SUP-003", name: "Circuit Solutions" },
  { id: "SUP-004", name: "Illumina Lighting Co." },
  { id: "SUP-005", name: "SafetyFirst Equipment" },
];

// Default mock orders in case localStorage is empty
const defaultMockOrders = [
  {
    id: "ORD-1234",
    customerName: "John Smith",
    date: "2025-05-01",
    total: 249.99,
    status: "completed",
    supplierId: "SUP-001",
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
    supplierId: null,
    items: [
      { id: "3", name: "Circuit Breaker", quantity: 5, price: 12.99 },
      { id: "4", name: "Safety Helmet", quantity: 2, price: 19.95 },
      { id: "5", name: "Insulated Screwdriver Set", quantity: 3, price: 45.00 },
      { id: "2", name: "LED Panel Light", quantity: 4, price: 34.50 },
    ]
  }
];

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchParams] = useSearchParams();

  // Load orders from localStorage or use mock data
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      // Combine stored orders with mock orders
      const parsedOrders = JSON.parse(storedOrders);
      setOrders([...parsedOrders, ...defaultMockOrders]);
    } else {
      setOrders(defaultMockOrders);
    }
    
    // Check for order ID in URL query params
    const idParam = searchParams.get("id");
    if (idParam) {
      const allOrders = storedOrders 
        ? [...JSON.parse(storedOrders), ...defaultMockOrders] 
        : defaultMockOrders;
      
      const orderToView = allOrders.find(order => order.id === idParam);
      if (orderToView) {
        setSelectedOrder(orderToView);
        setIsDialogOpen(true);
      }
    }
  }, [searchParams]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (id, newStatus) => {
    // Update in state
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // Update in localStorage if it exists there
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      const updatedStoredOrders = parsedOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      );
      localStorage.setItem("orders", JSON.stringify(updatedStoredOrders));
    }
    
    toast({
      title: "Order updated",
      description: `Order ${id} status changed to ${newStatus}.`,
    });
    setIsDialogOpen(false);
  };

  const handleAssignSupplier = (order) => {
    setSelectedOrder(order);
    setIsSupplierDialogOpen(true);
  };

  const handleSupplierAssigned = (orderId, supplierId) => {
    // Update in state
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, supplierId } : order
    );
    setOrders(updatedOrders);
    
    // Update in localStorage if it exists there
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      const updatedStoredOrders = parsedOrders.map(order => 
        order.id === orderId ? { ...order, supplierId } : order
      );
      localStorage.setItem("orders", JSON.stringify(updatedStoredOrders));
    }
    
    // Show success toast
    const supplierName = supplierId 
      ? mockSuppliers.find(s => s.id === supplierId)?.name 
      : "No supplier";
    
    toast({
      title: "Supplier assigned",
      description: `${supplierName} has been assigned to order ${orderId}.`,
    });
    
    setIsSupplierDialogOpen(false);
  };

  const getStatusColor = (status) => {
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

  const getSupplierName = (supplierId) => {
    if (!supplierId) return "Not assigned";
    const supplier = mockSuppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : "Unknown supplier";
  };

  const filteredOrders = orders.filter(order =>
    order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
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
              <TableHead>Supplier</TableHead>
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
                  <TableCell>{getSupplierName(order.supplierId)}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleAssignSupplier(order)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Assign Supplier
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
                <TableCell colSpan={7} className="text-center py-6">
                  No orders found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
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
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Supplier</p>
                  <p>{getSupplierName(selectedOrder.supplierId)}</p>
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
                        <TableCell className="text-right font-bold">
                          ${typeof selectedOrder.total === 'number' ? selectedOrder.total.toFixed(2) : selectedOrder.total}
                        </TableCell>
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
      
      {/* Supplier Assignment Dialog */}
      <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Supplier</DialogTitle>
            <DialogDescription>
              Select a supplier to fulfill this order.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <OrderSupplierAssignment
              orderId={selectedOrder.id}
              currentSupplierId={selectedOrder.supplierId}
              suppliers={mockSuppliers}
              onAssign={handleSupplierAssigned}
              onCancel={() => setIsSupplierDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

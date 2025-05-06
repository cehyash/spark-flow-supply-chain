
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  items: OrderItem[];
  status: string;
  total: number;
  shippingAddress: ShippingAddress;
  isGuestOrder: boolean;
}

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  
  // Get the orderId from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  
  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }
    
    // In a real app, this would be an API call
    // For demo purposes, we'll get the order from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = savedOrders.find((o: Order) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate("/");
    }
  }, [orderId, navigate]);
  
  if (!order) {
    return <div className="container mx-auto py-8 px-4">Loading order details...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="text-center border-b pb-6">
          <div className="mx-auto rounded-full bg-green-100 p-3 mb-4 w-16 h-16 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Order Information</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Order ID:</span> #{order.id}</p>
                <p><span className="text-muted-foreground">Date:</span> {formatDate(order.date)}</p>
                <p><span className="text-muted-foreground">Customer:</span> {order.customerName}</p>
                <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
                <p>
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <Badge className="capitalize bg-yellow-500">{order.status}</Badge>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="text-sm space-y-1">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            className="w-full sm:w-auto" 
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
          {!order.isGuestOrder && (
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => navigate("/customer/orders")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Orders
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    status: "pending" | "processing" | "dispatched" | "delivered";
    total: number;
    items: OrderItem[];
  };
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "dispatched": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="font-medium">Order #{order.id}</h3>
          <p className="text-sm text-muted-foreground">{order.date}</p>
        </div>
        <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
          {order.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium">Order Summary</h4>
          <div className="text-sm">
            {order.items.slice(0, 2).map((item, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {order.items.length > 2 && (
              <div className="text-sm text-muted-foreground py-1">
                ...and {order.items.length - 2} more items
              </div>
            )}
            <div className="flex justify-between py-1 font-medium border-t mt-2 pt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => navigate(`/customer/orders/${order.id}`)}
        >
          View Order Details
        </Button>
      </CardContent>
    </Card>
  );
}

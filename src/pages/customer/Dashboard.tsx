
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/customer/order-card";
import { ArrowRight, Package, ShoppingBag, ShoppingCart } from "lucide-react";

const mockRecentOrders = [
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
];

const mockRecommendedProducts = [
  {
    id: "101",
    name: "LED Panel Light",
    imageUrl: "https://placehold.co/100x100?text=Light",
    price: 34.50,
  },
  {
    id: "102",
    name: "Safety Helmet",
    imageUrl: "https://placehold.co/100x100?text=Helmet",
    price: 19.95,
  },
  {
    id: "103",
    name: "Circuit Tester",
    imageUrl: "https://placehold.co/100x100?text=Tester",
    price: 15.75,
  },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState(mockRecentOrders);
  const [recommendedProducts, setRecommendedProducts] = useState(mockRecommendedProducts);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">Check your recent orders or browse products</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              My Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">Manage and track your orders</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/customer/orders")}
            >
              View Orders <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Browse Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">Explore our catalog of products</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/customer/products")}
            >
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">Continue with your current order</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/customer/cart")}
            >
              View Cart <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8">Recent Orders</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {recentOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended Products</h2>
          <Button variant="link" onClick={() => navigate("/customer/products")}>
            View all products <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="h-32 bg-muted">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=Product";
                  }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
                <Button 
                  className="w-full mt-2"
                  onClick={() => navigate(`/customer/products/${product.id}`)}
                >
                  View Product
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

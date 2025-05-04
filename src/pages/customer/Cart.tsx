
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CartItem from "@/components/customer/cart-item";

// Mock data for cart items
const initialCartItems = [
  {
    id: "cart-1",
    productId: "1",
    name: "Premium Copper Wire",
    price: 24.99,
    quantity: 2,
    imageUrl: "https://placehold.co/80x80?text=Wire",
  },
  {
    id: "cart-2",
    productId: "3",
    name: "Circuit Breaker",
    price: 12.99,
    quantity: 1,
    imageUrl: "https://placehold.co/80x80?text=Breaker",
  },
  {
    id: "cart-3",
    productId: "5",
    name: "Insulated Screwdriver Set",
    price: 45.00,
    quantity: 1,
    imageUrl: "https://placehold.co/80x80?text=Tools",
  },
];

export default function CustomerCart() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // In a real app, this would proceed to checkout flow
    toast({
      title: "Order placed successfully",
      description: "Your order has been submitted and is being processed.",
    });
    navigate("/customer/orders");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground">Review and manage your selected items</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          {cartItems.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => navigate("/customer/products")}>
                Browse Products
              </Button>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground pt-2">
                    Free shipping on orders over $100
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

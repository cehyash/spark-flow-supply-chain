
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard,
  Package,
  ShoppingBag,
  ArrowLeft
} from "lucide-react";
import CheckoutOrderSummary from "@/components/checkout/checkout-order-summary";
import { v4 as uuidv4 } from "@/lib/uuid";

// Generate a fake order ID
const generateOrderId = () => {
  return `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

// Import interfaces
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // This would normally come from a cart context or state
  // Simulating cart data for demo
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    createAccount: false,
    password: "",
  });

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateAccountChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, createAccount: checked }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the order to the backend
    const orderId = generateOrderId();
    
    // Add the order to localStorage for demonstration
    // In a real app, this would be sent to a server
    const order = {
      id: orderId,
      customerName: formData.createAccount 
        ? `${formData.firstName} ${formData.lastName}` 
        : "Guest Customer",
      email: formData.email,
      date: new Date().toISOString(),
      items: cartItems.map(item => ({
        id: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      status: "pending",
      total,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
      isGuestOrder: !formData.createAccount
    };
    
    // Store order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Show success message
    toast({
      title: "Order placed successfully!",
      description: `Your order #${orderId} has been placed and is being processed.`,
    });
    
    // Redirect to thank you page
    navigate(`/checkout/confirmation?orderId=${orderId}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shopping
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handlePlaceOrder}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="createAccount" 
                    checked={formData.createAccount}
                    onCheckedChange={handleCreateAccountChange}
                  />
                  <Label htmlFor="createAccount">Create an account for faster checkout</Label>
                </div>
                {formData.createAccount && (
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={formData.createAccount}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8 md:hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CheckoutOrderSummary 
                  items={cartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Place Order</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        
        <div className="hidden md:block">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CheckoutOrderSummary 
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </CardContent>
            <CardFooter>
              <Button 
                type="button" 
                className="w-full"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

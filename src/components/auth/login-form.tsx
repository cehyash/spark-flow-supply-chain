
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type UserRole = "admin" | "customer" | "supplier";

interface LoginFormProps {
  onRoleSelect?: (role: UserRole) => void;
  defaultRole?: UserRole;
}

export default function LoginForm({ onRoleSelect, defaultRole = "customer" }: LoginFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful login based on role
      if (role === "admin" && email === "admin@example.com" && password === "password") {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin/dashboard");
      } else if (role === "customer") {
        toast({
          title: "Customer login successful",
          description: "Welcome back to Master Electricals",
        });
        navigate("/customer/dashboard");
      } else if (role === "supplier") {
        // Get suppliers from localStorage
        const suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]");
        const supplier = suppliers.find((s: any) => s.email === email);
        
        if (supplier) {
          // Save current supplier in localStorage
          localStorage.setItem("currentSupplier", JSON.stringify(supplier));
          
          toast({
            title: "Supplier login successful",
            description: "Welcome to the supplier portal",
          });
          navigate("/supplier/dashboard");
        } else {
          throw new Error("Invalid supplier credentials");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-2 mb-6">
            <Button
              type="button"
              variant={role === "customer" ? "default" : "outline"}
              onClick={() => {
                setRole("customer");
                if (onRoleSelect) onRoleSelect("customer");
              }}
              className="w-full"
            >
              Customer
            </Button>
            <Button
              type="button"
              variant={role === "admin" ? "default" : "outline"}
              onClick={() => {
                setRole("admin");
                if (onRoleSelect) onRoleSelect("admin");
              }}
              className="w-full"
            >
              Admin
            </Button>
            <Button
              type="button"
              variant={role === "supplier" ? "default" : "outline"}
              onClick={() => {
                setRole("supplier");
                if (onRoleSelect) onRoleSelect("supplier");
              }}
              className="w-full"
            >
              Supplier
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground w-full text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        {role === "supplier" && (
          <p className="text-sm text-muted-foreground w-full text-center">
            Supplier?{" "}
            <Link to="/supplier/register" className="text-primary hover:underline">
              Register as a supplier
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

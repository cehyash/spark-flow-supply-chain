
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";

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
          <div className="grid grid-cols-2 gap-4 mb-6">
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
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
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
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

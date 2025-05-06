
import LoginForm from "@/components/auth/login-form";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Master Electricals</h1>
        <p className="text-muted-foreground">Premium electrical and construction materials</p>
      </div>
      <LoginForm />
      <div className="mt-8 text-sm text-muted-foreground max-w-md">
        <p className="mb-2">
          <strong>Demo credentials:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Admin: admin@example.com / password</li>
          <li>Customer: customer@example.com / password</li>
          <li>Supplier: Use credentials created during supplier registration</li>
        </ul>
      </div>
    </div>
  );
}

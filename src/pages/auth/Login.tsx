
import LoginForm from "@/components/auth/login-form";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Master Electricals</h1>
        <p className="text-muted-foreground">Premium electrical and construction materials</p>
      </div>
      <LoginForm />
      <p className="mt-8 text-sm text-muted-foreground">
        Demo credentials - Admin: admin@example.com / password | Customer: customer@example.com / password
      </p>
    </div>
  );
}

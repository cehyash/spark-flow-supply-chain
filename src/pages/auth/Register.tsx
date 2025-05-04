
import RegisterForm from "@/components/auth/register-form";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Master Electricals</h1>
        <p className="text-muted-foreground">Create your customer account</p>
      </div>
      <RegisterForm />
    </div>
  );
}

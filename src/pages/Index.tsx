
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/theme-toggle";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full border-b bg-card/80 backdrop-blur-sm z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-primary">Master Electricals</div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-16">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h1 className="text-5xl font-bold tracking-tight">
                  <span className="text-primary">Electrical</span> and <span className="text-primary">Construction</span> Materials
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your one-stop shop for high-quality electrical supplies and construction materials. Trusted by professionals and DIY enthusiasts.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => navigate("/register")}>Get Started</Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/customer/products")}>
                    Browse Products
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-muted">
                  <img 
                    src="https://placehold.co/600x400?text=Electrical+Supplies" 
                    alt="Electrical Supplies" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Master Electricals?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-muted-foreground">We source only the highest quality electrical and construction materials from trusted manufacturers.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">Our efficient logistics network ensures your orders are processed and dispatched promptly.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-muted-foreground">Our knowledgeable team is ready to assist you with any technical questions or product selections.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Product Categories</h2>
            <p className="text-muted-foreground text-center mb-12">Explore our wide range of electrical and construction materials</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {["Wires & Cables", "Switches & Sockets", "Lighting", "Tools", "Safety Equipment"].map((category, index) => (
                <div key={index} className="bg-card border rounded-lg overflow-hidden group cursor-pointer" onClick={() => navigate("/customer/products")}>
                  <div className="h-40 bg-muted">
                    <img 
                      src={`https://placehold.co/300x200?text=${category}`}
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-center">{category}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join Master Electricals today and experience the best in electrical and construction materials.</p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => navigate("/register")}
              >
                Create Account
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-2xl font-bold mb-4 text-primary">Master Electricals</div>
              <p className="text-muted-foreground">Premium electrical and construction materials</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Products</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Wires & Cables</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Switches & Sockets</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Lighting</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Tools</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Safety Equipment</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQs</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Shipping</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Returns</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Master Electricals & Contractors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

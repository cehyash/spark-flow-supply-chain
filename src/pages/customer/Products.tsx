
import { useState } from "react";
import ProductCard from "@/components/customer/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "Premium Copper Wire",
    description: "High-quality copper wire for electrical installations. Perfect for residential and commercial use with excellent conductivity.",
    price: 24.99,
    stock: 150,
    category: "wires",
    imageUrl: "https://placehold.co/300x200?text=Wire",
  },
  {
    id: "2",
    name: "LED Panel Light",
    description: "Energy-efficient LED panel for office lighting. Long-lasting with bright, even illumination.",
    price: 34.50,
    stock: 75,
    category: "lighting",
    imageUrl: "https://placehold.co/300x200?text=Light",
  },
  {
    id: "3",
    name: "Circuit Breaker",
    description: "Standard circuit breaker for residential use. Provides reliable protection for your electrical systems.",
    price: 12.99,
    stock: 200,
    category: "switches",
    imageUrl: "https://placehold.co/300x200?text=Breaker",
  },
  {
    id: "4",
    name: "Safety Helmet",
    description: "Hard hat for construction safety. Meets all industry standards for protection and comfort.",
    price: 19.95,
    stock: 50,
    category: "safety",
    imageUrl: "https://placehold.co/300x200?text=Helmet",
  },
  {
    id: "5",
    name: "Insulated Screwdriver Set",
    description: "Set of 8 insulated screwdrivers for electrical work. Professional quality with comfortable grips.",
    price: 45.00,
    stock: 30,
    category: "tools",
    imageUrl: "https://placehold.co/300x200?text=Tools",
  },
  {
    id: "6",
    name: "Cable Conduit",
    description: "Flexible cable conduit for organizing and protecting wires. Easy to install and durable.",
    price: 15.75,
    stock: 120,
    category: "wires",
    imageUrl: "https://placehold.co/300x200?text=Conduit",
  },
];

export default function CustomerProducts() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("name-asc");

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
    // In a real app, this would add the product to the cart, likely via an API call
  };

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "wires", name: "Wires & Cables" },
    { id: "switches", name: "Switches & Breakers" },
    { id: "lighting", name: "Lighting" },
    { id: "tools", name: "Tools" },
    { id: "safety", name: "Safety Equipment" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
        <p className="text-muted-foreground">Browse our electrical and construction materials</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-64 space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-2">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  className="justify-start w-full text-left"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={sortOption} 
              onValueChange={setSortOption}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

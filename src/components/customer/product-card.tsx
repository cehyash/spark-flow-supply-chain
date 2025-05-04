
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
  };
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product.id);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 bg-gray-100">
        <img
          src={product.imageUrl || "https://placehold.co/300x200?text=No+Image"}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=No+Image";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
        <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

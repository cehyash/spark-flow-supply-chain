
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface CartItemProps {
  item: {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <div className="h-20 w-20 mr-4 bg-gray-100">
        <img
          src={item.imageUrl || "https://placehold.co/80x80?text=No+Image"}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=No+Image";
          }}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20"
        />
        <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
  };
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call - in a real app, this would be a call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: `Product ${product ? "updated" : "created"} successfully`,
        description: `${name} has been ${product ? "updated" : "added"} to the catalog.`,
      });
      
      onSubmit();
    } catch (error) {
      toast({
        title: `Failed to ${product ? "update" : "create"} product`,
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wires">Wires</SelectItem>
                <SelectItem value="switches">Switches</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="safety">Safety Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {imageUrl && (
            <div className="mt-2">
              <img 
                src={imageUrl} 
                alt="Product preview" 
                className="h-32 w-32 object-cover rounded border" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/300x300?text=No+Image";
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

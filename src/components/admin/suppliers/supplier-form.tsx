
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface SupplierFormProps {
  supplier?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    categories: string[];
    notes: string;
  };
  onSubmit: (supplierData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    categories: string[];
    notes: string;
  }) => void;
  onCancel: () => void;
}

export default function SupplierForm({ supplier, onSubmit, onCancel }: SupplierFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState(supplier?.name || "");
  const [email, setEmail] = useState(supplier?.email || "");
  const [phone, setPhone] = useState(supplier?.phone || "");
  const [address, setAddress] = useState(supplier?.address || "");
  const [notes, setNotes] = useState(supplier?.notes || "");
  const [categories, setCategories] = useState<string[]>(supplier?.categories || []);
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = [
    { id: "wires", label: "Wires" },
    { id: "switches", label: "Switches" },
    { id: "lighting", label: "Lighting" },
    { id: "tools", label: "Tools" },
    { id: "safety", label: "Safety Equipment" },
  ];

  const toggleCategory = (category: string) => {
    setCategories(current =>
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call - in a real app, this would be a call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create the supplier data object
      const supplierData = {
        id: supplier?.id || `supplier-${Date.now()}`, // Generate a unique ID for new suppliers
        name,
        email,
        phone,
        address,
        categories,
        notes
      };
      
      toast({
        title: `Supplier ${supplier ? "updated" : "created"} successfully`,
        description: `${name} has been ${supplier ? "updated in" : "added to"} your suppliers list.`,
      });
      
      onSubmit(supplierData);
    } catch (error) {
      toast({
        title: `Failed to ${supplier ? "update" : "create"} supplier`,
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
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Categories Supplied</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            {allCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={categories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional information about this supplier"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : supplier ? "Update Supplier" : "Create Supplier"}
        </Button>
      </div>
    </form>
  );
}

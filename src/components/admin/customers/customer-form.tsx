
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface CustomerFormProps {
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    registrationDate: string;
    tags: string[];
    orders: number;
    totalSpent: number;
  };
  onSubmit: (customerData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    registrationDate: string;
    tags: string[];
    orders: number;
    totalSpent: number;
  }) => void;
  onCancel: () => void;
}

export default function CustomerForm({ customer, onSubmit, onCancel }: CustomerFormProps) {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState(customer?.firstName || "");
  const [lastName, setLastName] = useState(customer?.lastName || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [address, setAddress] = useState(customer?.address || "");
  const [tags, setTags] = useState<string[]>(customer?.tags || []);
  const [isLoading, setIsLoading] = useState(false);
  
  // Current date in YYYY-MM-DD format for new customers
  const today = new Date().toISOString().split('T')[0];

  const availableTags = [
    { id: "new", label: "New Customer" },
    { id: "frequent", label: "Frequent Buyer" },
    { id: "corporate", label: "Corporate" },
    { id: "wholesale", label: "Wholesale" },
    { id: "vip", label: "VIP" },
  ];

  const toggleTag = (tag: string) => {
    setTags(current =>
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call - in a real app, this would be a call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create the customer data object
      const customerData = {
        id: customer?.id || `customer-${Date.now()}`,
        firstName,
        lastName,
        email,
        phone,
        address,
        registrationDate: customer?.registrationDate || today,
        tags,
        orders: customer?.orders || 0,
        totalSpent: customer?.totalSpent || 0
      };
      
      toast({
        title: `Customer ${customer ? "updated" : "created"} successfully`,
        description: `${firstName} ${lastName} has been ${customer ? "updated in" : "added to"} your customers list.`,
      });
      
      onSubmit(customerData);
    } catch (error) {
      toast({
        title: `Failed to ${customer ? "update" : "create"} customer`,
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
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Customer Tags</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            {availableTags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag.id}`}
                  checked={tags.includes(tag.id)}
                  onCheckedChange={() => toggleTag(tag.id)}
                />
                <label
                  htmlFor={`tag-${tag.id}`}
                  className="text-sm cursor-pointer"
                >
                  {tag.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : customer ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </form>
  );
}

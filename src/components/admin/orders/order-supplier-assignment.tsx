
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Supplier {
  id: string;
  name: string;
}

interface OrderSupplierAssignmentProps {
  orderId: string;
  currentSupplierId: string | null;
  suppliers: Supplier[];
  onAssign: (orderId: string, supplierId: string | null) => void;
  onCancel: () => void;
}

export default function OrderSupplierAssignment({
  orderId,
  currentSupplierId,
  suppliers,
  onAssign,
  onCancel,
}: OrderSupplierAssignmentProps) {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(
    currentSupplierId || null
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="order-id">Order ID</Label>
          <div id="order-id" className="text-sm text-gray-700 font-medium">
            {orderId}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Select Supplier</Label>
          <Select
            value={selectedSupplierId || "none"}
            onValueChange={(value) => setSelectedSupplierId(value === "none" ? null : value)}
          >
            <SelectTrigger id="supplier">
              <SelectValue placeholder="Select a supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={() => onAssign(orderId, selectedSupplierId)}
        >
          Assign Supplier
        </Button>
      </div>
    </div>
  );
}


import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import SupplierForm from "@/components/admin/suppliers/supplier-form";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Type for supplier
interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  notes: string;
}

// Mock data for suppliers
const mockSuppliers = [
  {
    id: "1",
    name: "ElectroSupply Co.",
    email: "contact@electrosupply.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, USA",
    categories: ["wires", "switches"],
    notes: "Reliable supplier for copper wiring and switches",
  },
  {
    id: "2",
    name: "LightingMasters Inc.",
    email: "sales@lightingmasters.com",
    phone: "555-987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    categories: ["lighting"],
    notes: "Specializes in LED and energy-efficient lighting solutions",
  },
  {
    id: "3",
    name: "Construction Tools LLC",
    email: "info@constructiontools.com",
    phone: "555-456-7890",
    address: "789 Pine Rd, Elsewhere, USA",
    categories: ["tools", "safety"],
    notes: "Full range of professional-grade tools and safety equipment",
  },
];

export default function AdminSuppliers() {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const handleCreateSupplier = () => {
    setEditingSupplier(null);
    setIsDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsDialogOpen(true);
  };

  const handleDeleteSupplier = (id: string) => {
    // In a real app, this would be an API call
    setSuppliers(suppliers.filter(s => s.id !== id));
    toast({
      title: "Supplier deleted",
      description: "The supplier has been removed from your list.",
    });
  };

  const handleFormSubmit = (supplierData: Supplier) => {
    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(currentSuppliers => 
        currentSuppliers.map(s => 
          s.id === supplierData.id ? supplierData : s
        )
      );
    } else {
      // Add new supplier
      setSuppliers(currentSuppliers => [...currentSuppliers, supplierData]);
    }
    
    setIsDialogOpen(false);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
        <Button onClick={handleCreateSupplier}>
          <Plus className="mr-2 h-4 w-4" /> Add Supplier
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">{supplier.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{supplier.email}</p>
                      <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.categories.map(category => (
                        <Badge key={category} variant="outline" className="capitalize">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {supplier.notes}
                    </p>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No suppliers found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
          </DialogHeader>
          <SupplierForm 
            supplier={editingSupplier || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

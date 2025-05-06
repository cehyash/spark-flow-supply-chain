
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Plus, Search, Trash, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomerForm from "@/components/admin/customers/customer-form";

// Customer type definition
interface Customer {
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
}

// Type for registered customer from localStorage
interface RegisteredCustomer {
  id?: string;
  name: string;
  email: string;
}

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: "c1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Cityville, USA",
    registrationDate: "2023-11-15",
    tags: ["frequent", "corporate"],
    orders: 12,
    totalSpent: 2450.75,
  },
  {
    id: "c2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    address: "456 Oak Ave, Townsville, USA",
    registrationDate: "2024-01-22",
    tags: ["new"],
    orders: 3,
    totalSpent: 450.25,
  },
  {
    id: "c3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.j@example.com",
    phone: "555-456-7890",
    address: "789 Pine Rd, Villagetown, USA",
    registrationDate: "2023-08-05",
    tags: ["frequent", "wholesale"],
    orders: 24,
    totalSpent: 5670.50,
  },
];

export default function AdminCustomers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Load customers from both mock data and localStorage
  useEffect(() => {
    // Get registered customers from localStorage
    const storedCustomers = localStorage.getItem("customers");
    let registeredCustomers: RegisteredCustomer[] = [];
    
    if (storedCustomers) {
      try {
        registeredCustomers = JSON.parse(storedCustomers);
      } catch (error) {
        console.error("Error parsing customers from localStorage:", error);
      }
    }

    // Get orders to check if customers have placed any
    const storedOrders = localStorage.getItem("orders");
    let orders: any[] = [];
    if (storedOrders) {
      try {
        orders = JSON.parse(storedOrders);
      } catch (error) {
        console.error("Error parsing orders from localStorage:", error);
      }
    }

    // Convert registered customers to the format needed for the table
    const formattedRegisteredCustomers: Customer[] = registeredCustomers.map(customer => {
      // Get customer name parts
      const nameParts = customer.name?.split(" ") || ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      
      // Get customer orders
      const customerOrders = orders.filter(order => order.customerEmail === customer.email);
      const orderCount = customerOrders.length;
      const totalSpent = customerOrders.reduce((total, order) => total + parseFloat(order.total || 0), 0);
      
      return {
        id: customer.id || `customer-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        firstName,
        lastName,
        email: customer.email || "",
        phone: "",  // Default empty phone
        address: "", // Default empty address
        registrationDate: new Date().toISOString().split("T")[0], // Today's date
        tags: ["new"], // Default tag for new customers
        orders: orderCount,
        totalSpent: totalSpent,
      };
    });

    // Combine mock customers with registered customers
    setCustomers([...formattedRegisteredCustomers, ...mockCustomers]);
  }, []);

  const handleCreateCustomer = () => {
    setEditingCustomer(null);
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    // Check if it's a registered customer from localStorage
    const storedCustomers = localStorage.getItem("customers");
    
    if (storedCustomers) {
      const parsedCustomers = JSON.parse(storedCustomers);
      const isRegisteredCustomer = parsedCustomers.some((c: RegisteredCustomer) => c.id === id);
      
      if (isRegisteredCustomer) {
        // Remove from localStorage
        const updatedCustomers = parsedCustomers.filter((c: RegisteredCustomer) => c.id !== id);
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      }
    }
    
    // Remove from state
    setCustomers(customers.filter(c => c.id !== id));
    
    toast({
      title: "Customer deleted",
      description: "The customer has been removed from your list.",
    });
  };

  const handleFormSubmit = (customerData: Customer) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(currentCustomers => 
        currentCustomers.map(c => 
          c.id === customerData.id ? customerData : c
        )
      );
    } else {
      // Add new customer
      setCustomers(currentCustomers => [...currentCustomers, customerData]);
    }
    
    setIsDialogOpen(false);
  };

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button onClick={handleCreateCustomer}>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers by name, email, or phone..."
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
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Info</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{`${customer.firstName} ${customer.lastName}`}</p>
                      <p className="text-sm text-muted-foreground">Since {formatDate(customer.registrationDate)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {customer.address}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.orders}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteCustomer(customer.id)}
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
                <TableCell colSpan={7} className="text-center py-6">
                  No customers found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          </DialogHeader>
          <CustomerForm 
            customer={editingCustomer || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

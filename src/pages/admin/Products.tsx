
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
import ProductForm from "@/components/admin/products/product-form";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Package, Plus, Search, Trash } from "lucide-react";
import { useToast } from "@/components/ui/toast";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "Premium Copper Wire",
    description: "High-quality copper wire for electrical installations",
    price: 24.99,
    stock: 150,
    category: "wires",
    imageUrl: "https://placehold.co/100x100?text=Wire",
  },
  {
    id: "2",
    name: "LED Panel Light",
    description: "Energy-efficient LED panel for office lighting",
    price: 34.50,
    stock: 75,
    category: "lighting",
    imageUrl: "https://placehold.co/100x100?text=Light",
  },
  {
    id: "3",
    name: "Circuit Breaker",
    description: "Standard circuit breaker for residential use",
    price: 12.99,
    stock: 200,
    category: "switches",
    imageUrl: "https://placehold.co/100x100?text=Breaker",
  },
  {
    id: "4",
    name: "Safety Helmet",
    description: "Hard hat for construction safety",
    price: 19.95,
    stock: 50,
    category: "safety",
    imageUrl: "https://placehold.co/100x100?text=Helmet",
  },
  {
    id: "5",
    name: "Insulated Screwdriver Set",
    description: "Set of 8 insulated screwdrivers for electrical work",
    price: 45.00,
    stock: 30,
    category: "tools",
    imageUrl: "https://placehold.co/100x100?text=Tools",
  },
];

export default function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: typeof mockProducts[0]) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    // In a real app, this would be an API call
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your catalog.",
    });
  };

  const handleFormSubmit = () => {
    // In a real app, this would update the data from the API
    setIsDialogOpen(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Button onClick={handleCreateProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Product";
                          }}
                        />
                      ) : (
                        <Package className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={product.stock < 10 ? "text-red-500 font-medium" : ""}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteProduct(product.id)}
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
                <TableCell colSpan={6} className="text-center py-6">
                  No products found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <ProductForm 
            product={editingProduct || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

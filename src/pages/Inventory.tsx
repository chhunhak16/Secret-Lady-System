import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, AlertTriangle, Edit, Trash2 } from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Add product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    qty: "",
    minStock: "",
    note: "",
  });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Products state
  const [products, setProducts] = useState([]);

  // Fetch products from backend API
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => setError("Failed to fetch products: " + err.message));
  }, []);

  // Filtered products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add product handler using backend API
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { name, qty, minStock, note } = newProduct;
    if (!name || !qty || !minStock) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, qty: Number(qty), minStock: Number(minStock), note })
      });
      const data = await response.json();
      if (response.ok) {
        setNewProduct({ name: "", qty: "", minStock: "", note: "" });
        setAdding(false);
        setSuccess("Product added successfully!");
        // Refresh product list
        fetch('http://localhost:4000/products')
          .then(res => res.json())
          .then(data => setProducts(data));
      } else {
        setError(data.error || "Failed to add product.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your product stock levels
          </p>
        </div>
        {!adding ? (
          <Button onClick={() => setAdding(true)} className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        ) : null}
      </div>

      {/* Add Product Form */}
      {adding && (
        <form onSubmit={handleAddProduct} className="space-y-2 mb-4 bg-muted p-4 rounded">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              required
              className="border p-2 rounded w-full md:w-1/4"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.qty}
              onChange={e => setNewProduct({ ...newProduct, qty: e.target.value })}
              required
              className="border p-2 rounded w-full md:w-1/4"
            />
            <input
              type="number"
              placeholder="Minimum Stock"
              value={newProduct.minStock}
              onChange={e => setNewProduct({ ...newProduct, minStock: e.target.value })}
              required
              className="border p-2 rounded w-full md:w-1/4"
            />
            <input
              type="text"
              placeholder="Note"
              value={newProduct.note}
              onChange={e => setNewProduct({ ...newProduct, note: e.target.value })}
              className="border p-2 rounded w-full md:w-1/4"
            />
          </div>
          <div className="flex space-x-2 mt-2">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add</button>
            <button type="button" onClick={() => { setAdding(false); setError(""); }} className="bg-muted-foreground text-white px-4 py-2 rounded">Cancel</button>
          </div>
          {error && <div className="text-destructive mt-2">{error}</div>}
          {success && <div className="text-green-600 mt-2">{success}</div>}
        </form>
      )}

      {/* Summary Cards */}
      {/* You can add your own summary logic here */}

      {/* Search and Filter */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Inventory</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="default">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Minimum Stock</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.qty}</TableCell>
                    <TableCell>{product.minStock}</TableCell>
                    <TableCell>{product.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye, Edit, Trash2, Calendar, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const StockReceive = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    supplierId: "",
    productId: "",
    qty: "",
    receivingDate: "",
    note: "",
  });

  const [receives, setReceives] = useState([]);
  useEffect(() => {
    const fetchReceives = async () => {
      const { data, error } = await supabase.from('stock_receive').select('*');
      if (!error) setReceives(data || []);
    };
    fetchReceives();
  }, []);

  const filteredReceives = receives.filter(receive =>
    (receive.supplierName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (receive.productName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (receive.id || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.supplierId || !formData.productId || !formData.qty || !formData.receivingDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Stock receive record created successfully",
    });
    
    setFormData({ supplierId: "", productId: "", qty: "", receivingDate: "", note: "" });
    setShowForm(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received":
        return <Badge className="bg-success text-success-foreground">Received</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "partial":
        return <Badge className="bg-warning text-warning-foreground">Partial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Receive</h1>
          <p className="text-muted-foreground mt-1">
            Record incoming stock from suppliers
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary-hover"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Receipt
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Package className="w-8 h-8 text-primary mr-3" />
              <div className="text-2xl font-bold text-foreground">0</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              0
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              0
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              0
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Receive Form */}
      {showForm && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Record Stock Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select 
                  value={formData.supplierId} 
                  onValueChange={(value) => setFormData(prev => ({...prev, supplierId: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="placeholder" value="" disabled>
                      Select a supplier
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product *</Label>
                <Select 
                  value={formData.productId} 
                  onValueChange={(value) => setFormData(prev => ({...prev, productId: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="placeholder" value="" disabled>
                      Select a product
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qty">Quantity Received *</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.qty}
                  onChange={(e) => setFormData(prev => ({...prev, qty: e.target.value}))}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receivingDate">Receiving Date *</Label>
                <Input
                  type="date"
                  value={formData.receivingDate}
                  onChange={(e) => setFormData(prev => ({...prev, receivingDate: e.target.value}))}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  placeholder="Add any notes about this receipt..."
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({...prev, note: e.target.value}))}
                  rows={3}
                />
              </div>

              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit" className="bg-primary hover:bg-primary-hover">
                  Record Receipt
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Receive List */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Receiving History</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search receipts..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Receiving Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceives.map((receive) => (
                <TableRow key={receive.id}>
                  <TableCell className="font-medium">{receive.id}</TableCell>
                  <TableCell>{receive.supplierName}</TableCell>
                  <TableCell>{receive.productName}</TableCell>
                  <TableCell>{receive.qty}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {receive.receivingDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(receive.status)}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {receive.note}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
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

export default StockReceive;
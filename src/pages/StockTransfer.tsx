import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Search, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StockTransfer = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    receiverId: "",
    productId: "",
    qty: "",
    receiveDate: "",
  });

  // Mock data
  const receivers = [
    { id: "REC001", name: "Downtown Store" },
    { id: "REC002", name: "Mall Branch" },
    { id: "REC003", name: "Airport Outlet" },
  ];

  const products = [
    { id: "PRD001", name: "Product A", availableQty: 150 },
    { id: "PRD002", name: "Product B", availableQty: 75 },
    { id: "PRD003", name: "Product C", availableQty: 200 },
  ];

  const transfers = [
    {
      id: "ST001",
      receiverName: "Downtown Store",
      productName: "Product A",
      qty: 50,
      receiveDate: "2024-01-15",
      status: "completed",
      createdDate: "2024-01-10"
    },
    {
      id: "ST002", 
      receiverName: "Mall Branch",
      productName: "Product B",
      qty: 25,
      receiveDate: "2024-01-20",
      status: "pending",
      createdDate: "2024-01-12"
    },
    {
      id: "ST003",
      receiverName: "Airport Outlet", 
      productName: "Product C",
      qty: 75,
      receiveDate: "2024-01-18",
      status: "completed",
      createdDate: "2024-01-14"
    },
  ];

  const filteredTransfers = transfers.filter(transfer =>
    transfer.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.receiverId || !formData.productId || !formData.qty || !formData.receiveDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Stock transfer created successfully",
    });
    
    setFormData({ receiverId: "", productId: "", qty: "", receiveDate: "" });
    setShowForm(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Transfer</h1>
          <p className="text-muted-foreground mt-1">
            Transfer stock to receivers and track deliveries
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary-hover"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Transfer
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Transfers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{transfers.length}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {transfers.filter(t => t.status === "completed").length}
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
              {transfers.filter(t => t.status === "pending").length}
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
              {transfers.reduce((sum, t) => sum + t.qty, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Transfer Form */}
      {showForm && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Create New Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="receiver">Receiver *</Label>
                <Select 
                  value={formData.receiverId} 
                  onValueChange={(value) => setFormData(prev => ({...prev, receiverId: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select receiver" />
                  </SelectTrigger>
                  <SelectContent>
                    {receivers.map((receiver) => (
                      <SelectItem key={receiver.id} value={receiver.id}>
                        {receiver.name}
                      </SelectItem>
                    ))}
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
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (Available: {product.availableQty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qty">Quantity *</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.qty}
                  onChange={(e) => setFormData(prev => ({...prev, qty: e.target.value}))}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiveDate">Expected Receive Date *</Label>
                <Input
                  type="date"
                  value={formData.receiveDate}
                  onChange={(e) => setFormData(prev => ({...prev, receiveDate: e.target.value}))}
                />
              </div>

              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit" className="bg-primary hover:bg-primary-hover">
                  Create Transfer
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Transfer List */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transfer History</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transfers..."
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
                  <TableHead>Transfer ID</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.id}</TableCell>
                    <TableCell>{transfer.receiverName}</TableCell>
                    <TableCell>{transfer.productName}</TableCell>
                    <TableCell>{transfer.qty}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        {new Date(transfer.receiveDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transfer.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(transfer.createdDate).toLocaleDateString()}
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

export default StockTransfer;
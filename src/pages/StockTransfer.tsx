import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabaseClient";

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

  const [transfers, setTransfers] = useState([]);
  useEffect(() => {
    const fetchTransfers = async () => {
      const { data, error } = await supabase.from('stock_transfer').select('*');
      if (!error) setTransfers(data || []);
    };
    fetchTransfers();
  }, []);

  const filteredTransfers = transfers.filter(transfer =>
    (transfer.receiverName || transfer.to_location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transfer.productName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transfer.id || "").toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="text-2xl font-bold text-foreground">0</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">0</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">0</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
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
                    {/* REMOVED: receivers.map((receiver) => ( */}
                    <SelectItem key="REC001" value="REC001">Downtown Store</SelectItem>
                    <SelectItem key="REC002" value="REC002">Mall Branch</SelectItem>
                    <SelectItem key="REC003" value="REC003">Airport Outlet</SelectItem>
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
                    {/* REMOVED: products.map((product) => ( */}
                    <SelectItem key="PRD001" value="PRD001">Product A (Available: 150)</SelectItem>
                    <SelectItem key="PRD002" value="PRD002">Product B (Available: 75)</SelectItem>
                    <SelectItem key="PRD003" value="PRD003">Product C (Available: 200)</SelectItem>
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
                    <TableCell>{transfer.receiverName || transfer.to_location}</TableCell>
                    <TableCell>{transfer.productName}</TableCell>
                    <TableCell>{transfer.qty}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        {new Date(transfer.expected_receive_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transfer.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(transfer.created_at).toLocaleDateString()}
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
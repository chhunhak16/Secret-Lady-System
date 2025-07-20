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
import { Search, Filter, AlertTriangle, MapPin, Calendar, Package, TrendingDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const ReceiverStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [receiverStocks, setReceiverStocks] = useState([]);
  
  useEffect(() => {
    const fetchReceiverStocks = async () => {
      const { data, error } = await supabase.from('receiver_stock').select('*');
      if (!error) setReceiverStocks(data || []);
    };
    fetchReceiverStocks();
  }, []);

  const filteredStocks = receiverStocks.filter(stock =>
    (stock.receiverName || stock.receiver_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (stock.productName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (stock.location || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReceivers = 0; // Placeholder, will be updated with actual data
  const totalProducts = 0; // Placeholder, will be updated with actual data
  const alertCount = 0; // Placeholder, will be updated with actual data
  const totalQuantity = 0; // Placeholder, will be updated with actual data

  const getStockStatus = (stock: any) => {
    if (stock.alert) {
      return (
        <Badge variant="destructive" className="flex items-center w-fit">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Low Stock
        </Badge>
      );
    } else if (stock.qty < stock.minimumStock * 1.5) {
      return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
    } else {
      return <Badge className="bg-success text-success-foreground">Good</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Receiver Stock</h1>
          <p className="text-muted-foreground mt-1">
            Monitor stock levels at receiver locations
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Package className="w-4 h-4 mr-2" />
          Stock Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Receivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-primary mr-3" />
              <div className="text-2xl font-bold text-foreground">{totalReceivers}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalProducts}</div>
            <p className="text-sm text-muted-foreground">Tracked items</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-destructive mr-3" />
              <div className="text-2xl font-bold text-destructive">{alertCount}</div>
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
            <div className="text-2xl font-bold text-foreground">{totalQuantity}</div>
            <p className="text-sm text-muted-foreground">Units available</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts Summary */}
      {alertCount > 0 && (
        <Card className="shadow-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Critical Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* REMOVED: receiverStocks.filter(s => s.alert).map((stock, index) => ( */}
                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Product Name</h4>
                      <p className="text-sm text-muted-foreground">Receiver Name</p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                        <span className="text-sm text-destructive font-medium">
                          Quantity / Minimum Stock
                        </span>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                </div>
              {/* REMOVED: ))} */}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stock Tracking Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Receiver Stock Tracking</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
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
                  <TableHead>Receiver</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Minimum Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Receiving Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-medium">{stock.receiverName || stock.receiver_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        {stock.location}
                      </div>
                    </TableCell>
                    <TableCell>{stock.productName}</TableCell>
                    <TableCell>
                      <span className="text-destructive font-semibold">
                        {stock.qty}
                      </span>
                    </TableCell>
                    <TableCell>{stock.minimumStock}</TableCell>
                    <TableCell>{getStockStatus(stock)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {stock.lastUpdated}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {stock.receivingDate}
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

export default ReceiverStock;
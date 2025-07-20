import { useState } from "react";
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

const ReceiverStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data
  const receiverStocks = [
    {
      id: "RS001",
      receiverName: "Downtown Store",
      location: "Downtown District",
      productName: "Product A",
      qty: 45,
      minimumStock: 20,
      alert: false,
      lastUpdated: "2024-01-20",
      receivingDate: "2024-01-15"
    },
    {
      id: "RS002", 
      receiverName: "Mall Branch",
      location: "Shopping Mall",
      productName: "Product B",
      qty: 8,
      minimumStock: 15,
      alert: true,
      lastUpdated: "2024-01-20",
      receivingDate: "2024-01-18"
    },
    {
      id: "RS003",
      receiverName: "Airport Outlet", 
      location: "Airport Terminal",
      productName: "Product C",
      qty: 32,
      minimumStock: 10,
      alert: false,
      lastUpdated: "2024-01-19",
      receivingDate: "2024-01-16"
    },
    {
      id: "RS004",
      receiverName: "Downtown Store",
      location: "Downtown District", 
      productName: "Product D",
      qty: 3,
      minimumStock: 12,
      alert: true,
      lastUpdated: "2024-01-20",
      receivingDate: "2024-01-17"
    },
    {
      id: "RS005",
      receiverName: "Mall Branch",
      location: "Shopping Mall",
      productName: "Product E",
      qty: 25,
      minimumStock: 8,
      alert: false,
      lastUpdated: "2024-01-19",
      receivingDate: "2024-01-19"
    }
  ];

  const filteredStocks = receiverStocks.filter(stock =>
    stock.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReceivers = [...new Set(receiverStocks.map(s => s.receiverName))].length;
  const totalProducts = receiverStocks.length;
  const alertCount = receiverStocks.filter(s => s.alert).length;
  const totalQuantity = receiverStocks.reduce((sum, s) => sum + s.qty, 0);

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
              {receiverStocks.filter(s => s.alert).map((stock, index) => (
                <div key={index} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{stock.productName}</h4>
                      <p className="text-sm text-muted-foreground">{stock.receiverName}</p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                        <span className="text-sm text-destructive font-medium">
                          {stock.qty} / {stock.minimumStock} minimum
                        </span>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                </div>
              ))}
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
                    <TableCell className="font-medium">{stock.receiverName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        {stock.location}
                      </div>
                    </TableCell>
                    <TableCell>{stock.productName}</TableCell>
                    <TableCell>
                      <span className={stock.alert ? "text-destructive font-semibold" : ""}>
                        {stock.qty}
                      </span>
                    </TableCell>
                    <TableCell>{stock.minimumStock}</TableCell>
                    <TableCell>{getStockStatus(stock)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(stock.lastUpdated).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(stock.receivingDate).toLocaleDateString()}
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
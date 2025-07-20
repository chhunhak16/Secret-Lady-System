import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StockReceive = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stock Receive</h1>
        <p className="text-muted-foreground mt-1">
          Record incoming stock from suppliers
        </p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Stock Receiving Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Stock receiving functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockReceive;
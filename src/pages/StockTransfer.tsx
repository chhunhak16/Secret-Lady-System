import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StockTransfer = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stock Transfer</h1>
        <p className="text-muted-foreground mt-1">
          Transfer stock to receivers and track deliveries
        </p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Stock Transfer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Stock transfer functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockTransfer;
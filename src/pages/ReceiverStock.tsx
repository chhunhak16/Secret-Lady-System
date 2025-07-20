import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReceiverStock = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Receiver Stock</h1>
        <p className="text-muted-foreground mt-1">
          Monitor stock levels at receiver locations
        </p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Receiver Stock Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Receiver stock tracking functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiverStock;
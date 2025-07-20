import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Report = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Generate comprehensive stock and activity reports
        </p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Report generation functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
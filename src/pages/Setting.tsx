import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Setting = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          System configuration and user management
        </p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  ArrowRightLeft,
  PackageCheck,
  Plus
} from "lucide-react";

const Dashboard = () => {
  // Remove stats, alerts, recentActivities arrays and any code that uses them

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your stock management system
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Quick Action
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* The original code had a loop for stats here, but the stats array was removed.
            This loop will now be empty or will cause an error if the data is not re-added.
            Assuming the intent was to remove the stats data, but keep the structure.
            Since the stats array is gone, this loop will be empty. */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Alerts */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* The original code had a loop for alerts here, but the alerts array was removed.
                  This loop will now be empty or will cause an error if the data is not re-added.
                  Assuming the intent was to remove the alerts data, but keep the structure.
                  Since the alerts array is gone, this loop will be empty. */}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* The original code had a loop for recentActivities here, but the recentActivities array was removed.
                  This loop will now be empty or will cause an error if the data is not re-added.
                  Assuming the intent was to remove the recentActivities data, but keep the structure.
                  Since the recentActivities array is gone, this loop will be empty. */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
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
  const stats = [
    {
      title: "Total Products",
      value: "1,248",
      change: "+12%",
      trend: "up",
      icon: Package
    },
    {
      title: "Low Stock Alerts",
      value: "23",
      change: "+5",
      trend: "warning",
      icon: AlertTriangle
    },
    {
      title: "Recent Transfers",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: ArrowRightLeft
    },
    {
      title: "Recent Receives",
      value: "89",
      change: "-3%",
      trend: "down",
      icon: PackageCheck
    }
  ];

  const alerts = [
    { product: "Product A", currentStock: 5, minStock: 10, severity: "high" },
    { product: "Product B", currentStock: 8, minStock: 15, severity: "medium" },
    { product: "Product C", currentStock: 2, minStock: 5, severity: "high" },
    { product: "Product D", currentStock: 12, minStock: 20, severity: "low" },
  ];

  const recentActivities = [
    { action: "Stock received", product: "Product X", quantity: 100, user: "John Doe", time: "2 hours ago" },
    { action: "Stock transferred", product: "Product Y", quantity: 50, user: "Jane Smith", time: "4 hours ago" },
    { action: "New product added", product: "Product Z", quantity: 200, user: "Admin", time: "6 hours ago" },
    { action: "Stock received", product: "Product W", quantity: 75, user: "Bob Wilson", time: "1 day ago" },
  ];

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
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${
                  stat.trend === 'warning' ? 'bg-warning/10' : 
                  stat.trend === 'up' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    stat.trend === 'warning' ? 'text-warning' : 
                    stat.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-success mr-1" />}
                  {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-destructive mr-1" />}
                  <span className={`text-sm ${
                    stat.trend === 'warning' ? 'text-warning' :
                    stat.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{alert.product}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {alert.currentStock} | Min: {alert.minStock}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      alert.severity === 'high' ? 'destructive' : 
                      alert.severity === 'medium' ? 'default' : 'secondary'
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
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
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.product} - {activity.quantity} units by {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
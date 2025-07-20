import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to dashboard after a brief delay to show the landing
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track and manage product stock levels with alerts"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor stock movements and generate comprehensive reports"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your stock data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Main Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Secret Lady
          </h1>
          <h2 className="text-2xl text-primary font-semibold mb-4">
            Stock Management System
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your inventory management with our comprehensive stock tracking,
            transfer management, and real-time alerts system.
          </p>
          
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-hover text-lg px-8 py-3"
            onClick={() => navigate('/dashboard')}
          >
            Enter Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Auto-redirect notice */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Redirecting to dashboard in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

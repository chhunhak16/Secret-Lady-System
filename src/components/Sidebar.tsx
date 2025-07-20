import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  PackageCheck, 
  Truck,
  Users,
  FileText,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    route: "/dashboard"
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: Package,
    route: "/inventory"
  },
  {
    id: "stock-transfer",
    name: "Stock Transfer",
    icon: ArrowRightLeft,
    route: "/stock-transfer"
  },
  {
    id: "stock-receive",
    name: "Stock Receive",
    icon: PackageCheck,
    route: "/stock-receive"
  },
  {
    id: "supplier",
    name: "Supplier",
    icon: Users,
    route: "/supplier"
  },
  {
    id: "report",
    name: "Report",
    icon: FileText,
    route: "/report"
  },
  {
    id: "setting",
    name: "Setting",
    icon: Settings,
    route: "/setting"
  }
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-sidebar-bg shadow-lg flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-hover">
        <h1 className="text-xl font-bold text-sidebar-text">Secret Lady</h1>
        <p className="text-sm text-sidebar-text/70">Stock Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.route}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  "text-sidebar-text hover:bg-sidebar-hover",
                  isActive && "bg-sidebar-active text-white"
                )
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
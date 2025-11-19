import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "insights", label: "Employee Insights" },
    { id: "staffing", label: "Project Staffing" },
    { id: "cost", label: "Cost Optimizer" },
    { id: "billing", label: "Client Billing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">OF</span>
            </div>
            <span className="text-xl font-bold text-foreground">OptiForce</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className="transition-all duration-300"
              >
                {item.label}
              </Button>
            ))}
          </div>

          <Button size="sm" className="hidden md:flex">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

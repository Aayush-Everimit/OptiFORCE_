import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, DollarSign, Brain } from "lucide-react";

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero = ({ setActiveSection }: HeroProps) => {
  const features = [
    {
      icon: Users,
      title: "Employee Intelligence",
      description: "Real-time monitoring of productivity, skills, and availability",
    },
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Smart recommendations for project staffing and hiring",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track deadlines, skills growth, and fault analysis",
    },
    {
      icon: DollarSign,
      title: "Cost Optimization",
      description: "Minimize staffing costs while maximizing project delivery",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm text-muted-foreground mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              AI-Powered Workforce Intelligence
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              OptiForce
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              The only AI built to think, strategize and execute like a workforce manager.
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Monitor employee performance, optimize project staffing, and reduce costs by up to 28% with intelligent workforce analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button
                size="lg"
                onClick={() => setActiveSection("dashboard")}
                className="text-base group"
              >
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveSection("insights")}
                className="text-base"
              >
                Explore Features
              </Button>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

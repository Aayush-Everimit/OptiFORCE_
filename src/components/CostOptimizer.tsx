import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingDown, TrendingUp, PieChart, BarChart3, Zap } from "lucide-react";

const CostOptimizer = () => {
  const costMetrics = [
    {
      title: "Total Monthly Cost",
      value: "$245,600",
      change: "-12.3%",
      trend: "down",
      icon: DollarSign,
    },
    {
      title: "Cost per Project",
      value: "$32,400",
      change: "-8.5%",
      trend: "down",
      icon: PieChart,
    },
    {
      title: "Productivity ROI",
      value: "3.2x",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Resource Efficiency",
      value: "89%",
      change: "+6%",
      trend: "up",
      icon: BarChart3,
    },
  ];

  const projectCosts = [
    {
      name: "Project Orion",
      allocated: "$48,000",
      spent: "$32,400",
      remaining: "$15,600",
      progress: 67,
      efficiency: 94,
      team: 8,
    },
    {
      name: "Alpha Initiative",
      allocated: "$65,000",
      spent: "$57,850",
      remaining: "$7,150",
      progress: 89,
      efficiency: 88,
      team: 12,
    },
    {
      name: "Beta Expansion",
      allocated: "$28,000",
      spent: "$6,440",
      remaining: "$21,560",
      progress: 23,
      efficiency: 91,
      team: 5,
    },
  ];

  const optimizationSuggestions = [
    {
      title: "Reassign idle resources",
      impact: "Save $8,400/month",
      description: "3 underutilized developers can be moved to Project Orion",
      priority: "high",
    },
    {
      title: "Optimize team composition",
      impact: "Save $5,200/month",
      description: "Mix senior and junior developers for better cost efficiency",
      priority: "medium",
    },
    {
      title: "Reduce overtime",
      impact: "Save $3,800/month",
      description: "Balance workload across team to minimize overtime hours",
      priority: "medium",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground mb-2">Cost Optimizer</h1>
        <p className="text-muted-foreground">AI-powered insights to minimize costs and maximize productivity</p>
      </div>

      {/* Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {costMetrics.map((metric, index) => (
          <Card
            key={metric.title}
            className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant={metric.trend === "down" ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
              <h3 className="text-3xl font-bold text-foreground">{metric.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Costs */}
        <Card className="lg:col-span-2 border-border animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="text-xl">Project Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectCosts.map((project) => (
                <div key={project.name} className="p-5 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.team} team members</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600">
                      {project.efficiency}% Efficient
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Allocated</p>
                      <p className="text-sm font-bold text-foreground">{project.allocated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Spent</p>
                      <p className="text-sm font-bold text-foreground">{project.spent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                      <p className="text-sm font-bold text-green-600">{project.remaining}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Budget utilization</span>
                      <span className="text-sm font-bold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 group-hover:bg-primary/80"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optimization Suggestions */}
        <Card className="border-border animate-slide-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm">{suggestion.title}</h4>
                    <Badge
                      variant={suggestion.priority === "high" ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-green-600">{suggestion.impact}</span>
                    <Button size="sm" variant="ghost" className="text-xs h-7">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" size="lg">
              <Zap className="mr-2 h-4 w-4" />
              Apply All Optimizations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostOptimizer;

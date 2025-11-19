import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, Clock, AlertCircle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const metrics = [
    {
      title: "Active Employees",
      value: "248",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Avg Productivity",
      value: "87.5%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      description: "team average",
    },
    {
      title: "Cost Savings",
      value: "$124K",
      change: "-18%",
      trend: "down",
      icon: DollarSign,
      description: "this quarter",
    },
    {
      title: "Project Utilization",
      value: "92%",
      change: "+8%",
      trend: "up",
      icon: Clock,
      description: "resource usage",
    },
  ];

  const recentProjects = [
    { name: "Project Orion", status: "active", team: 8, completion: 67, priority: "high" },
    { name: "Alpha Initiative", status: "active", team: 12, completion: 89, priority: "medium" },
    { name: "Beta Expansion", status: "planning", team: 5, completion: 23, priority: "low" },
    { name: "Gamma Optimization", status: "active", team: 15, completion: 45, priority: "high" },
  ];

  const alerts = [
    { type: "warning", message: "Project Orion deadline risk - 2 members overloaded", time: "2h ago" },
    { type: "success", message: "Alpha Initiative ahead of schedule", time: "4h ago" },
    { type: "info", message: "3 new candidates recommended for Beta Expansion", time: "6h ago" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground mb-2">Workforce Dashboard</h1>
        <p className="text-muted-foreground">Real-time insights into your team performance and project status</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card
            key={metric.title}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
              <h3 className="text-3xl font-bold text-foreground mb-1">{metric.value}</h3>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <Card className="lg:col-span-2 border-border animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="text-xl">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.name} className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-foreground">{project.name}</h4>
                      <Badge variant={project.status === "active" ? "default" : "secondary"} className="text-xs">
                        {project.status}
                      </Badge>
                      <Badge variant={
                        project.priority === "high" ? "destructive" : 
                        project.priority === "medium" ? "default" : 
                        "secondary"
                      } className="text-xs">
                        {project.priority}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{project.team} members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 group-hover:bg-primary/80"
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{project.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-border animate-slide-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="text-xl">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    {alert.type === "warning" && <AlertCircle className="h-5 w-5 text-destructive" />}
                    {alert.type === "success" && <CheckCircle className="h-5 w-5 text-primary" />}
                    {alert.type === "info" && <AlertCircle className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground mb-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
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

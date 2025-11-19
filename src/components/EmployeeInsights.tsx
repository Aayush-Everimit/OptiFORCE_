import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Award, AlertTriangle, Calendar, Target } from "lucide-react";

const EmployeeInsights = () => {
  const employees = [
    {
      id: 1,
      name: "Alice Chen",
      role: "Senior Developer",
      productivity: 94,
      trend: "up",
      skills: ["React", "TypeScript", "Node.js"],
      deadlines: { met: 18, total: 20 },
      performance: "excellent",
      workload: 85,
      faultRate: 2.1,
    },
    {
      id: 2,
      name: "Rohan Kumar",
      role: "Frontend Developer",
      productivity: 88,
      trend: "up",
      skills: ["Vue.js", "CSS", "JavaScript"],
      deadlines: { met: 15, total: 18 },
      performance: "good",
      workload: 72,
      faultRate: 3.5,
    },
    {
      id: 3,
      name: "Sarah Martinez",
      role: "Project Manager",
      productivity: 76,
      trend: "down",
      skills: ["Agile", "Scrum", "Leadership"],
      deadlines: { met: 12, total: 15 },
      performance: "needs-attention",
      workload: 95,
      faultRate: 5.2,
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Backend Developer",
      productivity: 91,
      trend: "up",
      skills: ["Python", "Django", "PostgreSQL"],
      deadlines: { met: 22, total: 24 },
      performance: "excellent",
      workload: 78,
      faultRate: 1.8,
    },
  ];

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Good</Badge>;
      case "needs-attention":
        return <Badge variant="destructive">Needs Attention</Badge>;
      default:
        return <Badge variant="secondary">Average</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground mb-2">Employee Insights</h1>
        <p className="text-muted-foreground">Monitor performance, skills, and productivity across your workforce</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Avg Performance", value: "87.3%", icon: Award, trend: "+4.2%" },
          { label: "Deadlines Met", value: "91%", icon: Calendar, trend: "+2.1%" },
          { label: "Skill Coverage", value: "95%", icon: Target, trend: "+1.5%" },
          { label: "Avg Fault Rate", value: "3.2%", icon: AlertTriangle, trend: "-0.8%" },
        ].map((stat, index) => (
          <Card key={stat.label} className="border-border animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {employees.map((employee, index) => (
          <Card
            key={employee.id}
            className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {employee.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
                {getPerformanceBadge(employee.performance)}
              </div>
            </CardHeader>
            <CardContent>
              {/* Productivity */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    Productivity
                    {employee.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </span>
                  <span className="text-sm font-bold text-foreground">{employee.productivity}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${employee.productivity}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <span className="text-sm font-medium text-foreground mb-2 block">Skills</span>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deadlines Met</p>
                  <p className="text-sm font-bold text-foreground">
                    {employee.deadlines.met}/{employee.deadlines.total}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Workload</p>
                  <p className="text-sm font-bold text-foreground">{employee.workload}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fault Rate</p>
                  <p className="text-sm font-bold text-foreground">{employee.faultRate}%</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  Assign Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeInsights;

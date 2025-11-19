import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Users, DollarSign, Clock, CheckCircle } from "lucide-react";

const ProjectStaffing = () => {
  const projectRequirement = {
    name: "Project Phoenix",
    budget: "$85,000",
    timeline: "12 weeks",
    requiredSkills: ["React", "Node.js", "AWS", "MongoDB"],
    teamSize: 6,
  };

  const recommendations = [
    {
      type: "internal",
      employees: [
        {
          name: "Alice Chen",
          role: "Senior Developer",
          match: 95,
          availability: 40,
          cost: "$75/hr",
          skills: ["React", "Node.js", "AWS"],
        },
        {
          name: "James Wilson",
          role: "Backend Developer",
          match: 90,
          availability: 35,
          cost: "$70/hr",
          skills: ["Node.js", "MongoDB", "AWS"],
        },
      ],
    },
    {
      type: "external",
      candidates: [
        {
          name: "External Candidate A",
          role: "Full Stack Developer",
          match: 88,
          cost: "$80/hr",
          skills: ["React", "Node.js", "MongoDB"],
          experience: "5 years",
        },
        {
          name: "External Candidate B",
          role: "Cloud Architect",
          match: 85,
          cost: "$95/hr",
          skills: ["AWS", "Node.js", "DevOps"],
          experience: "7 years",
        },
      ],
    },
  ];

  const optimizedTeam = {
    internal: 4,
    external: 2,
    totalCost: "$67,200",
    costSavings: "28%",
    skillCoverage: "96%",
    estimatedDelivery: "11.5 weeks",
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground mb-2">Project Staffing</h1>
        <p className="text-muted-foreground">AI-powered recommendations for optimal team composition</p>
      </div>

      {/* Project Requirements */}
      <Card className="mb-8 border-border animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            New Project Requirement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Project Name</p>
              <p className="font-semibold text-foreground">{projectRequirement.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Budget</p>
              <p className="font-semibold text-foreground">{projectRequirement.budget}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Timeline</p>
              <p className="font-semibold text-foreground">{projectRequirement.timeline}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Team Size</p>
              <p className="font-semibold text-foreground">{projectRequirement.teamSize} members</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {projectRequirement.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimized Team Summary */}
      <Card className="mb-8 border-border bg-gradient-to-br from-primary/5 to-primary/10 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <CardHeader>
          <CardTitle className="text-xl">AI-Optimized Team Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Internal</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{optimizedTeam.internal}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">External</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{optimizedTeam.external}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Total Cost</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{optimizedTeam.totalCost}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-muted-foreground">Cost Savings</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{optimizedTeam.costSavings}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Skill Coverage</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{optimizedTeam.skillCoverage}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Est. Delivery</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{optimizedTeam.estimatedDelivery}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internal Recommendations */}
        <Card className="border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">Internal Candidates (High Performers)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations[0].employees.map((employee) => (
                <div key={employee.name} className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group">
                  <div className="flex items-start gap-4 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                        {employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">{employee.name}</h4>
                        <Badge className="bg-green-500/10 text-green-600">
                          {employee.match}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {employee.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Availability: {employee.availability}hrs/week</span>
                    <span className="font-semibold text-foreground">{employee.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* External Recommendations */}
        <Card className="border-border animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">External Candidates (If Needed)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations[1].candidates.map((candidate) => (
                <div key={candidate.name} className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group">
                  <div className="flex items-start gap-4 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-border">
                      <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-sm">
                        {candidate.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">{candidate.name}</h4>
                        <Badge variant="secondary">
                          {candidate.match}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{candidate.role} • {candidate.experience}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">External Hire</span>
                    <span className="font-semibold text-foreground">{candidate.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" size="lg">
          Request Different Options
        </Button>
        <Button size="lg" className="group">
          Approve Team Composition
          <CheckCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectStaffing;

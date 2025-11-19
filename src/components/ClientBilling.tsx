import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, Clock, CheckCircle, AlertCircle, Download } from "lucide-react";

const ClientBilling = () => {
  const billingOverview = [
    {
      title: "Total Revenue",
      value: "$485,200",
      change: "+18%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Billable Hours",
      value: "4,852",
      change: "+12%",
      icon: Clock,
      trend: "up",
    },
    {
      title: "Pending Invoices",
      value: "$92,400",
      change: "8 invoices",
      icon: FileText,
      trend: "neutral",
    },
    {
      title: "Collection Rate",
      value: "96%",
      change: "+2%",
      icon: CheckCircle,
      trend: "up",
    },
  ];

  const clientProjects = [
    {
      client: "TechCorp Industries",
      project: "Project Orion",
      hours: { regular: 520, overtime: 48 },
      rate: "$120/hr",
      totalBilled: "$68,160",
      status: "paid",
      invoiceDate: "Jan 15, 2025",
    },
    {
      client: "Global Solutions Inc",
      project: "Alpha Initiative",
      hours: { regular: 680, overtime: 0 },
      rate: "$150/hr",
      totalBilled: "$102,000",
      status: "pending",
      invoiceDate: "Jan 20, 2025",
    },
    {
      client: "StartupX",
      project: "Beta Expansion",
      hours: { regular: 240, overtime: 12 },
      rate: "$95/hr",
      totalBilled: "$23,940",
      status: "overdue",
      invoiceDate: "Dec 28, 2024",
    },
  ];

  const extraHoursTracking = [
    {
      employee: "Alice Chen",
      project: "Project Orion",
      extraHours: 12,
      rate: "$90/hr",
      total: "$1,080",
      approved: true,
    },
    {
      employee: "James Wilson",
      project: "Alpha Initiative",
      extraHours: 8,
      rate: "$85/hr",
      total: "$680",
      approved: true,
    },
    {
      employee: "Sarah Martinez",
      project: "Beta Expansion",
      extraHours: 6,
      rate: "$95/hr",
      total: "$570",
      approved: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Paid</Badge>;
      case "pending":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground mb-2">Client Billing</h1>
        <p className="text-muted-foreground">Track invoices, billable hours, and revenue across all client projects</p>
      </div>

      {/* Billing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {billingOverview.map((metric, index) => (
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
                {metric.trend !== "neutral" && (
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {metric.change}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
              <h3 className="text-3xl font-bold text-foreground mb-1">{metric.value}</h3>
              {metric.trend === "neutral" && (
                <p className="text-xs text-muted-foreground">{metric.change}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Projects Billing */}
        <Card className="lg:col-span-2 border-border animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="text-xl">Client Projects & Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientProjects.map((project) => (
                <div key={project.project} className="p-5 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{project.client}</h4>
                      <p className="text-sm text-muted-foreground">{project.project}</p>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Regular Hours</p>
                      <p className="text-sm font-bold text-foreground">{project.hours.regular}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Overtime</p>
                      <p className="text-sm font-bold text-foreground">{project.hours.overtime}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hourly Rate</p>
                      <p className="text-sm font-bold text-foreground">{project.rate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Billed</p>
                      <p className="text-sm font-bold text-green-600">{project.totalBilled}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Invoice Date: {project.invoiceDate}</span>
                    <Button size="sm" variant="outline" className="text-xs h-8">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Extra Hours Tracking */}
        <Card className="border-border animate-slide-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Extra Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {extraHoursTracking.map((record, index) => (
                <div
                  key={index}
                  className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{record.employee}</h4>
                      <p className="text-xs text-muted-foreground">{record.project}</p>
                    </div>
                    {record.approved ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">
                      {record.extraHours}h @ {record.rate}
                    </span>
                    <span className="text-sm font-bold text-foreground">{record.total}</span>
                  </div>

                  {!record.approved && (
                    <Button size="sm" variant="outline" className="w-full text-xs h-7">
                      Approve & Bill
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total Extra Hours</span>
                <span className="text-lg font-bold text-primary">$2,330</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" size="lg">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
        <Button size="lg">
          <DollarSign className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>
    </div>
  );
};

export default ClientBilling;

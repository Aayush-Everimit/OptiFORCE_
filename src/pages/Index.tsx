import { useState } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import EmployeeInsights from "@/components/EmployeeInsights";
import ProjectStaffing from "@/components/ProjectStaffing";
import CostOptimizer from "@/components/CostOptimizer";
import ClientBilling from "@/components/ClientBilling";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="pt-16">
        {activeSection === "hero" && <Hero setActiveSection={setActiveSection} />}
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "insights" && <EmployeeInsights />}
        {activeSection === "staffing" && <ProjectStaffing />}
        {activeSection === "cost" && <CostOptimizer />}
        {activeSection === "billing" && <ClientBilling />}
      </main>
    </div>
  );
};

export default Index;

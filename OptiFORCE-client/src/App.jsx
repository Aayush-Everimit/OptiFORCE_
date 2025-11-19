import React, { useState, useMemo, useEffect } from 'react';
import {
  Zap,
  Users,
  Briefcase,
  DollarSign,
  Target,
  Clock,
  TrendingUp,
  XCircle,
  BarChart,
  UserCheck,
  Globe,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Activity,
  PlusCircle,
} from 'lucide-react';

// --- Configuration ---
// FIX: Explicitly point to localhost:8081 where the Spring Boot backend is exposed via Docker.
const API_BASE_URL = 'http://localhost:8081/api';
const HIGH_SCORE_COLOR = 'text-green-400';
const LOW_SCORE_COLOR = 'text-red-400';

// --- Utility Components ---

const Card = ({ children, className = '', swipeDirection = null, ...props }) => {
  let swipeClass = '';
  if (swipeDirection === 'left') {
    swipeClass = 'transform transition-all duration-500 hover:-translate-x-2 hover:shadow-2xl';
  } else if (swipeDirection === 'up') {
    swipeClass = 'transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl';
  } else {
    swipeClass = 'transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10';
  }

  return (
    <div
      className={`bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50 ${swipeClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, unit = '', color = 'text-indigo-400', animationDirection = 'up' }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [value]);

  const animationClass = animationDirection === 'up'
    ? 'animate-slide-up'
    : 'animate-slide-in';

  return (
    <Card className="flex flex-col justify-between h-full transform hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between">
        <Icon className={`w-8 h-8 ${color}`} />
        <span key={key} className={`text-4xl font-extrabold ${color} ${animationClass}`}>{value}</span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-xs text-gray-500">{unit}</p>
      </div>
    </Card>
  );
};

const StatusPill = ({ overloadIndex }) => {
  let status, colorClass, Icon;
  if (overloadIndex > 0.8) {
    status = 'Overloaded';
    colorClass = 'bg-red-600';
    Icon = XCircle;
  } else if (overloadIndex > 0.5) {
    status = 'Risk';
    colorClass = 'bg-yellow-600';
    Icon = AlertTriangle;
  } else {
    status = 'Optimal';
    colorClass = 'bg-green-600';
    Icon = CheckCircle;
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full text-white ${colorClass}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
};

const InsightCard = ({ title, value, unit, color = 'text-indigo-400' }) => (
  <Card className="p-4">
    <p className="text-sm text-gray-400">{title}</p>
    <p className={`text-2xl font-extrabold mt-1 ${color}`}>{value}{unit}</p>
  </Card>
);

const SkillHeatmap = ({ employees }) => {
  // NOTE: In a real app, this would fetch employee skills from a /api/skills endpoint.
  // Using hardcoded skills for visual representation.
  const dummySkills = employees.slice(0, 3).flatMap(e => ([
    { skillName: 'React', count: 4 },
    { skillName: 'Python', count: 3 },
    { skillName: 'Java', count: 2 },
  ]));
  
  const skillCounts = dummySkills.reduce((acc, skill) => {
    acc[skill.skillName] = (acc[skill.skillName] || 0) + skill.count;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(skillCounts));

  const getColor = (count) => {
    if (count === maxCount) return 'bg-yellow-600/70';
    if (count > maxCount / 2) return 'bg-indigo-600/70';
    return 'bg-gray-600/70';
  };

  return (
    <Card>
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-indigo-400" /> Skill Utilization Heatmap
      </h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(skillCounts).map(([skill, count]) => (
          <div
            key={skill}
            className={`px-3 py-1 text-sm font-medium rounded-full ${getColor(count)} text-white transform transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer`}
            style={{ opacity: 0.7 + (count / maxCount) * 0.3 }}
            title={`Employees with ${skill}: ${count}`}
          >
            {skill} ({count})
          </div>
        ))}
      </div>
    </Card>
  );
};

// --- Views ---

const DashboardView = ({ employees, isLoading, apiError }) => {
  const totalEmployees = employees.length;
  // Ensure liveProductivityScore and availabilityPercent are numbers before calculation
  const safeEmployees = employees.filter(e => e.liveProductivityScore !== undefined && e.availabilityPercent !== undefined);
  const avgProductivity = safeEmployees.length > 0 ? (safeEmployees.reduce((sum, e) => sum + e.liveProductivityScore, 0) / safeEmployees.length).toFixed(1) : 0;
  const avgAvailability = safeEmployees.length > 0 ? (safeEmployees.reduce((sum, e) => sum + e.availabilityPercent, 0) / safeEmployees.length).toFixed(1) : 0;
  const highRiskCount = employees.filter(e => e.overloadIndex > 0.8).length;

  // Find top productive employee (safely)
  const topProductiveEmployee = safeEmployees.length > 0
    ? safeEmployees.reduce((max, current) => (current.liveProductivityScore > max.liveProductivityScore ? current : max), safeEmployees[0])
    : null;

  return (
    <div className="space-y-8">
      {isLoading && <p className="text-indigo-400 flex items-center"><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading Workforce Data...</p>}
      {apiError && <p className="text-red-400 p-3 bg-red-900/30 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> {apiError}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={Users} title="Total Workforce" value={totalEmployees} color="text-indigo-400" />
        <MetricCard icon={TrendingUp} title="Avg. Productivity" value={avgProductivity} unit="Score" color={avgProductivity > 85 ? HIGH_SCORE_COLOR : 'text-yellow-400'} />
        <MetricCard icon={Clock} title="Avg. Availability" value={avgAvailability} unit="%" color={avgAvailability > 50 ? HIGH_SCORE_COLOR : LOW_SCORE_COLOR} />
        <MetricCard icon={AlertTriangle} title="High-Risk Overload" value={highRiskCount} unit="Employees" color={highRiskCount > 0 ? LOW_SCORE_COLOR : HIGH_SCORE_COLOR} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cost Optimization Summary (Mocked values for UI demo) */}
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-400" />
            Cost Optimization Engine (COS) Summary
          </h3>
          <p className="text-3xl font-extrabold text-green-400 mb-4">
            $4,200 <span className="text-xl text-gray-400 font-medium">Potential Monthly Savings</span>
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-300">
              <span>Optimized Staffing Rate</span>
              <span className="font-bold text-green-300">12% Reduction</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Hiring vs. Reassignment Recommendation</span>
              <span className="font-bold text-indigo-300">AI Recommends Internal Talent</span>
            </div>
          </div>
        </Card>

        {/* Productivity Leaderboard (Using live data) */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-yellow-400" />
            Top Productivity Score
          </h3>
          {topProductiveEmployee ? (
            <div className="bg-green-900/40 p-3 rounded-lg flex justify-between items-center transform transition-all duration-300 hover:scale-[1.03] shadow-lg">
              <div>
                <p className="text-sm font-medium text-green-300">Employee</p>
                <p className="text-lg font-bold text-white">{topProductiveEmployee.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-green-300">{topProductiveEmployee.liveProductivityScore.toFixed(1)}</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No employees yet.</p>
          )}
        </Card>
      </div>

      <SkillHeatmap employees={employees} />
    </div>
  );
};

const EmployeeInsightsView = ({ employees, isLoading }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees.length > 0 ? employees[0].id : null);

  useEffect(() => {
    if (!selectedEmployeeId && employees.length > 0) {
        setSelectedEmployeeId(employees[0].id);
    }
  }, [employees, selectedEmployeeId]);

  const selectedEmployee = useMemo(() =>
    employees.find(e => e.id === selectedEmployeeId),
    [employees, selectedEmployeeId]
  );
  
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('') : 'N/A';
  };

  // Guard against undefined scores if data is loading or missing
  const safeProductivity = selectedEmployee?.liveProductivityScore ?? 0;
  const safeAvailability = selectedEmployee?.availabilityPercent ?? 0;
  const safeOverload = selectedEmployee?.overloadIndex ?? 0;
  const safeBillingRate = selectedEmployee?.clientBillingRate ?? 0;


  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Employee List */}
      <Card className="lg:col-span-1 p-0 overflow-hidden">
        <h3 className="text-xl font-semibold p-4 border-b border-gray-700 text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-indigo-400" /> Workforce Profiles
        </h3>
        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
          {isLoading ? (
             <p className="p-4 text-indigo-400 flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Fetching...</p>
          ) : employees.length === 0 ? (
            <p className="p-4 text-gray-400">No employees found. Onboard one first!</p>
          ) : (
            employees.map(emp => (
              <div
                key={emp.id}
                onClick={() => setSelectedEmployeeId(emp.id)}
                className={`p-4 flex items-center justify-between border-b border-gray-700 cursor-pointer transition-all duration-300 ${emp.id === selectedEmployeeId ? `bg-indigo-600/30 border-l-4 border-indigo-500` : 'hover:bg-gray-700/50'} transform hover:translate-x-1`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{emp.name}</p>
                  <p className="text-sm text-gray-400">{emp.roleTitle}</p>
                </div>
                <StatusPill overloadIndex={emp.overloadIndex} />
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Selected Employee Detailed Profile */}
      <Card className="lg:col-span-2 space-y-6">
        {selectedEmployee ? (
          <>
            <div className="flex items-center justify-between border-b pb-4 border-gray-700">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold bg-indigo-600 text-white border-2 border-indigo-500`}>
                    {getInitials(selectedEmployee.name)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedEmployee.name}</h2>
                  <p className="text-lg text-gray-400">{selectedEmployee.roleTitle} | <span className="font-mono text-sm text-yellow-300">${(selectedEmployee.costPerHour * 2080).toLocaleString()} / year (Est)</span></p>
                </div>
              </div>
              <StatusPill overloadIndex={safeOverload} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InsightCard title="Productivity Score" value={safeProductivity.toFixed(1)} unit="%" color={safeProductivity > 85 ? HIGH_SCORE_COLOR : LOW_SCORE_COLOR} />
              <InsightCard title="Availability" value={safeAvailability.toFixed(1)} unit="%" color={safeAvailability > 50 ? HIGH_SCORE_COLOR : LOW_SCORE_COLOR} />
              <InsightCard title="Overload Index" value={safeOverload.toFixed(2)} unit="" color={safeOverload > 0.8 ? LOW_SCORE_COLOR : HIGH_SCORE_COLOR} />
              <InsightCard title="Client Billing Rate" value={safeBillingRate.toFixed(0)} unit="/hr" color="text-yellow-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3 flex items-center"><Target className="w-5 h-5 mr-2 text-indigo-400" /> Core Skillset (Mock)</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Spring Boot', 'SQL', 'Agile'].map(skill => (
                <span key={skill} className="px-3 py-1 text-sm bg-indigo-700/50 text-indigo-200 rounded-full font-medium shadow-md transition-transform duration-300 hover:scale-105">{skill}</span>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400">Select an employee or onboard a new one.</p>
        )}
      </Card>
    </div>
  );
};

const ProjectStaffingView = ({ employees }) => {
  const [projects, setProjects] = useState([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [formProjectName, setFormProjectName] = useState('');
  const [formRequiredSkills, setFormRequiredSkills] = useState('');
  const [formDeadline, setFormDeadline] = useState('');
  const [formBudget, setFormBudget] = useState(100000.0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [optimizationLoading, setOptimizationLoading] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [staffingApiError, setStaffingApiError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsProjectsLoading(true);
    setStaffingApiError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error(`Failed to fetch projects. Status: ${response.status}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setStaffingApiError(error.message);
    } finally {
      setIsProjectsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setOptimizationLoading(true);
    setStaffingApiError(null);
    // Note: deadline must be a string in YYYY-MM-DD format for Java backend
    const newProject = {
      projectName: formProjectName,
      requiredSkills: formRequiredSkills,
      deadline: formDeadline,
      totalProjectBudget: parseFloat(formBudget),
      projectPhase: "Planning",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) throw new Error(`Project creation failed: ${response.statusText}`);

      const createdProject = await response.json();
      fetchProjects();
      setSelectedProject(createdProject);
      setFormProjectName('');
      setFormRequiredSkills('');
      setFormDeadline('');
    } catch (error) {
      setStaffingApiError(error.message);
    } finally {
      setOptimizationLoading(false);
    }
  };

  const triggerOptimization = async () => {
    if (!selectedProject) return;

    setOptimizationLoading(true);
    setStaffingApiError(null);
    setOptimizationResult(null);

    try {
      // 1. Trigger Optimization (POST /api/projects/{projectId}/optimize)
      const optimizeResponse = await fetch(`${API_BASE_URL}/projects/${selectedProject.id}/optimize`, {
        method: 'POST',
      });
      if (!optimizeResponse.ok) throw new Error(`Optimization failed. Status: ${optimizeResponse.status}`);
      
      const assignments = await optimizeResponse.json();

      // 2. Mock: Calculate derived metrics for display (since the Assignments don't carry the employee cost)
      const totalOptimizedHours = assignments.reduce((sum, a) => sum + (a.optimizedAssignedHours || 0), 0);
      
      // Attempt to link assignments back to employee data for a slightly better mock cost
      const totalStaffingCost = assignments.reduce((sum, assignment) => {
        // NOTE: employeeId in assignment is the database ID (Long id), not the string employeeId
        const employee = employees.find(e => e.id === assignment.employeeId); // Assuming employeeId is the long ID
        const costPerHour = employee?.costPerHour || (assignment.isExternalHire ? 70 : 50); 
        return sum + (assignment.optimizedAssignedHours * costPerHour);
      }, 0);

      setOptimizationResult({
        assignments,
        totalHours: totalOptimizedHours.toFixed(1),
        cost: totalStaffingCost.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        costReduction: "22.5", // Mock for visual impact
        skillCoverage: "95", // Mock for visual impact
      });

    } catch (error) {
      setStaffingApiError(`Optimization Error: ${error.message}`);
    } finally {
      setOptimizationLoading(false);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setOptimizationResult(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Briefcase className="w-6 h-6 mr-2 text-indigo-400" /> Project Staffing & Optimization
      </h2>
      
      {staffingApiError && <p className="text-red-400 p-3 bg-red-900/30 rounded-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> {staffingApiError}</p>}


      {/* Project Creation */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <PlusCircle className="w-5 h-5 mr-2 text-green-400" /> New Project Setup
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
            <input
              type="text"
              value={formProjectName}
              onChange={(e) => setFormProjectName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Project Orion"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Required Skills (Comma Separated)</label>
            <input
              type="text"
              value={formRequiredSkills}
              onChange={(e) => setFormRequiredSkills(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., React, Java, Agile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Deadline</label>
            <input
              type="date"
              value={formDeadline}
              onChange={(e) => setFormDeadline(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <button
          onClick={handleCreateProject}
          disabled={optimizationLoading || !formProjectName || !formRequiredSkills || !formDeadline}
          className={`mt-6 w-full py-3 flex items-center justify-center font-bold rounded-lg shadow-xl transition-all duration-300 ${optimizationLoading ? 'bg-green-700/50 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 transform hover:scale-[1.01]'}`}
        >
          {optimizationLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Project...</> : <><PlusCircle className="w-5 h-5 mr-2" /> Create New Project</>}
        </button>
      </Card>
      
      {/* Existing Projects and Optimization Trigger */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-indigo-400" /> Existing Projects
        </h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {isProjectsLoading ? (
            <p className="text-indigo-400 flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Fetching projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-400">No projects available. Create one above.</p>
          ) : (
            projects.map(project => (
              <button
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedProject && selectedProject.id === project.id
                    ? 'bg-indigo-600 text-white shadow-lg border border-indigo-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {project.projectName}
              </button>
            ))
          )}
        </div>

        {selectedProject && (
          <div className="mt-4 p-4 border border-gray-600 rounded-lg space-y-4">
            <h4 className="text-lg font-bold text-white">{selectedProject.projectName} Details</h4>
            <p className="text-sm text-gray-400">Skills Needed: <span className="text-white">{selectedProject.requiredSkills}</span></p>
            <p className="text-sm text-gray-400">Current Phase: <span className="text-yellow-400">{selectedProject.projectPhase}</span></p>

            <button
              onClick={triggerOptimization}
              disabled={optimizationLoading}
              className={`w-full py-3 flex items-center justify-center font-bold rounded-lg shadow-xl transition-all duration-300 ${optimizationLoading ? 'bg-indigo-700/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 transform hover:scale-[1.01]'}`}
            >
              {optimizationLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Triggering COS Engine...</> : <><Zap className="w-5 h-5 mr-2" /> RUN AI STAFFING OPTIMIZATION</>}
            </button>
          </div>
        )}
      </Card>

      {/* Optimization Results */}
      {optimizationResult && (
        <Card className="p-6 bg-green-900/40 border-green-500/50">
          <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" /> Optimization Results for {selectedProject.projectName}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-green-900 rounded-lg">
              <p className="text-3xl font-extrabold text-green-300">{optimizationResult.costReduction}%</p>
              <p className="text-sm text-gray-300">Cost Reduction</p>
            </div>
            <div className="p-3 bg-green-900 rounded-lg">
              <p className="text-3xl font-extrabold text-green-300">{optimizationResult.skillCoverage}%</p>
              <p className="text-sm text-gray-300">Skill Coverage</p>
            </div>
            <div className="p-3 bg-green-900 rounded-lg">
              <p className="text-3xl font-extrabold text-green-300">${optimizationResult.cost}</p>
              <p className="text-sm text-gray-300">Total Staffing Cost</p>
            </div>
            <div className="p-3 bg-green-900 rounded-lg">
              <p className="text-3xl font-extrabold text-green-300">{optimizationResult.totalHours}h</p>
              <p className="text-sm text-gray-300">Total Assigned Hours</p>
            </div>
          </div>
          
          <h4 className="text-lg font-bold text-white mt-6 mb-3">Assignments Created:</h4>
          <div className="space-y-2">
            {optimizationResult.assignments.map((assignment, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-white">Employee ID: {assignment.employeeId} <span className='text-gray-400'>({assignment.isExternalHire ? 'External' : 'Internal'})</span></p>
                <p className="font-bold text-yellow-300">{assignment.optimizedAssignedHours.toFixed(1)} Hours</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};


// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        // If the fetch fails but returns a recognizable status (like 404/500), 
        // we show the status. If it fails entirely (like "Failed to fetch"), it means the server is down.
        throw new Error(`API Connection Failed. Status: ${response.status}. Is the Spring Boot backend running on port 8081?`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      // Explicitly check for 'Failed to fetch' which indicates server is offline or CORS issue
      if (error.message.includes('Failed to fetch')) {
         setApiError("Backend Server Offline. Please ensure the Spring Boot application is running on http://localhost:8081.");
      } else {
         setApiError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOnboardMockEmployee = async () => {
    const mockEmployee = {
        employeeId: `EMP-${Math.floor(Math.random() * 9999)}`,
        name: `Mock User ${Math.random().toFixed(2)}`,
        roleTitle: "New Hire - Dev",
        department: "Engineering",
        employmentStatus: "Active",
        costPerHour: 50.0 + Math.floor(Math.random() * 30),
        mandatoryWorkHours: 40.0,
        clientBillingRate: 100.0 + Math.floor(Math.random() * 50),
        employmentDate: new Date().toISOString().split('T')[0],
        liveProductivityScore: 75.0 + Math.random() * 20,
        overloadIndex: Math.random() * 0.5,
        availabilityPercent: 50.0 + Math.random() * 40,
    };
    try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockEmployee),
        });
        if (!response.ok) throw new Error("Failed to onboard mock employee.");
        fetchEmployees(); // Refresh list
    } catch (error) {
        setApiError(`Onboarding failed: ${error.message}`);
    }
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'Employee Insights':
        return <EmployeeInsightsView employees={employees} isLoading={isLoading} />;
      case 'Project Staffing':
        return <ProjectStaffingView employees={employees} />;
      case 'Dashboard':
      default:
        return <DashboardView employees={employees} isLoading={isLoading} apiError={apiError} />;
    }
  };

  const tabs = [
    { name: 'Dashboard', icon: BarChart },
    { name: 'Employee Insights', icon: Users },
    { name: 'Project Staffing', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-inter text-gray-100 p-4 md:p-8">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        /* Custom scrollbar for visual appeal */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-4xl font-extrabold text-white flex items-center">
          <Zap className={`w-8 h-8 mr-3 text-indigo-500 animate-pulse`} />
          OptiForce <span className="text-lg font-light ml-3 text-gray-400">AI Workforce Intelligence</span>
        </h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
                onClick={handleOnboardMockEmployee}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 shadow-md"
            >
                <PlusCircle className="w-4 h-4 mr-2" /> Onboard Mock Employee
            </button>
          <div className="flex space-x-2 p-1 bg-gray-800 rounded-lg shadow-inner">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none ${
                  activeTab === tab.name
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-[1.01]'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full">
        {renderContent()}
      </main>

      {/* Footer/Pitch Reminder */}
      <footer className="mt-12 text-center text-gray-500 pt-8 border-t border-gray-800">
        <p className="text-sm italic">
          Live API Frontend | Connects to Spring Boot backend at `http://localhost:8081/api`
        </p>
      </footer>
    </div>
  );
}

export default App;
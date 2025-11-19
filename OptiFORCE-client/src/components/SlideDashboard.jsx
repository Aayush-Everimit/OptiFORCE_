export default function SlideDashboard() {
    return (
        <div className="slide active">
            <h1 className="slide-title">Performance Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">
                <div className="metric-box">
                    <div className="metric-value">92%</div>
                    <div className="metric-label">Team Efficiency</div>
                </div>

                <div className="metric-box">
                    <div className="metric-value">34</div>
                    <div className="metric-label">Active Projects</div>
                </div>

                <div className="metric-box">
                    <div className="metric-value">148</div>
                    <div className="metric-label">Total Employees</div>
                </div>

                <div className="metric-box">
                    <div className="metric-value">$1.2M</div>
                    <div className="metric-label">Cost Savings</div>
                </div>
            </div>
        </div>
    );
}
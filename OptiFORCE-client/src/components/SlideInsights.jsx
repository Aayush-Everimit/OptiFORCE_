export default function SlideInsights() {
    return (
        <div className="slide active">
            <h1 className="slide-title">Employee Insights</h1>

            <div className="employee-card">
                <img className="employee-photo" src="/employee.jpg" alt="Employee" />

                <div className="employee-details">
                    <h2>Sarah Martinez</h2>
                    <p>Senior Software Engineer</p>

                    <div className="employee-skill-tags flex gap-2 mt-3">
                        <span>React</span>
                        <span>Node.js</span>
                        <span>Leadership</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
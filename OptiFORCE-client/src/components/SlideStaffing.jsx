export default function SlideStaffing() {
    function handleSubmit(event) {
        event.preventDefault();
        alert("AI Staffing Analysis Complete!");
    }

    return (
        <div className="slide active">
            <h1 className="slide-title">AI-Powered Project Staffing</h1>

            <form onSubmit={handleSubmit} className="card max-w-xl p-6">
                <div className="form-group mb-4">
                    <label>Project Name</label>
                    <input type="text" placeholder="Enter project name" />
                </div>

                <div className="form-group mb-4">
                    <label>Required Skills</label>
                    <textarea rows="3" placeholder="e.g. React, AWS, UX Design"></textarea>
                </div>

                <div className="form-group mb-4">
                    <label>Team Size</label>
                    <input type="number" />
                </div>

                <button className="form-button">Generate Staffing Plan</button>
            </form>
        </div>
    );
}
export default function Navbar({ slide, setSlide }) {
    return (
        <nav className="nav-bar">
            <div className="logo-area">
                <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="url(#navGradient)" />
                    <path d="M20 8L30 14V26L20 32L10 26V14L20 8Z" fill="white" opacity="0.9" />
                    <path d="M20 12L26 16V24L20 28L14 24V16L20 12Z" fill="#4F46E5" />

                    <defs>
                        <linearGradient id="navGradient" x1="0" y1="0" x2="40" y2="40">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="brand-text">
                    <div className="platform-name">OptiForce</div>
                    <div className="tagline">Intelligent Workforce Optimization</div>
                </div>
            </div>

            <div className="slide-nav">
                <button className={`nav-btn ${slide === 0 ? "active" : ""}`} onClick={() => setSlide(0)}>
                    Dashboard
                </button>

                <button className={`nav-btn ${slide === 1 ? "active" : ""}`} onClick={() => setSlide(1)}>
                    Employee Insights
                </button>

                <button className={`nav-btn ${slide === 2 ? "active" : ""}`} onClick={() => setSlide(2)}>
                    Project Staffing
                </button>
            </div>
        </nav>
    );
}
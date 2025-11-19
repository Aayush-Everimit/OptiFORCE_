import { useState } from "react";
import Navbar from "./components/Navbar";
import SlideDashboard from "./components/SlideDashboard";
import SlideInsights from "./components/SlideInsights";
import SlideStaffing from "./components/SlideStaffing";

export default function App() {
    const [slide, setSlide] = useState(0);

    return (
        <div className="presentation-container">
            <Navbar slide={slide} setSlide={setSlide} />

            <div className="slides-container">
                {slide === 0 && <SlideDashboard />}
                {slide === 1 && <SlideInsights />}
                {slide === 2 && <SlideStaffing />}
            </div>
        </div>
    );
}
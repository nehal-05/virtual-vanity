import React from "react";
import "../styles/Home.css";

import makeupImg from "../assets/makeup.jpg";
import skincareImg from "../assets/skincare.jpg";

export default function Home() {
    return (
        <div className="vanity-hero">

            {/* Sparkles */}
            <div className="sparkle sp1">✦</div>
            <div className="sparkle sp2">✧</div>
            <div className="sparkle sp3">✦</div>
            <div className="sparkle sp4">✧</div>

            {/* Left retro lines */}
            <div className="left-lines"></div>
            <div className="outer-ring"></div>
            <div className="outer-ring-2"></div>

            {/* Left retro lines */}
            <div className="bubbles"></div>

            {/* Right fanburst */}
            <div className="fanburst"></div>

            {/* Title */}
            <div className="hero-content">
                <h2 className="welcome-text">WELCOME TO</h2>
                <h1 className="main-title">
                    MY<br />VIRTUAL<br />VANITY
                </h1>

                <button className="shop-btn">SHOP NOW</button>
            </div>

            {/* Tilted image cards */}
            <div className="hero-images">
                <div className="image-card tilt-left">
                    <img src={makeupImg} alt="Makeup" />
                </div>
                <div className="image-card tilt-right">
                    <img src={skincareImg} alt="Skincare" />
                </div>
            </div>

        </div>
    );
}

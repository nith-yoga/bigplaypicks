import React from "react";
import "./Home.css";
import { Link, Navigate } from "react-router-dom";

function Home() {
    const isLoggedIn = false;

    if (isLoggedIn) {
        return <Navigate to="/Dashboard" />;
    }

    return (
        <div>
            <div className="home-container">
                {/* Hero Section with CTA */}
                <section className="hero">
                    <p className="subtitle">Build your dream team and win it all!</p>
                    <div className="cta-buttons">
                        <Link to="/Register">Sign Up</Link>
                        <Link to="/Login">Already have an account? Join a league today!</Link>
                    </div>
                </section>

                <section className="walkthrough">
                    <div className="step">
                        <div className="placeholder-box">Draft Your Team</div>
                    </div>
                    <div className="step">
                        <div className="placeholder-box">Set Your Weekly Lineups</div>
                    </div>
                    <div className="step">
                        <div className="placeholder-box">Track Player Performances</div>
                    </div>
                    <div className="step">
                        <div className="placeholder-box">Win Your League!</div>
                    </div>
                </section>

                {/* Secondary CTA */}
                <section className="secondary-cta">
                    <p>Ready to play?</p>
                    <Link to="/Register" className="cta-button">Create an Account</Link>
                </section>
            </div>
        </div>
    );
}

export default Home;
import FestivalCountdown from "./FestivalCountdown.jsx";
import React from "react";

function Header() {
    return (
        <header>
            <section className="header-section">
                <img className="header-img" src="/festival.jpeg" alt="Festival banner"/>
                <FestivalCountdown/>
            </section>
        </header>
    );
}

export default Header;
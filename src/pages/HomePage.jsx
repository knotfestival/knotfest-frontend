import React from "react";
import HomeDisplay from "../components/HomeDisplay.jsx";
import Header from "../components/Header.jsx";

function HomePage() {

    return (
        <>
            <Header/>
            <div className="description">
                <h2>Welcome to KnotFest</h2>
                <p>A happening that will awaken your darkest senses… </p>
                <p> A one-of-a-kind music and lifestyle festival that celebrates rock & metal culture.
                    Knotfest is brought to the world by the multi-platinum and genre defining group - Slipknot.</p>
                <p>Music is the pulse of Knotfest. The festival features the biggest and most cutting edge heavy bands in the
                    world.</p>
                <p>This year's edition: Australia and UK.</p>
            </div>
            <div>

            </div>
            <section className="slideshow-section">
                <h2>This year's artists</h2>
                <h4>...and many more to be announced.</h4>
                <HomeDisplay/>
            </section>
            <h3> Latest news </h3>
            <div className="news">
                <article className="news-article">
                    <h4>New artists to be announced...</h4>
                    <p>Check out all the artists already confirmed → LineUp</p>
                    <p>More coming soon...</p>
                </article>
                <article className="news-article">
                    <h4>Korn Announces European Tour Dates</h4>
                    <p>The run will include festival appearances at KnotFest, Bloodstock in the UK, Reload in Germany and Motocultor in France.</p>
                </article>
                <article className="news-article">
                    <h4> Nothing More Announces Carnal Nature World Tour</h4>
                    <p>The trek will cover mainland Europe and the U.K. to close out 2025 and return to Canada and the U.S. to kick off the new year.</p>
                </article>
            </div>
            <div className="video-container">
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/kj6dJfdkgAA?si=RHvg56LP4-kVnW1i"
                    title="YouTube video player" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                />
            </div>
            </>
    );
}

export default HomePage;
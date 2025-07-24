import { Link, useLocation } from "react-router-dom";

function SurveyResults() {
    const location = useLocation();
    const votedArtist = location.state?.votedArtist;

    const votes = JSON.parse(localStorage.getItem("votes") || "{}");

    return (
        <div className="survey-results-container">
            <h1>Survey Results</h1>
            {votedArtist && (
                <p className="voted-artist">
                    You voted on: <strong>{votedArtist}</strong>
                </p>
            )}
            <h2>Vote Count:</h2>
            <ul className="votes-list">
                {Object.entries(votes).map(([artist, count]) => (
                    <li key={artist}>
                        {artist}: {count} vote(s)
                    </li>
                ))}
            </ul>
            <Link to="/lineup" className="back-to-lineup">
                Back to LineUp
            </Link>
        </div>
    );
}

export default SurveyResults;

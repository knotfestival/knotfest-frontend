import { useState } from "react";
import artistData from "../json/artists.json";
import { useNavigate } from "react-router-dom";

function SurveyForm() {
    const artistsList = artistData.artists;
    const [selectedArtist, setSelectedArtist] = useState(null);
    const navigate = useNavigate();

    const handleArtistSelection = (event) => {
        setSelectedArtist(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedArtist) {
            const existingVotes = localStorage.getItem("votes");
            const votes = existingVotes ? JSON.parse(existingVotes) : {};

            votes[selectedArtist] = (votes[selectedArtist] || 0) + 1;

            localStorage.setItem("votes", JSON.stringify(votes));
            navigate("/survey-results", { state: { votedArtist: selectedArtist } });
        } else {
            alert("Please select at least one artist");
        }
    };

    return (
        <div className="survey-container">
            <h1>Vote on your favorite Artist!</h1>
            <form onSubmit={handleSubmit}>
                <div className="artist-options">
                    {artistsList.map((artist) => (
                        <div key={artist.id} className="artist-option-item">
                            <label htmlFor={`artist-${artist.id}`}>
                                <input
                                    type="radio"
                                    id={`artist-${artist.id}`}
                                    name="favoriteArtist"
                                    value={artist.name}
                                    checked={selectedArtist === artist.name}
                                    onChange={handleArtistSelection}
                                />
                                {/*<img className="artist-image" src={`/artists/${artist.image_path}`} alt={artist.name} />  (para voltar a colocar se quiser imagens no survey) */}
                                <span className="artist-name">{artist.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-vote-button">
                    Vote
                </button>
            </form>
        </div>
    );
}

export default SurveyForm;


import React from "react";
import '../App.css';

function ArtistCard({
                        name,
                        performance_date,
                        performance_hour,
                        image_url,
                    }) {

    return (
        <div className="artist-card">
            <article className="artist-item">
                <h3>{name}</h3>
                <img src={image_url || 'placeholder.jpg'} alt={name} className="artist-image-card"/>
                <p>{performance_date}</p>
                <p>{performance_hour}</p>
            </article>
        </div>
    );
}

export default ArtistCard;
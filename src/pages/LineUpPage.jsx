
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard.jsx';
import api from '../services/api.js';
import '../App.css';

function LineUpPage() {
    const [artistsList, setArtistsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get('/artists'); // Chamada à API do backend
                setArtistsList(response.data);
            } catch (err) {
                setError('Error loading artists. Please try again.');
                console.error('Error retrieving artists:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return <div className="loading">Loading artists...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <h1>LineUp</h1>
            <div className="artist-container">
                {artistsList.length > 0 ? (
                    artistsList.map((artist) => (
                        <Link
                            key={artist.id} // É melhor usar artist.id como key, se disponível do backend
                            to={`/artists/${artist.id}`} // Formato da URL
                            className="artist-card-link"
                        >
                            {/* Passa as props que o ArtistCard espera. O backend deve devolver imageUrl. */}
                            <ArtistCard
                                name={artist.name}
                                performance_date={artist.performanceDate} // Adapte para o nome do campo no backend
                                performance_hour={artist.performanceTime} // Adapte para o nome do campo no backend
                                image_url={artist.image} // Use imageUrl do backend
                            />
                        </Link>
                    ))
                ) : (
                    <p>No artists found.</p>
                )}
            </div>
        </>
    );
}

export default LineUpPage;
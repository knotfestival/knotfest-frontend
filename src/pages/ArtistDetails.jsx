// src/pages/ArtistDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../services/api.js';
import commentsData from "../json/comments.json";
import usersData from "../json/users.json";
import '../App.css';

function ArtistDetails() {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get(`/artists/${artistId}`);
                setArtist(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('Artist not found.');
                } else {
                    setError('Error loading artist details. Please try again.');
                    console.error(`Error retrieving artist details ${artistId}:`, err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArtistDetails();
    }, [artistId]);

    if (loading) {
        return <div className="loading">Loading artist details...</div>;
    }

    if (error) {
        return (
            <div className="artist-details-not-found">
                <h2>{error}</h2>
                <p>The artist you're trying to find may not exist, or there was a problem.</p>
                    <Link to="/lineup">Return to LineUp</Link>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="artist-details-not-found">
                <h2>Artist not found!</h2>
                <p>The artist you are trying to find may not exist.</p>
                <Link to="/lineup">Return to LineUp</Link>
            </div>
        );
    }

    const artistComments = commentsData.comments.filter(
        (comment) => comment.artist_id === artist.id
    );
    const usersMap = new Map(usersData.users.map(user => [user.id, user.username]));


    return (
        <div className="artist-details-page">
            <Link to="/lineup" className="back-to-lineup">
                &larr; Return to LineUp
            </Link>
            <h1 className="artist-details-name">{artist.name}</h1>
            <div className="artist-details-content">
                <img
                    src={artist.image || 'placeholder.jpg'}
                    alt={artist.name}
                    className="artist-details-image"
                />
                <div className="artist-details-info">
                    <p className="artist-details-bio">{artist.description}</p>
                    <p className="artist-details-performance">
                        Performance Date: {artist.performanceDate}
                    </p>
                    <p className="artist-details-performance">
                        Performance Time: {artist.performanceTime}
                    </p>
                    {artist.videoUrl && artist.videoUrl.trim() !== "" && (
                        <p className="artist-details-video">
                            <a href={artist.videoUrl} target="_blank" rel="noopener noreferrer">
                                Watch YouTube video
                            </a>
                        </p>
                    )}
                </div>
            </div>
            <section className="artist-comments-section">
                <h2 className="comments-title">Comments ({artistComments.length})</h2>
                {artistComments.length > 0 ? (
                    <div className="comments-list">
                        {artistComments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <p className="comment-text">"{comment.comment_text}"</p>
                                <p className="comment-meta">
                                    — <span className="comment-username">{usersMap.get(comment.user_id) || 'Anonymous'}</span>
                                    <span className="comment-date"> on {new Date(comment.pub_datetime).toLocaleString('pt-PT')}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-comments">There are no comments for this artist.</p>
                )}
            </section>
        </div>
    );
}

export default ArtistDetails;
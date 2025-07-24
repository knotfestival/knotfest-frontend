import React, { useState, useEffect } from 'react';

const slideImages = [
    { src: './artists/spiritbox.jpg', alt: 'Spiritbox band' },
    { src: './artists/nothing-more.jpeg', alt: 'Nothing More band' },
    { src: './artists/gojira.jpg', alt: 'Gojira band' },
    { src: './artists/normandie.jpg', alt: 'Normandie band' },
    { src: './artists/korn.jpg', alt: 'Korn band' },
    { src: './artists/palaye-royale.jpg', alt: 'Palaye Royale band' },
    { src: './artists/boston-manor.jpg', alt: 'Boston Manor band' },
    { src: './artists/slipknot.jpg', alt: 'Slipknot band' },
];

function HomeDisplay() {
    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + slideImages.length) % slideImages.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow-container">
            <div className="slideshow-controls">
                <button
                    className="slideshow-button prev"
                    onClick={prevSlide}
                    aria-label="Ver artista anterior"
                >
                    &lt;
                </button>
            </div>

          <div className="slideshow-image-wrapper">
                <img
                    id="slideshow-image"
                    src={slideImages[slideIndex].src}
                    alt={slideImages[slideIndex].alt}
                    className="slideshow-img"
                />
            </div>

            <div className="slideshow-controls">
                <button
                    className="slideshow-button next"
                    onClick={nextSlide}
                    aria-label="Ver próximo artista"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default HomeDisplay;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Pentru navigare
import './Landing.css';

const reviews = [
    {
        name: 'Alex',
        image: 'https://via.placeholder.com/150',
        message: 'ByteResume made creating a resume so easy and stress-free!',
    },
    {
        name: 'Stefan',
        image: 'https://via.placeholder.com/150',
        message: 'The templates are stunning and professional.',
    },
    {
        name: 'Maria',
        image: 'https://via.placeholder.com/150',
        message: 'Highly recommend this tool to anyone looking for a quick solution.',
    },
    {
        name: 'Ana',
        image: 'https://via.placeholder.com/150',
        message: 'I loved how simple and intuitive the process was!',
    },
    {
        name: 'John',
        image: 'https://via.placeholder.com/150',
        message: 'Great platform for creating resumes quickly!',
    },
];

const Landing = () => {
    const [scrollY, setScrollY] = useState(0);
    const [randomReviews, setRandomReviews] = useState([]);
    const navigate = useNavigate(); // Hook pentru navigare

    useEffect(() => {
        const shuffleAndSelect = () => {
            const shuffled = [...reviews].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 3); // Selectează primele 3 după amestecare
        };

        setRandomReviews(shuffleAndSelect());

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getBackgroundStyle = () => {
        const color1 = `rgba(106, 17, 203, ${1 - scrollY / 800})`; // Violet
        const color2 = `rgba(37, 117, 252, ${1 - scrollY / 800})`; // Albastru
        const color3 = `rgba(255, 255, 255, ${scrollY / 800})`; // Alb
        return `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
    };

    const getTextColor = () => {
        return scrollY < 400 ? 'white' : '#333';
    };

    return (
        <div
            className="landing"
            style={{
                background: getBackgroundStyle(),
                transition: 'background 0.5s ease-in-out',
            }}
        >
            {/* Header Section */}
            <section
                className="landing-header"
                style={{ color: getTextColor() }}
            >
                <h1>Welcome to ByteResume</h1>
                <p>Your ultimate tool for creating professional resumes with ease.</p>
                <button
                    className="landing-button"
                    style={{
                        color: scrollY < 400 ? '#2575fc' : 'white',
                        backgroundColor: scrollY < 400 ? 'white' : '#2575fc',
                    }}
                    onClick={() => navigate('/home')} // Navigare către pagina Home
                >
                    Get Started
                </button>
            </section>

            {/* Guide Section */}
            <section
                className="landing-guide"
                style={{ color: getTextColor() }}
            >
                <h2>How it works</h2>
                <p>Follow these simple steps to create your professional resume:</p>
                <ol>
                    <li>Fill in your personal details.</li>
                    <li>Choose a template that fits your style.</li>
                    <li>Download and share your resume with the world.</li>
                </ol>
            </section>

            {/* Reviews Section */}
            <section className="landing-reviews">
                <h2>What our users say</h2>
                <div className="reviews-grid">
                    {randomReviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <img src={review.image} alt={`${review.name}'s profile`} className="review-image" />
                            <p className="review-message">{review.message}</p>
                            <span className="review-name">{review.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Landing;

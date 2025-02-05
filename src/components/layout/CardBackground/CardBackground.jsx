import { useState, useEffect } from 'react';
import './CardBackground.css';

const images = [
  '/images/imagine1.jpg',
  '/images/imagine2.jpg',
  '/images/imagine3.jpg',
];

const CardBackground = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 8000); // 8 seconds per image (including slide time)
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setTextVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setTextVisible(true)}
      onMouseLeave={() => setTextVisible(false)}
    >
      <div className="card-overlay-wrapper">
        {images.map((img, index) => (
          <div
            key={index}
            className={`card-overlay ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>
      <div className={`card-content ${textVisible ? 'visible' : 'hidden'}`}>
        <h1>Bun venit la AgroturismBori</h1>
        <p>Va invitam sa descoperiti experiente de neuitat</p>
      </div>
      <button
        className="toggle-button"
        onClick={() => setTextVisible(prev => !prev)}
      >
        {textVisible ? 'Hide Text' : 'Show Text'}
      </button>
    </div>
  );
};

export default CardBackground;
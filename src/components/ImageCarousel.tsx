import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: { url: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-black/30"
      style={{ height: "660px" }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 focus:outline-none transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 focus:outline-none transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageCarousel;

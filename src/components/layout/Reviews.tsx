import React, { useEffect, useState } from "react";
import axios from "axios";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
};

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/reviews");
        if (response.data?.reviews) {
          setReviews(response.data.reviews);
        } else {
          setError("Datele nu au putut fi încărcate.");
        }
      } catch (error) {
        setError("Vă rugăm să încercați mai târziu.");
        console.error("Eroare la încărcarea recenziilor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStars = (rating: number) => (
    <div className="flex justify-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-2xl ${
            i < rating ? "text-amber-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const navigate = (direction: "prev" | "next") => {
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % reviews.length;
      }
      return (prev - 1 + reviews.length) % reviews.length;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Opinii oamenilor despre Agroturism Bori
          </h2>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Opiniile oamenilor despre Agroturism Bori
        </h2>

        <div className="relative group">
          <div className="relative h-96">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                    <span className="text-white font-semibold text-xl">
                      {getInitials(review.author_name)}
                    </span>
                  </div>
                  {getStars(review.rating)}
                  <p className="text-gray-600 text-lg mb-6 line-clamp-5">
                    "{review.text}"
                  </p>
                  <div className="mt-auto">
                    <h3 className="font-bold text-gray-800 text-xl mb-1">
                      {review.author_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.relative_time_description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-green-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-green-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

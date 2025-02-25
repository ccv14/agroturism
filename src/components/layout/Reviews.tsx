import React, { useEffect, useState } from "react";
import axios from "axios";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url?: string;
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
        console.log("API Response:", response.data);

        // Check if the response is an array
        if (response.data && Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setError("Invalid response from server.");
        }
      } catch (error) {
        let errorMessage = "Failed to fetch reviews. Please try again later.";
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.error || error.message;
        }
        console.error("❌ Error fetching reviews:", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const getStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Google Reviews
        </h2>
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Google Reviews
      </h2>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex overflow-hidden relative h-96">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full p-6 transition-transform duration-500 ease-in-out transform ${
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : index < currentIndex
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                <div>
                  <div className="flex items-center mb-4">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={`${review.author_name}'s profile`}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/48x48?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full mr-4 bg-gray-300"></div>
                    )}
                    <div>
                      <div className="flex items-center space-x-1">
                        {getStars(review.rating)}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-6 line-clamp-5">
                    {review.text}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">
                    {review.author_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevReview}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-3 hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <button
          onClick={nextReview}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-3 hover:bg-gray-100 transition-colors"
        >
          →
        </button>

        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
  const [direction, setDirection] = useState(0);

  // Container and item animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.7 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Slide animation variants using AnimatePresence
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 1.2 },
    }),
  };

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
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className={`text-2xl ${
            i < rating ? "text-amber-500" : "text-gray-300"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );

  const navigate = (dir: "prev" | "next") => {
    setDirection(dir === "next" ? 1 : -1);
    setCurrentIndex((prev) => {
      const newIndex = dir === "next" ? prev + 1 : prev - 1;
      return (newIndex + reviews.length) % reviews.length;
    });
  };

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.section
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Opinii oamenilor despre Agroturism Bori
          </h2>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Persuasive Text Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Descoperă Experiența Autentică Bucovineană
          </h2>
          <div className="max-w-3xl mx-auto text-xl text-gray-600 space-y-4">
            <p>
              La Agroturism Bori, fiecare oaspete devine parte din povestea
              noastră. Cu o evaluare medie de <strong>4.9/5 stele</strong> pe
              Google, suntem mândri să fim recomandați de peste 95% dintre
              vizitatorii noștri.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                "100% Produse Locale",
                "Experiențe Autentice",
                "Ospitalitate Premium",
              ].map((item) => (
                <motion.div
                  key={item}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-emerald-600 text-2xl mb-2">✓</div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div className="relative group" variants={itemVariants}>
          <div className="relative h-[500px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 h-full flex flex-col items-center text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white font-semibold text-xl">
                      {getInitials(reviews[currentIndex].author_name)}
                    </span>
                  </motion.div>
                  {getStars(reviews[currentIndex].rating)}
                  <motion.p
                    className="text-gray-600 text-lg mb-6 line-clamp-5"
                    whileHover={{ scale: 1.02 }}
                  >
                    "{reviews[currentIndex].text}"
                  </motion.p>
                  <div className="mt-auto">
                    <h3 className="font-bold text-gray-800 text-xl mb-1">
                      {reviews[currentIndex].author_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {reviews[currentIndex].relative_time_description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={() => navigate("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <svg
              className="w-4 h-4 text-emerald-600"
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
          </motion.button>
          <motion.button
            onClick={() => navigate("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <svg
              className="w-4 h-4 text-emerald-600"
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
          </motion.button>

          {/* Pagination Dots */}
          <motion.div
            className="flex justify-center mt-8 space-x-2"
            variants={itemVariants}
          >
            {reviews.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-emerald-600" : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="text-center mt-12 text-gray-600"
          variants={itemVariants}
        >
          <p className="text-sm">
            Toate recenziile sunt preluate direct de la clienții noștri prin
            <span className="text-emerald-600 font-semibold">
              {" "}
              Google Reviews
            </span>
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 0L3 7l1.6 13.1L12 24l7.4-3.9L21 7z"
              />
            </svg>
            <span className="text-sm">Verificat și Securizat</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Reviews;

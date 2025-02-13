import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Smooth fade-up variant for text
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  // Button animation variant
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 },
    },
  };

  // Background animation variant (for a subtle parallax effect)
  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className="relative h-[calc(100vh-4rem)] md:h-screen overflow-hidden"
    >
      {/* Background Container */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl shadow-2xl overflow-hidden transition-transform duration-500 ease-out"
        style={{
          backgroundImage: 'url("assets/img/heroImg.jpg")',
          filter: "brightness(0.65)",
        }}
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03, rotate: 1 }}
      >
        {/* Darker gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 rounded-b-3xl" />
      </motion.div>

      {/* Text Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          className="max-w-4xl px-4"
          initial="hidden"
          animate={controls}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg"
          >
            Colț de Rai
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-xl sm:text-2xl md:text-3xl text-white mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light opacity-95"
          >
            Descoperă armonia perfectă dintre confort și natură în cabana
            noastră de vis
          </motion.p>
          <motion.div variants={buttonVariants}>
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 md:px-10 py-4 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-700/40 group"
            >
              <span>Fă o rezervare</span>
              <svg
                className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Scroll Indicator (Gentle Pulse) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-6 h-10 rounded-full border border-white/50 flex items-center justify-center p-1"
          animate={{ opacity: [1, 0.8, 1], y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-2 h-2 rounded-full bg-white/80"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

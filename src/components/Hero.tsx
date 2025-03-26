import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "./LanguageContent"; // adjust the path as needed

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { language } = useLanguage();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const bgVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className="relative h-[calc(100vh-4rem)] md:h-screen overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl shadow- shadow-bottom"
        style={{
          backgroundImage: 'url("/img/heroImg.jpg")',
          filter: "brightness(0.65)",
        }}
        variants={bgVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 rounded-b-3xl" />
      </motion.div>

      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 text-center px-4">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate={controls}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.h1
            variants={textVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2 md:mb-4 drop-shadow-lg"
          >
            {language === "ro"
              ? "Agroturism Bori Punct Gastronomic Local"
              : "Agrotourism Bori Local Gastronomic Point"}
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed"
          >
            {language === "ro"
              ? "Descoperă frumusețea turismului rural într-un refugiu autentic, unde natura și tradiția se împletesc armonios."
              : "Discover the beauty of rural tourism in an authentic retreat, where nature and tradition blend harmoniously."}
          </motion.p>
          <motion.div variants={buttonVariants}>
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 md:px-8 py-3 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-700/40 group"
            >
              <span>{language === "ro" ? "Fă o rezervare" : "Book Now"}</span>
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

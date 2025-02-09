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

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-screen" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-100 hover:scale-105 transition-transform duration-10000 ease-out rounded-3xl shadow-2xl"
        style={{
          backgroundImage: 'url("assets/img/heroImg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 rounded-3xl" />
      </div>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          className="max-w-4xl px-4"
          initial="hidden"
          animate={controls}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 font-serif drop-shadow-2xl"
          >
            Colț de Rai
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl text-white mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light opacity-90"
          >
            Descoperă armonia perfectă dintre confort și natură în cabana
            noastră de vis
          </motion.p>

          <motion.div variants={fadeUp}>
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center bg-emerald-600/90 hover:bg-emerald-700 text-white px-8 md:px-10 py-4 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-emerald-700/40 group"
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

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-14 rounded-3xl border-4 border-white/50 flex items-start justify-center p-1">
          <div className="w-3 h-3 rounded-full bg-white/80 animate-slide"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

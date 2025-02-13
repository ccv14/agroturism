import { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const images = [
  "/images/mancare4.jpg",
  "/images/mancare2.JPEG",
  "/images/mancare5.jpg",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const prevImage = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="relative w-full h-full overflow-hidden group">
      <motion.div
        key={index}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <img
          src={images[index]}
          alt="Carousel"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
        <motion.button
          onClick={prevImage}
          className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all text-sm sm:text-base"
          whileHover={{ scale: 1.1 }}
        >
          ◀
        </motion.button>
        <motion.button
          onClick={nextImage}
          className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all text-sm sm:text-base"
          whileHover={{ scale: 1.1 }}
        >
          ▶
        </motion.button>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-gray-50">
      <motion.div
        className="w-full max-w-7xl bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden flex flex-col lg:flex-row mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Text Section */}
        <motion.div
          className="flex-1 p-6 sm:p-8 lg:p-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="space-y-4 sm:space-y-6">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-emerald-800 font-serif"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
                Agroturism Bori
              </span>
              <br />
              <span className="text-xl sm:text-2xl text-gray-600">
                Punct Gastronomic Local
              </span>
            </motion.h2>

            <motion.div
              className="space-y-4 sm:space-y-6 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-base sm:text-lg leading-relaxed border-l-4 border-emerald-100 pl-4 italic">
                „Te invităm să descoperi o oază de tradiții autentice, unde
                fiecare masă este o poveste.”
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    title: "Locație unică",
                    text:
                      "În inima Gura Humorului, cu vedere la peisaje impresionante",
                  },
                  {
                    title: "Bucate tradiționale",
                    text:
                      "Sarmale, mămăligă cu brânză de oi, plăcinte proaspete",
                  },
                  {
                    title: "Ingrediente locale",
                    text:
                      "Produse de casă și ingrediente din gospodăriile partenere",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-1 w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                    <p className="text-sm sm:text-base">
                      <strong className="text-emerald-600">
                        {item.title}:
                      </strong>{" "}
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <motion.div
                className="mt-6 sm:mt-8 p-3 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-center text-sm sm:text-lg font-medium">
                  „O experiență gastronomică care trezește amintiri și creează
                  momente de neuitat!”
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          className="flex-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Carousel />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;

import { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const images = [
  "/images/mancare4.jpg",
  "/images/mancare2.jpg",
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
          className="w-full h-full object-cover min-h-[300px]"
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
    <div className="w-full min-h-screen flex items-center bg-gradient-to-br p-4 sm:p-6">
      <motion.div
        className="w-full bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex-1 p-6 sm:p-10 lg:p-12 xl:p-14"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              className="space-y-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-black font-serif leading-tight">
                Agroturism Bori
                <br />
                <span className="text-xl sm:text-2xl text-gray-800 font-sans font-medium mt-2 block">
                  Punct Gastronomic Local
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-900 leading-relaxed border-l-4 border-gray-300 pl-4 italic font-serif">
                „Te invităm să descoperi o oază de tradiții autentice, unde
                fiecare masă este o poveste.”
              </p>
            </motion.div>

            <motion.div
              className="space-y-4 sm:space-y-6 text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                {
                  title: "Locație unică",
                  text:
                    "În inima Gura Humorului, cu vedere la peisaje impresionante",
                },
                {
                  title: "Bucate tradiționale",
                  text: "Sarmale, mămăligă cu brânză de oi, plăcinte proaspete",
                },
                {
                  title: "Ingrediente locale",
                  text:
                    "Produse de casă și ingrediente din gospodăriile partenere",
                },
                {
                  title: "Turism rural",
                  text:
                    "Se practică turism rural autentic, oferind o experiență tradițională și relaxantă.",
                },
                {
                  title: "Experiență unică pentru copii",
                  text:
                    "Copiii se vor bucura de interacțiuni directe cu animalele, într-un mediu natural și plin de aventuri.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <div className="mt-1.5 w-3 h-3 bg-gray-700 rounded-full flex-shrink-0 ring-4 ring-gray-200" />
                  <p className="text-lg sm:text-xl leading-relaxed">
                    <strong className="text-black font-semibold">
                      {item.title}
                    </strong>
                    <span className="block text-gray-800 mt-1 sm:mt-1.5">
                      {item.text}
                    </span>
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-8 p-5 sm:p-6 bg-gray-50 rounded-xl border border-gray-100"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-center text-lg sm:text-xl text-gray-900 italic font-serif leading-relaxed">
                „O experiență gastronomică care trezește amintiri și creează
                momente de neuitat!”
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 relative aspect-[4/3] lg:aspect-[3/4] xl:aspect-square"
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

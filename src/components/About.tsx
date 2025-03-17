import { motion } from "framer-motion";
import Stack from "./Stack/Stack";
import { useLanguage } from "./LanguageContent"; // Corrected import path
import { translations } from "./translations"; // Import translations

const About = () => {
  const { language } = useLanguage();
  const t = translations[language]; // Get translations for current language

  const features = [
    t.features.localProducts,
    t.features.airConditioned,
    t.features.parking,
    t.features.accessibility,
    t.features.wifi,
    t.features.activities,
  ];

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className="w-full min-h-[60vh] md:min-h-[80vh] py-12">
      {/* New Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r text-black bg-clip-text"
      >
        {t.about.pageTitle}
      </motion.h1>

      <motion.div
        className="max-w-8xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        {/* Image Stack Section */}
        <motion.div
          className="order-first lg:-ml-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
            <Stack>
              <motion.div
                className="absolute w-full h-[60%] md:w-[85%] md:h-[85%] left-0 top-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg z-10"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <img
                  src="/images/mancare4.jpg"
                  alt={t.images.traditionalFood}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                className="absolute w-full h-[60%] md:w-[85%] md:h-[85%] right-0 bottom-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <img
                  src="/images/mancare2.jpg"
                  alt={t.images.interior}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </Stack>
          </div>
        </motion.div>

        {/* Text Content Section */}
        <motion.article
          className="space-y-6 md:space-y-8 text-black lg:pl-8 xl:pl-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <motion.header className="space-y-4 md:space-y-5">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight"
              initial={{ x: -30 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              {t.about.title}
              <motion.span
                className="block text-xl sm:text-2xl md:text-3xl mt-2 md:mt-4 font-sans font-medium text-emerald-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                {t.about.subtitle}
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl leading-relaxed text-gray-600 italic mt-4 md:mt-6 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              {t.about.quote}
            </motion.p>
          </motion.header>

          {/* Description List */}
          <motion.div
            className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 max-w-3xl"
            variants={childVariants}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Așezat în poalele Carpaților, Agroturism Bori te invită la o
              experiență autentică:
            </motion.p>
            <motion.ul
              className="space-y-2 md:space-y-3 pl-4 md:pl-6"
              variants={containerVariants}
            >
              {[
                "Bucătărie tradițională cu rețete transmise generații la rând",
                "Turism eco-responsabil și practici sustenabile",
                "Workshop-uri de meșteșuguri populare",
                "Povești de-a dreptul din sufletul Bucovinei",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="relative before:content-['▹'] before:absolute before:-left-4 md:before:-left-5 before:top-1 before:text-emerald-600"
                  variants={childVariants}
                  whileHover={{ x: 10 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Features Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 md:p-4 bg-emerald-50 rounded-lg md:rounded-xl border border-emerald-100 hover:border-emerald-200 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <span className="text-base md:text-lg text-gray-800 whitespace-normal">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.article>
      </motion.div>
    </section>
  );
};

export default About;

import { motion } from "framer-motion";
import Stack from "./Stack/Stack";

const About = () => {
  const features = [
    "Produse 100% locale și organice",
    "Spații climatizate",
    "Parcare privată",
    "Accesibilitate persoane cu dizabilități",
    "Wi-Fi gratuit",
    "Activități educative pentru copii",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        duration: 0.7,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        duration: 0.4,
      },
    },
  };

  return (
    <section className="w-full min-h-[60vh] md:min-h-[80vh] py-12">
      <motion.div
        className="max-w-8xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Image Stack Section */}
        <motion.div className="order-first lg:-ml-8" variants={childVariants}>
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
            <Stack>
              <motion.div
                className="absolute w-full h-[60%] md:w-[85%] md:h-[85%] left-0 top-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg z-10"
                variants={imageVariants}
              >
                <motion.img
                  src="/images/mancare4.jpg"
                  alt="Preparate tradiționale Bori"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileInView={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Title Motion Div placed over the card */}
              </motion.div>

              <motion.div
                className="absolute w-full h-[60%] md:w-[85%] md:h-[85%] right-0 bottom-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg"
                variants={imageVariants}
              >
                <motion.img
                  src="/images/mancare2.jpg"
                  alt="Interior agroturism Bori"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileInView={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Stack>
          </div>
        </motion.div>

        {/* Text Content Section */}
        <motion.article
          className="space-y-6 md:space-y-8 text-black lg:pl-8 xl:pl-12"
          variants={containerVariants}
        >
          <motion.header
            className="space-y-4 md:space-y-5"
            variants={childVariants}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight"
              initial={{ x: -30 }}
              whileInView={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120, duration: 0.4 }}
            >
              Ce este Agroturism Bori?
              <motion.span
                className="block text-xl sm:text-2xl md:text-3xl mt-2 md:mt-4 font-sans font-medium text-emerald-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Oază de tradiție în inima Bucovinei
              </motion.span>
            </motion.h1>

            <motion.div
              className="w-16 md:w-24 h-1 md:h-1.5 bg-emerald-600 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />

            <motion.p
              className="text-lg md:text-xl leading-relaxed text-gray-600 italic mt-4 md:mt-6 max-w-2xl"
              initial={{ rotate: -1, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, duration: 0.4 }}
            >
              „La noi, fiecare masă e o poveste și fiecare oaspete devine parte
              din familie”
            </motion.p>
          </motion.header>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 md:p-4 bg-emerald-50 rounded-lg md:rounded-xl border border-emerald-100 hover:border-emerald-200 transition-colors"
                variants={childVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <motion.svg
                  className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    delay: index * 0.1,
                    duration: 0.3,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
                <span className="text-base md:text-lg text-gray-800 whitespace-normal">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

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
        </motion.article>
      </motion.div>
    </section>
  );
};

export default About;

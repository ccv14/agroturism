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

  return (
    <section className="w-full min-h-[60vh] md:min-h-[80vh] py-12">
      <motion.div
        className="max-w-8xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Wrapped images in Stack */}
        <Stack className="relative h-[400px] sm:h-[500px] md:h-[600px] order-first lg:-ml-8">
          {/* Top Image */}
          <motion.div
            className="absolute w-full h-[60%] md:w-[85%] md:h-[85%] left-0 top-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg z-10"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/images/mancare4.jpg"
              alt="Preparate tradiționale Bori"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Bottom Image */}
          <motion.div
            className="absolute w-full h-[60%] md:w-[85%] md:h-[85%] right-0 bottom-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg"
            initial={{ rotate: 3 }}
            whileInView={{ rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <img
              src="/images/mancare2.jpg"
              alt="Interior agroturism Bori"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </Stack>

        {/* Text Section */}
        <motion.article
          className="space-y-6 md:space-y-8 text-black lg:pl-8 xl:pl-12"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.header
            className="space-y-4 md:space-y-5"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight">
              Agroturism Bori
              <span className="block text-xl sm:text-2xl md:text-3xl mt-2 md:mt-4 font-sans font-medium text-emerald-600">
                Oază de tradiție în inima Bucovinei
              </span>
            </h1>
            <div className="w-16 md:w-24 h-1 md:h-1.5 bg-emerald-600 rounded-full" />
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 italic mt-4 md:mt-6 max-w-2xl">
              „La noi, fiecare masă e o poveste și fiecare oaspete devine parte
              din familie”
            </p>
          </motion.header>

          {/* Responsive Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 md:p-4 bg-emerald-50 rounded-lg md:rounded-xl border border-emerald-100 hover:border-emerald-200 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
                <span className="text-base md:text-lg text-gray-800">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Responsive Description */}
          <motion.div
            className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              Așezat în poalele Carpaților, Agroturism Bori te invită la o
              experiență autentică:
            </p>
            <ul className="space-y-2 md:space-y-3 pl-4 md:pl-6">
              <li className="relative before:content-['▹'] before:absolute before:-left-4 md:before:-left-5 before:top-1 before:text-emerald-600">
                Bucătărie tradițională cu rețete transmise generații la rând
              </li>
              <li className="relative before:content-['▹'] before:absolute before:-left-4 md:before:-left-5 before:top-1 before:text-emerald-600">
                Turism eco-responsabil și practici sustenabile
              </li>
              <li className="relative before:content-['▹'] before:absolute before:-left-4 md:before:-left-5 before:top-1 before:text-emerald-600">
                Workshop-uri de meșteșuguri populare
              </li>
              <li className="relative before:content-['▹'] before:absolute before:-left-4 md:before:-left-5 before:top-1 before:text-emerald-600">
                Povești de-a dreptul din sufletul Bucovinei
              </li>
            </ul>
          </motion.div>
        </motion.article>
      </motion.div>
    </section>
  );
};

export default About;

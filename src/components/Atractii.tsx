import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContent";
import { translations } from "./translations";

const Attractions: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const attractions = [
    {
      title: t.attractions.voronet.title,
      description: t.attractions.voronet.description,
      image: "/img/manasitre.jpg",
    },
    {
      title: t.attractions.piatraSoimului.title,
      description: t.attractions.piatraSoimului.description,
      image: "/img/piatra-soimului.jpg",
    },
    {
      title: t.attractions.festival.title,
      description: t.attractions.festival.description,
      image: "/img/festival.jpg",
    },
    {
      title: t.attractions.muzeu.title,
      description: t.attractions.muzeu.description,
      image: "/img/satul-bucovinean.webp",
    },
    {
      title: t.attractions.cascada.title,
      description: t.attractions.cascada.description,
      image: "/img/Cascada-cailor.webp",
    },
    {
      title: t.attractions.cheileBicazului.title,
      description: t.attractions.cheileBicazului.description,
      image: "/img/Cheile-bicazului.webp",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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

  return (
    <section id="attractions" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.h3
        className="text-3xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {t.sections.attractions}
      </motion.h3>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
      >
        {attractions.map((attraction, index) => (
          <motion.div
            key={index}
            className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500"
            onClick={() => toggleExpand(index)}
            variants={childVariants}
          >
            <img
              src={attraction.image}
              alt={attraction.title}
              className="w-full h-56 object-cover transition-transform duration-500"
            />
            <div className="p-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                {attraction.title}
              </h4>
              <motion.div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedIndex === index
                    ? "max-h-96 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
                variants={childVariants}
              >
                <p className="text-gray-600 mt-2">{attraction.description}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Attractions;

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContent";
import { translations } from "./translations";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 0.5,
    },
  },
};

const iconVariants = {
  hover: { scale: 1.1, rotate: -3 },
  tap: { scale: 0.95 },
};

const BookingForm: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error(t.booking.errors.requiredFields);
      return;
    }

    try {
      setIsLoading(true);
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        { from_name: name, from_email: email, message },
        "YOUR_USER_ID"
      );
      toast.success(t.booking.success);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(t.booking.errors.general);
      console.error("EmailJS error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={childVariants}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r text-black bg-clip-text "
      >
        {t.booking.pageTitle}
      </motion.h1>

      <motion.div
        className="max-w-7xl mx-auto p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200 bg-white/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {/* Form Section */}
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.h2
              className="text-3xl font-bold text-slate-900 mb-4 font-serif text-center lg:text-left bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
              variants={childVariants}
            >
              {t.booking.title}
            </motion.h2>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
              >
                {/* Name Input */}
                <motion.div className="space-y-2" variants={childVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700/90"
                  >
                    {t.booking.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder={t.booking.form.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 placeholder-slate-400/80 transition-all duration-300 hover:border-emerald-400 shadow-sm bg-white/80"
                    required
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div className="space-y-2" variants={childVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700/90"
                  >
                    {t.booking.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t.booking.form.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 placeholder-slate-400/80 transition-all duration-300 hover:border-emerald-400 shadow-sm bg-white/80"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Message Input */}
              <motion.div className="space-y-2" variants={childVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700/90"
                >
                  {t.booking.form.message}
                </label>
                <textarea
                  id="message"
                  placeholder={t.booking.form.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 placeholder-slate-400/80 transition-all duration-300 hover:border-emerald-400 shadow-sm resize-none bg-white/80"
                  rows={4}
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div className="pt-2" variants={childVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-white py-4 px-6 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-300/40 transition-all duration-300 relative overflow-hidden"
                  whileHover={!isLoading ? { scale: 1.02 } : undefined}
                  whileTap={!isLoading ? { scale: 0.98 } : undefined}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      <span className="text-sm">{t.booking.form.sending}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ gap: "0.75rem" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-sm">{t.booking.form.submit}</span>
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Section */}
          <motion.div className="space-y-4" variants={containerVariants}>
            <div className="p-5 rounded-2xl shadow-lg border border-gray-200 bg-white/80">
              <motion.h3
                className="text-2xl font-bold text-slate-900 mb-5 font-serif text-center bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
                variants={childVariants}
              >
                {t.booking.contactTitle}
              </motion.h3>
              <motion.div className="space-y-4" variants={containerVariants}>
                {/* Phone */}
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 bg-white hover:bg-emerald-50/30 border border-gray-100 hover:border-emerald-100"
                  variants={childVariants}
                  whileHover={{ translateY: -2 }}
                >
                  <motion.div
                    className="p-2.5 rounded-xl bg-emerald-100/50 backdrop-blur-sm"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700/90 mb-1">
                      {t.booking.contact.phone}
                    </p>
                    <a
                      href="tel:+40 741 680 696"
                      className="text-slate-600/90 text-sm hover:text-emerald-600 transition-colors"
                    >
                      +40 741 680 696
                    </a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 bg-white hover:bg-emerald-50/30 border border-gray-100 hover:border-emerald-100"
                  variants={childVariants}
                  whileHover={{ translateY: -2 }}
                >
                  <motion.div
                    className="p-2.5 rounded-xl bg-emerald-100/50 backdrop-blur-sm"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700/90 mb-1">
                      {t.booking.contact.email}
                    </p>
                    <a
                      href="mailto:stefancuandreiii86@yahoo.ro"
                      className="text-slate-600/90 text-sm hover:text-emerald-600 transition-colors"
                    >
                      stefancuandreiii86@yahoo.ro
                    </a>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 bg-white hover:bg-emerald-50/30 border border-gray-100 hover:border-emerald-100"
                  variants={childVariants}
                  whileHover={{ translateY: -2 }}
                >
                  <motion.div
                    className="p-2.5 rounded-xl bg-emerald-100/50 backdrop-blur-sm"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700/90 mb-1">
                      {t.booking.contact.address}
                    </p>
                    <p className="text-slate-600/90 text-sm leading-relaxed">
                      Str. Boureni 117,
                      <br />
                      Gura Humorului 725300
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              className="h-64 w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg relative group"
              variants={childVariants}
              whileHover={{ scale: 1.005 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-emerald-100/20 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.925840988251!2d25.870393376742626!3d47.569231290556736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4735af1e626ec857%3A0x9d44eb1b9da73c0a!2sAgroturism%20Bori%20Punct%20Gastronomic%20Local!5e0!3m2!1sro!2sro!4v1739094916138!5m2!1sro!2sro"
                width="100%"
                height="100%"
                className="rounded-lg transform transition-transform duration-300 group-hover:scale-[1.02]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BookingForm;

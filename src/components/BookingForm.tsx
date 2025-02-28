import React, { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

// Container variant for staggering child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Child variant for fade-in and slide-up with spring physics
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, duration: 0.7 },
  },
};

const BookingForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        { from_name: name, from_email: email, message },
        "YOUR_USER_ID" // Replace with your EmailJS user ID
      );
      toast.success("Your message has been sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200" // increased width, reduced padding
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
            className="text-3xl font-bold text-slate-900 mb-4 font-serif text-center lg:text-left"
            variants={childVariants}
          >
            Creeaza o rezervare!
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 placeholder-slate-400 transition-all duration-300 hover:border-emerald-500 shadow-sm"
                  required
                />
              </motion.div>
              {/* Email Input */}
              <motion.div className="space-y-2" variants={childVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 placeholder-slate-400 transition-all duration-300 hover:border-emerald-500 shadow-sm"
                  required
                />
              </motion.div>
            </motion.div>

            {/* Message Input */}
            <motion.div className="space-y-2" variants={childVariants}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Tell us about your desired stay dates and any special requests..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 placeholder-slate-400 transition-all duration-300 hover:border-emerald-500 shadow-sm resize-none"
                rows={4} // reduced rows for less height
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div className="pt-2" variants={childVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg text-base font-semibold hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Trimite cererea de rezervare
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Contact Section */}
        <motion.div className="space-y-4" variants={containerVariants}>
          <div className="p-4 rounded-2xl shadow-lg border border-gray-200">
            <motion.h3
              className="text-2xl font-bold text-slate-900 mb-4 font-serif text-center"
              variants={childVariants}
            >
              Contacteaza-ne!
            </motion.h3>
            <motion.div className="space-y-3" variants={containerVariants}>
              {/* Phone */}
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                variants={childVariants}
              >
                <div className="p-2 rounded-md">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1"
                    />
                  </svg>
                </div>
                <span className="text-slate-700 text-sm">
                  <a
                    href="tel:+40 741 680 696"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    +40 741 680 696
                  </a>
                </span>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                variants={childVariants}
              >
                <div className="p-2 rounded-md">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-slate-700 text-sm">
                  <a
                    href="mailto:stefancuandrei86@gmail.com"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    stefancuandrei86@gmail.com
                  </a>
                </span>
              </motion.div>

              {/* Address */}
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                variants={childVariants}
              >
                <div className="p-2 rounded-md">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-slate-700 text-sm">
                  Str. Boureni 117,
                  <br />
                  Gura Humorului 725300
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            className="h-64 w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-md" // reduced height
            variants={childVariants}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.925840988251!2d25.870393376742626!3d47.569231290556736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4735af1e626ec857%3A0x9d44eb1b9da73c0a!2sAgroturism%20Bori%20Punct%20Gastronomic%20Local!5e0!3m2!1sro!2sro!4v1739094916138!5m2!1sro!2sro"
              width="100%"
              height="100%"
              className="rounded-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BookingForm;

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: name,
          from_email: email,
          message: message,
        },
        "YOUR_USER_ID"
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
    <div
      className={`max-w-7xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-2xl transform transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 font-serif text-center lg:text-left animate-fade-in-up">
            Creeaza o rezervare!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-3 animate-fade-in-up delay-100">
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
                  className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-amber-100 focus:border-amber-600 placeholder-slate-400 transition-all duration-300 hover:border-amber-400 shadow-sm"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-3 animate-fade-in-up delay-150">
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
                  className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-amber-100 focus:border-amber-600 placeholder-slate-400 transition-all duration-300 hover:border-amber-400 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-3 animate-fade-in-up delay-200">
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
                className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-amber-100 focus:border-amber-600 placeholder-slate-400 transition-all duration-300 hover:border-amber-400 shadow-sm resize-none"
                rows={5}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 animate-fade-in-up delay-300">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-700 text-white py-3 px-6 rounded-lg text-base font-semibold hover:bg-amber-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-amber-200/40 active:scale-[0.98]"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
            </div>
          </form>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <div className="bg-amber-50 p-6 rounded-2xl shadow-lg border border-amber-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 font-serif text-center animate-fade-in-up">
              Contacteaza-ne!
            </h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up delay-100">
                <div className="p-2 bg-amber-100 rounded-md">
                  <svg
                    className="w-5 h-5 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-slate-700 text-sm">
                  <a
                    href="tel:+40 741 680 696"
                    className="hover:text-amber-700 transition-colors"
                  >
                    +40 741 680 696
                  </a>
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up delay-200">
                <div className="p-2 bg-amber-100 rounded-md">
                  <svg
                    className="w-5 h-5 text-amber-700"
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
                    className="hover:text-amber-700 transition-colors"
                  >
                    stefancuandrei86@gmail.com
                  </a>
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up delay-300">
                <div className="p-2 bg-amber-100 rounded-md">
                  <svg
                    className="w-5 h-5 text-amber-700"
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
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-80 w-full rounded-xl overflow-hidden border-2 border-amber-100 shadow-md animate-fade-in-up delay-400">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.925840988251!2d25.870393376742626!3d47.569231290556736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4735af1e626ec857%3A0x9d44eb1b9da73c0a!2sAgroturism%20Bori%20Punct%20Gastronomic%20Local!5e0!3m2!1sro!2sro!4v1739094916138!5m2!1sro!2sro"
              width="100%"
              height="100%"
              className="rounded-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

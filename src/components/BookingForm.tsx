import React, { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";

const BookingForm = () => {
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

      // Send the email using EmailJS
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          from_name: name,
          from_email: email,
          message: message,
        },
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
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl mx-auto flex flex-col sm:flex-row gap-8 transform transition-all duration-300 hover:shadow-3xl">
      {/* Booking Form */}
      <div className="w-full sm:w-1/2">
        <h2 className="text-3xl font-bold text-emerald-700 mb-8 font-serif text-center sm:text-left">
          Make a Reservation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Section */}
          <div className="space-y-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-800 mb-2 tracking-wide"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Numele Dumneavoastra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 placeholder-gray-400/80 transition-all duration-300 hover:border-emerald-400 shadow-sm"
              required
            />
          </div>

          {/* Email Section */}
          <div className="space-y-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-800 mb-2 tracking-wide"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 placeholder-gray-400/80 transition-all duration-300 hover:border-emerald-400 shadow-sm"
              required
            />
          </div>

          {/* Message Section */}
          <div className="space-y-4">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-800 mb-2 tracking-wide"
            >
              Your message
            </label>
            <textarea
              id="message"
              placeholder="Mesajul Dumneavoastra"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-5 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 placeholder-gray-400/80 transition-all duration-300 hover:border-emerald-400 shadow-sm resize-none"
              rows={8}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-200/50 active:scale-95"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white"
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
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                  Confirm Reservation
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information and Google Map */}
      <div className="w-full sm:w-1/2 bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl shadow-lg flex flex-col gap-8 border border-emerald-100">
        <div>
          <h3 className="text-2xl font-bold text-emerald-800 mb-6 font-serif text-center">
            Contact US!
          </h3>
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <i className="fas fa-phone-alt text-emerald-600 text-xl w-6 h-6"></i>
              </div>
              <span className="text-gray-700 font-medium">
                <a
                  href="tel:+40 741 680 696"
                  className="hover:text-emerald-700 transition-colors"
                >
                  +40 741 680 696
                </a>
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <i className="fas fa-envelope text-emerald-600 text-xl w-6 h-6"></i>
              </div>
              <span className="text-gray-700 font-medium">
                <a
                  href="mailto:stefancuandrei86@gmail.com"
                  className="hover:text-emerald-700 transition-colors"
                >
                  stefancuandrei86@gmail.com
                </a>
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <i className="fas fa-map-marker-alt text-emerald-600 text-xl w-6 h-6"></i>
              </div>
              <span className="text-gray-700 font-medium">
                Str. Boureni 117, Gura Humorului 725300
              </span>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="flex-1 h-96 w-full rounded-xl overflow-hidden border-2 border-emerald-100 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.925840988251!2d25.870393376742626!3d47.569231290556736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4735af1e626ec857%3A0x9d44eb1b9da73c0a!2sAgroturism%20Bori%20Punct%20Gastronomic%20Local!5e0!3m2!1sro!2sro!4v1739094916138!5m2!1sro!2sro"
            width="100%"
            height="100%"
            className="rounded-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

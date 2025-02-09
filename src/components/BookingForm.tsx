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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto flex flex-col sm:flex-row gap-6">
      {/* Booking Form */}
      <div className="w-full sm:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Numele Dumneavoastra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email-ul Dumneavoastra"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Mesajul Dumneavoastra"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={10}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg text-sm sm:text-base hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                "Creeaza Rezervareagit"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information and Google Map */}
      <div className="w-full sm:w-1/2 bg-gray-50 p-4 rounded-lg shadow-lg flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-semibold text-emerald-600 mb-4">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7 7 7-7"
                />
              </svg>
              <span className="ml-2">
                <a href="tel:+40 741 680 696" className="text-lg">
                  Phone: +40 741 680 696
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12l-6 6m0 0l-6-6m6 6V5"
                />
              </svg>
              <span className="ml-2">
                <a
                  href="mailto:stefancuandrei86@gmail.com?subject=Inquiry&body=Buna ziua , Doresc sa fac o rezervare"
                  className="text-lg"
                >
                  Email: stefancuandrei86@gmail.com
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="ml-2">
                Str. Boureni 117, Gura Humorului 725300{" "}
              </span>
            </div>
          </div>
        </div>

        {/* Google Map iframe */}
        <div className="h-64 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.925840988251!2d25.870393376742626!3d47.569231290556736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4735af1e626ec857%3A0x9d44eb1b9da73c0a!2sAgroturism%20Bori%20Punct%20Gastronomic%20Local!5e0!3m2!1sro!2sro!4v1739094916138!5m2!1sro!2sro"
            width="100%"
            height="100%"
            style={{ border: 0 }}
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

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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg  mx-auto flex flex-col sm:flex-row gap-6">
      {/* Booking Form */}
      <div className="w-full sm:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={4}
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
                "Submit Booking Request"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="w-full sm:w-1/2 bg-gray-50 p-4 rounded-lg shadow-lg">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12l-6 6m0 0l-6-6m6 6V5"
              />
            </svg>
            <span className="ml-2">Email: contact@example.com</span>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="ml-2">Address: 123 Example St, City, Country</span>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12l-6 6m0 0l-6-6m6 6V5"
              />
            </svg>
            <span className="ml-2">Reception Phone: +1 234 567 891</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

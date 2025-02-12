import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Update isScrolled based on window scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section and close mobile menu if open
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "More", id: "more" },
    { label: "Booking", id: "booking" },
    { label: "Reviews", id: "reviews" },
  ];

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full">
      {/* Main navbar container */}
      <div
        className={`transition-all duration-500 rounded-full px-6 py-3 mx-auto max-w-7xl ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="assets/img/logo.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <span
              className={`font-bold text-xl ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Agroturism Bori
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors ease-in-out hover:text-emerald-600 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className={`transition-colors ease-in-out ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center transition-all duration-300 ease-in-out z-50">
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-gray-800 transition-colors ease-in-out hover:text-emerald-600"
          >
            <X size={24} strokeWidth={2} />
          </button>
          {/* Navigation items */}
          <ul className="space-y-8 text-center">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-2xl text-gray-800 transition-colors ease-in-out hover:text-emerald-600"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

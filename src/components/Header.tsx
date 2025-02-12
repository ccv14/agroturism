import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Update isScrolled based on window scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track the section currently in view
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry.target.id, entry.isIntersecting); // Add logging to track the section
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3, // Adjust this
        rootMargin: "-20px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "More", id: "more" },
    { label: "Booking", id: "booking" },
    { label: "Reviews", id: "reviews" },
  ];

  // Unified style function for text colors
  const getTextColor = (id: string) => {
    const baseColor = isScrolled ? "text-gray-800" : "text-white";
    const activeColor = "text-emerald-600";
    return `transition-colors duration-300 ${
      activeSection === id ? activeColor : baseColor
    } hover:text-emerald-600`;
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full">
      <div
        className={`transition-all duration-500 rounded-full px-6 py-3 mx-auto max-w-7xl ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src="assets/img/logo.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            {/* Agroturism Bori text color logic */}
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
                className={getTextColor(item.id)}
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
              className={getTextColor(activeSection)}
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center transition-all duration-300 ease-in-out z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-gray-800 hover:text-emerald-600 transition-colors"
          >
            <X size={24} strokeWidth={2} />
          </button>
          <ul className="space-y-8 text-center">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-2xl ${getTextColor(item.id)}`}
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

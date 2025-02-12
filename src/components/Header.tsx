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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
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
    const activeColor = "text-emerald-600"; // Active color (green)
    const baseColor = isScrolled ? "text-black" : "text-white"; // Default color for links changes to black if scrolled
    const mobileBaseColor = "text-gray-800"; // Mobile color, set to a darker shade for visibility
    const color = isMenuOpen ? mobileBaseColor : baseColor; // If menu is open, use mobileBaseColor

    return `transition-colors duration-300 ${
      activeSection === id ? activeColor : color
    } hover:text-emerald-600`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-all duration-500 ease-in-out">
      <div
        className={`${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        } rounded-full px-6 py-3 mx-auto max-w-7xl transition-all duration-500`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
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
                className={getTextColor(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className={`${isScrolled ? "text-black" : "text-white"}`} // Hamburger button becomes black on scroll
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Side menu */}
          <div className="bg-white w-[30%] h-full p-6 space-y-8 flex flex-col justify-start">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="text-gray-800 hover:text-emerald-600 transition-colors"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            <ul className="flex flex-col items-start space-y-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-2xl font-semibold ${getTextColor(
                      item.id
                    )}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

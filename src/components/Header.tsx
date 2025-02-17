import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for sections
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
      { threshold: 0.3, rootMargin: "-20px 0px" }
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

  // Funcție pentru generarea culorii textului, adăugând și font-ul personalizat
  const getTextColor = (id: string) => {
    const activeColor = "text-emerald-600";
    const baseColor = isScrolled ? "text-black" : "text-white";
    const mobileBaseColor = "text-gray-800";
    const color = isMenuOpen ? mobileBaseColor : baseColor;

    return `font-poppins transition-colors duration-300 ${
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
              className="h-8 w-8 object-contain transition-transform duration-300 hover:scale-110"
            />
            <span
              className={`font-poppins font-bold text-xl ${
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
              className={`${
                isScrolled ? "text-black" : "text-white"
              } transition-transform duration-300 hover:scale-110`}
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen
            ? "bg-black/30 backdrop-blur-sm pointer-events-auto"
            : "bg-transparent backdrop-blur-none pointer-events-none"
        }`}
      >
        {/* Side menu with sliding animation */}
        <div
          className={`absolute left-0 top-0 h-full w-3/4 max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            {/* Logo and Name at the Top */}
            <div className="flex items-center space-x-3 mb-8">
              <img
                src="assets/img/logo.png"
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-poppins text-2xl font-bold text-gray-800">
                Agroturism Bori
              </span>
            </div>

            {/* Close button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Menu items with staggered animation */}
            <ul className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <li
                  key={item.label}
                  className="overflow-hidden"
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-2xl font-poppins font-medium px-4 py-3 rounded-lg transition-all duration-300 transform ${
                      activeSection === item.id
                        ? "bg-emerald-100 text-emerald-600"
                        : "text-gray-800 hover:bg-gray-100"
                    } ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Optional footer */}
            <div className="mt-auto pt-8 border-t border-gray-100">
              <p className="font-poppins text-gray-500 text-sm">
                © 2024 Agroturism Bori
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

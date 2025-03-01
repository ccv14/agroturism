import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "More", id: "more" },
    { label: "Attractions", id: "atractii" },
    { label: "Booking", id: "booking" },
    { label: "Reviews", id: "reviews" },
  ];

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  // Update scroll state for header background change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver: determine the active section based on highest visibility
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const maxEntry = visibleEntries.reduce((prev, current) =>
          prev.intersectionRatio > current.intersectionRatio ? prev : current
        );
        setActiveSection((maxEntry.target as HTMLElement).id);
      }
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: Array.from(Array(11), (_, i) => i / 10), // [0, 0.1, ..., 1]
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sectionIds = navItems.map((item) => item.id);
    const sections = Array.from(
      document.querySelectorAll("section")
    ).filter((section) => sectionIds.includes(section.id));
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Determine the text color based on scroll state and active section
  const getTextColor = (id: string) => {
    const baseColor = isScrolled ? "text-gray-800" : "text-white";
    return `font-poppins transition-colors duration-300 ${
      activeSection === id ? "text-emerald-600" : baseColor
    }`;
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="assets/img/logo.png"
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform"
            />
            <span
              className={`font-poppins text-xl sm:text-2xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Agroturism Bori
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <ul className="flex space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`${getTextColor(
                      item.id
                    )} hover:text-emerald-500 text-sm lg:text-base`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        className="h-0.5 bg-emerald-600 mt-1"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${isScrolled ? "text-gray-800" : "text-white"}`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="w-3/4 max-w-xs bg-white h-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <img
                      src="assets/img/logo.png"
                      alt="Logo"
                      className="h-10 w-10"
                    />
                    <span className="font-poppins text-xl font-bold text-gray-800">
                      Agroturism Bori
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-800"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-lg ${
                            activeSection === item.id
                              ? "bg-emerald-100 text-emerald-600"
                              : "text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    © 2024 Agroturism Bori
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContent";

// Inline SVG Icons
const MenuIcon: React.FC<{ className?: string }> = React.memo(({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
));

const XIcon: React.FC<{ className?: string }> = React.memo(({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));

const ChevronDownIcon: React.FC<{ className?: string }> = React.memo(({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
));

// Helper component to render flag icons using inline SVG
const FlagIcon: React.FC<{ lang: "ro" | "en"; className?: string }> = ({
  lang,
  className,
}) => {
  return lang === "ro" ? (
    <svg
      viewBox="0 0 3 2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="1" height="2" fill="#002B7F" />
      <rect width="1" height="2" x="1" fill="#FCD116" />
      <rect width="1" height="2" x="2" fill="#CE1126" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <clipPath id="t">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath="url(#t)">
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showLangOptions, setShowLangOptions] = useState<boolean>(false);

  // Get language context
  const { language, setLanguage } = useLanguage();

  // Language-specific nav items
  const navItemsEN = [
    { label: "Home", id: "home" },
    { label: "More", id: "more" },
    { label: "Attractions", id: "atractii" },
    { label: "Booking", id: "booking" },
    { label: "Reviews", id: "reviews" },
  ];
  const navItemsRO = [
    { label: "Acasă", id: "home" },
    { label: "Mai multe", id: "more" },
    { label: "Atracții", id: "atractii" },
    { label: "Rezervări", id: "booking" },
    { label: "Recenzii", id: "reviews" },
  ];
  const navItems = language === "ro" ? navItemsRO : navItemsEN;

  // Function to update language and close dropdown
  const selectLanguage = (lang: "ro" | "en") => {
    setLanguage(lang);
    setShowLangOptions(false);
  };

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

  // IntersectionObserver: determine the active section
  useEffect(() => {
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
        rootMargin: "0px 0px -45% 0px",
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      if (navItems.some((item) => item.id === section.id)) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
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

  // Improved Language Switcher Component
  const LanguageSwitcher = () => (
    <div className="relative">
      <button
        onClick={() => setShowLangOptions(!showLangOptions)}
        className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
          isScrolled
            ? "bg-white hover:bg-gray-100"
            : "bg-white/20 hover:bg-white/30"
        }`}
      >
        <FlagIcon lang={language} className="w-5 h-5" />
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            showLangOptions ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {showLangOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden"
          >
            <button
              onClick={() => selectLanguage("ro")}
              className={`w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 ${
                language === "ro" ? "bg-gray-50" : ""
              }`}
            >
              <FlagIcon lang="ro" className="w-5 h-5" />
              <span>Română</span>
            </button>
            <button
              onClick={() => selectLanguage("en")}
              className={`w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 ${
                language === "en" ? "bg-gray-50" : ""
              }`}
            >
              <FlagIcon lang="en" className="w-5 h-5" />
              <span>English</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
              src="/img/logo.png"
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

          {/* Desktop Navigation (visible on lg and up) */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            <ul className="flex space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`${getTextColor(
                      item.id
                    )} hover:text-emerald-500 text-sm lg:text-base relative pb-2`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 w-full"
                        layoutId="underline"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Toggle (visible on screens smaller than lg) */}
          <div className="flex lg:hidden items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-all ${
                isScrolled
                  ? "bg-white hover:bg-gray-100"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
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
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
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
                    <XIcon className="w-6 h-6" />
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

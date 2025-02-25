// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Derulează la începutul paginii la fiecare schimbare de URL
  }, [location]);

  return null; // Nu va reda nimic vizibil pe pagină
};

export default ScrollToTop;

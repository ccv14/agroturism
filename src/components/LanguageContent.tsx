import React, { createContext, useState, useContext } from "react";

type LanguageContextType = {
  language: "ro" | "en";
  setLanguage: (lang: "ro" | "en") => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "ro",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"ro" | "en">(() => {
    // Get stored language or default to 'ro'
    const storedLang = localStorage.getItem("appLanguage");
    return storedLang ? (storedLang as "ro" | "en") : "ro";
  });

  const handleSetLanguage = (lang: "ro" | "en") => {
    localStorage.setItem("appLanguage", lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

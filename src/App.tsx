import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";
import { Toaster } from "react-hot-toast";
import About from "./components/About";
import Footer from "./components/Footer";
import Reviews from "./components/layout/Reviews";
import Attractions from "./components/Atractii";
import { LanguageProvider } from "./components/LanguageContent";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Toaster position="top-center" />
        <Header />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="more" className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <About />
            </div>
          </section>
          <section id="atractii" className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <Attractions />
            </div>
          </section>
          <section id="booking" className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"></h2>
              <BookingForm />
            </div>
          </section>
          <section id="reviews" className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <Reviews />
          </section>
        </main>
        <section id="footer">
          <Footer />
        </section>
      </div>
    </LanguageProvider>
  );
}

export default App;

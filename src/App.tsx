import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";
import { Toaster } from "react-hot-toast";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Reviews from "./components/layout/Reviews";
import Attractions from "./components/Atractii";

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="more" className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Descoperă Agroturism Bori
            </h2>

            <section id="about">
              <About /> {/*About section <-*/}
            </section>

            <section id="atractii">
              <Attractions />
            </section>
          </div>
        </section>

        <section id="booking" className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Fă o rezervare
            </h2>
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
  );
}

export default App;

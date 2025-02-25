import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImageCarousel from "./components/ImageCarousel";
import BookingForm from "./components/BookingForm";
import { Toaster } from "react-hot-toast";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Reviews from "./components/layout/Reviews";
const cabinImages = [
  {
    url: "assets/img/first.jpg",
    alt: "Cozy cabin exterior",
  },
  {
    url: "assets/img/second.jpg",
    alt: "Cabin interior",
  },
  {
    url: "assets/img/third.jpg",
    alt: "Mountain view",
  },
  {
    url: "assets/img/fourth.jpg",
    alt: "Mountain view",
  },
  {
    url: "assets/img/fifth.jpg",
    alt: "Mountain view",
  },
];

const attractions = [
  {
    title: 'Mânăstirea "Voroneț”',
    description:
      "Numită și “Capela Sixtină a Estului”, Mănăstirea Voroneț impresionează prin picturile sale cu totul deosebite",
    image: "assets/img/manasitre.jpg",
  },
  {
    title: "Rezervatia paleontologica si geologica Piatra Soimului",
    description:
      "Are o lungime de 1462 metri, cu un grad de dificultate mediu, diferenta de nivel fiind de 283 metri",
    image: "assets/img/piatra-soimului.jpg",
  },
  {
    title: "Festivalul International “Toamna la Voronet”",
    description:
      "Este un festival de film, care se desfasoara anual, in luna octombrie, la Voronet",
    image: "assets/img/festival.jpg",
  },
];

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

            <div className="mb-12 sm:mb-16 md:mb-20">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Galerie
              </h3>
              <ImageCarousel images={cabinImages} />
            </div>

            <section id="about">
              <About /> {/* This will render your About section */}
            </section>

            <div className="mb-12 sm:mb-16 md:mb-20">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Atracții Locale
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {attractions.map((attraction, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 sm:p-6">
                      <h4 className="font-semibold text-lg sm:text-xl mb-2">
                        {attraction.title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {attraction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

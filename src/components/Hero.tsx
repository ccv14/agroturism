import React from 'react';

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("assets/img/heroImg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Colț de Rai
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 md:mb-8 px-4">
            Descoperă armonia perfectă dintre confort și natură în cabana noastră de vis
          </p>
          <button
            onClick={scrollToBooking}
            className="inline-block bg-emerald-600 text-white px-6 md:px-8 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Fă o rezervare
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero
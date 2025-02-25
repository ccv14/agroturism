const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100088608890768",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/agroturismbori/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "Booking",
      url:
        "https://www.booking.com/hotel/ro/pensiunea-bori.ro.html?aid=397594&label=gog235jc-1DCAEoggI46AdIIFgDaMABiAEBmAEguAEXyAEP2AED6AEB-AECiAIBqAIDuAL_28y9BsACAdICJGQ5ZWE2YWFlLWRlMzgtNGQ4YS04YTZmL-WJmYmJhNmY1YzgwNtgCBOACAQ&ucfs=1&arphpl=1&group_adults=2&req_adults=2&no_rooms=null&group_children=0&req_children=0",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-emerald-900 text-gray-100 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">
              Agroturism Bori
            </h3>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Oază de tradiții și savoare autentică în inima Bucovinei
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+40712345678"
                  className="text-sm hover:text-emerald-300 transition-colors"
                >
                  +40 712 345 678
                </a>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:contact@agroturismbori.ro"
                  className="text-sm hover:text-emerald-300 transition-colors"
                >
                  contact@agroturismbori.ro
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 text-emerald-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">
                  Satul Bori, <br />
                  Gura Humorului, <br />
                  Județul Suceava
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              <a
                href="#home"
                className="block text-sm hover:text-emerald-300 transition-colors"
              >
                Home
              </a>
              <a
                href="#more"
                className="block text-sm hover:text-emerald-300 transition-colors"
              >
                Mai multe despre noi
              </a>
              <a
                href="#booking"
                className="block text-sm hover:text-emerald-300 transition-colors"
              >
                Fa o rezervare
              </a>
              <a
                href="#reviews"
                className="block text-sm hover:text-emerald-300 transition-colors"
              >
                Reviews
              </a>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Social Media</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-800 rounded-full hover:bg-emerald-700 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-emerald-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <a href="#" className="text-emerald-300 hover:text-white"></a>
            <a href="#" className="text-emerald-300 hover:text-white"></a>
            <span className="text-emerald-300">
              &copy; {new Date().getFullYear()} Agroturism Bori
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

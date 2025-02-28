import React, { useState } from "react";

const Attractions: React.FC = () => {
  const attractions = [
    {
      title: "Mânăstirea Voroneț",
      description:
        "Supranumită 'Capela Sixtină a Estului', Mânăstirea Voroneț este faimoasă pentru frescele sale vibrante și albastrul unic, care nu și-a pierdut strălucirea de-a lungul secolelor. A fost construită în 1488 de Ștefan cel Mare și reprezintă unul dintre cele mai impresionante monumente religioase din România.",
      image: "assets/img/manasitre.jpg",
    },
    {
      title: "Piatra Șoimului",
      description:
        "O rezervație naturală spectaculoasă, Piatra Șoimului oferă priveliști uimitoare asupra munților și văilor din împrejurimi. Este un loc ideal pentru iubitorii de drumeții și escaladă, cu trasee accesibile pentru toate nivelurile de experiență.",
      image: "assets/img/piatra-soimului.jpg",
    },
    {
      title: "Festivalul Toamna la Voroneț",
      description:
        "Un eveniment anual care aduce în prim-plan cultura locală, muzica, gastronomia tradițională și proiecțiile de film. Festivalul oferă o atmosferă autentică, atrăgând turiști din întreaga țară și din străinătate.",
      image: "assets/img/festival.jpg",
    },
    {
      title: "Muzeul Satului Bucovinean",
      description:
        "O incursiune în trecutul regiunii Bucovina, muzeul prezintă case tradiționale, biserici din lemn și ateliere meșteșugărești. Este un loc ideal pentru a înțelege mai bine tradițiile și modul de viață al locuitorilor din această zonă istorică.",
      image: "assets/img/satul-bucovinean.webp",
    },
    {
      title: "Cascada Cailor",
      description:
        "Cea mai înaltă cascadă din România, având o cădere de apă de aproximativ 90 de metri. Situată în Munții Rodnei, cascada este accesibilă printr-o drumeție spectaculoasă sau cu telescaunul din stațiunea Borșa.",
      image: "assets/img/Cascada-cailor.webp",
    },
    {
      title: "Cheile Bicazului",
      description:
        "Una dintre cele mai impresionante formațiuni geologice din România, cu pereți abrupți și un peisaj spectaculos. Cheile Bicazului sunt un paradis pentru alpiniști și iubitorii de natură, oferind trasee spectaculoase și peisaje de neuitat.",
      image: "assets/img/Cheile-bicazului.webp",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    // Toggle one card at a time
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="attractions" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Atracții Locale
      </h3>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className={`relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500`}
            onClick={() => toggleExpand(index)}
          >
            <img
              src={attraction.image}
              alt={attraction.title}
              className="w-full h-56 object-cover transition-transform duration-500"
            />

            <div className="p-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                {attraction.title}
              </h4>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedIndex === index
                    ? "max-h-96 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
              >
                <p className="text-gray-600 mt-2">{attraction.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Attractions;

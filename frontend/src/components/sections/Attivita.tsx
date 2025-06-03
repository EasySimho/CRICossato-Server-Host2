import { useState } from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

// Mock data for activities
const mockAttivita = [
  {
    id: 1,
    title: "Servizio di Primo Soccorso",
    description: "Servizi di primo soccorso, trasporto sanitario e promozione di stili di vita sani.",
    image: "/attivita-1.jpg",
    category: "Salute",
    location: "Sede Centrale",
  },
  {
    id: 2,
    title: "Supporto Sociale",
    description: "Supporto alle fasce vulnerabili, distribuzione generi alimentari e assistenza domiciliare.",
    image: "/attivita-2.jpg",
    category: "Sociale",
    location: "Sede Centrale",
  },
  {
    id: 3,
    title: "Gruppo Giovani",
    description: "Gruppo Giovani, promozione di stili di vita sani e progetti sociali.",
    image: "/attivita-3.jpg",
    category: "Giovani",
    location: "Sede Giovani",
  }
];

const Attivita = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return (
    <section id="attivita" className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden relative">
      {/* Elementi decorativi di sfondo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header con design migliorato */}
        <div className="flex flex-col items-center mb-10 sm:mb-16 relative">
          <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-red-600 rounded-full opacity-20"></div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center relative">
            Partecipa alle nostre 
            <span className="relative inline-block ml-2 sm:ml-3">
              attività
              <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full" height="8" viewBox="0 0 200 8">
                <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="#dc2626" strokeWidth="3" />
              </svg>
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-center leading-relaxed px-4">
            Scopri le attività che organizziamo per la comunità e unisciti a noi per fare la differenza insieme.
          </p>
        </div>
        
        {/* Attività Grid con layout completamente riprogettato */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 max-w-5xl mx-auto">
          {mockAttivita.map((attivita, index) => (
            <div
              key={attivita.id}
              className={`group relative flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-white overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500`}
              onMouseEnter={() => setHoveredCard(attivita.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Immagine */}
              <div className="relative md:w-2/5 h-48 sm:h-60 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent z-10"></div>
                <img
                  src={attivita.image}
                  alt={attivita.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
              
              {/* Contenuto card con layout migliorato */}
              <div className="relative p-5 sm:p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                {/* Decorazione angolo */}
                <div className={`absolute ${index % 2 === 0 ? 'top-1 right-1' : 'top-1 left-1'} w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 ${index % 2 === 0 ? '' : 'transform -scale-x-100'} border-red-200 opacity-70`}></div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {attivita.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3">
                    {attivita.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  {/* Dettagli attività con layout orizzontale */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center text-gray-700 bg-gray-100 px-2 sm:px-3 py-1 rounded-md">
                      <MapPin size={12} className="mr-1.5 sm:mr-2 text-red-500" />
                      <span className="text-xs sm:text-sm font-medium">{attivita.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700 bg-gray-100 px-2 sm:px-3 py-1 rounded-md">
                      <Clock size={12} className="mr-1.5 sm:mr-2 text-red-500" />
                      <span className="text-xs sm:text-sm font-medium">Prossimamente</span>
                    </div>
                  </div>
                  
                  {/* Pulsante CTA con design migliorato */}
                  <ScrollLink
                    to="contatti"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-red-600 text-red-600 text-sm sm:text-base rounded-lg font-bold transition-all group-hover:bg-red-600 group-hover:text-white cursor-pointer"
                  >
                    Iscriviti all' attività
                    <ArrowRight size={14} className="ml-2 transition-all group-hover:translate-x-1" />
                  </ScrollLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attivita;
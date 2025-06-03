import { useState, useEffect } from "react";
import { Phone, Building, ChevronRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const PrenotaServizio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="prenota-servizio">
      {/* Decorative wave at the top */}
      <div className="bg-white -mb-2 p-0 block leading-none">
        <svg
          className="w-full block leading-none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path
            className="fill-red-100"
            d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z"
            style={{ animationDuration: "3s" }}
          />
        </svg>
      </div>
      <section className="bg-red-100 py-12 sm:py-16 overflow-hidden relative -mb-1">
        {/* Decorative elements */}

        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden">
            {/* Red accent line */}

            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <span className="inline-block w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3 bg-red-600 rounded-lg"></span>
                Contattaci per i nostri servizi
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                {/* Left column */}
                <div
                  className={`transition-all duration-700 delay-100 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="group hover:scale-105 transition-all duration-300 bg-gray-50 hover:bg-red-50 p-4 sm:p-6 rounded-2xl border border-gray-100 hover:border-red-200 h-full flex flex-col justify-between">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-red-600 mb-3 sm:mb-4 p-3 sm:p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                        <Phone
                          size={24}
                          className="sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                        Numero Verde Gratuito
                      </h3>
                      <div className="text-red-600 font-bold text-2xl sm:text-3xl my-2 group-hover:scale-110 transition-transform duration-300">
                        800 248 248
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm mt-2">
                        Chiamata gratuita, attivo negli orari di servizio
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 mx-auto">
                      <div className="w-10 sm:w-12 h-1 bg-red-200 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Center column */}
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="group hover:scale-105 transition-all duration-300 bg-gray-50 hover:bg-red-50 p-4 sm:p-6 rounded-2xl border border-gray-100 hover:border-red-200 h-full flex flex-col justify-between">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-red-600 mb-3 sm:mb-4 p-3 sm:p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                        <Building
                          size={24}
                          className="sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                        Centralino del Comitato
                      </h3>
                      <div className="text-red-600 font-bold text-2xl sm:text-3xl my-2 group-hover:scale-110 transition-transform duration-300">
                        015 984 0050
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm mt-2">
                        Disponibile 24 ore su 24, 7 giorni su 7
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 mx-auto">
                      <div className="w-10 sm:w-12 h-1 bg-red-200 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div
                  className={`transition-all duration-700 delay-500 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-lg">
                    <div>
                      <h3 className="font-bold text-white text-lg sm:text-xl mb-4 sm:mb-6">
                        Pronto ad aiutarti
                      </h3>
                      <p className="text-sm sm:text-base mb-4 sm:mb-6">
                        Per prenotare un servizio, trasporto sanitario,
                        assistenza sociale o qualsiasi altra necessità, non
                        esitare a contattarci. Il nostro staff è sempre pronto
                        ad aiutarti.
                      </p>
                    </div>

                    <ScrollLink
                        to="contatti"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="group bg-white text-red-600 hover:bg-gray-100 transition-colors font-bold rounded-xl py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between w-full mt-3 sm:mt-4 cursor-pointer text-sm sm:text-base"
                    >
                        <span>Richiedi Informazioni</span>
                        <span className="bg-red-100 p-1.5 sm:p-2 rounded-lg group-hover:bg-red-200 group-hover:translate-x-1 transition-all">
                            <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </span>
                    </ScrollLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated wave decoration */}
        </div>
      </section>
      <svg
        className="w-full rotate-180 -mt-2"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', margin: 0, padding: 0 }}
      >
        <path
          className="fill-red-100"
          d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

export default PrenotaServizio;
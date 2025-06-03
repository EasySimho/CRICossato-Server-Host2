import React from 'react';
import { Heart, Banknote, Gift, ArrowRight } from 'lucide-react';

interface SupportOption {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  buttonText: string;
  highlight?: boolean;
  amount?: string;
  features?: string[];
}

const supportOptions: SupportOption[] = [
  {
    id: 1,
    title: "Donazione",
    description: "Trasforma la vita di chi ha bisogno con il tuo contributo. Ogni euro diventa speranza concreta.",
    icon: <Heart className="w-10 h-10" />,
    link: "#donate-once",
    buttonText: "Dona Ora",
    highlight: true,
    amount: "da €10",
    features: ["Impatto immediato", "100% trasparente", "Ricevuta fiscale"]
  },
  {
    id: 2,
    title: "5x1000",
    description: "Zero costo per te, massimo valore per noi. Una firma che cambia tutto.",
    icon: <Banknote className="w-10 h-10" />,
    link: "#5x1000",
    buttonText: "Scopri Come",
    features: ["Nessun costo aggiuntivo", "Procedura semplice", "Impatto duraturo"]
  },
  {
    id: 3,
    title: "Regalo Solidale",
    description: "Il regalo più bello? Quello che dona speranza a due persone contemporaneamente.",
    icon: <Gift className="w-10 h-10" />,
    link: "#gift",
    buttonText: "Regala Ora",
    features: ["Certificato personalizzato", "Messaggio dedicato", "Doppia felicità"]
  }
];

const stats = [
  { number: "2.5K+", label: "Vite cambiate" },
  { number: "50+", label: "Progetti attivi" },
  { number: "95%", label: "Fondi ai progetti" }
];

const Support = () => {
  return (
    <section id="support" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Insieme per il Cambiamento
          </h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="h-1 w-8 sm:w-10 bg-gray-300 rounded"></div>
            <div className="h-1 w-12 sm:w-16 bg-red-600 mx-2 rounded"></div>
            <div className="h-1 w-8 sm:w-10 bg-gray-300 rounded"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Non è solo una donazione, è l'inizio di una storia di speranza. 
            Unisciti a noi per trasformare vite e costruire un futuro migliore.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 sm:gap-12 mb-10 sm:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-gray-600 text-xs sm:text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {supportOptions.map((option) => (
            <div
              key={option.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl ${
                option.highlight 
                  ? 'bg-white border-2 border-red-500' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {option.highlight && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  Più Popolare
                </div>
              )}

              <div className="p-5 sm:p-8">
                <div className={`inline-flex p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 ${
                  option.highlight ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <div className="text-red-600">
                    {React.cloneElement(option.icon as React.ReactElement, {
                      className: "w-8 h-8 sm:w-10 sm:h-10"
                    })}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{option.title}</h3>
                
                {option.amount && (
                  <div className="text-red-600 font-semibold mb-3 sm:mb-4">{option.amount}</div>
                )}

                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{option.description}</p>

                {option.features && (
                  <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button className={`w-full py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  option.highlight 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}>
                  {option.buttonText}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
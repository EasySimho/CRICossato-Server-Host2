import React from 'react';
import { Heart, Banknote, Gift, ArrowRight, Sparkles, Star } from 'lucide-react';

interface SupportOption {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  buttonText: string;
  highlight?: boolean;
  amount?: string;
  active: boolean;
  features?: string[];
}

const supportOptions: SupportOption[] = [
  {
    id: 1,
    title: "5x1000",
    description: "Zero costo per te, massimo valore per noi. Una firma che cambia tutto.",
    icon: <Banknote className="w-10 h-10" />,
    link: "/5x1000",
    buttonText: "Scopri Come",
    active: true,
    features: ["Nessun costo aggiuntivo", "Procedura semplice", "Impatto duraturo"]
  },
  {
    id: 2,
    title: "Donazione",
    description: "Trasforma la vita di chi ha bisogno con il tuo contributo. Ogni euro diventa speranza concreta.",
    icon: <Heart className="w-10 h-10" />,
    link: "https://buy.stripe.com/3cIeVcfos2JNcCU8l5bbG01",
    buttonText: "Dona Ora",
    highlight: true,
    amount: "da €10",
    active: true,
    features: ["Impatto immediato", "100% trasparente", "Ricevuta fiscale"]
  },
  {
    id: 3,
    title: "Regalo Solidale",
    description: "Il regalo più bello? Quello che dona speranza a due persone contemporaneamente.",
    icon: <Gift className="w-10 h-10" />,
    link: "#gift",
    buttonText: "Prossimamente",
    active: false,
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
    <section id="support" className="relative py-16 sm:py-20 md:py-24 bg-gray-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
            Insieme per il
            <span className="block text-red-600 bg-clip-text">
              Cambiamento
            </span>
          </h2>
          
          <div className="flex justify-center items-center gap-3 mb-8">
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Non è solo una donazione, è l'inizio di una storia di speranza.
            <br className="hidden sm:block" />
            <span className="font-semibold text-gray-700">Unisciti a noi per trasformare vite e costruire un futuro migliore.</span>
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="flex justify-center gap-8 sm:gap-16 mb-16 sm:mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="text-gray-600 text-sm sm:text-base font-semibold uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {supportOptions.map((option) => (
            <div
              key={option.id}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                option.highlight
                  ? 'bg-gradient-to-br from-white via-red-50 to-pink-50 border-2 border-red-200 shadow-2xl shadow-red-100 hover:shadow-3xl hover:shadow-red-200'
                  : option.active 
                    ? 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-gray-300'
                    : 'bg-gray-50 border border-gray-200 opacity-75 hover:opacity-90'
              }`}
            >
              {/* Animated background gradient */}
              {option.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              )}

              {/* Badges */}
              {option.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                    <Star className="w-3 h-3 fill-current" />
                    Più Popolare
                  </div>
                </div>
              )}

              {!option.active && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1.5 bg-gray-400 text-white text-xs font-semibold rounded-full">
                    Prossimamente
                  </div>
                </div>
              )}

              <div className="relative p-6 sm:p-8 h-full flex flex-col">
                {/* Icon */}
                <div className={`mb-6 ${
                  option.highlight 
                    ? 'text-red-600' 
                    : option.active 
                      ? 'text-gray-700 group-hover:text-red-600' 
                      : 'text-gray-400'
                } transition-colors duration-300`}>
                  {option.icon}
                </div>

                {/* Title */}
                <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${
                  option.highlight 
                    ? 'text-gray-900' 
                    : option.active 
                      ? 'text-gray-900' 
                      : 'text-gray-500'
                }`}>
                  {option.title}
                </h3>

                {/* Amount */}
                {option.amount && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full mb-4 self-start">
                    {option.amount}
                  </div>
                )}

                {/* Description */}
                <p className={`text-base leading-relaxed mb-6 flex-grow ${
                  option.active ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  {option.description}
                </p>

                {/* Features */}
                {option.features && (
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          option.highlight 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                            : option.active 
                              ? 'bg-gray-200 group-hover:bg-red-100' 
                              : 'bg-gray-100'
                        } transition-colors duration-300`}>
                          <ArrowRight className={`w-3 h-3 ${
                            option.highlight 
                              ? 'text-white' 
                              : option.active 
                                ? 'text-gray-600 group-hover:text-red-600' 
                                : 'text-gray-400'
                          } transition-colors duration-300`} />
                        </div>
                        <span className={option.active ? 'text-gray-700' : 'text-gray-500'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                {option.active && (
                  <a
                    href={option.link}
                    className={`group/btn relative overflow-hidden py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 ${
                      option.highlight
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300'
                        : 'bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl'
                    } transform hover:scale-105 active:scale-95`}
                  >
                    <span className="relative z-10">
                      {option.buttonText}
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 transform -skew-x-12 group-hover/btn:animate-pulse"></div>
                  </a>
                )}

                {!option.active && (
                  <div className="py-4 px-6 rounded-2xl font-bold text-base bg-gray-200 text-gray-500 text-center cursor-not-allowed">
                    {option.buttonText}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Support;
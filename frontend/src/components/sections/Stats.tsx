import React, { useEffect, useState, useRef } from 'react';

interface Stat {
  id: number;
  value: number;
  label: string;
  suffix?: string;
  description: string;
}

interface BackendStat {
  id: string;
  title: string;
  value: number;
  description: string;
}

// Mock stats data
const mockStats: Stat[] = [
  {
    id: 1,
    value: 1500,
    label: "Volontari Attivi",
    suffix: "+",
    description: "Persone che dedicano il loro tempo"
  },
  {
    id: 2,
    value: 25000,
    label: "Beneficiari",
    description: "Persone aiutate ogni anno"
  },
  {
    id: 3,
    value: 45,
    label: "Progetti",
    suffix: "+",
    description: "Iniziative attive sul territorio"
  },
  {
    id: 4,
    value: 100,
    label: "Partner",
    suffix: "+",
    description: "Organizzazioni che collaborano con noi"
  }
];

const Stats = () => {
  const [animate, setAnimate] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data: BackendStat[] = await response.json();
        
        // Mappa i dati dal backend al formato richiesto
        const mappedStats: Stat[] = data.map((item, index) => ({
          id: index + 1,
          value: item.value,
          label: item.title,
          suffix: item.description.includes('+') ? '+' : undefined,
          description: item.description
        }));
        
        setStats(mappedStats);
      } catch (err) {
        console.error('Error fetching stats:', err);
        // In caso di errore, usa i mock stats
        setStats(mockStats);
        setError(null); // Resetta l'errore poiché abbiamo i mock stats
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleScroll = () => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        setAnimate(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (animate && stats.length > 0) {
      const intervals = stats.map((stat, index) => {
        const duration = 2500; // 2.5 seconds for animation
        const steps = 60; // 60 steps (smooth at 60fps)
        const increment = stat.value / steps;
        let currentCount = 0;

        return setInterval(() => {
          currentCount = Math.min(currentCount + increment, stat.value);
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(currentCount);
            return newCounts;
          });

          if (currentCount >= stat.value) {
            clearInterval(intervals[index]);
          }
        }, duration / steps);
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [animate, stats]);

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-white">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Caricamento statistiche...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-white">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-white">
      {/* Background decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-96 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-red-50 opacity-30"></div>
        <div className="absolute -bottom-60 -left-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-red-50 opacity-30"></div>
        <div className="absolute top-1/3 left-1/3 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-red-50 opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <div className="w-12 sm:w-16 h-1 bg-red-600 mx-auto mb-3 sm:mb-4"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">La Quantità fa la Differenza</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Dietro ogni numero c'è una storia di impegno, dedizione e passione al servizio della comunità
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden p-4 sm:p-6 md:p-8 border border-gray-100 h-full transition-all duration-300 transform hover:shadow-lg hover:shadow-red-100">
                {/* Background colorato che appare all'hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-700/90 z-0 transition-all duration-500 ease-in-out"
                  style={{
                    clipPath: isHovered === index ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)'
                  }}
                ></div>

                {/* Counter con scia al passaggio mouse */}
                <div className="relative z-10 text-center">
                  <div className="mb-2 sm:mb-3 flex justify-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight transition-colors duration-300 mb-2 flex items-center justify-center gap-x-1"
                      style={{ color: isHovered === index ? 'white' : '#1f2937' }}>
                      {/* Digit animation */}
                      <div className="relative inline-flex items-center justify-center">
                        <span className="inline-block min-w-[1ch] text-center">
                          {counts[index].toLocaleString()}
                        </span>

                        {/* Colorful trail effect */}
                        {isHovered === index && (
                          <div className="absolute -inset-1 opacity-50 blur-lg bg-white/30 rounded-full"></div>
                        )}
                      </div>

                      {/* Suffix */}
                      {stat.suffix && (
                        <span>{stat.suffix}</span>
                      )}
                    </div>
                  </div>

                  <div className="relative min-h-[2.5rem] sm:min-h-[3rem] overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        isHovered === index ? '-translate-y-full' : 'translate-y-0'
                      }`}
                    >
                      <div className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
                        isHovered === index ? 'text-white/90' : 'text-gray-600'
                    }`}>
                        {stat.label}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        isHovered === index ? 'translate-y-0' : 'translate-y-full'
                      }`}
                    >
                      <div className={`text-sm sm:text-base transition-colors duration-300 ${
                        isHovered === index ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
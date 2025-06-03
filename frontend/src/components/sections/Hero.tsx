import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta?: {
    text: string;
    link: string;
  };
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Benvenuto in CRI Cossato",
    subtitle: "Al servizio della comunità dal 1985",
    description:
      "Scopri la nostra missione e i valori che ci guidano ogni giorno per aiutare chi ha più bisogno.",
    image:
      "slider-1.jpeg",
    cta: {
      text: "Scopri di più",
      link: "#chi-siamo",
    },
  },
  {
    id: 2,
    title: "Diventa Volontario",
    subtitle: "Unisciti alla nostra famiglia",
    description:
      "Dona il tuo tempo e le tue competenze per fare la differenza nella vita di chi ha bisogno di aiuto.",
    image:
      "slider-2.jpeg",
    cta: {
      text: "Unisciti a noi",
      link: "#attivita",
    },
  },
  {
    id: 3,
    title: "Trasporti Sanitari",
    subtitle: "Sempre pronti a intervenire",
    description:
      "Garantiamo un servizio di trasporto sicuro ed efficiente per chi ha bisogno di assistenza medica.",
    image:
      "slider-3.jpeg",
    cta: {
      text: "I nostri servizi",
      link: "#prenota-servizio",
    },
  },
  {
    id: 4,
    title: "Corsi BLSD",
    subtitle: "Impara a salvare vite",
    description:
      "Partecipa ai nostri corsi di primo soccorso e impara le manovre salvavita di base.",
    image: "slider-4.jpeg",
    cta: {
      text: "Scopri i corsi",
      link: "#corsi",
    },
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const slideIntervalRef = useRef<number | null>(null);

  // Swipe/drag handling
  const startX = useRef(0);
  const currentX = useRef(0);
  const threshold = 100; // minimum distance for swipe

  const startSlideTimer = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }

    slideIntervalRef.current = window.setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 6000);
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [isDragging]);

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    startSlideTimer();
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    startSlideTimer();
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    startSlideTimer();
  };

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diffX = startX.current - currentX.current;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
    startSlideTimer();
  };

  // Mouse events (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    currentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diffX = startX.current - currentX.current;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
    startSlideTimer();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startSlideTimer();
    }
  };

  return (
    <div id="home">
      <div
        className={`relative h-[70vh] md:h-[80vh] overflow-hidden bg-gray-900 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-gray-800">
          <div
            className="h-full bg-red-600 transition-all duration-[6000ms] ease-linear"
            style={{
              width: isAnimating || isDragging ? "0%" : "100%",
              transitionDuration: isAnimating || isDragging ? "0ms" : "6000ms",
            }}
          />
        </div>

        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-600 ease-in-out select-none ${
                  isActive ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
              >
                {/* Background image */}
                <div
                  className={`absolute inset-0 bg-cover ${
                    slide.id === 4 ? "bg-[position:center_80%]" : "bg-center"
                  }`}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div
                      className={`max-w-2xl transition-all duration-700 delay-100 transform ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {/* Red decorative element */}
                      <div className="w-16 sm:w-20 h-1 bg-red-600 mb-4 sm:mb-6"></div>

                      <h2 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-white mb-2 sm:mb-3">
                        {slide.title}
                      </h2>

                      <h3 className="text-lg sm:text-xl lg:text-3xl text-red-300 font-medium mb-4 sm:mb-6">
                        {slide.subtitle}
                      </h3>

                      <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg">
                        {slide.description}
                      </p>

                      {slide.cta && (
                        <ScrollLink
                          to={slide.cta.link.replace("#", "")}
                          smooth={true}
                          duration={600}
                          offset={-80}
                          className="group relative inline-flex items-center overflow-hidden rounded-lg bg-red-600 px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm sm:text-base font-medium transition-all duration-300 hover:bg-red-700 hover:shadow-lg cursor-pointer"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <span className="relative z-10">
                          {slide.cta.text}
                          </span>
                        </ScrollLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center -mt-6 sm:-mt-8 mb-6 sm:mb-8 z-30 relative">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseDown={(e) => e.stopPropagation()}
              disabled={isAnimating}
              className={`group relative transition-all duration-100 focus:outline-none ${
                index === currentSlide
                  ? "scale-110"
                  : "scale-75 hover:opacity-100 hover:scale-90"
              }`}
              aria-label={`Vai alla slide ${index + 1}: ${slide.title}`}
            >
              {/* Circular preview image */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cover bg-center border-2 sm:border-3 transition-all duration-300 ${
                  index === currentSlide
                    ? "hover:outline outline-red-600"
                    : "filter grayscale border-white/50 hover:border-white/80 hover:grayscale-0"
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              {/* Hover tooltip */}
              <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-black/80 text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {slide.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { Users, Heart, Award, ChevronRight, ChevronLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

const TeamSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const teamMembers = [
        {
            name: 'Giuseppe Negri',
            ruolo: 'Presidente',
            image: '/836.jpg',
            description: 'Con oltre 15 anni di esperienza nel sociale, guida la nostra associazione verso obiettivi sempre più ambiziosi. La sua leadership visionaria ha trasformato il modo in cui operiamo sul territorio.',
            expertise: ['Leadership', 'Gestione Progetti', 'Sviluppo Strategico'],
            anni: '15+ anni'
        },
        {
            name: 'Franco Bernuzzo',
            ruolo: 'Vicepresidente',
            image: '/836.jpg',
            description: 'Responsabile dei progetti educativi, coordina le attività formative e i corsi per bambini e adulti. La sua passione per l\'educazione è contagiosa e ispira tutto il team.',
            expertise: ['Formazione', 'Educazione', 'Coordinamento'],
            anni: '12+ anni'
        },
        {
            name: 'Margherita Roncarolo',
            ruolo: 'Consigliere',
            image: '/836.jpg',
            description: 'Gestisce in maniera corretta e trasparente le attività amministrative e finanziarie dell\'associazione. La sua precisione e dedizione garantiscono la solidità della nostra organizzazione.',
            expertise: ['Amministrazione', 'Trasparenza', 'Organizzazione'],
            anni: '8+ anni'
        },
        {
            name: 'Cinzia Sartorello',
            ruolo: 'Consigliere',
            image: '/836.jpg',
            description: 'Si occupa della comunicazione e del coordinamento delle attività quotidiane dell\'associazione. È il ponte tra la comunità e le nostre iniziative.',
            expertise: ['Comunicazione', 'Coordinamento', 'Relazioni Pubbliche'],
            anni: '10+ anni'
        },
        {
            name: 'Gioele Casalino',
            ruolo: 'Consigliere Giovani',
            image: '/836.jpg',
            description: 'Forma e coordina il nostro team di giovani volontari, portando energia e innovazione alle nostre attività. Rappresenta il futuro della nostra associazione.',
            expertise: ['Formazione Giovani', 'Innovazione', 'Volontariato'],
            anni: '5+ anni'
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, teamMembers.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Il Nostro
                            <span className="text-red-600 block">
                                Team Direttivo
                            </span>
                        </h1>
                        <div className="flex justify-center mb-8">
                            <div className="h-1 w-12 bg-gray-300 rounded"></div>
                            <div className="h-1 w-20 bg-red-600 mx-3 rounded"></div>
                            <div className="h-1 w-12 bg-gray-300 rounded"></div>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Incontra i membri del direttivo che guidano la nostra associazione.
                            <br className="hidden sm:block" />
                            <span className="font-semibold text-gray-700">Competenza, dedizione e trasparenza al servizio della comunità.</span>
                        </p>
                    </div>

                    {/* Team Slider */}
                    <div className="relative w-full">
                        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <div className="flex flex-col lg:flex-row min-h-[480px]">
                                            {/* Image Section */}
                                            <div className="lg:w-2/5 relative overflow-hidden bg-gray-100">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-4 left-4">
                                                    <div className="bg-white rounded-md px-3 py-1 shadow-sm">
                                                        <span className="text-red-600 font-semibold text-sm">{member.anni}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="lg:w-3/5 p-8 sm:p-10 flex flex-col justify-center bg-white">
                                                <div className="max-w-none">
                                                    <span className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-50 rounded-md mb-4">
                                                        {member.ruolo}
                                                    </span>
                                                    
                                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                                        {member.name}
                                                    </h2>
                                                    
                                                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                                                        {member.description}
                                                    </p>

                                                    {/* Expertise Tags */}
                                                    <div className="mb-6">
                                                        <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                                            Competenze principali
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {member.expertise.map((skill, skillIndex) => (
                                                                <span 
                                                                    key={skillIndex}
                                                                    className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-md"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Progress Indicator */}
                                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                                                        <span className="font-medium">{index + 1} di {teamMembers.length}</span>
                                                        <div className="flex items-center space-x-2">
                                                            <span>Croce Rossa Italiana</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-20"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-20"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {teamMembers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    index === currentSlide 
                                        ? 'bg-red-600 w-6' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>

                   

                    {/* Storia Button Section */}
                    <div className="mt-16 text-center">
                        <div className="inline-block">
                            <a 
                                href="/storia"
                                className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm"
                            >
                                <Award className="w-5 h-5 mr-2" />
                                Scopri La Nostra Storia
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                            Scopri la storia della nostra sezione e i valori che ci guidano
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamSlider;
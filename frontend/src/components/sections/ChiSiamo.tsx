import React from 'react';
import { Users, Heart, Award, ChevronRight } from 'lucide-react';
import {Link} from 'react-router-dom'

const Person: React.FC<{ name: string, image: string, ruolo: string, description?: string }> = ({
    name,
    image,
    ruolo,
    description
}) => {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 p-6">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute transform rotate-45 bg-red-600 opacity-10 w-16 h-4 -right-4 top-6"></div>
            </div>

            <div className="text-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">
                    {name}
                </h3>

                <span className="inline-block px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full mb-3">
                    {ruolo}
                </span>

                {description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode, number: string, label: string }> = ({
    icon,
    number,
    label
}) => {
    return (
        <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{number}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
};

const ChiSiamo: React.FC = () => {
    const teamMembers = [
        {
            name: 'Giuseppe Negri',
            ruolo: 'Presidente',
            image: '/836.jpg',
            description: 'Con oltre 15 anni di esperienza nel sociale, guida la nostra associazione verso obiettivi sempre più ambiziosi.'
        },
        {
            name: 'Franco Bernuzzo',
            ruolo: 'Vicepresidente',
            image: '/836.jpg',
            description: 'Responsabile dei progetti educativi, coordina le attività formative e i corsi per bambini e adulti.'
        },
        {
            name: 'Margherita Roncarolo',
            ruolo: 'Consigliere',
            image: '/836.jpg',
            description: 'Gestisce in maniera corretta e trasparente le attività'
        },
        {
            name: 'Cinzia Sartorello',
            ruolo: 'Consigliere',
            image: '/836.jpg',
            description: 'Si occupa della comunicazione e del coordinamento delle attività quotidiane dell\'associazione.'
        },
        {
            name: 'Gioele Casalino',
            ruolo: 'Consigliere Giovani',
            image: '/836.jpg',
            description: 'Forma e coordina il nostro team di giovani volontari'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Team Section */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <span className="inline-block px-3 sm:px-4 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full mb-2 sm:mb-3">
                            IL NOSTRO TEAM
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Le persone che fanno la differenza
                        </h2>
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="h-1 w-8 sm:w-10 bg-gray-300 rounded"></div>
                            <div className="h-1 w-12 sm:w-16 bg-red-600 mx-2 rounded"></div>
                            <div className="h-1 w-8 sm:w-10 bg-gray-300 rounded"></div>
                        </div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Incontra il team di professionisti e volontari che ogni giorno si impegna
                            per realizzare i nostri progetti e supportare la comunità.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {teamMembers.map((member, index) => (
                            <Person
                                key={index}
                                name={member.name}
                                image={member.image}
                                ruolo={member.ruolo}
                                description={member.description}
                            />
                        ))}
                    </div>

                    {/* Storia Button Section */}
                    <div className="mt-12 text-center">
                        <div className="inline-block relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <Link 
                                to="/storia"
                                className="relative inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Scopri La Nostra Storia
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Un viaggio attraverso la storia della Croce Rossa e i nostri valori
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChiSiamo;
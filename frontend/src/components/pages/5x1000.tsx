import { motion } from "framer-motion";

const FivePerThousand = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4">
                    <div className="py-32 md:py-40">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                Destina il tuo <span className="text-red-600">5x1000</span>
                            </h1>
                            <p className="text-xl text-white max-w-3xl mx-auto">
                                Un gesto semplice che non ti costa nulla, ma che può fare la differenza per migliaia di persone
                            </p>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-12 text-white" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
                        <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">

                    {/* CTA Banner */}
                    <motion.div
                        {...fadeInUp}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 mb-16 shadow-2xl"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0">
                                <h2 className="text-3xl text-white font-bold mb-2">Codice Fiscale CRI</h2>
                                <p className="text-red-100">Inserisci questo codice nella tua dichiarazione dei redditi</p>
                            </div>
                            <div className="bg-white text-red-600 px-8 py-4 rounded-xl shadow-lg">
                                <div className="text-3xl font-mono font-bold tracking-wider">92018110020</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* What is 5x1000 */}
                    <motion.div
                        {...fadeInUp}
                        className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100"
                    >
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Cos'è il 5x1000?</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Il 5x1000 è una quota dell'imposta sul reddito delle persone fisiche (IRPEF) che lo Stato italiano permette di destinare a enti no profit, associazioni di promozione sociale e organizzazioni di volontariato.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong className="text-red-600">Non è un'ulteriore tassa</strong>, ma una quota di imposta che puoi scegliere di destinare a sostegno di attività sociali, culturali e di ricerca scientifica.
                                </p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-red-600 mb-4">Vantaggi per te:</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                                        Nessun costo aggiuntivo
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                                        Scelta rinnovabile ogni anno
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                                        Contributo concreto al sociale
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* How to Guide */}
                    <motion.div
                        {...fadeInUp}
                        className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Come destinare il 5x1000 in 4 semplici passi
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    step: "1",
                                    title: "Compila il modello",
                                    description: "730 o Redditi PF",
                                    detail: "Durante la dichiarazione dei redditi"
                                },
                                {
                                    step: "2",
                                    title: "Trova la sezione",
                                    description: "5x1000 dell'IRPEF",
                                    detail: "Nel modulo dedicato alle destinazioni"
                                },
                                {
                                    step: "3",
                                    title: "Firma il riquadro",
                                    description: "Volontariato",
                                    detail: "Organizzazioni non lucrative"
                                },
                                {
                                    step: "4",
                                    title: "Inserisci il codice",
                                    description: "92018110020",
                                    detail: "Codice fiscale Croce Rossa Italiana"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center group transition-transform duration-300"
                                >
                                    <div className="relative mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                                            {item.step}
                                        </div>
                                            <div className="hidden  lg:block absolute top-1/2 w-full h-1 bg-white transform translate-y-3"></div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-red-600 font-medium mb-1">{item.description}</p>
                                    <p className="text-sm text-gray-500">{item.detail}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default FivePerThousand;
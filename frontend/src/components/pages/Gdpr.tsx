import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    return (
        <>
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
                            <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">Privacy</h1>
                            <p className="text-xl text-gray-300">
                                La nostra gestione leggera e trasparente dei dati
                            </p>
                        </motion.div>
                    </div>
                </div>
                {/* Decorative bottom wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-12 text-white" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
                        <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
                    </svg>
                </div>
            </div>
            <section className="py-16 bg-white text-gray-800">

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b pb-4 border-red-600">
                        Informativa sulla Privacy
                    </h1>

                    <p className="mb-6">
                        Ai sensi dell’art. 13 del Regolamento (UE) 2016/679 ("GDPR"), forniamo le seguenti informazioni sul trattamento dei dati personali raccolti tramite questo sito web e in particolare tramite il modulo di contatto.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">1. Titolare del trattamento</h2>
                    <p className="mb-6">
                        Il titolare del trattamento è Giuseppe Negri, con sede in Via Amendola 91 Cossato 13836, contattabile all’indirizzo email cossato@cri.it.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">2. Finalità e base giuridica del trattamento</h2>
                    <p className="mb-6">
                        I dati personali vengono raccolti e trattati esclusivamente per:
                        <ul className="list-disc ml-6 mt-2">
                            <li>rispondere a richieste inviate tramite il modulo di contatto,</li>
                            <li>gestire eventuali iscrizioni alle attività proposte,</li>
                            <li>adempiere a obblighi legali o regolamentari.</li>
                        </ul>
                        La base giuridica è il consenso dell’interessato e l’adempimento di obblighi contrattuali o legali.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">3. Modalità del trattamento</h2>
                    <p className="mb-6">
                        Il trattamento avviene con strumenti manuali e informatici, nel rispetto delle misure di sicurezza previste dal GDPR. Non vengono effettuate attività di profilazione.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">4. Conservazione dei dati</h2>
                    <p className="mb-6">
                        I dati verranno conservati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti o in base ai termini previsti dalla legge.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">5. Diritti dell’interessato</h2>
                    <p className="mb-6">
                        In ogni momento è possibile esercitare i diritti previsti dagli artt. 15-22 del GDPR, tra cui:
                        <ul className="list-disc ml-6 mt-2">
                            <li>accesso ai dati,</li>
                            <li>rettifica o cancellazione,</li>
                            <li>limitazione o opposizione al trattamento,</li>
                            <li>portabilità dei dati.</li>
                        </ul>
                        Le richieste vanno inviate a cossato@cri.it.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">6. Comunicazione e diffusione</h2>
                    <p className="mb-6">
                        I dati non saranno oggetto di diffusione e potranno essere comunicati solo a soggetti autorizzati o incaricati (es. collaboratori, fornitori di servizi IT), esclusivamente per le finalità sopra indicate.
                    </p>

                    <p className="mt-10 text-sm text-gray-500 italic">
                        Ultimo aggiornamento: 13/06/2025
                    </p>
                </div>
            </section>

        </>
    );
};

export default PrivacyPolicy;

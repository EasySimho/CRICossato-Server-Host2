import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion'

const NotFound = () => {
  return (<>
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
            <h1 className="text-6xl md:text-9xl text-red-600 font-bold mb-6">404</h1>
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
    <div className="py:20 md:py-40 bg-white flex items-center justify-center px-4">

      <div className="text-center max-w-2xl">
        <div className="relative mb-8">

          <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,100 
           L 80,100 
           L 85,100 
           L 90,95 
           L 95,105 
           L 100,40 
           L 105,160 
           L 110,80 
           L 115,100 
           L 120,100 
           L 140,95 
           L 145,105 
           L 150,100 
           L 230,100 
           L 235,100 
           L 240,95 
           L 245,105 
           L 250,40 
           L 255,160 
           L 260,80 
           L 265,100 
           L 270,100 
           L 290,95 
           L 295,105 
           L 300,100 
           L 380,100 
           L 385,100 
           L 390,95 
           L 395,105 
           L 400,40 
           L 405,160 
           L 410,80 
           L 415,100 
           L 420,100 
           L 440,95 
           L 445,105 
           L 450,100 
           L 530,100 
           L 535,100 
           L 540,95 
           L 545,105 
           L 550,40 
           L 555,160 
           L 560,80 
           L 565,100 
           L 570,100 
           L 590,95 
           L 595,105 
           L 600,100 
           L 680,100 
           L 685,100 
           L 690,95 
           L 695,105 
           L 700,40 
           L 705,160 
           L 710,80 
           L 715,100 
           L 720,100 
           L 740,95 
           L 745,105 
           L 750,100 
           L 800,100"
              fill="none"
              stroke="#cc0000"
              stroke-width="2"
              stroke-dasharray="1600"
              stroke-dashoffset="1600">

              <animate attributeName="stroke-dashoffset"
                values="1600;0"
                dur="2s"
                repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Ops! Questa pagina ha bisogno di un dottore!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Sembra che la pagina che stai cercando sia in rianimazione.
          Non preoccuparti, i nostri volontari sono sempre pronti ad aiutare!
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna alla Home
          </Link>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Nel frattempo, perché non dai un'occhiata ai nostri corsi o alle attività?
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default NotFound;
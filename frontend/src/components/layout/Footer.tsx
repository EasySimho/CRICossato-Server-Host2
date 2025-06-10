import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';


const Footer = () => {
  return (
    <>
      <div className="bg-white -mb-2 p-0 block leading-none">
        <svg
          className="w-full block leading-none"
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path
            className="fill-slate-900"
            d="M0,0 C240,40 480,40 720,20 C960,0 1200,0 1440,20 L1440,40 L0,40 Z"
            style={{ animationDuration: "3s" }}
          />
        </svg>
      </div>
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Logo e descrizione */}
            <div className="md:col-span-1">

              <div className="flex justify-center items-center mb-10">
                <img src="/LogoCri.svg" alt="Logo CRI" className="w-[80%] mr-3" />
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <a
                  href="https://www.facebook.com/cricossato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 hover:-translate-y-0.5"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/crocerossacossato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 transition-all duration-200 transform hover:scale-110 hover:-translate-y-0.5"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Contatti */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contatti</h4>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Phone size={18} className="mr-3 text-gray-400" />
                  <a href="tel:+390000000000" className="hover:text-white transition-all duration-200 hover:translate-x-1">
                    +39 015 984 0050
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail size={18} className="mr-3 text-gray-400" />
                  <a href="mailto:info@cricossato.it" className="hover:text-white transition-all duration-200 hover:translate-x-1">
                    cossato@cri.it
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin size={18} className="mr-3 text-gray-400" />
                  <span>Via Giovanni Amendola, 91</span>
                </div>
              </div>
            </div>

            {/* Link Rapidi */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Link Rapidi</h4>
              <div className="space-y-3">
                <a href="/progetti" className="block text-gray-300 hover:text-white transition-all duration-200 relative pl-4 hover:pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-200 hover:before:w-3">
                  Progetti
                </a>
                <a href="/news" className="block text-gray-300 hover:text-white transition-all duration-200 relative pl-4 hover:pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-200 hover:before:w-3">
                  Notizie
                </a>
                <a href="/trasparenza" className="block text-gray-300 hover:text-white transition-all duration-200 relative pl-4 hover:pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-200 hover:before:w-3">
                  Trasparenza
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              CRI Cossato - Croce Rossa Italiana - Sito realizzato da <a href="https://github.com/EasySimho" target="_blank" className="group relative inline-block hover:text-white transition-all duration-300">
                Simone Benanchietti
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
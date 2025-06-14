import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (section: string) => {
    if (location.pathname === '/') {
      // Scroll direttamente se siamo già sulla home
      scroller.scrollTo(section, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -80
      });
    } else {
      // Naviga alla home con lo stato per indicare dove scrollare
      navigate('/', { state: { scrollTo: section } });
    }
  };

  // Effetto per gestire lo scroll quando arriviamo sulla home da un'altra pagina
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const targetSection = location.state.scrollTo;
      
      // Usa un timeout più lungo e verifica che l'elemento esista
      const scrollToSection = () => {
        const element = document.getElementById(targetSection);
        if (element) {
          scroller.scrollTo(targetSection, {
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -80
          });
        } else {
          // Se l'elemento non esiste ancora, riprova dopo un breve delay
          setTimeout(scrollToSection, 100);
        }
      };

      // Aspetta che il componente sia completamente montato
      setTimeout(scrollToSection, 100);
      
      // Pulisci lo state per evitare scroll multipli
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Corsi', to: 'corsi' },
    { name: 'Attività', to: 'attivita' },
    { name: 'News', to: 'news' },
    { name: 'Documenti', to: '/trasparenza', isRoute: true },
    { name: 'Contatti', to: 'contatti' },
    { name: 'Donazioni', to: 'support' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? 'bg-white shadow-md py-2'
            : 'bg-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            {location.pathname === '/' ? (
              <ScrollLink
                to="home"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="cursor-pointer"
              >
                <img
                  src="/LogoCri.svg"
                  alt="Croce Rossa Italiana"
                  className={`h-16 w-auto transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}
                />
              </ScrollLink>
            ) : (
              <Link
                to="/"
                className="cursor-pointer"
              >
                <img
                  src="/LogoCri.svg"
                  alt="Croce Rossa Italiana"
                  className={`h-16 w-auto transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}
                />
              </Link>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, idx) =>
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`relative cursor-pointer text-lg font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-white'
                      }`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.name}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${hoveredItem === item.name ? 'w-full' : 'w-0'
                        }`}
                    />
                  </Link>
                ) : idx === navItems.length - 1 ? (
                  // Bottone Donazioni
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.to)}
                    className="ml-4 bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-red-700 transition-colors duration-300 cursor-pointer"
                  >
                    {item.name}
                  </button>
                ) : (
                  // Altri elementi di navigazione
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.to)}
                    className={`relative cursor-pointer text-lg font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-white'
                      }`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.name}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${hoveredItem === item.name ? 'w-full' : 'w-0'
                        }`}
                    />
                  </button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${isScrolled
                  ? 'text-gray-800 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
                }`}
              aria-label="Menu principale"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '0', paddingTop: '5rem' }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, idx) =>
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-gray-800 hover:text-red-600 text-lg font-medium transition-colors duration-300 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : idx === navItems.length - 1 ? (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.to);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 text-center font-semibold"
                >
                  {item.name}
                </button>
              ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.to);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-red-600 text-lg font-medium transition-colors duration-300 py-2 text-left"
                >
                  {item.name}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Background overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
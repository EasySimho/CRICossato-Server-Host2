import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DiscoverButton from '../ui/DiscoverButton';
import NewsModal from '../modals/NewsModal';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

const mockNews = [
  {
    id: 1,
    title: "Nuovo corso di primo soccorso",
    excerpt: "Iniziano le iscrizioni per il corso di primo soccorso di base. Un'opportunità per imparare le tecniche essenziali di soccorso.",
    image: "/api/placeholder/400/300",
    date: "2024-03-15",
    readTime: "5 min",
    category: "Corsi"
  },
  {
    id: 2,
    title: "Giornata della Croce Rossa",
    excerpt: "Celebriamo insieme la Giornata Mondiale della Croce Rossa con eventi e attività per tutta la comunità.",
    image: "/api/placeholder/400/300", 
    date: "2024-05-08",
    readTime: "3 min",
    category: "Eventi"
  },
  {
    id: 3,
    title: "Campagna di raccolta sangue",
    excerpt: "Partecipa alla nostra campagna di raccolta sangue. Il tuo contributo può salvare vite.",
    image: "/api/placeholder/400/300",
    date: "2024-04-20",
    readTime: "4 min",
    category: "Iniziative"
  }
];

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsItems(data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setNewsItems(mockNews); // Use mock data when API fails
        setError(null); // Clear error since we're using mock data
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Caricamento notizie...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="news" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ultime Notizie
              <span className="text-red-600 block">e Eventi</span>
            </h1>
            <div className="flex justify-center mb-8">
              <div className="h-1 w-12 bg-gray-300 rounded"></div>
              <div className="h-1 w-20 bg-red-600 mx-3 rounded"></div>
              <div className="h-1 w-12 bg-gray-300 rounded"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Resta aggiornato sulle nostre attività, eventi e iniziative
              per la comunità.
            </p>
          </motion.div>

          {/* Featured News */}
          {newsItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 sm:mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8">
                {/* Featured Image */}
                <div
                  key={newsItems[0].id}
                  className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl cursor-pointer"
                  onClick={() => setSelectedNews(newsItems[0])}
                >
                  <img
                    src={newsItems[0].image}
                    alt={newsItems[0].title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                    <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold bg-red-600 rounded-full mb-3 sm:mb-4">
                      {newsItems[0].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl text-white font-bold mb-2">{newsItems[0].title}</h3>
                    <div className="flex items-center text-xs sm:text-sm text-gray-200">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="mr-4">{new Date(newsItems[0].date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {newsItems.slice(1).map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                {/* News Image */}
                <div className="relative h-40 sm:h-48 rounded-t-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* News Content */}
                <div className="p-4 sm:p-6">
                  <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-red-600 bg-red-100 rounded-full mb-3 sm:mb-4">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="mr-4">{new Date(item.date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    </div>
                    <Link
                      to={`/notizie/${item.id}`}
                      className="inline-flex items-center text-sm sm:text-base text-red-600 font-semibold hover:text-red-700 transition-colors duration-300"
                    >
                      Leggi
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-10 sm:mt-12 text-center">
            <DiscoverButton to="/news">Scopri tutte le notizie</DiscoverButton>
          </div>
        </div>
      </section>
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </>
  );
};

export default News;
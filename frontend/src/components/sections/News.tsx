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
        setError('Errore nel caricamento delle notizie');
        console.error('Error fetching news:', err);
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

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
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
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ultime Notizie
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-red-600 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
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
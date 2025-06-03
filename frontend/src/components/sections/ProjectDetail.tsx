import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  image: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError('Errore nel caricamento del progetto');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="text-center mt-4 text-gray-600 font-medium">Caricamento progetto...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
            <div className="text-red-600 font-medium mb-2">Oops! Qualcosa è andato storto</div>
            <div className="text-gray-700">{error || 'Progetto non trovato'}</div>
            <button
              onClick={() => navigate('/progetti')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Torna ai progetti
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="py-16 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
                <h1 className="text-xl md:text-7xl text-red-600 font-bold mb-6">{project.title}</h1>
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

      
      <div className="container mt-12 mx-auto px-4">
        <button
          onClick={() => navigate('/progetti')}
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Torna ai progetti
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-4 py-2 bg-white/90 text-red-600 rounded-full text-sm font-semibold mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 
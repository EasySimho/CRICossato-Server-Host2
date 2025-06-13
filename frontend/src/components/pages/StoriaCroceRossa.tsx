import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Heart, Award, Navigation, Play, Pause, RotateCcw, Eye, Plus, CheckCircle, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StoriaCroceRossaInterattiva: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
  const [discoveredDetails, setDiscoveredDetails] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [progressPoints, setProgressPoints] = useState(0);
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({ volontari: 0, donne: 0, servizi: 0, emergenza: 0 });
  const [showFinalCTA, setShowFinalCTA] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const statistiche = {
    volontari: 262,
    donne: 135,
    servizi: 136,
    emergenza: 154
  };

  const chapters = [
    {
      id: 'intro',
      title: 'Benvenuti nella Storia della Croce Rossa',
      subtitle: 'Un viaggio attraverso 165 anni di solidarietà umana',
      content: 'Esplorate la storia della Croce Rossa dal 1859 ad oggi, scoprendo come i principi di umanità e solidarietà hanno preso forma nel nostro territorio.',
      interactiveElements: ['mission-statement'],
      bgImage: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
      textColor: 'text-white'
    },
    {
      id: 'origins',
      title: 'Le Origini: Solferino 1859',
      subtitle: 'La battaglia che ispirò un movimento mondiale',
      content: 'Il 24 giugno 1859, Henry Dunant assistette agli orrori della battaglia di Solferino. La sua testimonianza diretta portò alla nascita del movimento della Croce Rossa.',
      interactiveElements: ['battlefield-context', 'dunant-biography', 'wounded-statistics'],
      bgImage: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      textColor: 'text-white'
    },
    {
      id: 'foundation',
      title: 'La Fondazione: 1863-1864',
      subtitle: 'Dal Comitato di Ginevra al movimento internazionale',
      content: 'Nel 1863 nacque il Comitato Internazionale della Croce Rossa. L\'anno seguente l\'Italia fu tra i primi paesi ad aderire alla Convenzione di Ginevra.',
      bgImage: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
      textColor: 'text-white'
    },
    {
      id: 'cossato',
      title: 'Cossato: 1908',
      subtitle: 'La nascita del nostro Comitato Locale',
      content: 'Nel 1908 venne fondato il Comitato della Croce Rossa di Cossato, portando i valori umanitari nel territorio biellese.',
      bgImage: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      textColor: 'text-white'
    },
    {
      id: 'today',
      title: 'Croce Rossa Cossato Oggi',
      subtitle: 'Oltre un secolo di servizio alla comunità',
      content: 'Oggi la Croce Rossa di Cossato conta 262 volontari attivi che svolgono servizi essenziali per la comunità biellese.',
      interactiveElements: ['stats'],
      bgImage: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      textColor: 'text-white'
    }
  ];

  const timelineEvents = [
    { year: 1859, title: "Battaglia di Solferino", description: "Henry Dunant assiste alla carneficina e concepisce l'idea della Croce Rossa" },
    { year: 1863, title: "Comitato Internazionale", description: "Nasce a Ginevra il Comitato Internazionale della Croce Rossa" },
    { year: 1864, title: "Croce Rossa Italiana", description: "L'Italia aderisce e nasce la Croce Rossa Italiana" },
    { year: 1908, title: "Comitato di Cossato", description: "Fondazione del nostro Comitato Locale" },
    { year: 2024, title: "Oggi", description: "262 volontari al servizio della comunità" }
  ];

  const quizQuestions = [
    {
      question: "In quale anno Henry Dunant assistette alla Battaglia di Solferino?",
      options: ["1859", "1863", "1864", "1908"],
      correct: "1859",
      explanation: "La battaglia di Solferino si svolse il 24 giugno 1859 durante la Seconda Guerra d'Indipendenza italiana."
    },
    {
      question: "Quanti volontari conta attualmente la Croce Rossa Cossato?",
      options: ["150", "200", "262", "300"],
      correct: "262",
      explanation: "La Croce Rossa di Cossato conta oggi 262 volontari attivi di cui 135 sono donne."
    },
    {
      question: "Quale è il primo dei sette principi fondamentali della Croce Rossa?",
      options: ["Neutralità", "Umanità", "Imparzialità", "Universalità"],
      correct: "Umanità",
      explanation: "L'Umanità è il primo principio: prevenire e alleviare le sofferenze umane ovunque si trovino."
    }
  ];

  const principi = [
    { title: "Umanità", description: "Prevenire e alleviare le sofferenze umane", color: "bg-red-100 border-red-300 text-red-800" },
    { title: "Imparzialità", description: "Non discriminare in base a nazionalità, razza, religione", color: "bg-blue-100 border-blue-300 text-blue-800" },
    { title: "Neutralità", description: "Non partecipare alle ostilità politiche", color: "bg-gray-100 border-gray-300 text-gray-800" },
    { title: "Indipendenza", description: "Autonomia dalle autorità pubbliche", color: "bg-purple-100 border-purple-300 text-purple-800" },
    { title: "Volontarietà", description: "Servizio volontario non guidato dal desiderio di guadagno", color: "bg-green-100 border-green-300 text-green-800" },
    { title: "Unità", description: "Una sola società nazionale per paese", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
    { title: "Universalità", description: "Movimento mondiale di carattere universale", color: "bg-indigo-100 border-indigo-300 text-indigo-800" }
  ];

  useEffect(() => {
    if (revealedElements.has('current-stats')) {
      animateStats();
    }
  }, [revealedElements]);

  const animateStats = () => {
    const duration = 2000;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        volontari: Math.floor(statistiche.volontari * easeOut),
        donne: Math.floor(statistiche.donne * easeOut),
        servizi: Math.floor(statistiche.servizi * easeOut),
        emergenza: Math.floor(statistiche.emergenza * easeOut)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handleInteraction = (elementId: string) => {
    setRevealedElements(prev => new Set([...prev, elementId]));
    setProgressPoints(prev => prev + 5);
  };

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(prev => prev + 1);
      setRevealedElements(new Set());
    } else {
      setShowQuiz(true);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
      setRevealedElements(new Set());
    }
  };

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswerFeedback(true);
    const isCorrect = answer === quizQuestions[currentQuizStep].correct;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setTimeout(() => {
        setQuizAnswers(prev => ({ ...prev, [currentQuizStep]: answer }));
        setSelectedAnswer(null);
        setShowAnswerFeedback(false);
        
        if (currentQuizStep < quizQuestions.length - 1) {
          setCurrentQuizStep(prev => prev + 1);
        } else {
          const correct = quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length + 1;
          const pointsEarned = correct * 20;
          setProgressPoints(prev => prev + pointsEarned);
          setQuizCompleted(true);
          setShowFinalCTA(true);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowAnswerFeedback(false);
        setCurrentQuizStep(0);
        setQuizAnswers({});
      }, 1500);
    }
  };

  const resetJourney = () => {
    setCurrentChapter(0);
    setRevealedElements(new Set());
    setShowQuiz(false);
    setQuizAnswers({});
    setCurrentQuizStep(0);
    setDiscoveredDetails(new Set());
    setShowFinalCTA(false);
    setQuizCompleted(false);
  };

  const getCompletionPercentage = () => {
    const currentChapterElements = chapters[currentChapter].interactiveElements || [];
    if (currentChapterElements.length === 0) return 100;
    
    const revealedInCurrentChapter = currentChapterElements.filter(element => 
      revealedElements.has(element)
    ).length;
    
    return Math.round((revealedInCurrentChapter / currentChapterElements.length) * 100);
  };

  const currentChapterData = chapters[currentChapter];

  if (showQuiz) {
    const currentQuestion = quizQuestions[currentQuizStep];
    const isCompleted = currentQuizStep >= quizQuestions.length;

    if (showFinalCTA) {
      return (
        <div className="min-h-screen w-screen bg-gradient-to-br bg-white">
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
                  <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">Congratulazioni!</h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Ora conosci la storia della Croce Rossa e i nostri valori fondamentali.
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

          <div className="max-w-4xl mx-auto py-20">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-8">
                <Heart className="w-16 h-16 text-red-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Unisciti a Noi</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Visto che ora sai tutto su di noi, perché non unirti alla nostra grande famiglia?
                  Insieme possiamo fare la differenza nella nostra comunità.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/#contatti"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Diventa Volontario
                  </Link>
                  <button
                    onClick={resetJourney}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Ricomincia il Percorso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen w-screen bg-gradient-to-br bg-white">
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
                <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">Piccolo Quiz</h1>
                <p className="text-xl text-gray-300">
                  Rispondi correttamente ; )
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


        <div className="max-w-4xl mx-auto py-20 ">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {!isCompleted ? (
              <>
                <div className="border-b border-gray-200 pb-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Verifica delle Conoscenze</h2>
                    <span className="text-sm text-gray-500">Domanda {currentQuizStep + 1} di {quizQuestions.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuizStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>
                  <div className="grid gap-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={showAnswerFeedback}
                        className={`p-4 text-left rounded-lg transition-all duration-200 ${
                          showAnswerFeedback && selectedAnswer === option
                            ? isAnswerCorrect
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-red-100 border-red-500 text-red-700'
                            : 'bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 text-gray-900'
                        }`}
                      >
                        {option}
                        {showAnswerFeedback && selectedAnswer === option && (
                          <span className="ml-2">
                            {isAnswerCorrect ? '✓' : '✗'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {showAnswerFeedback && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      isAnswerCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {isAnswerCorrect 
                        ? 'Risposta corretta! Procediamo...' 
                        : 'Risposta errata. Riprova da capo!'}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completato</h2>
                  <p className="text-lg text-gray-600 mb-4">Hai terminato il percorso sulla storia della Croce Rossa</p>
                  
                  {/* Score Section */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length}/{quizQuestions.length}
                        </div>
                        <div className="text-sm text-gray-600">Risposte Corrette</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length * 20}
                        </div>
                        <div className="text-sm text-gray-600">Punti Guadagnati</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{discoveredDetails.size}</div>
                        <div className="text-sm text-gray-600">Dettagli Scoperti</div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Message */}
                  <div className="mb-6">
                    {quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length === quizQuestions.length ? (
                      <p className="text-green-600 font-semibold">Perfetto! Hai risposto correttamente a tutte le domande!</p>
                    ) : (
                      <p className="text-orange-600 font-semibold">
                        Hai risposto correttamente a {quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length} domande su {quizQuestions.length}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setShowFinalCTA(true)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 inline-flex items-center"
                  >
                    Continua
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      {/* Header con progresso */}
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
              <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">La Nostra Storia</h1>
              <p className="text-xl text-gray-300">
                Scopri la CRI di Cossato nel suo splendore
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
      <div className="bg-white shadow-sm border-b py-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold text-gray-900">Storia della Croce Rossa</h1>
              
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Progresso: {getCompletionPercentage()}%</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline orizzontale */}
      <div className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col items-center cursor-pointer transition-all duration-200 relative group ${index === currentChapter
                  ? 'text-red-600 font-semibold'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
                onClick={() => setCurrentChapter(index)}
              >
                <div className={`w-3 h-3 rounded-full mb-2 ${index === currentChapter ? 'bg-red-600' : 'bg-gray-300'
                  }`} />
                <div className="text-sm font-medium">{event.year}</div>
                <div className="text-xs text-center max-w-20">{event.title}</div>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block">
                  <div className="bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
                    {event.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-7xl mx-auto px-6 py-20 bg-white">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenuto principale */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentChapterData.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{currentChapterData.subtitle}</p>
                <div className="w-16 h-1 bg-red-600 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">{currentChapterData.content}</p>
              </div>

              {/* Elementi interattivi specifici */}
              {currentChapter === 0 && (
                <div className="space-y-4">
                  <button
                    onClick={() => handleInteraction('mission-statement')}
                    className={`w-full p-6 text-left rounded-lg border-2 transition-all duration-200 ${revealedElements.has('mission-statement')
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200 hover:border-red-300'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">La Missione della Croce Rossa</h3>
                        <p className="text-sm text-gray-600 mt-1">Clicca per scoprire i nostri valori fondamentali</p>
                      </div>
                      {revealedElements.has('mission-statement') ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    {revealedElements.has('mission-statement') && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <p className="text-gray-700">La Croce Rossa opera per prevenire e alleviare le sofferenze umane, proteggere la vita e la salute, e far rispettare la dignità della persona umana.</p>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {currentChapter === 1 && (
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: 'battlefield-context', title: 'Il Contesto Storico', desc: 'La Seconda Guerra d\'Indipendenza italiana' },
                    { id: 'dunant-biography', title: 'Henry Dunant', desc: 'L\'uomo che cambiò la storia dell\'umanità' },
                    { id: 'wounded-statistics', title: 'Le Conseguenze', desc: 'L\'impatto umano della battaglia' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleInteraction(item.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${revealedElements.has(item.id)
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200 hover:border-red-300'
                        }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                      {revealedElements.has(item.id) && (
                        <div className="mt-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {currentChapter === 4 && (
                <div className="space-y-6">
                  <button
                    onClick={() => handleInteraction('current-stats')}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 ${revealedElements.has('current-stats')
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200 hover:border-red-300'
                      }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Statistiche Attuali</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Volontari Attivi', value: animatedStats.volontari, suffix: '' },
                        { label: 'Donne Volontarie', value: animatedStats.donne, suffix: '' },
                        { label: 'Servizi Annui', value: animatedStats.servizi, suffix: 'k' },
                        { label: 'Km Emergenza', value: animatedStats.emergenza, suffix: 'k' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-red-600">{stat.value}{stat.suffix}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </button>

                  {revealedElements.has('current-stats') && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">I Sette Principi Fondamentali</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {principi.map((principio, index) => (
                          <div key={index} className={`p-3 rounded-lg border ${principio.color}`}>
                            <h4 className="font-semibold">{principio.title}</h4>
                            <p className="text-sm mt-1">{principio.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Progresso del Capitolo</h3>

              <div className="space-y-3 mb-6">
                {currentChapterData.interactiveElements?.map((element, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      revealedElements.has(element) ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-sm ${
                      revealedElements.has(element) ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      Elemento {index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Esplorazione:</span>
                  <span>
                    {currentChapterData.interactiveElements?.filter(element => 
                      revealedElements.has(element)
                    ).length || 0}/{currentChapterData.interactiveElements?.length || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getCompletionPercentage()}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controlli navigazione */}
      <div className="bg-white border-t pb-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={prevChapter}
              disabled={currentChapter === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Precedente
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600">
                Capitolo {currentChapter + 1} di {chapters.length}
              </div>
            </div>

            <button
              onClick={nextChapter}
              className="flex items-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              {currentChapter === chapters.length - 1 ? (
                <>
                  Verifica Finale
                  <Award className="w-5 h-5 ml-1" />
                </>
              ) : (
                <>
                  Successivo
                  <ChevronRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriaCroceRossaInterattiva;
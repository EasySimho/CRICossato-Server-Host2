import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!privacyAccepted) {
      setErrorMessage('Devi accettare l\'informativa sulla privacy.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Errore nell\'invio del messaggio');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setPrivacyAccepted(false);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
      setErrorMessage('Si è verificato un errore nell\'invio del messaggio. Riprova più tardi.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id='contatti' className="min-h-screen bg-gray-50 py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Red diagonal lines */}
        <div className="absolute inset-0 bg-white transform rotate-2 origin-top-left"></div>
        <div className="absolute inset-0 bg-white transform -rotate-2 origin-top-right"></div>
      </div>

      <div className="max-w-7xl pt-6 sm:pt-10 mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

          {/* Left Side - Contact Info */}
          <div className="space-y-8 sm:space-y-12">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                DOMANDE?<br />
                VUOI UNIRTI A NOI?<br />
                <span className="text-red-600">FACCELO SAPERE!</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Hai domande? Compila il modulo e ti<br />
                ricontatteremo presto.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">CHATTA CON NOI</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2">Il nostro team è qui per aiutarti.</p>
                <a href="mailto:info@crocerossa.it" className="text-red-600 hover:text-red-700 transition-colors">
                  cossato@cri.it
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telefono</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      +39 015 922697<br />
                      +39 334 6456537
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Indirizzo</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Via Amendola, 91<br />
                      13836 COSSATO (BI)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      cossato@cri.it<br />
                      pec: cl.cossato@cert.cri.it
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Orari</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Lun-Ven: 9:00-18:00<br />
                      Sab: 9:00-13:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
            {status === 'success' && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm sm:text-base">
                Messaggio inviato con successo! Ti risponderemo al più presto.
              </div>
            )}

            {status === 'error' && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm sm:text-base">
                {errorMessage}
              </div>
            )}

            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:gap-8">
                <div>
                  <label htmlFor="name" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                    Nome e Cognome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="mario.rossi@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Informazioni sui corsi"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Scrivi il tuo messaggio..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 mr-3 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    required
                  />
                  <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Accetto l'<a href="/privacy" className="text-red-600 hover:text-red-700 underline">informativa sulla privacy</a> e autorizzo il trattamento dei miei dati personali secondo quanto previsto dal GDPR.
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!privacyAccepted || status === 'loading'}
                  className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-red-600 text-white text-base sm:text-lg font-bold rounded-xl hover:bg-red-700 transition-all duration-300 flex items-center justify-center group"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Invia Messaggio
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
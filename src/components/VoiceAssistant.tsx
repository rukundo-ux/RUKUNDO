import React from 'react';
import { Mic, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getVoiceAssistantResponse } from '../lib/gemini';
import { cn } from '../lib/utils';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Swahili' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'lg', name: 'Luganda' },
  { code: 'fr', name: 'French' },
];

export const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [response, setResponse] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState('');

  const handleListen = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setQuery("How can I protect my maize from armyworms?");
    }, 2000);
  };

  const handleSend = async () => {
    if (!query) return;
    const res = await getVoiceAssistantResponse(query, language);
    setResponse(res || "Sorry, I couldn't process that.");
    setQuery('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-olive-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 active:scale-90 transition-transform"
      >
        <Mic size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-earth-900/40 backdrop-blur-sm z-50 flex items-end"
          >
            <div className="w-full bg-earth-50 rounded-t-3xl p-8 pb-12 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-olive-700">
                  <Globe size={20} />
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent font-medium focus:outline-none"
                  >
                    {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                  </select>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-earth-400">
                  <X size={24} />
                </button>
              </div>

              <div className="min-h-[200px] flex flex-col items-center justify-center text-center">
                {response ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-lg font-serif italic text-earth-800"
                  >
                    "{response}"
                  </motion.div>
                ) : isListening ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center animate-pulse">
                      <Mic size={32} className="text-olive-600" />
                    </div>
                    <p className="text-olive-600 font-medium">Listening...</p>
                  </div>
                ) : query ? (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-xl font-serif">"{query}"</p>
                    <button 
                      onClick={handleSend}
                      className="bg-olive-600 text-white px-8 py-3 rounded-full font-medium"
                    >
                      Ask AgriLens
                    </button>
                  </div>
                ) : (
                  <p className="text-earth-400 font-serif text-lg">Tap the mic to ask a question</p>
                )}
              </div>

              {!isListening && !response && !query && (
                <button
                  onClick={handleListen}
                  className="w-20 h-20 bg-olive-600 text-white rounded-full shadow-xl flex items-center justify-center mx-auto mt-8 active:scale-95 transition-transform"
                >
                  <Mic size={36} />
                </button>
              )}

              {response && (
                <button
                  onClick={() => { setResponse(null); setQuery(''); }}
                  className="w-full mt-8 py-4 border-2 border-olive-200 text-olive-700 rounded-2xl font-medium"
                >
                  Ask Another Question
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

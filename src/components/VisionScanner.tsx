import React from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, ShoppingBag, Leaf, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeImage, DiagnosisResult, AnalysisMode } from '../lib/gemini';
import { cn } from '../lib/utils';

export const VisionScanner: React.FC = () => {
  const [mode, setMode] = React.useState<AnalysisMode>('health');
  const [isScanning, setIsScanning] = React.useState(false);
  const [result, setResult] = React.useState<DiagnosisResult | null>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImage(base64);
      setIsScanning(true);
      const res = await analyzeImage(base64, mode);
      setResult(res);
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 pb-32 space-y-8">
      <header>
        <h1 className="text-4xl font-serif font-bold text-earth-900">Scanner</h1>
        <p className="text-earth-500 font-medium mt-1">AI-powered diagnosis</p>
      </header>

      <div className="flex gap-2 p-1 bg-earth-200 rounded-2xl">
        <button 
          onClick={() => setMode('health')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            mode === 'health' ? "bg-white text-olive-600 shadow-sm" : "text-earth-500"
          )}
        >
          <Leaf size={18} />
          Health
        </button>
        <button 
          onClick={() => setMode('soil')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            mode === 'soil' ? "bg-white text-olive-600 shadow-sm" : "text-earth-500"
          )}
        >
          <Sprout size={18} />
          Soil
        </button>
      </div>

      <div className="relative aspect-square bg-earth-200 rounded-[3rem] overflow-hidden border-4 border-white shadow-inner flex items-center justify-center">
        {image ? (
          <img src={image} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-olive-600 shadow-lg">
              <Camera size={32} />
            </div>
            <p className="text-earth-500 font-serif text-lg">Point camera at {mode === 'health' ? 'leaf' : 'soil'}</p>
          </div>
        )}
        
        {isScanning && (
          <div className="absolute inset-0 bg-olive-600/20 backdrop-blur-[2px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw size={48} className="text-white animate-spin" />
              <p className="text-white font-bold text-xl drop-shadow-md">Analyzing...</p>
            </div>
          </div>
        )}

        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleCapture}
        />
        
        {!image && !isScanning && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-olive-600 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
          >
            <Camera size={36} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-[2.5rem] border border-earth-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-olive-100 p-3 rounded-2xl text-olive-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold">{result.title}</h2>
                  <p className="text-earth-500 leading-relaxed mt-1">{result.description}</p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                  <AlertCircle size={18} className="text-olive-600" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-3 text-earth-700 bg-earth-50 p-3 rounded-xl border border-earth-100">
                      <div className="w-1.5 h-1.5 bg-olive-400 rounded-full mt-2 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-olive-50 p-6 rounded-[2.5rem] border border-olive-100">
              <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2 text-olive-800">
                <ShoppingBag size={20} />
                Local Pharmacy
              </h3>
              <div className="space-y-4">
                {result.pharmacyItems.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-olive-200 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-olive-900">{item.name}</p>
                      <p className="text-xs text-olive-600 mt-0.5">{item.description}</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-earth-400 mt-2">{item.availability}</p>
                    </div>
                    <button className="bg-olive-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
                      Find
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setImage(null); setResult(null); }}
              className="w-full py-4 border-2 border-earth-200 text-earth-500 rounded-2xl font-bold uppercase tracking-widest text-sm"
            >
              Scan Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

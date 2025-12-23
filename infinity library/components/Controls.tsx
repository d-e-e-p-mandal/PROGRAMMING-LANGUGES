import React, { useState } from 'react';
import { Loader2, BookOpen, Sparkles } from 'lucide-react';

interface ControlsProps {
  onGenerate: (topic: string) => void;
  isGenerating: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onGenerate, isGenerating }) => {
  const [topic, setTopic] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-black/80 hover:bg-black text-[#d4af37] backdrop-blur-md border border-[#d4af37]/30 px-6 py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 font-serif"
        >
          <Sparkles size={20} />
          <span>Conjure a New Story</span>
        </button>
      ) : (
        <div className="bg-black/90 backdrop-blur-xl border border-[#d4af37]/30 p-6 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#d4af37] font-serif text-lg">What do you wish to read?</h3>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., A clockmaker who controls time..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] transition-colors font-serif"
              autoFocus
            />
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full bg-[#d4af37] hover:bg-[#b5952f] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-serif"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Writing...</span>
                </>
              ) : (
                <>
                  <BookOpen size={20} />
                  <span>Create Book</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
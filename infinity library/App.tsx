import React, { useState } from 'react';
import { Book } from './components/Book';
import { Controls } from './components/Controls';
import { generateStory } from './services/gemini';
import { Story } from './types';
import { Loader2 } from 'lucide-react';

// Default story so the book isn't empty initially
const DEFAULT_STORY: Story = {
  title: "The Beginning",
  author: "Gemini",
  pages: [
    "Welcome to the Infinite Library. This book is a vessel for endless stories, conjured from the ether of imagination.",
    "To begin your journey, simply use the controls below to request a new tale. Whether you seek mystery, romance, or adventure, the library will provide.",
    "This page is powered by advanced AI, capable of weaving narratives and even illustrating the covers of the tomes you create.",
    "Turn the page to explore the empty canvas of your imagination. What worlds will you discover today?",
    "Feel the weight of the digital paper. Hear the silence of the void waiting to be filled with words.",
    "Go ahead. Click the button. Create something beautiful."
  ],
  coverColor: "#2c3e50",
  coverImage: undefined
};

const App: React.FC = () => {
  const [story, setStory] = useState<Story>(DEFAULT_STORY);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (topic: string) => {
    setIsGenerating(true);
    setError(null);
    // Close book to reset state nicely before new story
    setIsBookOpen(false);
    
    try {
      const newStory = await generateStory(topic);
      setStory(newStory);
      // Once ready, we can optionally auto-open, but let's let the user open the new book
    } catch (err) {
      setError("The library spirits were quiet. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      
      {/* Lighting effect for the table/desk */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0.6) 100%)' }}></div>

      {/* Main Book Scene */}
      <div className="z-10 relative w-full flex items-center justify-center p-4 perspective-2000 min-h-[600px]">
        {isGenerating ? (
           <div className="flex flex-col items-center text-[#d4af37] animate-pulse">
             <Loader2 size={64} className="animate-spin mb-4" />
             <p className="font-serif text-xl">Weaving the threads of fate...</p>
           </div>
        ) : (
           <Book 
             story={story} 
             isOpen={isBookOpen} 
             onToggleOpen={() => setIsBookOpen(!isBookOpen)} 
           />
        )}
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-8 bg-red-900/80 text-white px-6 py-3 rounded-lg border border-red-500 shadow-xl z-50 animate-bounce font-serif">
          {error}
        </div>
      )}

      {/* Controls */}
      <Controls onGenerate={handleGenerate} isGenerating={isGenerating} />
      
      {/* Footer */}
      <div className="absolute bottom-2 right-4 text-white/20 text-xs font-serif z-0 pointer-events-none hidden sm:block">
        The Infinite Library &bull; Powered by Gemini
      </div>
    </div>
  );
};

export default App;
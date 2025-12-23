"use client";

import { useState } from "react";
import { Book } from "./components/Book";
import { Story } from "./type/types";

// Static pages
import Page1 from "./book-pages/page1/page";
import Page2 from "./book-pages/page2/page";
import Page3 from "./book-pages/page3/page";
import Page4 from "./book-pages/page4/page";

const DEFAULT_STORY: Story = {
  title: "The Beginning",
  author: "Gemini",
  pages: [
    <Page1 />,
    <Page2 />,
    <Page3 />,
    <Page4 />
  ],
  coverColor: "#2c3e50",
};

export default function Page() {
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] overflow-hidden flex items-center justify-center relative">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Book */}
      <div className="relative z-10 w-full flex items-center justify-center min-h-[600px]">
        <Book
          story={DEFAULT_STORY}
          isOpen={isBookOpen}
          onToggleOpen={() => setIsBookOpen(!isBookOpen)}
        />
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 right-4 text-white/20 text-xs font-serif pointer-events-none hidden sm:block">
        The Infinite Library
      </div>
    </div>
  );
}
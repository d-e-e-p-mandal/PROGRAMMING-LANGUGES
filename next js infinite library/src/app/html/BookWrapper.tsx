"use client";

import { useState } from "react";
import { Book } from "./components/Book";
import { Story } from "./type/types";

import Page1 from "./book-pages/page1/page";
import Page2 from "./book-pages/page2/page";
import Page3 from "./book-pages/page3/page";
import Page4 from "./book-pages/page4/page";

export default function BookWrapper() {
  const [isBookOpen, setIsBookOpen] = useState(false);

  const story: Story = {
    title: "The Beginning",
    author: "Gemini",
    pages: [<Page1 />, <Page2 />, <Page3 />, <Page4 />],
    coverColor: "#2c3e50",
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Book */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Book
          story={story}
          isOpen={isBookOpen}
          onToggleOpen={() => setIsBookOpen(!isBookOpen)}
        />
      </div>
    </div>
  );
}
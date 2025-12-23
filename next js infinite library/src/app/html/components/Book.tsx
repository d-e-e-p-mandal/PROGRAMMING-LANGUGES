// import React, { useState, useEffect } from 'react';
// import { Sheet } from './Sheet';
// import { Story, SheetData } from '../types';
// import { generateCoverImage } from '../services/gemini';

// interface BookProps {
//   story: Story;
//   isOpen: boolean;
//   onToggleOpen: () => void;
// }

// export const Book: React.FC<BookProps> = ({ story, isOpen, onToggleOpen }) => {
//   const [flippedIndex, setFlippedIndex] = useState<number>(-1);
//   const [coverImage, setCoverImage] = useState<string | undefined>(story.coverImage);
  
//   // Reset state when story changes
//   useEffect(() => {
//     setFlippedIndex(-1);
//     setCoverImage(story.coverImage);
    
//     // If no cover image provided, try to generate one
//     // if (!story.coverImage) {
//     //     generateCoverImage(story.title, "Vintage style, highly detailed, magical atmosphere")
//     //         .then(img => {
//     //             if(img) setCoverImage(img);
//     //         });
//     // }
//   }, [story]);

//   // Auto open book if requested from props, or handle close
//   useEffect(() => {
//       if (!isOpen) {
//           setFlippedIndex(-1);
//       } else if (flippedIndex === -1) {
//           // If opening, flip the cover
//           setFlippedIndex(0);
//       }
//   }, [isOpen]);

//   const handleFlip = (index: number) => {
//     // If we click the cover (index 0) and it's not flipped, we open the book
//     if (index === 0 && flippedIndex === -1) {
//         onToggleOpen();
//         return;
//     }
    
//     // Logic: 
//     // If clicking a page on the right (not flipped yet), we increase flip index (move forward)
//     // If clicking a page on the left (already flipped), we decrease flip index (move backward)
    
//     if (index <= flippedIndex) {
//         // Clicking on the left stack -> go back
//         setFlippedIndex(index - 1);
//         if (index === 0) onToggleOpen(); // Close book if closing cover
//     } else {
//         // Clicking on the right stack -> go forward
//         setFlippedIndex(index);
//     }
//   };

//   // Prepare Sheet Data
//   // Sheet 0: Front Cover / Inside Cover
//   // Sheet 1..N: Content Pages
//   // Sheet N+1: Back Cover Inside / Back Cover
  
//   const sheets: SheetData[] = [];
  
//   // 1. Cover Sheet
//   sheets.push({
//     id: 0,
//     isCover: true,
//     frontContent: (
//       <div
//         className="h-full w-full flex flex-col items-center justify-center p-8 text-center relative"
//         style={{ backgroundColor: story.coverColor }}
//       >
//         <div className="absolute inset-0 border-4 border-[#d4af37] m-2 rounded-r-lg opacity-50" />
//         {coverImage && (
//           <img
//             src={coverImage}
//             alt="Cover"
//             className="w-48 h-64 object-cover shadow-lg mb-6 rounded border-2 border-[#d4af37]"
//           />
//         )}
//         <h1 className="text-3xl font-serif text-[#fdfbf7] font-bold tracking-widest drop-shadow-md uppercase mb-2">
//           {story.title}
//         </h1>
//         <p className="text-[#fdfbf7] font-serif italic opacity-90">
//           by {story.author}
//         </p>
//       </div>
//     ),
//     backContent: (
//       <div className="h-full w-full p-8 bg-[#fdfbf7] flex items-center justify-center">
//         <div className="text-center font-serif text-gray-600 italic">
//           <p>Ex Libris</p>
//           <div className="w-16 h-px bg-gray-400 mx-auto my-2"></div>
//           <p className="text-sm">The Infinite Library</p>
//         </div>
//       </div>
//     ),
//   });

//   // Content sheets
//   const pageCount = story.pages.length;
//   const sheetCount = Math.ceil(pageCount / 2);

//   for (let i = 0; i < sheetCount; i++) {
//     const pageIndex1 = i * 2;
//     const pageIndex2 = i * 2 + 1;

//     const content1 = story.pages[pageIndex1];
//     const content2 = story.pages[pageIndex2];

//     sheets.push({
//       id: i + 1,
//       frontContent: (
//         <div className="h-full w-full p-8 sm:p-10 font-serif text-gray-900 leading-relaxed text-sm sm:text-base overflow-y-auto custom-scrollbar">
//           {typeof content1 === "string"
//             ? content1.split("\n").map((p, idx) => (
//                 <p
//                   key={idx}
//                   className="mb-4 indent-6 text-justify"
//                 >
//                   {p}
//                 </p>
//               ))
//             : content1}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-sans">
//             {pageIndex1 + 1}
//           </div>
//         </div>
//       ),
//       backContent: (
//         <div className="h-full w-full p-8 sm:p-10 font-serif text-gray-900 leading-relaxed text-sm sm:text-base overflow-y-auto custom-scrollbar">
//           {typeof content2 === "string"
//             ? content2.split("\n").map((p, idx) => (
//                 <p
//                   key={idx}
//                   className="mb-4 indent-6 text-justify"
//                 >
//                   {p}
//                 </p>
//               ))
//             : content2}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-sans">
//             {pageIndex2 + 1}
//           </div>
//         </div>
//       ),
//     });
//   }

//   // Back cover
//   sheets.push({
//     id: sheets.length,
//     isCover: true,
//     frontContent: (
//       <div className="h-full w-full p-8 bg-[#fdfbf7] flex items-center justify-center">
//         <p className="text-gray-400 font-serif italic text-sm">The End</p>
//       </div>
//     ),
//     backContent: (
//       <div
//         className="h-full w-full flex items-center justify-center"
//         style={{ backgroundColor: story.coverColor }}
//       >
//         <div className="absolute inset-0 border-4 border-[#d4af37] m-2 rounded-l-lg opacity-50" />
//         <div className="text-[#d4af37] text-2xl">⚜</div>
//       </div>
//     ),
//   });

//   return (
//     <div
//       className={`relative transition-all duration-700 ease-in-out ${
//         isOpen ? "translate-x-[50%] sm:translate-x-[25%]" : ""
//       }`}
//     >
//       <div className="relative w-[300px] h-[450px] sm:w-[400px] sm:h-[550px] perspective-2000">
//         {sheets.map((sheet, index) => {
//           const z =
//             index <= flippedIndex
//               ? index
//               : sheets.length - index;

//           return (
//             <Sheet
//               key={sheet.id}
//               id={sheet.id}
//               isCover={sheet.isCover}
//               flipped={index <= flippedIndex}
//               zIndex={z}
//               frontContent={sheet.frontContent}
//               backContent={sheet.backContent}
//               onFlip={() => handleFlip(index)}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };




 import React, { useState, useEffect } from 'react';
 import { Sheet } from './Sheet';
 import { Story, SheetData } from '../type/types';
// import { generateCoverImage } from '../services/gemini';

interface BookProps {
  story: Story;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const Book: React.FC<BookProps> = ({ story, isOpen, onToggleOpen }) => {
  const [flippedIndex, setFlippedIndex] = useState<number>(-1);
  const [coverImage, setCoverImage] = useState<string | undefined>(story.coverImage);
  
  // Reset state when story changes
  useEffect(() => {
    setFlippedIndex(-1);
    setCoverImage(story.coverImage);
    
    // If no cover image provided, try to generate one
    // if (!story.coverImage) {
    //     generateCoverImage(story.title, "Vintage style, highly detailed, magical atmosphere")
    //         .then(img => {
    //             if(img) setCoverImage(img);
    //         });
    // }
  }, [story]);

  // Auto open book if requested from props, or handle close
  useEffect(() => {
      if (!isOpen) {
          setFlippedIndex(-1);
      } else if (flippedIndex === -1) {
          // If opening, flip the cover
          setFlippedIndex(0);
      }
  }, [isOpen]);

  const handleFlip = (index: number) => {
    // If we click the cover (index 0) and it's not flipped, we open the book
    if (index === 0 && flippedIndex === -1) {
        onToggleOpen();
        return;
    }
    
    // Logic: 
    // If clicking a page on the right (not flipped yet), we increase flip index (move forward)
    // If clicking a page on the left (already flipped), we decrease flip index (move backward)
    
    if (index <= flippedIndex) {
        // Clicking on the left stack -> go back
        setFlippedIndex(index - 1);
        if (index === 0) onToggleOpen(); // Close book if closing cover
    } else {
        // Clicking on the right stack -> go forward
        setFlippedIndex(index);
    }
  };

  // Prepare Sheet Data
  // Sheet 0: Front Cover / Inside Cover
  // Sheet 1..N: Content Pages
  // Sheet N+1: Back Cover Inside / Back Cover
  
  const sheets: SheetData[] = [];
  
  // 1. Cover Sheet
  sheets.push({
    id: 0,
    isCover: true,
    frontContent: (
      <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center relative" style={{ backgroundColor: story.coverColor }}>
        <div className="absolute inset-0 border-4 border-[#d4af37] m-2 rounded-r-lg opacity-50" />
        {coverImage && <img src={coverImage} alt="Cover" className="w-48 h-64 object-cover shadow-lg mb-6 rounded border-2 border-[#d4af37]" />}
        <h1 className="text-3xl font-serif text-[#fdfbf7] font-bold tracking-widest drop-shadow-md uppercase mb-2">{story.title}</h1>
        <p className="text-[#fdfbf7] font-serif italic opacity-90">by {story.author}</p>
      </div>
    ),
    backContent: (
      <div className="h-full w-full p-8 bg-[#fdfbf7] flex items-center justify-center">
        <div className="text-center font-serif text-gray-600 italic">
            <p>Ex Libris</p>
            <div className="w-16 h-px bg-gray-400 mx-auto my-2"></div>
            <p className="text-sm">The Infinite Library</p>
        </div>
      </div>
    ),
  });

  // 2. Content Sheets
  // We pair pages: [0,1], [2,3], etc.
  const pageCount = story.pages.length;
  const sheetCount = Math.ceil(pageCount / 2);
  //console.log(pageCount);

  for (let i = 0; i < sheetCount; i++) {
    const pageIndex1 = (i * 2);
    const pageIndex2 = (i * 2) + 1;
    const content1 = story.pages[pageIndex1] || "";
    const content2 = story.pages[pageIndex2] || "";

    sheets.push({
      id: i + 1,
      frontContent: (
        <div className="h-full w-full p-8 sm:p-10 font-serif text-gray-900 leading-relaxed text-sm sm:text-base overflow-y-auto custom-scrollbar">
          {typeof content1 === "string"
            ? content1.split("\n").map((p, idx) => (
                <p
                  key={idx}
                  className="mb-4 indent-6 text-justify"
                >
                  {p}
                </p>
              ))
            : content1}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-sans">
            {pageIndex1 + 1}
          </div>
        </div>
      ),
      backContent: (
        <div className="h-full w-full p-8 sm:p-10 font-serif text-gray-900 leading-relaxed text-sm sm:text-base overflow-y-auto custom-scrollbar">
          {typeof content2 === "string"
            ? content2.split("\n").map((p, idx) => (
                <p
                  key={idx}
                  className="mb-4 indent-6 text-justify"
                >
                  {p}
                </p>
              ))
            : content2}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-sans">
            {pageIndex2 + 1}
          </div>
        </div>
      ),
    });
  }

  // 3. Back Cover Sheet
  sheets.push({
      id: sheets.length,
      isCover: true,
      frontContent: (
        <div className="h-full w-full p-8 bg-[#fdfbf7] flex items-center justify-center">
             <p className="text-gray-400 font-serif italic text-sm">The End</p>
        </div>
      ),
      backContent: (
          <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: story.coverColor }}>
               <div className="absolute inset-0 border-4 border-[#d4af37] m-2 rounded-l-lg opacity-50" />
               <div className="text-[#d4af37] text-2xl">⚜</div>
          </div>
      )
  })


  // Width logic: Book closed = w, Book open = 2w.
  // To keep it centered, we translate the whole container.
  
  return (
    <div className={`relative transition-all duration-700 ease-in-out ${isOpen ? 'translate-x-[50%] sm:translate-x-[25%]' : ''}`}>
      <div className="relative w-[300px] h-[450px] sm:w-[400px] sm:h-[550px] perspective-2000">
        {sheets.map((sheet, index) => {
           // Z-index logic
           // If flipped (on left): Higher index = Lower z-index (Sheet 0 is bottom-most on left? No, Sheet 0 is Top-most when closed. 
           // Wait.
           // Closed Stack (Right): Sheet 0 Top, Sheet N Bottom.
           // Open Stack (Left): Sheet 0 Bottom, Sheet N Top.
           
           let z = 0;
           if (index <= flippedIndex) {
               // Flipped (Left side)
               z = index; // 0 is at bottom, higher index on top
           } else {
               // Unflipped (Right side)
               z = sheets.length - index; // 0 is on top, higher index on bottom
           }

           return (
            <Sheet
                key={sheet.id}
                id={sheet.id}
                isCover={sheet.isCover}
                flipped={index <= flippedIndex}
                zIndex={z}
                frontContent={sheet.frontContent}
                backContent={sheet.backContent}
                onFlip={() => handleFlip(index)}
            />
           );
        })}
      </div>
    </div>
  );
};
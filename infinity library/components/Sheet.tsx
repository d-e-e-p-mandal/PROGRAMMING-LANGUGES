import React from 'react';

interface SheetProps {
  id: number;
  flipped: boolean;
  zIndex: number;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onFlip: () => void;
  isCover?: boolean;
}

export const Sheet: React.FC<SheetProps> = ({ 
  flipped, 
  zIndex, 
  frontContent, 
  backContent, 
  onFlip,
  isCover = false
}) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 transform-style-3d origin-left cursor-pointer`}
      style={{
        zIndex: zIndex,
        transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
      }}
      onClick={onFlip}
    >
      {/* Front of the sheet */}
      <div
        className={`absolute inset-0 w-full h-full backface-hidden overflow-hidden ${
          isCover ? 'rounded-r-lg' : 'bg-[#fdfbf7]'
        } shadow-md border-l border-gray-200`}
        style={{
            // Add a subtle gradient to simulate page curve near spine
            backgroundImage: isCover ? undefined : 'linear-gradient(to right, #e3dccb 0%, #fdfbf7 5%, #fdfbf7 95%, #e3dccb 100%)'
        }}
      >
        {frontContent}
        {/* Gloss/Shadow overlay for depth */}
        {!isCover && <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5 pointer-events-none" />}
      </div>

      {/* Back of the sheet */}
      <div
        className={`absolute inset-0 w-full h-full backface-hidden overflow-hidden rotate-y-180 ${
          isCover ? 'rounded-l-lg' : 'bg-[#fdfbf7]'
        } shadow-md border-r border-gray-200`}
         style={{
             backgroundImage: isCover ? undefined : 'linear-gradient(to left, #e3dccb 0%, #fdfbf7 5%, #fdfbf7 95%, #e3dccb 100%)'
         }}
      >
        {backContent}
        {!isCover && <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 pointer-events-none" />}
      </div>
    </div>
  );
};
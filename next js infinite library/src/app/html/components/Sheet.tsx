"use client";

import React from "react";

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
      onClick={onFlip}
      className="absolute top-0 left-0 w-full h-full transition-transform duration-700 origin-left cursor-pointer"
      style={{
        zIndex: zIndex,
        transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        // 1. MUST HAVE: Tells children to exist in 3D space
        transformStyle: 'preserve-3d', 
      }}
    >
      {/* Front Side (Content 1) */}
      <div
        className={`absolute inset-0 w-full h-full overflow-hidden ${
          isCover ? 'rounded-r-lg' : 'bg-[#fdfbf7]'
        } shadow-md border-l border-gray-200`}
        style={{
          // 2. Hides this side when it's facing away from the camera
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          backgroundImage: isCover ? undefined : 'linear-gradient(to right, #e3dccb 0%, #fdfbf7 5%, #fdfbf7 95%, #e3dccb 100%)'
        }}
      >
        {frontContent}
        {!isCover && <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5 pointer-events-none" />}
      </div>

      {/* Back Side (Content 2) */}
      <div
        className={`absolute inset-0 w-full h-full overflow-hidden ${
          isCover ? 'rounded-l-lg' : 'bg-[#fdfbf7]'
        } shadow-md border-r border-gray-200`}
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // 3. THE FIX: Pre-rotate this side so it isn't mirrored when flipped
          transform: 'rotateY(180deg)',
          backgroundImage: isCover ? undefined : 'linear-gradient(to left, #e3dccb 0%, #fdfbf7 5%, #fdfbf7 95%, #e3dccb 100%)'
        }}
      >
        {backContent}
        {!isCover && <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 pointer-events-none" />}
      </div>
    </div>
  );
};
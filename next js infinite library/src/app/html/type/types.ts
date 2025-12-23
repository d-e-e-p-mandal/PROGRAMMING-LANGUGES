export interface Story {
  title: string;
  author: string;
  pages: React.ReactNode[]; // ✅ allow static pages OR strings
  coverColor: string;
  coverImage?: string; // Base64 or URL
}

export interface SheetData {
  id: number;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isCover?: boolean;
}
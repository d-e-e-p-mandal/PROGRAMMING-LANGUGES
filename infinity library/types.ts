export interface Story {
  title: string;
  author: string;
  pages: string[]; // Array of text content for each page
  coverColor: string;
  coverImage?: string; // Base64 or URL
}

export interface SheetData {
  id: number;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isCover?: boolean;
}
import { GoogleGenAI, Type } from "@google/genai";
import { Story } from '../types';

// Initialize the Gemini client
// The API key is strictly obtained from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStory = async (topic: string): Promise<Story> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a short story or book about "${topic}". 
      It should be engaging and formatted for a small book. 
      Provide a title, an author name, and split the content into exactly 6 to 10 pages of text. 
      Also suggest a hex color code suitable for the book cover.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            author: { type: Type.STRING },
            pages: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            coverColor: { type: Type.STRING, description: "A hex color code like #8B4513" }
          },
          required: ["title", "author", "pages", "coverColor"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as Story;
    }
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};

export const generateCoverImage = async (title: string, description: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `A high quality, vintage book cover illustration for a book titled "${title}". ${description}. No text on the image, just the art.`,
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return undefined;
  } catch (error) {
    console.warn("Failed to generate cover image:", error);
    return undefined; // Fail gracefully for images
  }
};


import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment.
// For browser environment, this would typically be handled by a bundler
// or a server that proxies the request. For this static build, we are
// assuming it's available. In a real app, this key should be kept secure.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });

export const summarizeText = async (text: string): Promise<string> => {
  if (!apiKey || apiKey === "MISSING_API_KEY") {
    return Promise.resolve("API Key not configured. Please set the API_KEY environment variable. This is a mock summary. The AI feature helps you condense long documents into key points, making it easier to grasp the main ideas quickly.");
  }
  
  if (text.trim().length < 50) {
    return "The document is too short to summarize. Please add more content.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following document into a few key bullet points:\n\n---\n\n${text}`,
      config: {
        systemInstruction: "You are an expert at summarizing technical and project documents into concise, easy-to-understand summaries.",
      }
    });
    
    return response.text;
  } catch (error) {
    // Fix: The caught error `error` is of type `unknown` and must be converted to a string to be logged.
    console.error(`Error summarizing text with Gemini API: ${String(error)}`);
    return "An error occurred while trying to summarize the text.";
  }
};
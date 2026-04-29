import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function summarizeToKannada(longText: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a news summarizer for a short-news app. 
      Summarize the following news article into a concise, engaging summary in Kannada language (exactly 50-80 words).
      Keep the tone professional yet catchy. Output only the Kannada summary text.
      
      Article: ${longText}`,
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini summarization error:", error);
    return "Error generating summary.";
  }
}

export async function translateAndSummarizeToKannada(englishText: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate and summarize the following English news article into Kannada (50-80 words).
      The summary should be professional and easy to read for Kannada speakers. Output only the Kannada summary.
      
      Article: ${englishText}`,
    });
    return response.text || "Translation unavailable.";
  } catch (error) {
    console.error("Gemini translation error:", error);
    return "Error in translation.";
  }
}

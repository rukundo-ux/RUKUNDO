import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export type AnalysisMode = 'soil' | 'health';

export interface DiagnosisResult {
  title: string;
  description: string;
  recommendations: string[];
  pharmacyItems: {
    name: string;
    description: string;
    availability: string;
  }[];
}

export async function analyzeImage(base64Data: string, mode: AnalysisMode): Promise<DiagnosisResult | null> {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = mode === 'soil' 
    ? "Analyze this soil image (color, texture). Recommend 3-5 crops suitable for this soil in East Africa (Kenya, Rwanda, Uganda). Provide the response in JSON format."
    : "Identify any crop diseases or pests from this leaf image. List specific pesticides or organic treatments available in the East African market (Kenya, Rwanda, Uganda). Provide the response in JSON format.";

  const schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      recommendations: { 
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      pharmacyItems: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            availability: { type: Type.STRING }
          },
          required: ["name", "description", "availability"]
        }
      }
    },
    required: ["title", "description", "recommendations", "pharmacyItems"]
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { data: base64Data.split(',')[1], mimeType: "image/jpeg" } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
}

export async function getVoiceAssistantResponse(query: string, language: string) {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      systemInstruction: `You are AgriLens Assistant, a helpful agronomist for East African farmers. 
      Respond in ${language}. Keep it simple, actionable, and culturally relevant. 
      Focus on climate resilience and pest management.`
    }
  });
  
  return response.text;
}

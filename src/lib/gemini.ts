import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

export const SYSTEM_INSTRUCTION = `
You are the "AI Consultant", the neural heartbeat of "The Socket" – a revolutionary eco-grid and cannabis metaverse. 
Your persona is a legendary blend:
- The laid-back wisdom of Willie Nelson.
- The smooth, rhythmic cool of Snoop Dogg.
- The focused, philosophical intensity of Bruce Lee.
- The raw, poetic fire of 2Pac.
- The visionary, peaceful idealism of John Lennon.
- All wrapped in the high-energy swagger of a brilliant college kid who knows the grid inside out.

Tone: 
- Use cannabis slang naturally but professionally (e.g., "the plug", "sticky icky", "gas", "loud", "blaze", "cipher").
- Be incredibly helpful but with a "vibe". 
- You are the "Socket" – the grid that connects growers, makers, and dreamers.
- When analyzing files, determine if they are for "training the ecosystem", "general knowledge", or "technical blueprints".
- You support 3DPoD (3D Print on Demand), AR/VR grow room design, and eco-friendly sourcing.

Your goal is to guide users through the "Seed to Smoke" journey with a focus on sustainability and automated excellence. 
If a user uploads a file, analyze it with this persona. 
If they ask for a grow room design, talk about AR/VR integration and sustainable materials.
`;

export async function chatWithGanjaGuru(message: string, history: any[] = [], fileData?: { data: string; mimeType: string }) {
  const model = "gemini-3-flash-preview";
  
  const contents = [...history];
  
  if (fileData) {
    contents.push({
      role: "user",
      parts: [
        { text: message || "Analyze this file for the GanjaGuru ecosystem." },
        { inlineData: fileData }
      ]
    });
  } else {
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });
  }

  try {
    const response = await genAI.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("GanjaGuru API Error:", error);
    return "Yo, the connection's a bit hazy right now. Let's try that again in a minute, fam.";
  }
}

import { NextResponse } from 'next/server';
import { retrieveContext } from '@/lib/knowledge';

const GEMINI_MODEL = 'gemini-3.5-flash-lite';

const SYSTEM_PROMPT = `You are Hari's Portfolio AI Assistant embedded inside a macOS-style desktop portfolio.

IDENTITY:
- Your name is "Hari AI"
- You are friendly, concise, and conversational
- You speak in first person about Hari (e.g. "Hari built...", "His tech stack includes...")

CRITICAL GROUNDING RULES:
1. You MUST answer ONLY using the SUPPLIED RETRIEVED CONTEXT below
2. If the retrieved context says "No matching portfolio records found" or does not contain information to answer the question, respond with a friendly decline like: "That's outside my knowledge scope! I only know about Hari's portfolio -- ask me about his projects, skills, education, or how to reach him!"
3. NEVER invent, hallucinate, or assume technologies, skills, projects, or experiences not explicitly present in the context
4. For out-of-scope questions (e.g. "I'm Batman", "who is Iron Man", "what is 2+2", jokes, weather), respond playfully but always redirect to Hari's portfolio

RESPONSE FORMAT:
Respond in valid JSON matching this exact schema:
{
  "message": "Your concise, markdown-formatted response here",
  "action": null
}

- Use markdown formatting (bold, bullet points, links) to make responses readable
- Keep responses concise (2-5 sentences for simple questions, longer for detailed project/education queries)
- Only set "action" to { "type": "open_app", "id": "projects" } if the user EXPLICITLY asks to open/show a window`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message parameter is required' }, { status: 400 });
    }

    // Step 1: RAG Retrieval -- extract only relevant portfolio chunks
    const { combinedText, chunks } = retrieveContext(message);

    const rawApiKey = process.env.GEMINI_API_KEY?.trim().replace(/^["']|["']$/g, '');
    const isApiKeyConfigured = Boolean(rawApiKey && rawApiKey !== 'your_gemini_api_key_here' && rawApiKey.length > 10);

    // Clean fallback when Gemini is unavailable
    const formatFallback = () => {
      if (chunks.length === 0) {
        return "That's outside my knowledge scope! I only know about Hari's portfolio -- ask me about his projects, skills, education, or how to reach him!";
      }
      return chunks.map(c => `**${c.title}**\n${c.content}`).join('\n\n');
    };

    if (!isApiKeyConfigured) {
      return NextResponse.json({ message: formatFallback(), action: null });
    }

    // Step 2: Call Gemini with tiny system prompt + retrieved context
    const userPrompt = `${SYSTEM_PROMPT}

SUPPLIED RETRIEVED CONTEXT:
${combinedText}

USER QUESTION: ${message}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${rawApiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: userPrompt }] },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Gemini API error (${response.status}):`, errBody);
      return NextResponse.json({ message: formatFallback(), action: null });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json({ message: formatFallback(), action: null });
    }

    // Parse JSON response from Gemini
    try {
      const parsed = JSON.parse(rawText);
      return NextResponse.json({
        message: parsed.message ?? rawText,
        action: parsed.action ?? null,
      });
    } catch {
      // If Gemini didn't return valid JSON, use raw text
      return NextResponse.json({ message: rawText, action: null });
    }
  } catch (error) {
    console.error('Chat API Route Exception:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Read the incoming form data
    const body = await request.json();

    // The prompt instructs the LLM to return strictly a JSON object
    const systemPrompt = `You are a form validation assistant. Analyse the provided form fields and return ONLY a JSON object where each key matches a field name (name, email, password, bio) and the value is a short, helpful suggestion or confirmation. Be concise. No extra text outside the JSON.`;

    // We use the free Pollinations.ai text endpoint which accepts OpenAI-compatible messages array
    // jsonMode=true ensures we get a clean JSON response
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(body) },
        ],
        jsonMode: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    // Get the raw text response
    const aiResponse = await response.text();
    
    // Parse the response, gracefully handling potential markdown code blocks
    try {
      const jsonResponse = JSON.parse(aiResponse);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      const cleanJson = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
      return NextResponse.json(JSON.parse(cleanJson));
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { global: "Failed to connect to the AI service. Please try again." },
      { status: 500 }
    );
  }
}

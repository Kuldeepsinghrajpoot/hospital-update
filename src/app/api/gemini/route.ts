// app/api/gemini/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a helpful AI medical assistant for Uday Clinic. Your goal is to provide a preliminary analysis of a user's symptoms. You MUST follow these rules strictly:
1. Analyze the user's symptoms and suggest a potential course of action:
   - Go to the hospital immediately.
   - Book a non-urgent appointment.
   - Rest and manage at home.
2. Provide a brief, simple explanation for your suggestion.
3. ALWAYS, without exception, end your response with the following disclaimer, formatted exactly like this:
---
**Disclaimer:** This is an AI-powered analysis and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis and treatment plan. This tool is for informational purposes only.
4. Do not provide a diagnosis. Do not suggest specific medications.
5. Keep your entire response concise and easy to understand for a non-medical person.`;

    const payload = {
      contents: [{ parts: [{ text: `User symptoms: ${prompt}` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: "Gemini API error", details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

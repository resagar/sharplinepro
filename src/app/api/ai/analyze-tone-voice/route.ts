import { NextResponse } from "next/server";
import { analyzeToneAndVoice } from "@/lib/ai/core";

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const analysis = await analyzeToneAndVoice(text);

        return NextResponse.json(analysis);

    } catch (error) {
        console.error("Error in analyze-tone-voice API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 
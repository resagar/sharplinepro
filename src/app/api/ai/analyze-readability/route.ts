import { NextResponse } from "next/server";
import { analyzeReadability } from "@/lib/ai/core";

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const analysis = await analyzeReadability(text);

        return NextResponse.json(analysis);

    } catch (error) {
        console.error("Error in analyze-readability API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 
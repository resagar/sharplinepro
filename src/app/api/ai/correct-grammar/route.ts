import { NextResponse } from "next/server";
import { correctGrammar } from "@/lib/ai/core";

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const correctedText = await correctGrammar(text);

        return NextResponse.json({ correctedText });

    } catch (error) {
        console.error("Error in correct-grammar API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 
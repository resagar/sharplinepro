import { NextResponse } from "next/server";
import { findCliches } from "@/lib/ai/core";

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const cliches = await findCliches(text);

        return NextResponse.json(cliches);

    } catch (error) {
        console.error("Error in find-cliches API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 
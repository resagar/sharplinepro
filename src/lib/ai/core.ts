import { generateText, generateObject } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { SYSTEM_PROMPTS } from "./prompts";
import { ClichesSchema, ReadabilitySchema, ToneAndVoiceSchema } from "./schemas";

export async function correctGrammar(text: string) {
    const { text: correctedText } = await generateText({
        model: openrouter("gpt-4.1-nano"),
        system: SYSTEM_PROMPTS.grammar,
        prompt: text,
        temperature: 0.1,
        topP: 0.6,
    });
    return correctedText;
}

export async function analyzeReadability(text: string) {
    const { object } = await generateObject({
        model: openrouter("gpt-4.1-mini"),
        schema: ReadabilitySchema,
        system: SYSTEM_PROMPTS.readability,
        prompt: text,
        temperature: 0.2,
        topP: 0.9,
    });
    return object.suggestions;
}

export async function analyzeToneAndVoice(text: string) {
    const { object } = await generateObject({
        model: openrouter("o4-mini-high"),
        schema: ToneAndVoiceSchema,
        system: SYSTEM_PROMPTS.toneAndVoice,
        prompt: text,
        temperature: 0.3,
        topP: 0.9,
    });
    return object;
}

export async function findCliches(text: string) {
    const { object } = await generateObject({
        model: openrouter("gpt-4.1-nano"),
        schema: ClichesSchema,
        system: SYSTEM_PROMPTS.cliches,
        prompt: text,
        temperature: 0.2,
        topP: 0.9,
    });
    return object.suggestions;
} 
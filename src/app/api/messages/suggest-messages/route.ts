import { APICallError, generateText } from "ai";

import { perplexityProvider } from "@/lib/perplexity/perplexity";
const prompt = "Suggest me some movie names in a single string divided by '|'";

export async function PUT() {
    try {
        const { text } = await generateText({
            model: perplexityProvider('sonar-pro'),
            prompt,
        });

        return Response.json({ message: text }, { status: 200 });
    } catch (error) {
        if (error instanceof APICallError) {
            return new Response("OpenAI error", { status: 500 });
        }
        return new Response("Unable to load messages", { status: 500 });
    }
}